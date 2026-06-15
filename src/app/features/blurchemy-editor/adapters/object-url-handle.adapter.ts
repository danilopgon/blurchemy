import type { ObjectUrlHandle, ObjectUrlPort } from '../ports/object-url.port';

export function createObjectUrlHandle(file: File, objectUrl: ObjectUrlPort): ObjectUrlHandle {
  const url = objectUrl.createObjectURL(file);
  let revoked = false;

  return {
    url,
    revoke: () => {
      if (revoked) {
        return;
      }

      objectUrl.revokeObjectURL(url);
      revoked = true;
    },
  };
}
