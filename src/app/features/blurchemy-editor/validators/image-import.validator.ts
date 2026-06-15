import { ACCEPTED_IMAGE_FORMATS, IMAGE_IMPORT_LIMITS } from '../constants/image-import.constants';
import { formatBytes } from '../formatters/file-size.formatter';
import type { ImageDecodePort } from '../ports/image-decode.port';
import type {
  AcceptedImageType,
  ImageDimensions,
  ImageFormatLabel,
  ImageImportResult,
} from '../types/image-import.type';

export async function readImageCandidate(
  file: File,
  decoder: ImageDecodePort,
): Promise<ImageImportResult> {
  const format = resolveAcceptedFormat(file.type);

  if (format === undefined) {
    return {
      ok: false,
      error: {
        code: 'unsupported-format',
        title: 'Unsupported format',
        detail: `Blurchemy accepts JPEG, PNG and WebP. '${file.name}' looks like ${describeFileType(file)}.`,
      },
    };
  }

  if (file.size > IMAGE_IMPORT_LIMITS.maxBytes) {
    return {
      ok: false,
      error: {
        code: 'file-too-large',
        title: 'File is too large',
        detail: `This image is ${formatBytes(file.size)}. The current limit is ${formatBytes(
          IMAGE_IMPORT_LIMITS.maxBytes,
        )} so processing stays fast in the browser.`,
      },
    };
  }

  const dimensions = await decodeSafely(file, decoder);

  if (dimensions === undefined) {
    return {
      ok: false,
      error: {
        code: 'unreadable-image',
        title: "Couldn't read that image",
        detail: "The file appears to be corrupt or isn't a real image. Try a different one.",
      },
    };
  }

  if (
    dimensions.width > IMAGE_IMPORT_LIMITS.maxPixelsPerSide ||
    dimensions.height > IMAGE_IMPORT_LIMITS.maxPixelsPerSide
  ) {
    return {
      ok: false,
      error: {
        code: 'dimensions-too-large',
        title: 'Dimensions too large',
        detail: `This image is ${dimensions.width} × ${dimensions.height} px. The current limit is ${IMAGE_IMPORT_LIMITS.maxPixelsPerSide} × ${IMAGE_IMPORT_LIMITS.maxPixelsPerSide} px per side.`,
      },
    };
  }

  return {
    ok: true,
    metadata: {
      name: file.name,
      format,
      width: dimensions.width,
      height: dimensions.height,
      size: formatBytes(file.size),
    },
  };
}

function resolveAcceptedFormat(type: string): ImageFormatLabel | undefined {
  return ACCEPTED_IMAGE_FORMATS[type as AcceptedImageType];
}

async function decodeSafely(
  file: File,
  decoder: ImageDecodePort,
): Promise<ImageDimensions | undefined> {
  try {
    return await decoder.decode(file);
  } catch {
    return undefined;
  }
}

function describeFileType(file: File): string {
  const subtype = file.type.split('/')[1]?.trim();

  if (subtype !== undefined && subtype.length > 0) {
    return subtype.toUpperCase();
  }

  return 'an unsupported format';
}
