import type { TransformOptions } from "../../../types/image";

export interface ImageData {
  data: Uint8Array;
  width: number;
  height: number;
}

export interface ImageHandler {
  decode(buffer: Uint8Array): Promise<ImageData>;
  encode(image: ImageData, options: TransformOptions): Promise<Uint8Array>;
}
