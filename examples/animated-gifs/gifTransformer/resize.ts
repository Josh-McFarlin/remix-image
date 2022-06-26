/**
 * Copyright (c) 2015 Guyon Roche
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import type { ImageFit, ImagePosition, Color } from "remix-image";
import { getImageDimensions } from "./sizing";
import type { ImageData } from "./types";

const interpolate = (
  k: number,
  kMin: number,
  vMin: number,
  kMax: number,
  vMax: number
) => {
  // special case - k is integer
  if (kMin === kMax) {
    return vMin;
  }

  return Math.round((k - kMin) * vMax + (kMax - k) * vMin);
};

const assign = (
  src: ImageData,
  dstBuffer: Uint8Array,
  pos: number,
  x: number,
  xMin: number,
  xMax: number,
  y: number,
  yMin: number,
  yMax: number,
  background: Color
) => {
  const result = [0x0, 0x0, 0x0, 0x0];

  for (let offset = 0; offset < 4; offset += 1) {
    let posMin = (yMin * src.width + xMin) * 4 + offset;
    let posMax = (yMin * src.width + xMax) * 4 + offset;
    const vMin = interpolate(x, xMin, src.data[posMin], xMax, src.data[posMax]);

    // special case, y is integer
    if (yMax === yMin) {
      result[offset] = vMin;
    } else {
      posMin = (yMax * src.width + xMin) * 4 + offset;
      posMax = (yMax * src.width + xMax) * 4 + offset;
      const vMax = interpolate(
        x,
        xMin,
        src.data[posMin],
        xMax,
        src.data[posMax]
      );

      result[offset] = interpolate(y, yMin, vMin, yMax, vMax);
    }
  }

  if (result.every((i) => i === 0)) {
    dstBuffer.set(background, pos);
  } else {
    dstBuffer.set(result, pos);
  }
};

export const resizeImage = (
  src: ImageData,
  width: number,
  height: number,
  resizeOptions: {
    fit: ImageFit;
    position: ImagePosition;
  },
  background: Color
): void => {
  const { imageWidth, imageHeight, xOffset, yOffset } = getImageDimensions(
    src.width,
    src.height,
    width,
    height,
    resizeOptions.fit,
    resizeOptions.position
  );

  const dstBuffer = new Uint8Array(width * height * 4 + 1024);

  for (let i = 0; i < dstBuffer.length; i += 4) {
    dstBuffer.set(background, i);
  }

  for (let row = 0; row < imageHeight && row + yOffset < height; row += 1) {
    for (let col = 0; col < imageWidth && col + xOffset < width; col += 1) {
      if (
        col + xOffset < 0 ||
        col + xOffset >= width ||
        row + yOffset < 0 ||
        row + yOffset >= height
      ) {
        continue;
      }

      const posDst = ((row + yOffset) * width + (col + xOffset)) * 4;
      // x & y in src coordinates
      const x = (col * src.width) / imageWidth;
      const xMin = Math.floor(x);
      const xMax = Math.min(Math.ceil(x), src.width - 1);

      const y = (row * src.height) / imageHeight;
      const yMin = Math.floor(y);
      const yMax = Math.min(Math.ceil(y), src.height - 1);

      assign(src, dstBuffer, posDst, x, xMin, xMax, y, yMin, yMax, background);
    }
  }

  src.data = dstBuffer;
  src.width = width;
  src.height = height;
};
