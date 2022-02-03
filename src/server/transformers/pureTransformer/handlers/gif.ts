import * as GIFJS from "omggif";
import { generatePalette, mapImage, rgbToHex } from "../../../../utils/palette";
import { ImageHandler } from "../types";

export const GifHandler: ImageHandler = {
  async decode(buffer) {
    const image = new GIFJS.GifReader(Buffer.from(buffer));

    // const fi0 = image.frameInfo(0);

    // return {
    //   width: image.width,
    //   height: image.height,
    //   data: new Uint8Array(
    //     buffer.slice(fi0.data_offset, fi0.data_offset + fi0.data_length)
    //   ),
    // };

    const dest = {
      width: image.width,
      height: image.height,
      data: new Uint8Array(image.width * image.height * 4),
    };

    image.decodeAndBlitFrameRGBA(0, dest.data);

    return dest;
  },
  async encode(image, options) {
    const background: { r: number; b: number; g: number; alpha: number } =
      JSON.parse(options.background!);

    const frames = [image.data];

    const buf = new Buffer(image.width * image.height * frames.length + 1024);

    const gifImageData = new GIFJS.GifWriter(
      buf as Buffer,
      image.width,
      image.height,
      {
        ...(background.alpha > 0 && {
          background: rgbToHex(background.r, background.g, background.b),
        }),
      }
    );

    frames.forEach((frame) => {
      const palette = generatePalette(frame, 64);
      const mappedData = mapImage(frame, palette);

      gifImageData.addFrame(0, 0, image.width, image.height, mappedData, {
        palette: palette.map(([r, g, b]) => rgbToHex(r, g, b)),
      });
    });

    return buf.slice(0, gifImageData.end());
  },
};
