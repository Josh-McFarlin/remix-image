import jpeg from "jpeg-js";
import { ImageHandler } from "../types";

export const JpegHandler: ImageHandler = {
  async decode(buffer) {
    const image = jpeg.decode(buffer, { useTArray: true });

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  async encode(image, options) {
    const jpegImageData = jpeg.encode(image, options.quality);

    return new Uint8Array(jpegImageData.data);
  },
};
