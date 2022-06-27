import ImageData from "../types/ImageData";

const updateDataTextureFromChannelArrs = (
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  arrR: number[],
  arrG: number[],
  arrB: number[],
  arrA: number[]
) => {
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = arrR[i];
    rgba[i * 4 + 1] = arrG[i];
    rgba[i * 4 + 2] = arrB[i];
    rgba[i * 4 + 3] = arrA[i];
  }

  return rgba;
};

const splitDataTextureIntoChannelArrays = (
  rgba: Uint8ClampedArray,
  w: number,
  h: number
): [number[], number[], number[], number[]] => {
  const arrR = [];
  const arrG = [];
  const arrB = [];
  const arrA = [];

  for (let i = 0; i < w * h; i++) {
    arrR.push(rgba[i * 4]);
    arrG.push(rgba[i * 4 + 1]);
    arrB.push(rgba[i * 4 + 2]);
    arrA.push(rgba[i * 4 + 3]);
  }

  return [arrR, arrG, arrB, arrA];
};

const gaussBlur_4 = (
  scl: number[],
  tcl: number[],
  w: number,
  h: number,
  _r: number,
  bxs: number[]
) => {
  boxBlur_4(scl, tcl, w, h, (bxs[0] - 1) / 2);
  boxBlur_4(tcl, scl, w, h, (bxs[1] - 1) / 2);
  boxBlur_4(scl, tcl, w, h, (bxs[2] - 1) / 2);
};

const boxBlur_4 = (
  scl: number[],
  tcl: number[],
  w: number,
  h: number,
  r: number
) => {
  for (let i = 0; i < scl.length; i++) {
    tcl[i] = scl[i];
  }

  boxBlurH_4(tcl, scl, w, h, r);
  boxBlurT_4(scl, tcl, w, h, r);
};

const boxBlurH_4 = (
  scl: number[],
  tcl: number[],
  w: number,
  h: number,
  r: number
) => {
  const iarr = 1 / (r + r + 1);

  for (let i = 0; i < h; i++) {
    let ti = i * w;
    let li = ti;
    let ri = ti + r;

    const fv = scl[ti];
    const lv = scl[ti + w - 1];
    let val = (r + 1) * fv;

    for (let j = 0; j < r; j++) {
      val += scl[ti + j];
    }

    for (let j = 0; j <= r; j++) {
      val += scl[ri++] - fv;
      tcl[ti++] = val * iarr;
    }

    for (let j = r + 1; j < w - r; j++) {
      val += scl[ri++] - scl[li++];
      tcl[ti++] = val * iarr;
    }

    for (let j = w - r; j < w; j++) {
      val += lv - scl[li++];
      tcl[ti++] = val * iarr;
    }
  }
};

const boxBlurT_4 = (
  scl: number[],
  tcl: number[],
  w: number,
  h: number,
  r: number
) => {
  const iarr = 1 / (r + r + 1);

  for (let i = 0; i < w; i++) {
    let ti = i;
    let li = ti;
    let ri = ti + r * w;
    const fv = scl[ti];
    const lv = scl[ti + w * (h - 1)];
    let val = (r + 1) * fv;

    for (let j = 0; j < r; j++) {
      val += scl[ti + j * w];
    }

    for (let j = 0; j <= r; j++) {
      val += scl[ri] - fv;
      tcl[ti] = val * iarr;
      ri += w;
      ti += w;
    }

    for (let j = r + 1; j < h - r; j++) {
      val += scl[ri] - scl[li];
      tcl[ti] = val * iarr;
      li += w;
      ri += w;
      ti += w;
    }

    for (let j = h - r; j < h; j++) {
      val += lv - scl[li];
      tcl[ti] = val * iarr;
      li += w;
      ti += w;
    }
  }
};

const boxesForGauss = (sigma: number, n: number) => {
  const wIdeal = Math.sqrt((12 * sigma * sigma) / n + 1);
  let wl = Math.floor(wIdeal);
  if (wl % 2 == 0) wl--;
  const wu = wl + 2;

  const mIdeal =
    (12 * sigma * sigma - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4);
  const m = Math.round(mIdeal);

  const sizes = [];
  for (let i = 0; i < n; i++) {
    sizes.push(i < m ? wl : wu);
  }

  return sizes;
};

export const blurImage = async (
  src: ImageData,
  blurRadius: number
): Promise<ImageData> => {
  const dtChannelsOld = splitDataTextureIntoChannelArrays(
    src.data,
    src.width,
    src.height
  );
  const dtChannelsBlurred = splitDataTextureIntoChannelArrays(
    src.data,
    src.width,
    src.height
  );
  const bxs = boxesForGauss(blurRadius, 3);

  gaussBlur_4(
    dtChannelsOld[0],
    dtChannelsBlurred[0],
    src.width,
    src.height,
    blurRadius,
    bxs
  );
  gaussBlur_4(
    dtChannelsOld[1],
    dtChannelsBlurred[1],
    src.width,
    src.height,
    blurRadius,
    bxs
  );
  gaussBlur_4(
    dtChannelsOld[2],
    dtChannelsBlurred[2],
    src.width,
    src.height,
    blurRadius,
    bxs
  );

  updateDataTextureFromChannelArrs(
    src.data,
    src.width,
    src.height,
    dtChannelsBlurred[0],
    dtChannelsBlurred[1],
    dtChannelsBlurred[2],
    dtChannelsBlurred[3]
  );

  return src;
};
