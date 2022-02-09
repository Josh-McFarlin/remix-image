import BMPJS from "@wokwi/bmp-ts";
import { ImageHandler } from "../types";

const rgbaToABGR = (pixels: Uint8Array): Uint8Array => {
  const len = pixels.length;
  const newImage = new Uint8Array(len);

  for (let i = 0; i < len; i += 4) {
    newImage[i] = pixels[i + 3];
    newImage[i + 1] = pixels[i + 2];
    newImage[i + 2] = pixels[i + 1];
    newImage[i + 3] = pixels[i];
  }

  return newImage;
};

export const BmpHandler: ImageHandler = {
  async decode(buffer) {
    const image = BMPJS.decode(buffer as Buffer, { toRGBA: true });

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  async encode(image) {
    const bmpImageData = BMPJS.encode({
      bitPP: 24,
      width: image.width,
      height: image.height,
      data: rgbaToABGR(image.data),
    });

    return bmpImageData.data;
  },
};
