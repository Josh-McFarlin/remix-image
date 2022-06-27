import ImageData from "./types/ImageData";
// @ts-ignore Simple Polyfill ImageData Object
globalThis.ImageData = ImageData;
export * from "./wasmTransformer";
