import { FlipDirection } from "remix-image";
import ImageData from "../types/ImageData";

export const flipImage = async (
  src: ImageData,
  direction: FlipDirection
): Promise<ImageData> => {
  if (direction === "horizontal" || direction === "both") {
    for (let row = 0; row < src.height; row += 1) {
      const rowIdx = row * src.width;

      for (let col = 0; col < src.width / 2; col += 1) {
        const startIdx = (rowIdx + col) << 2;
        const startPx = src.data.slice(startIdx, startIdx + 4);

        const endIdx = (rowIdx + (src.width - 1 - col)) << 2;
        const endPx = src.data.slice(endIdx, endIdx + 4);

        src.data.set(startPx, endIdx);
        src.data.set(endPx, startIdx);
      }
    }
  }

  if (direction === "vertical" || direction === "both") {
    for (let col = 0; col < src.width; col += 1) {
      for (let row = 0; row < src.height / 2; row += 1) {
        const startIdx = (row * src.width + col) << 2;
        const startPx = src.data.slice(startIdx, startIdx + 4);

        const endIdx = ((src.height - 1 - row) * src.width + col) << 2;
        const endPx = src.data.slice(endIdx, endIdx + 4);

        src.data.set(startPx, endIdx);
        src.data.set(endPx, startIdx);
      }
    }
  }

  return src;
};
