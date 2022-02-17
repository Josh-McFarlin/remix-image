import { CropOptions } from "../../../../types";
import { ImageData } from "../types";

const ternaryPercent = (num: number, full: number) =>
  num < 1 ? Math.round(num * full) : num;

export const cropImage = (
  src: ImageData,
  cropOptions: CropOptions
): ImageData => {
  const startX = ternaryPercent(cropOptions.x, src.width);
  const startY = ternaryPercent(cropOptions.y, src.height);
  const cropWidth = ternaryPercent(cropOptions.width, src.width);
  const cropHeight = ternaryPercent(cropOptions.height, src.height);

  const dstBuffer = new Uint8Array(cropWidth * cropHeight * 4);

  const deltaX = cropWidth - startX;
  const deltaY = cropHeight - startY;

  for (let y = 0; y < deltaY; y += 1) {
    const srcIdx = ((startY + y) * src.width + startX) << 2;
    const srcEndIdx = srcIdx + (deltaX << 2);
    const pixelRow = src.data.subarray(srcIdx, srcEndIdx);

    const dstIdx = (y * cropWidth) << 2;
    dstBuffer.set(pixelRow, dstIdx);
  }

  src.data = dstBuffer;
  src.width = cropWidth;
  src.height = cropHeight;

  return src;
};
