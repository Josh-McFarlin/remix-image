import * as PNGJS from "pngjs/browser";
import { ResizeOptions } from "../../../../types/image";
import { ImageHandler, RGBA } from "./types";
const { PNG } = PNGJS;

export const PngHandler: ImageHandler = {
  async decode(buffer: Buffer): Promise<RGBA> {
    const image = PNG.sync.read(buffer);

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  async encode(rgba: RGBA, options: ResizeOptions): Promise<Buffer> {
    const dst = new PNG({
      width: rgba.width,
      height: rgba.height,
      deflateLevel: options.compressionLevel,
    });

    dst.data = rgba.data;

    return PNG.sync.write(dst, {
      deflateLevel: options.compressionLevel,
    });
  },
};
