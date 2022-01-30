import { UnsupportedImageError } from "../../../types/error";
import { MimeType } from "../../../types/file";
import { TransformerMaker } from "../../../types/transformer";
import {
  BmpHandler,
  GifHandler,
  ImageHandler,
  JpegHandler,
  PngHandler,
  TiffHandler,
} from "./handlers";
import { bilinearInterpolation } from "./interpolation";

const typeHandlers: Record<string, ImageHandler> = {
  [MimeType.JPEG]: JpegHandler,
  [MimeType.PNG]: PngHandler,
  [MimeType.GIF]: GifHandler,
  [MimeType.BMP]: BmpHandler,
  [MimeType.TIFF]: TiffHandler,
};

const supported = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.BMP,
  MimeType.TIFF,
]);

export const pureTransformer: TransformerMaker = async (
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

  let targetWidth = 0;
  let targetHeight = 0;

  if (width) {
    targetWidth = rgba.width * (targetHeight / rgba.height);
  }

  if (height) {
    targetHeight = rgba.height * (targetWidth / rgba.width);
  }

  if (targetWidth <= 0 || targetHeight <= 0) {
    throw new Error("At least one dimension must be provided!");
  }

  targetWidth = Math.round(targetWidth);
  targetHeight = Math.round(targetHeight);

  const rawImageData = {
    data: new Buffer(targetWidth * targetHeight * 4),
    width: targetWidth,
    height: targetHeight,
  };

  bilinearInterpolation(rgba, rawImageData);

  const outputHandler = typeHandlers[outputContentType || inputContentType];
  return outputHandler.encode(rawImageData, {
    fit,
    position,
    background,
    quality,
    compressionLevel,
    loop,
    delay,
  });
};
