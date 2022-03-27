declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "get-rgba-palette" {
  const getPalette: (
    image: Uint8Array,
    count?: number,
    quality?: number
  ) => [number, number, number][];

  export default getPalette;
}
