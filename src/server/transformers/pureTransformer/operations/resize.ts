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

import { ImageData } from "../types";

export const resizeImage = (
  src: ImageData,
  width: number,
  height: number
): ImageData => {
  const wSrc = src.width;
  const hSrc = src.height;

  const dstBuffer = new Uint8Array(width * height * 4);

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
    pos: number,
    offset: number,
    x: number,
    xMin: number,
    xMax: number,
    y: number,
    yMin: number,
    yMax: number
  ) => {
    let posMin = (yMin * wSrc + xMin) * 4 + offset;
    let posMax = (yMin * wSrc + xMax) * 4 + offset;
    const vMin = interpolate(x, xMin, src.data[posMin], xMax, src.data[posMax]);

    // special case, y is integer
    if (yMax === yMin) {
      dstBuffer[pos + offset] = vMin;
    } else {
      posMin = (yMax * wSrc + xMin) * 4 + offset;
      posMax = (yMax * wSrc + xMax) * 4 + offset;
      const vMax = interpolate(
        x,
        xMin,
        src.data[posMin],
        xMax,
        src.data[posMax]
      );

      dstBuffer[pos + offset] = interpolate(y, yMin, vMin, yMax, vMax);
    }
  };

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const posDst = (i * width + j) * 4;
      // x & y in src coordinates
      const x = (j * wSrc) / width;
      const xMin = Math.floor(x);
      const xMax = Math.min(Math.ceil(x), wSrc - 1);

      const y = (i * hSrc) / height;
      const yMin = Math.floor(y);
      const yMax = Math.min(Math.ceil(y), hSrc - 1);

      assign(posDst, 0, x, xMin, xMax, y, yMin, yMax);
      assign(posDst, 1, x, xMin, xMax, y, yMin, yMax);
      assign(posDst, 2, x, xMin, xMax, y, yMin, yMax);
      assign(posDst, 3, x, xMin, xMax, y, yMin, yMax);
    }
  }

  src.data = dstBuffer;
  src.width = width;
  src.height = height;

  return src;
};
