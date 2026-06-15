import type { ImageDecodePort } from '../ports/image-decode.port';
import type { ObjectUrlPort } from '../ports/object-url.port';
import type { ImageDimensions } from '../types/image-import.type';

export const browserImageDecoder: ImageDecodePort = {
  decode: async (file) => {
    if ('createImageBitmap' in globalThis) {
      const bitmap = await createImageBitmap(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      return dimensions;
    }

    return decodeWithImageElement(file, URL);
  },
};

function decodeWithImageElement(file: File, objectUrl: ObjectUrlPort): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const url = objectUrl.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      objectUrl.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };

    image.onerror = () => {
      objectUrl.revokeObjectURL(url);
      reject(new Error('Image decode failed.'));
    };

    image.src = url;
  });
}
