import { FlipDirection } from "../../../../types";

export const flipImage = (
  rgba: Uint8Array,
  w: number,
  h: number,
  direction: FlipDirection
) => {
  if (
    direction === FlipDirection.HORIZONTAL ||
    direction === FlipDirection.BOTH
  ) {
    for (let row = 0; row < h; row += 1) {
      const rowIdx = row * w;

      for (let col = 0; col < w / 2; col += 1) {
        const startIdx = (rowIdx + col) << 2;
        const startPx = rgba.slice(startIdx, startIdx + 4);

        const endIdx = (rowIdx + (w - 1 - col)) << 2;
        const endPx = rgba.slice(endIdx, endIdx + 4);

        rgba.set(startPx, endIdx);
        rgba.set(endPx, startIdx);
      }
    }
  }

  if (
    direction === FlipDirection.VERTICAL ||
    direction === FlipDirection.BOTH
  ) {
    for (let col = 0; col < w; col += 1) {
      for (let row = 0; row < h / 2; row += 1) {
        const startIdx = (row * w + col) << 2;
        const startPx = rgba.slice(startIdx, startIdx + 4);

        const endIdx = ((h - 1 - row) * w + col) << 2;
        const endPx = rgba.slice(endIdx, endIdx + 4);

        rgba.set(startPx, endIdx);
        rgba.set(endPx, startIdx);
      }
    }
  }

  return rgba;
};
