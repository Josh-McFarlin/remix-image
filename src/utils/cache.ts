export const generateKey = (...args: (string | number | null | undefined)[]) =>
  args.filter((i) => i != null).join("_");
