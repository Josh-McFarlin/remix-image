declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "pngjs/browser" {
  export * from "pngjs";
}

declare module "get-rgba-palette" {
  export type Color = [number, number, number];

  const getPalette: (
    image: Uint8Array,
    count?: number,
    quality?: number
  ) => Color[];

  export default getPalette;
}
