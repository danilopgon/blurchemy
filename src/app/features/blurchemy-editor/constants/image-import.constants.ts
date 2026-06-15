export const IMAGE_IMPORT_LIMITS = {
  maxBytes: 20 * 1024 * 1024,
  maxPixelsPerSide: 6000,
} as const;

export const ACCEPTED_IMAGE_FORMATS = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
} as const;
