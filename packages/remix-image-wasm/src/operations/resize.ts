import resize from "@jsquash/resize";
import { Color, ImageFit, ImagePosition } from "remix-image";
import ImageData from "../types/ImageData";
import {
  getFrameDimensions,
  // getImageDimensions
} from "../utils/sizing";

export const resizeImage = async (
  src: ImageData,
  width: number | null,
  height: number | null,
  resizeOptions: {
    fit: ImageFit;
    position: ImagePosition;
  },
  background: Color
): Promise<ImageData> => {
  if (!width && !height) {
    throw new Error("At least one dimension must be provided!");
  }

  const { frameWidth, frameHeight } = getFrameDimensions(
    src.width,
    src.height,
    width,
    height,
    resizeOptions.fit
  );

  // const { imageWidth, imageHeight, xOffset, yOffset } = getImageDimensions(
  //   src.width,
  //   src.height,
  //   frameWidth,
  //   frameHeight,
  //   resizeOptions.fit,
  //   resizeOptions.position
  // );

  const dstBuffer = new Uint8ClampedArray(src.data.length);

  for (let i = 0; i < dstBuffer.length; i += 4) {
    if (dstBuffer[i + 3] === 0x0) {
      dstBuffer.set(background, i);
    } else {
      dstBuffer.set(src.data.slice(i, i + 4), i);
    }
  }

  const resizedImageData = await resize(
    {
      width: src.width,
      height: src.height,
      data: new Uint8ClampedArray(src.data),
      colorSpace: "srgb",
    },
    {
      width: frameWidth,
      height: frameHeight,
      fitMethod: "stretch",
    }
  );

  return {
    data: resizedImageData.data,
    width: resizedImageData.width,
    height: resizedImageData.height,
    colorSpace: "srgb",
  };
};
