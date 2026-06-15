import {
  Component,
  ElementRef,
  InjectionToken,
  OnDestroy,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { createObjectUrlHandle } from './adapters/object-url-handle.adapter';
import { browserImageDecoder } from './adapters/browser-image-decoder.adapter';
import { IMAGE_IMPORT_LIMITS } from './constants/image-import.constants';
import type { ImageDecodePort } from './ports/image-decode.port';
import type { ObjectUrlHandle, ObjectUrlPort } from './ports/object-url.port';
import type { ImageImportError, ImageMetadata } from './types/image-import.type';
import { readImageCandidate } from './validators/image-import.validator';

export const IMAGE_DECODER = new InjectionToken<ImageDecodePort>('Blurchemy image decoder', {
  providedIn: 'root',
  factory: () => browserImageDecoder,
});

export const OBJECT_URL = new InjectionToken<ObjectUrlPort>('Blurchemy object URL port', {
  providedIn: 'root',
  factory: () => URL,
});

type EditorState =
  | { readonly kind: 'empty' }
  | { readonly kind: 'importing' }
  | {
      readonly kind: 'imported';
      readonly metadata: ImageMetadata;
      readonly previewUrl: string;
    }
  | { readonly kind: 'error'; readonly error: ImageImportError };

@Component({
  selector: 'app-blurchemy-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class BlurchemyEditorComponent implements OnDestroy {
  private readonly decoder = inject(IMAGE_DECODER);
  private readonly objectUrl = inject(OBJECT_URL);
  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private readonly browseButton = viewChild<ElementRef<HTMLButtonElement>>('browseButton');

  protected readonly limits = IMAGE_IMPORT_LIMITS;
  protected readonly state = signal<EditorState>({ kind: 'empty' });
  protected readonly dragDepth = signal(0);
  protected readonly announcement = signal('No image loaded.');

  private currentPreview: ObjectUrlHandle | undefined;

  ngOnDestroy(): void {
    this.revokeCurrentPreview();
  }

  protected openFilePicker(): void {
    this.fileInput()?.nativeElement.click();
  }

  protected onPickerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = getFirstFile(input.files);

    if (file === undefined) {
      return;
    }

    void this.importFile(file);
    input.value = '';
  }

  protected onDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth.update((depth) => depth + 1);
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth.update((depth) => Math.max(0, depth - 1));
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth.set(0);

    const file = getFirstFile(event.dataTransfer?.files);

    if (file === undefined) {
      return;
    }

    void this.importFile(file);
  }

  protected removeImage(): void {
    this.revokeCurrentPreview();
    this.state.set({ kind: 'empty' });
    this.announcement.set('Image removed. No image loaded.');
    this.browseButton()?.nativeElement.focus();
  }

  private async importFile(file: File): Promise<void> {
    this.state.set({ kind: 'importing' });
    this.announcement.set('Reading image. Validating format, size and dimensions locally.');

    const result = await readImageCandidate(file, this.decoder);

    if (!result.ok) {
      this.state.set({ kind: 'error', error: result.error });
      this.announcement.set(`${result.error.title}. ${result.error.detail}`);
      return;
    }

    const nextPreview = createObjectUrlHandle(file, this.objectUrl);
    this.revokeCurrentPreview();
    this.currentPreview = nextPreview;
    this.state.set({ kind: 'imported', metadata: result.metadata, previewUrl: nextPreview.url });
    this.announcement.set(
      `Imported ${result.metadata.name}, ${result.metadata.format}, ${result.metadata.width} × ${result.metadata.height} px, ${result.metadata.size}.`,
    );
  }

  private revokeCurrentPreview(): void {
    this.currentPreview?.revoke();
    this.currentPreview = undefined;
  }
}

function getFirstFile(files: FileList | undefined | null): File | undefined {
  return files?.item?.(0) ?? files?.[0];
}
