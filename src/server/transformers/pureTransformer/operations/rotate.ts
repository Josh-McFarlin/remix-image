const createTranslationFunction =
  (deltaX: number, deltaY: number) => (x: number, y: number) => ({
    x: x + deltaX,
    y: y + deltaY,
  });

export const rotateImage = (
  rgba: Uint8Array,
  w: number,
  h: number,
  deg: number
) => {
  const rad = ((deg % 360) * Math.PI) / 180;
  const cosine = Math.cos(rad);
  const sine = Math.sin(rad);

  const dstBuffer = new Uint8Array(rgba.length);

  const translate2Cartesian = createTranslationFunction(-(w / 2), -(h / 2));
  const translate2Screen = createTranslationFunction(w / 2 + 0.5, h / 2 + 0.5);

  for (let y = 1; y <= h; y++) {
    for (let x = 1; x <= w; x++) {
      const cartesian = translate2Cartesian(x, y);
      const source = translate2Screen(
        cosine * cartesian.x - sine * cartesian.y,
        cosine * cartesian.y + sine * cartesian.x
      );
      const dstIdx = (w * (y - 1) + x - 1) << 2;

      if (source.x >= 0 && source.x < w && source.y >= 0 && source.y < h) {
        const srcIdx = ((w * (source.y | 0) + source.x) | 0) << 2;
        const pixelRGBA = rgba.subarray(srcIdx, srcIdx + 4);
        dstBuffer.set(pixelRGBA, dstIdx);
      } else {
        // reset off-image pixels
        dstBuffer.fill(0, dstIdx, dstIdx + 4);
      }
    }
  }

  return dstBuffer;
};
