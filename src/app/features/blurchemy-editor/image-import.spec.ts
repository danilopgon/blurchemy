import { createObjectUrlHandle } from './adapters/object-url-handle.adapter';
import { IMAGE_IMPORT_LIMITS } from './constants/image-import.constants';
import { formatBytes } from './formatters/file-size.formatter';
import { readImageCandidate } from './validators/image-import.validator';

function imageFile(name: string, type: string, size: number): File {
  return new File([new Uint8Array(size)], name, { type });
}

describe('image import domain', () => {
  it('accepts JPEG, PNG, and WebP candidates within size and dimension limits', async () => {
    const files = [
      imageFile('studio.jpg', 'image/jpeg', 1_024),
      imageFile('mask.png', 'image/png', 2_048),
      imageFile('texture.webp', 'image/webp', 3_072),
    ];

    const results = await Promise.all(
      files.map((file) =>
        readImageCandidate(file, { decode: async () => ({ width: 6000, height: 4000 }) }),
      ),
    );

    expect(results).toEqual([
      {
        ok: true,
        metadata: {
          name: 'studio.jpg',
          format: 'JPEG',
          width: 6000,
          height: 4000,
          size: '1 KB',
        },
      },
      {
        ok: true,
        metadata: {
          name: 'mask.png',
          format: 'PNG',
          width: 6000,
          height: 4000,
          size: '2 KB',
        },
      },
      {
        ok: true,
        metadata: {
          name: 'texture.webp',
          format: 'WebP',
          width: 6000,
          height: 4000,
          size: '3 KB',
        },
      },
    ]);
  });

  it('reports unsupported type before size or dimensions', async () => {
    const result = await readImageCandidate(
      imageFile('animation.gif', 'image/gif', IMAGE_IMPORT_LIMITS.maxBytes + 1),
      {
        decode: async () => ({ width: IMAGE_IMPORT_LIMITS.maxPixelsPerSide + 1, height: 320 }),
      },
    );

    expect(result).toEqual({
      ok: false,
      error: {
        code: 'unsupported-format',
        title: 'Unsupported format',
        detail: "Blurchemy accepts JPEG, PNG and WebP. 'animation.gif' looks like GIF.",
      },
    });
  });

  it('reports file size before decoding dimensions', async () => {
    let decodeCalls = 0;

    const result = await readImageCandidate(
      imageFile('huge.png', 'image/png', IMAGE_IMPORT_LIMITS.maxBytes + 1),
      {
        decode: async () => {
          decodeCalls += 1;
          return { width: 320, height: 240 };
        },
      },
    );

    expect(result).toEqual({
      ok: false,
      error: {
        code: 'file-too-large',
        title: 'File is too large',
        detail:
          'This image is 20 MB. The current limit is 20 MB so processing stays fast in the browser.',
      },
    });
    expect(decodeCalls).toBe(0);
  });

  it('rejects images over the pixel dimension limit', async () => {
    const result = await readImageCandidate(imageFile('poster.webp', 'image/webp', 4_096), {
      decode: async () => ({ width: 6001, height: 5000 }),
    });

    expect(result).toEqual({
      ok: false,
      error: {
        code: 'dimensions-too-large',
        title: 'Dimensions too large',
        detail: 'This image is 6001 × 5000 px. The current limit is 6000 × 6000 px per side.',
      },
    });
  });

  it('reports unreadable images without producing metadata', async () => {
    const result = await readImageCandidate(imageFile('broken.jpg', 'image/jpeg', 512), {
      decode: async () => Promise.reject(new Error('decode failed')),
    });

    expect(result).toEqual({
      ok: false,
      error: {
        code: 'unreadable-image',
        title: "Couldn't read that image",
        detail: "The file appears to be corrupt or isn't a real image. Try a different one.",
      },
    });
  });

  it('formats byte sizes for metadata and validation details', () => {
    expect(formatBytes(900)).toBe('900 B');
    expect(formatBytes(1_536)).toBe('1.5 KB');
    expect(formatBytes(2_621_440)).toBe('2.5 MB');
  });

  it('revokes object URLs exactly once through the lifecycle seam', () => {
    const revoked: string[] = [];
    const handle = createObjectUrlHandle(imageFile('local.png', 'image/png', 256), {
      createObjectURL: () => 'blob:local-preview',
      revokeObjectURL: (url) => revoked.push(url),
    });

    expect(handle.url).toBe('blob:local-preview');

    handle.revoke();
    handle.revoke();

    expect(revoked).toEqual(['blob:local-preview']);
  });
});
