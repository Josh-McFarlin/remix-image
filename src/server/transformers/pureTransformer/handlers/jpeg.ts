import jpeg from "jpeg-js";
import { ResizeOptions } from "../../../../types/image";
import { ImageHandler, RGBA } from "./types";

export const JpegHandler: ImageHandler = {
  async decode(buffer: Buffer): Promise<RGBA> {
    const image = jpeg.decode(buffer);

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  async encode(rgba: RGBA, options: ResizeOptions): Promise<Buffer> {
    const jpegImageData = jpeg.encode(rgba, options.quality);

    return jpegImageData.data;
  },
};
