import { TransformOptions } from "../../../../types";
import type { ImageData } from "../types";
import { flipImage } from "./flip";
import { blurImage } from "./gaussian";
import { resizeImage } from "./resize";
import { rotateImage } from "./rotate";

export const applyOperations = (
  rgba: ImageData,
  options: Partial<TransformOptions>
): ImageData => {
  const rawImageData: ImageData = {
    data: new Uint8Array(
      (options.width || rgba.width) * (options.height || rgba.height) * 4
    ),
    width: options.width!,
    height: options.height!,
  };

  if (rgba.width !== options.width || rgba.height !== options.height) {
    rawImageData.data = resizeImage(rgba, rawImageData);
  }

  if (options.flip) {
    rawImageData.data = flipImage(
      rawImageData.data,
      rawImageData.width,
      rawImageData.height,
      options.flip
    );
  }

  if (options.rotate && options.rotate != 0) {
    rawImageData.data = rotateImage(
      rawImageData.data,
      rawImageData.width,
      rawImageData.height,
      options.rotate
    );
  }

  if (options.blurRadius && options.blurRadius > 0) {
    rawImageData.data = blurImage(
      rawImageData.data,
      rawImageData.width,
      rawImageData.height,
      options.blurRadius
    );
  }

  return rawImageData;
};
