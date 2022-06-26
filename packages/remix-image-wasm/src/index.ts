// @ts-ignore Simple Polyfill ImageData Object
globalThis.ImageData = class ImageData {
  private data: Uint8Array;
  private width: number;
  private height: number;

  constructor(data: Uint8Array, width: number, height: number) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
};

export * from "./wasmTransformer";
