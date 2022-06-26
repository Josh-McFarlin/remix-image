import type { Transformer, ImagePosition } from "remix-image";
import { MimeType } from "remix-image";
import * as GIFJS from "omggif";
import { getFrameDimensions } from "./sizing";
import { resizeImage } from "./resize";
import { generatePalette, mapImage, rgbToHex } from "./palette";

const supported = new Set([MimeType.GIF]);

export const gifTransformer: Transformer = {
  name: "gifTransformer",
  supportedInputs: supported,
  supportedOutputs: supported,
  transform: async (
    { data },
    { width, height, fit, position, background, loop, delay }
  ) => {
    // Input
    const image = new GIFJS.GifReader(data);
    const numFrames = image.numFrames();

    const { frameWidth, frameHeight } = getFrameDimensions(
      image.width,
      image.height,
      width,
      height,
      fit
    );

    // Output
    const outputBuffer = new Uint8Array(
      frameWidth * frameHeight * numFrames + 1024
    );
    const gifImageData = new GIFJS.GifWriter(
      outputBuffer,
      frameWidth,
      frameHeight,
      {
        loop,
      }
    );

    const srcFrame = {
      data: new Uint8Array(image.width * image.height * 4),
      width: image.width,
      height: image.height,
    };

    // Process
    for (let i = 0; i < numFrames; i += 1) {
      if (background) {
        for (let i = 0; i < srcFrame.data.length; i += 4) {
          srcFrame.data.set(background, i);
        }
      }

      image.decodeAndBlitFrameRGBA(i, srcFrame.data);

      if (width || height) {
        resizeImage(
          srcFrame,
          frameWidth,
          frameHeight,
          {
            fit,
            position: position as ImagePosition,
          },
          background
        );
      }

      const palette = generatePalette(srcFrame.data, 4);
      const mappedData = mapImage(srcFrame.data, palette);

      gifImageData.addFrame(0, 0, frameWidth, frameHeight, mappedData, {
        palette: palette.map(([r, g, b]) => rgbToHex(r, g, b)),
        delay: image.frameInfo(i).delay || delay,
        transparent: palette.length - 1,
        disposal: 2,
      });
    }

    // Done
    return outputBuffer.slice(0, gifImageData.end());
  },
};
