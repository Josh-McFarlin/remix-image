import jpeg from "jpeg-js";
import * as PNGJS from "pngjs/browser";
import type { JpegOptions, PngOptions } from "sharp";
import { bilinearInterpolation } from "./interpolation";
const { PNG } = PNGJS;

export abstract class ImageHandler {
  abstract get width(): number;
  abstract get height(): number;

  abstract write(width: number, height: number): Buffer;
}

export class PNGHandler implements ImageHandler {
  image: PNGJS.PNG;
  options: PngOptions = {
    compressionLevel: 9,
  };

  constructor(data: Buffer, options: PngOptions = {}) {
    this.options = {
      ...this.options,
      ...options,
    };

    this.image = PNG.sync.read(data);
  }

  get width(): number {
    return this.image.width;
  }

  get height(): number {
    return this.image.height;
  }

  write(width: number, height: number): Buffer {
    const dst = new PNG({ width, height });

    bilinearInterpolation(this.image, dst);

    return PNG.sync.write(dst, {
      deflateLevel: this.options.compressionLevel,
    });
  }
}

export class JPEGHandler implements ImageHandler {
  image: jpeg.BufferRet;
  options: JpegOptions = {
    quality: 0.8,
  };

  constructor(data: Buffer, options: JpegOptions = {}) {
    this.options = {
      ...this.options,
      ...options,
    };

    this.image = jpeg.decode(data);
  }

  get width(): number {
    return this.image.width;
  }

  get height(): number {
    return this.image.height;
  }

  write(width: number, height: number): Buffer {
    const dst = new Buffer(width * height * 4);

    const rawImageData = {
      data: dst,
      width: width,
      height: height,
    };

    bilinearInterpolation(this.image, rawImageData);

    const jpegImageData = jpeg.encode(rawImageData, this.options.quality);

    return jpegImageData.data;
  }
}
