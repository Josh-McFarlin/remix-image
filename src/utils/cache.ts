export const generateKey = (...args: (string | number | null | undefined)[]) =>
  args.filter((i) => i != null).join("_");

/**
 * Convert kilobytes to bytes
 */
export const kB = (num: number): number => num * 1e3;

/**
 * Converts megabytes to bytes
 */
export const mB = (num: number): number => num * 1e6;

/**
 * Converts gigabytes to bytes
 */
export const GB = (num: number): number => num * 1e9;
