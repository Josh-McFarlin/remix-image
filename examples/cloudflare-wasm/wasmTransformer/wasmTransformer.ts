import resize, { initResize } from "@jsquash/resize";
import { UnsupportedImageError, MimeType, Transformer } from "remix-image";
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
  [MimeType.AVIF]: AvifHandler,
  [MimeType.WEBP]: WebpHandler,
};

const supported = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.AVIF,
]);

export const wasmTransformer: Transformer = async (
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
  await initResize(RESIZE_ENC_WASM);

  if (!supported.has(inputContentType)) {
    throw new UnsupportedImageError(
      `Transformer does not allow this content type: ${inputContentType}!`
    );
  } else if (outputContentType && !supported.has(outputContentType)) {
    throw new UnsupportedImageError(
      `Transformer does not allow this content type: ${outputContentType}!`
    );
  }

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
};
