export type ObjectUrlPort = {
  readonly createObjectURL: (object: Blob) => string;
  readonly revokeObjectURL: (url: string) => void;
};

export type ObjectUrlHandle = {
  readonly url: string;
  readonly revoke: () => void;
};
