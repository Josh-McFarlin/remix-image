declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "pngjs/browser" {
  export * from "pngjs";
}
