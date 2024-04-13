export function truncate(value: string | undefined, sideLength = 6): string {
  return value
    ? value.length > sideLength * 2
      ? `${value.substring(0, sideLength)}...${value.substring(value.length - sideLength)}`
      : value
    : '';
}

export function countLines(value: string): number {
  try {
    return value.split('\n').length;
  } catch (e) {
    return 0;
  }
}
