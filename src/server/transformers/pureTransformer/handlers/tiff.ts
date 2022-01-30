import * as TIFFJS from "utif";
import { RemixImageError } from "../../../../types/error";
import { ImageHandler, RGBA } from "./types";

export const TiffHandler: ImageHandler = {
  async decode(buffer: Buffer): Promise<RGBA> {
    const ifds = TIFFJS.decode(buffer);
    if (!ifds) {
      throw new RemixImageError("Invalid TIFF!");
    }
    TIFFJS.decodeImage(buffer, ifds[0]);

    return {
      width: ifds[0].width,
      height: ifds[0].height,
      data: Buffer.from(TIFFJS.toRGBA8(ifds[0])),
    };
  },
  async encode(rgba: RGBA): Promise<Buffer> {
    const tiffImageData = TIFFJS.encodeImage(
      rgba.data,
      rgba.width,
      rgba.height
    );

    return Buffer.from(tiffImageData);
  },
};
