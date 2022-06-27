export type ColorSpace = "display-p3" | "srgb";

export default class ImageData {
  readonly data: Uint8ClampedArray;
  readonly width: number;
  readonly height: number;
  readonly colorSpace: ColorSpace;

  constructor(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    colorSpace: ColorSpace = "srgb"
  ) {
    this.data = data;
    this.width = width;
    this.height = height;
    this.colorSpace = colorSpace;
  }
}
