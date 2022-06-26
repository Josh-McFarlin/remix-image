import { MimeType, Transformer } from "remix-image";
import sharp from "sharp";

export const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.TIFF,
  MimeType.AVIF,
]);

export const supportedOutputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.TIFF,
  MimeType.AVIF,
]);

export const sharpTransformer: Transformer = {
  name: "sharpTransformer",
  supportedInputs,
  supportedOutputs,
  transform: async (
    { data },
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
      blurRadius,
      rotate,
      flip,
      crop,
    }
  ) => {
    const fixedBackground = {
      r: background[0],
      g: background[1],
      b: background[2],
      alpha: background[3],
    };

    const image = sharp(data, {
      animated: true,
    });

    image.ensureAlpha(0);

    if (crop) {
      image.extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height,
      });
    }

    image.resize(width, height, {
      fit,
      position,
      background: fixedBackground,
    });

    if (flip) {
      if (flip === "horizontal" || flip === "both") {
        image.flop();
      }
      if (flip === "vertical" || flip === "both") {
        image.flip();
      }
    }

    if (rotate && rotate != 0) {
      image.rotate(rotate, {
        background: fixedBackground,
      });
    }

    if (blurRadius && blurRadius > 0) {
      image.blur(blurRadius);
    }

    return image
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
        delay,
        force: outputContentType === MimeType.GIF,
      })
      .webp({
        quality,
        force: outputContentType === MimeType.WEBP,
      })
      .tiff({
        quality,
        force: outputContentType === MimeType.TIFF,
      })
      .avif({
        quality,
        force: outputContentType === MimeType.AVIF,
      })
      .toBuffer();
  },
};
