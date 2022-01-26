import { JpegOptions, PngOptions, ResizeOptions, WebpOptions } from "sharp";

export abstract class ImageTransformer {
  abstract jpeg(options?: JpegOptions): this;
  abstract png(options?: PngOptions): this;
  abstract webp(options?: WebpOptions): this;

  abstract resize(options: ResizeOptions): this;
  abstract toBuffer(): Promise<Buffer>;
}

export type TransformerMaker = (buffer: Buffer) => ImageTransformer;
