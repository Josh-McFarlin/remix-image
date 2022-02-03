import TIFFJS from "utif";
import { RemixImageError } from "../../../../types/error";
import { ImageHandler } from "../types";

export const TiffHandler: ImageHandler = {
  async decode(buffer) {
    const ifds = TIFFJS.decode(buffer);
    if (!ifds) {
      throw new RemixImageError("Invalid TIFF!");
    }
    TIFFJS.decodeImage(buffer, ifds[0]);

    return {
      width: ifds[0].width,
      height: ifds[0].height,
      data: TIFFJS.toRGBA8(ifds[0]),
    };
  },
  async encode(image) {
    const tiffImageData = TIFFJS.encodeImage(
      image.data,
      image.width,
      image.height
    );

    return new Uint8Array(tiffImageData);
  },
};
