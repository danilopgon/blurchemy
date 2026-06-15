import type { ImageDimensions } from '../types/image-import.type';

export type ImageDecodePort = {
  readonly decode: (file: File) => Promise<ImageDimensions>;
};
