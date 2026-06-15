export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${formatNumber(bytes / 1024)} KB`;
  }

  return `${formatNumber(bytes / 1024 / 1024)} MB`;
}

function formatNumber(value: number): string {
  return value.toFixed(1).replace(/\.0$/, '');
}
