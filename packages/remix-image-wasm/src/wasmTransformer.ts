import { ImagePosition, MimeType, Transformer } from "remix-image";
import { AvifHandler, WebpHandler, JpegHandler, PngHandler } from "./handlers";
import { blurImage } from "./operations/blur";
import { cropImage } from "./operations/crop";
import { flipImage } from "./operations/flip";
import { resizeImage } from "./operations/js-resize";
import { rotateImage } from "./operations/rotate";
import { ImageHandler } from "./types/transformer";

export const supportedInputs = new Set<MimeType>(
  Object.entries({
    [MimeType.PNG]: typeof PNG_WASM != "undefined",
    [MimeType.JPEG]: typeof JPEG_DEC_WASM != "undefined",
    [MimeType.WEBP]: typeof WEBP_DEC_WASM != "undefined",
    [MimeType.AVIF]: typeof AVIF_DEC_WASM != "undefined",
  }).reduce<MimeType[]>((accum, [mimeType, isSupported]) => {
    if (isSupported) {
      accum.push(mimeType as MimeType);
    }

    return accum;
  }, [])
);

export const supportedOutputs = new Set<MimeType>(
  Object.entries({
    [MimeType.PNG]: typeof PNG_WASM != "undefined",
    [MimeType.JPEG]: typeof JPEG_ENC_WASM != "undefined",
    [MimeType.WEBP]: typeof WEBP_ENC_WASM != "undefined",
    [MimeType.AVIF]: typeof AVIF_ENC_WASM != "undefined",
  }).reduce<MimeType[]>((accum, [mimeType, isSupported]) => {
    if (isSupported) {
      accum.push(mimeType as MimeType);
    }

    return accum;
  }, [])
);

const typeHandlers: Record<string, ImageHandler> = {
  [MimeType.PNG]: PngHandler,
  [MimeType.JPEG]: JpegHandler,
  [MimeType.AVIF]: AvifHandler,
  [MimeType.WEBP]: WebpHandler,
};

export const wasmTransformer: Transformer = {
  name: "wasmTransformer",
  supportedInputs,
  supportedOutputs,
  fallbackOutput: Array.from(supportedOutputs.values())[0],
  transform: async (
    { data, contentType: inputContentType },
    {
      contentType: outputContentType = inputContentType,
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
    let image = await typeHandlers[inputContentType].decode(data);

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

    const result = await typeHandlers[outputContentType].encode(image, {
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
