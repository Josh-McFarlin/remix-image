export const generateKey = (...args: (string | number | null | undefined)[]) =>
  args.filter((i) => i != null).join("_");

/**
 * Returns the number of kilobytes
 */
export const kB = (num: number): number => num * 1e3;

/**
 * Returns the number of megabytes
 */
export const mB = (num: number): number => num * 1e6;

/**
 * Returns the number of gigabytes
 */
export const GB = (num: number): number => num * 1e9;
