import * as GIFJS from "omggif";
import { generatePalette, mapImage, rgbToHex } from "../../../../utils/palette";
import { ImageHandler } from "../types";

export const GifHandler: ImageHandler = {
  async decode(buffer) {
    const image = new GIFJS.GifReader(buffer as Buffer);

    const dest = {
      width: image.width,
      height: image.height,
      data: new Uint8Array(image.width * image.height * 4),
    };

    image.decodeAndBlitFrameRGBA(0, dest.data);

    return dest;
  },
  async encode(image, options) {
    const frames = [image.data];

    const buf = new Uint8Array(
      image.width * image.height * frames.length + 1024
    );

    const gifImageData = new GIFJS.GifWriter(
      buf as Buffer,
      image.width,
      image.height,
      {
        loop: options.loop,
      }
    );

    frames.forEach((frame) => {
      const palette = generatePalette(frame, 16);
      const mappedData = mapImage(frame, palette);

      gifImageData.addFrame(0, 0, image.width, image.height, mappedData, {
        palette: palette.map(([r, g, b]) => rgbToHex(r, g, b)),
        delay: options.delay,
        transparent: palette.length - 1,
        disposal: 2,
      });
    });

    return buf.slice(0, gifImageData.end());
  },
};
