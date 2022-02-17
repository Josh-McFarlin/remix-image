import { TransformOptions } from "../../../../types";
import type { ImageData } from "../types";
import { cropImage } from "./crop";
import { flipImage } from "./flip";
import { blurImage } from "./gaussian";
import { resizeImage } from "./resize";
import { rotateImage } from "./rotate";

export const applyOperations = (
  rgba: ImageData,
  options: Partial<TransformOptions>
): ImageData => {
  const rawImageData: ImageData = {
    data: new Uint8Array(rgba.data),
    width: rgba.width,
    height: rgba.height,
  };

  if (options.crop) {
    cropImage(rawImageData, options.crop);
  }

  if (rgba.width !== options.width || rgba.height !== options.height) {
    resizeImage(
      rawImageData,
      options.width || rawImageData.width,
      options.height || rawImageData.height
    );
  }

  if (options.flip) {
    flipImage(rawImageData, options.flip);
  }

  if (options.rotate && options.rotate != 0) {
    rotateImage(rawImageData, options.rotate);
  }

  if (options.blurRadius && options.blurRadius > 0) {
    blurImage(rawImageData, options.blurRadius);
  }

  return rawImageData;
};
