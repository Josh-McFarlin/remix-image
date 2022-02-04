import { UnsupportedImageError, MimeType, Transformer } from "remix-image";
import { GifHandler } from "./handler";

export const gifTransformer: Transformer = async (
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
  if (inputContentType !== MimeType.GIF || outputContentType !== MimeType.GIF) {
    throw new UnsupportedImageError("Transformer only allows GIF files!");
  }

  if (width <= 0 || (height != null && height <= 0)) {
    throw new Error("At least one dimension must be provided!");
  }

  return GifHandler(data, width, height, {
    fit,
    position,
    background,
    quality,
    compressionLevel,
    loop,
    delay,
  });
};
