import { initResize } from "@jsquash/resize";
import { ImagePosition, MimeType, Transformer } from "remix-image";
import { AvifHandler, WebpHandler, JpegHandler, PngHandler } from "./handlers";
import { blurImage } from "./operations/blur";
import { cropImage } from "./operations/crop";
import { flipImage } from "./operations/flip";
import { resizeImage } from "./operations/resize";
import { rotateImage } from "./operations/rotate";
import { ImageHandler } from "./types/transformer";

export const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.AVIF,
]);

export const supportedOutputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.AVIF,
]);

const typeHandlers: Record<string, ImageHandler> = {
  [MimeType.JPEG]: JpegHandler,
  [MimeType.PNG]: PngHandler,
  [MimeType.AVIF]: AvifHandler,
  [MimeType.WEBP]: WebpHandler,
};

export const wasmTransformer: Transformer = {
  name: "wasmTransformer",
  supportedInputs,
  supportedOutputs,
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
      loop,
      delay,
      blurRadius,
      rotate,
      flip,
      crop,
      compressionLevel,
    }
  ) => {
    await initResize(RESIZE_WASM);

    const inputHandler = typeHandlers[inputContentType];
    let image = await inputHandler.decode(data);

    if (crop) {
      image = await cropImage(image, crop, background);
    }

    if (width != null || height != null) {
      image = await resizeImage(
        image,
        width,
        height,
        {
          fit,
          position: position as ImagePosition,
        },
        background
      );
    }

    if (flip) {
      image = await flipImage(image, flip);
    }

    if (rotate && rotate !== 0) {
      image = await rotateImage(image, rotate, background);
    }

    if (blurRadius && blurRadius > 0) {
      image = await blurImage(image, blurRadius);
    }

    const outputHandler = typeHandlers[outputContentType || inputContentType];
    const result = await outputHandler.encode(image, {
      width: image.width,
      height: image.height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    });

    return new Uint8Array(result);
  },
};
