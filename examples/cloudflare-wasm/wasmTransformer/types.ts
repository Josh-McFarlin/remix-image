import type { TransformOptions } from "remix-image";

export class ImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;

  constructor(data: Uint8ClampedArray, width: number, height: number) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
}

export interface ImageHandler {
  decode(buffer: ArrayBuffer): Promise<ImageData>;
  encode(image: ImageData, options: TransformOptions): Promise<ArrayBuffer>;
}

declare global {
  const AVIF_ENC_WASM: string;
  const AVIF_DEC_WASM: string;
  const JPEG_ENC_WASM: string;
  const JPEG_DEC_WASM: string;
  const PNG_ENC_WASM: string;
  const PNG_DEC_WASM: string;
  const WEBP_ENC_WASM: string;
  const WEBP_ENC_WASM_SIMD: string;
  const WEBP_DEC_WASM: string;
  const RESIZE_ENC_WASM: string;
}
