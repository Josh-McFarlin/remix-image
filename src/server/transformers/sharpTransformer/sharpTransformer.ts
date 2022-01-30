import sharp from "sharp";
import { UnsupportedImageError } from "../../../types/error";
import { MimeType } from "../../../types/file";
import { TransformerMaker } from "../../../types/transformer";

const supported = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.TIFF,
]);

export const sharpTransformer: TransformerMaker = async (
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

  const image = sharp(data);

  image
    .resize(width, height, {
      fit,
      position,
      background,
    })
    .jpeg({
      quality,
      progressive: true,
      force: outputContentType === MimeType.JPEG,
    })
    .png({
      progressive: true,
      compressionLevel,
      force: outputContentType === MimeType.PNG,
    })
    .gif({
      loop,
      delay: delay || undefined,
      force: outputContentType === MimeType.GIF,
    })
    .webp({
      quality,
      force: outputContentType === MimeType.WEBP,
    })
    .tiff({
      quality,
      force: outputContentType === MimeType.TIFF,
    });

  return image.toBuffer();
};
