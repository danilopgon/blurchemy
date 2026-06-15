import { ACCEPTED_IMAGE_FORMATS } from '../constants/image-import.constants';

export type AcceptedImageType = keyof typeof ACCEPTED_IMAGE_FORMATS;

export type ImageFormatLabel = (typeof ACCEPTED_IMAGE_FORMATS)[AcceptedImageType];

export type ImageImportErrorCode =
  | 'unsupported-format'
  | 'file-too-large'
  | 'dimensions-too-large'
  | 'unreadable-image';

export type ImageImportError = {
  readonly code: ImageImportErrorCode;
  readonly title: string;
  readonly detail: string;
};

export type ImageDimensions = {
  readonly width: number;
  readonly height: number;
};

export type ImageMetadata = ImageDimensions & {
  readonly name: string;
  readonly format: ImageFormatLabel;
  readonly size: string;
};

export type ImageImportResult =
  | { readonly ok: true; readonly metadata: ImageMetadata }
  | { readonly ok: false; readonly error: ImageImportError };
