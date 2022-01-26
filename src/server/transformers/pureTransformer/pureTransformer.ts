import type {
  JpegOptions,
  PngOptions,
  WebpOptions,
  ResizeOptions,
} from "sharp";
import type { MimeType } from "../../../types/file";
import type {
  ImageTransformer,
  TransformerMaker,
} from "../../../types/transformer";
import { fromBuffer } from "../../../utils/fileType";
import { ImageHandler, PNGHandler, JPEGHandler } from "./handler";

export class PureTransformer implements ImageTransformer {
  #mimeType: MimeType;
  #src: Buffer;
  #jpegOptions: JpegOptions | undefined;
  #pngOptions: PngOptions | undefined;
  #webpOptions: WebpOptions | undefined;
  #targetWidth: number | undefined;
  #targetHeight: number | undefined;
  #handler: ImageHandler | undefined;

  constructor(buffer: Buffer) {
    this.#mimeType = fromBuffer(buffer);
    this.#src = buffer;
  }

  jpeg(options?: JpegOptions): this {
    this.#jpegOptions = options;

    return this;
  }

  png(options?: PngOptions): this {
    this.#pngOptions = options;

    return this;
  }

  webp(options?: WebpOptions): this {
    this.#webpOptions = options;

    return this;
  }

  resize(options: ResizeOptions): this {
    this.#targetWidth = options.width;
    this.#targetHeight = options.height;

    if (!options.width && !options.height) {
      throw new Error("At least one dimension must be provided!");
    }

    this.#handler =
      this.#mimeType === "image/png"
        ? new PNGHandler(this.#src)
        : new JPEGHandler(this.#src);

    if (!options.width) {
      this.#targetWidth =
        this.#handler.width * (this.#targetHeight! / this.#handler.height);
    }

    if (!options.height) {
      this.#targetHeight =
        this.#handler.height * (this.#targetWidth! / this.#handler.width);
    }

    if (this.#targetWidth! < 0 || this.#targetHeight! < 0) {
      throw new Error("At least one dimension must be provided!");
    }

    this.#targetWidth = Math.round(this.#targetWidth!);
    this.#targetHeight = Math.round(this.#targetHeight!);

    return this;
  }

  async toBuffer(): Promise<Buffer> {
    return this.#handler!.write(this.#targetWidth!, this.#targetHeight!);
  }
}

export const pureTransformer: TransformerMaker = (buffer: Buffer) =>
  new PureTransformer(buffer);
