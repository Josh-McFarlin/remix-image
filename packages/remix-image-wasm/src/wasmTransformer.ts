import resize, { initResize } from "@jsquash/resize";
import { MimeType, Transformer } from "remix-image";
import {
  AvifHandler,
  WebpHandler,
  ImageHandler,
  JpegHandler,
  PngHandler,
} from "./handlers";

const typeHandlers: Record<string, ImageHandler> = {
  [MimeType.JPEG]: JpegHandler,
  [MimeType.PNG]: PngHandler,
  [MimeType.GIF]: JpegHandler,
  [MimeType.BMP]: JpegHandler,
  [MimeType.TIFF]: WebpHandler,
};

const supported = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.BMP,
  MimeType.TIFF,
]);

export const wasmTransformer: Transformer = {
  name: "wasmTransformer",
  supportedInputs: supported,
  supportedOutputs: supported,
  transform: async (
    { data, contentType: inputContentType },
    {
      contentType: outputContentType,
      width,
      height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    }
  ) => {
    try {
      await initResize(RESIZE_ENC_WASM);

      const inputHandler = typeHandlers[inputContentType];
      const rgba = await inputHandler.decode(data);

      let targetWidth = width || rgba.width * ((height || 0) / rgba.height);
      let targetHeight = height || rgba.height * ((width || 0) / rgba.width);

      if (targetWidth <= 0 || targetHeight <= 0) {
        throw new Error("At least one dimension must be provided!");
      }

      targetWidth = Math.round(targetWidth);
      targetHeight = Math.round(targetHeight);

      const resizedImageData = await resize(
        {
          width: rgba.width,
          height: rgba.height,
          data: new Uint8ClampedArray(rgba.data),
        },
        {
          width: targetWidth,
          height: targetHeight,
        }
      );

      const outputHandler = typeHandlers[outputContentType || inputContentType];
      const result = await outputHandler.encode(
        {
          width: resizedImageData.width,
          height: resizedImageData.height,
          data: resizedImageData.data,
        },
        {
          width: targetWidth,
          height: targetHeight,
          fit,
          position,
          background,
          quality,
          compressionLevel,
          loop,
          delay,
        }
      );

      return new Uint8Array(result);
    } catch (e) {
      console.error(12345);
      console.error(e);
      throw e;
    }
  },
};
