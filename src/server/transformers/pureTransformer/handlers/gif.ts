import * as GIFJS from "omggif";
import { ResizeOptions } from "../../../../types/image";
import { ImageHandler, RGBA } from "./types";

const rgbToHex = ({
  r,
  g,
  b,
}: {
  r: number;
  b: number;
  g: number;
  alpha: number;
}): number => (1 << 24) + (r << 16) + (g << 8) + b;

export const GifHandler: ImageHandler = {
  async decode(buffer: Buffer): Promise<RGBA> {
    const image = new GIFJS.GifReader(buffer);

    const fi0 = image.frameInfo(0);

    return {
      width: image.width,
      height: image.height,
      data: buffer.slice(fi0.data_offset, fi0.data_offset + fi0.data_length),
    };
  },
  async encode(rgba: RGBA, options: ResizeOptions): Promise<Buffer> {
    const background: { r: number; b: number; g: number; alpha: number } =
      JSON.parse(options.background!);

    const gifImageData = new GIFJS.GifWriter(
      rgba.data,
      rgba.width,
      rgba.height,
      {
        ...(background.alpha > 0 && {
          background: rgbToHex(background),
        }),
      }
    );

    return gifImageData.getOutputBuffer();
  },
};
