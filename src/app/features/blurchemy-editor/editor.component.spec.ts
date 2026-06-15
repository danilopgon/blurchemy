import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlurchemyEditorComponent, IMAGE_DECODER, OBJECT_URL } from './editor.component';
import type { ImageDecodePort } from './ports/image-decode.port';
import type { ObjectUrlPort } from './ports/object-url.port';

function imageFile(name: string, type = 'image/png', size = 2_048): File {
  return new File([new Uint8Array(size)], name, { type });
}

function dropWith(file: File): DragEvent {
  const event = new Event('drop', { bubbles: true, cancelable: true }) as DragEvent;

  Object.defineProperty(event, 'dataTransfer', {
    value: { files: { 0: file, length: 1, item: (index: number) => (index === 0 ? file : null) } },
  });

  return event;
}

function setInputFiles(input: HTMLInputElement, files: readonly File[]): void {
  Object.defineProperty(input, 'files', {
    configurable: true,
    value: files,
  });
}

async function settleImport(fixture: ComponentFixture<BlurchemyEditorComponent>): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('BlurchemyEditorComponent', () => {
  let fixture: ComponentFixture<BlurchemyEditorComponent>;
  let decoder: ImageDecodePort;
  let decodeImage: ImageDecodePort['decode'];
  let objectUrl: ObjectUrlPort;
  let createdUrls: string[];
  let revokedUrls: string[];

  beforeEach(async () => {
    createdUrls = [];
    revokedUrls = [];
    decodeImage = async () => ({ width: 1600, height: 900 });
    decoder = { decode: (file) => decodeImage(file) };
    objectUrl = {
      createObjectURL: (object) => {
        const file = object as File;
        const url = `blob:${file.name}`;
        createdUrls.push(url);
        return url;
      },
      revokeObjectURL: (url) => revokedUrls.push(url),
    };

    await TestBed.configureTestingModule({
      imports: [BlurchemyEditorComponent],
      providers: [
        { provide: IMAGE_DECODER, useValue: decoder },
        { provide: OBJECT_URL, useValue: objectUrl },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlurchemyEditorComponent);
    fixture.detectChanges();
  });

  it('renders the initial editor shell with honest Original and Processed panels', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('main')?.getAttribute('aria-label')).toBe(
      'Blurchemy editor workspace',
    );
    expect(host.querySelector('[data-testid="original-panel"]')?.textContent).toContain(
      'Drop an image to begin',
    );
    expect(host.querySelector('[data-testid="processed-panel"]')?.textContent).toContain(
      'later release',
    );
    expect(host.querySelector('[data-testid="processed-panel"]')?.querySelector('img')).toBeNull();
    expect(host.querySelector('[data-testid="status-bar"]')?.textContent).toContain(
      'No image loaded.',
    );
  });

  it('imports a valid file selected from the file picker and announces metadata', async () => {
    const input = fixture.nativeElement.querySelector('input[type="file"]') as HTMLInputElement;

    setInputFiles(input, [imageFile('studio.png')]);
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Reading image');

    await settleImport(fixture);

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="original-panel"] img')?.getAttribute('src')).toBe(
      'blob:studio.png',
    );
    expect(host.querySelector('[data-testid="status-bar"]')?.textContent).toContain('studio.png');
    expect(host.querySelector('[data-testid="status-bar"]')?.textContent).toContain('1600 × 900');
    expect(host.querySelector('[aria-live="polite"]')?.textContent).toContain(
      'Imported studio.png, PNG, 1600 × 900 px, 2 KB.',
    );
  });

  it('starts local validation from drop and shows a specific error without a broken preview', async () => {
    decodeImage = async () => Promise.reject(new Error('decode failed'));

    const dropzone = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="original-dropzone"]',
    ) as HTMLElement;

    dropzone.dispatchEvent(dropWith(imageFile('broken.jpg', 'image/jpeg', 512)));
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Reading image');

    await settleImport(fixture);

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[role="alert"]')?.textContent).toContain("Couldn't read that image");
    expect(host.querySelector('[data-testid="original-panel"] img')).toBeNull();
    expect(host.querySelector('[aria-live="polite"]')?.textContent).toContain(
      "Couldn't read that image",
    );
  });

  it('replaces and removes images while revoking object URLs and restoring focus', async () => {
    const input = fixture.nativeElement.querySelector('input[type="file"]') as HTMLInputElement;

    setInputFiles(input, [imageFile('first.png')]);
    input.dispatchEvent(new Event('change'));
    await settleImport(fixture);

    setInputFiles(input, [imageFile('second.webp', 'image/webp')]);
    input.dispatchEvent(new Event('change'));
    await settleImport(fixture);

    expect(createdUrls).toEqual(['blob:first.png', 'blob:second.webp']);
    expect(revokedUrls).toEqual(['blob:first.png']);
    expect((fixture.nativeElement as HTMLElement).querySelector('img')?.getAttribute('src')).toBe(
      'blob:second.webp',
    );

    const remove = (fixture.nativeElement as HTMLElement).querySelector(
      'button[data-testid="remove-image"]',
    ) as HTMLButtonElement;
    remove.focus();
    remove.click();
    fixture.detectChanges();

    const browse = (fixture.nativeElement as HTMLElement).querySelector(
      'button[data-testid="browse-image"]',
    ) as HTMLButtonElement;
    expect(revokedUrls).toEqual(['blob:first.png', 'blob:second.webp']);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[data-testid="status-bar"]')
        ?.textContent,
    ).toContain('No image loaded.');
    expect(document.activeElement).toBe(browse);
  });
});
