import * as BMPJS from "bmp-js";
import { ResizeOptions } from "../../../../types/image";
import { ImageHandler, RGBA } from "./types";

export const BmpHandler: ImageHandler = {
  async decode(buffer: Buffer): Promise<RGBA> {
    const image = BMPJS.decode(buffer);

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  async encode(rgba: RGBA, options: ResizeOptions): Promise<Buffer> {
    const bmpImageData = BMPJS.encode(rgba, options.quality);

    return bmpImageData.data;
  },
};
