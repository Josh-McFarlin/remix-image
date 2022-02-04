import * as GIFJS from "omggif";
import { TransformOptions } from "remix-image";
import { bilinearInterpolation } from "./interpolation";
import { generatePalette, mapImage, rgbToHex } from "./palette";

export const GifHandler = async (
  buffer: Uint8Array,
  width: number,
  height: number | null,
  options: TransformOptions
) => {
  // Input
  const image = new GIFJS.GifReader(Buffer.from(buffer));
  const numFrames = image.numFrames();

  const targetWidth = Math.round(
    width || image.width * ((height || 0) / image.height)
  );
  const targetHeight = Math.round(
    height || image.height * ((width || 0) / image.width)
  );

  // Output
  const outputBuffer = new Buffer(
    targetWidth * targetHeight * numFrames + 1024
  );
  const gifImageData = new GIFJS.GifWriter(
    outputBuffer as Buffer,
    targetWidth,
    targetHeight,
    {
      loop: options.loop,
    }
  );

  const srcLen = image.width * image.height * 4 + 1024;
  const srcFrame = {
    data: new Uint8Array(srcLen),
    width: image.width,
    height: image.height,
  };

  // Process
  for (let i = 0; i < numFrames; i += 1) {
    for (let i = 0; i < srcLen; i += 4) {
      srcFrame.data[i] = options.background[0];
      srcFrame.data[i + 1] = options.background[1];
      srcFrame.data[i + 2] = options.background[2];
      srcFrame.data[i + 3] = options.background[3];
    }

    image.decodeAndBlitFrameRGBA(i, srcFrame.data);

    const destFrame = {
      data: new Uint8Array(targetWidth * targetHeight * 4 + 1024),
      width: targetWidth,
      height: targetHeight,
    };

    bilinearInterpolation(srcFrame, destFrame);

    const palette = generatePalette(destFrame.data, 4);
    const mappedData = mapImage(destFrame.data, palette);

    gifImageData.addFrame(0, 0, targetWidth, targetHeight, mappedData, {
      palette: palette.map(([r, g, b]) => rgbToHex(r, g, b)),
      delay: options.delay ? options.delay[i] : image.frameInfo(i).delay || 0.1,
      transparent: palette.length - 1,
      disposal: 2,
    });
  }

  // Done
  return outputBuffer.slice(0, gifImageData.end());
};
