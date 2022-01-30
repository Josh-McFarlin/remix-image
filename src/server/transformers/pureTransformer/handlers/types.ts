import type { ResizeOptions } from "../../../../types/image";

export interface RGBA {
  data: Buffer;
  width: number;
  height: number;
}

export interface ImageHandler {
  decode(buffer: Buffer): Promise<RGBA>;
  encode(rgba: RGBA, options: ResizeOptions): Promise<Buffer>;
}
