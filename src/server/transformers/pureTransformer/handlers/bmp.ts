import * as BMPJS from "bmp-js";
import { ImageHandler } from "../types";

export const BmpHandler: ImageHandler = {
  async decode(buffer) {
    const image = BMPJS.decode(Buffer.from(buffer));

    return {
      width: image.width,
      height: image.height,
      data: new Uint8Array(image.data),
    };
  },
  async encode(image, options) {
    const bmpImageData = BMPJS.encode(
      {
        width: image.width,
        height: image.height,
        data: Buffer.from(image.data),
      },
      options.quality
    );

    return new Uint8Array(bmpImageData.data);
  },
};
