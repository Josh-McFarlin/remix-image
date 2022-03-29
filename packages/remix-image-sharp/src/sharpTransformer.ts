import { FlipDirection, MimeType, Transformer } from "remix-image";
import sharp from "sharp";

const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.TIFF,
  MimeType.AVIF,
]);

const supportedOutputs = new Set([
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
    const image = sharp(data, {
      animated: true,
    });

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
      ...(background && {
        background: {
          r: background[0],
          g: background[1],
          b: background[2],
          alpha: background[3],
        },
      }),
    });

    if (flip) {
      if (flip === FlipDirection.HORIZONTAL || flip === FlipDirection.BOTH) {
        image.flop();
      }
      if (flip === FlipDirection.VERTICAL || flip === FlipDirection.BOTH) {
        image.flip();
      }
    }

    if (rotate && rotate != 0) {
      image.rotate(rotate);
    }

    if (blurRadius && blurRadius > 0) {
      image.blur(blurRadius);
    }

    if (background) {
      image.flatten({
        background: {
          r: background[0],
          g: background[1],
          b: background[2],
          alpha: background[3],
        },
      });
      if (background[3] !== 1) {
        image.ensureAlpha(background[3]);
      }
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
