import { initializeImageMagick, ImageMagick } from "@imagemagick/magick-wasm";
import { MagickColor } from "@imagemagick/magick-wasm/magick-color";
import { MagickFormat } from "@imagemagick/magick-wasm/magick-format";
import { MagickGeometry } from "@imagemagick/magick-wasm/magick-geometry";
import { ImageFit, ImagePosition, MimeType, Transformer } from "remix-image";

const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.BMP,
  MimeType.TIFF,
  MimeType.AVIF,
]);

const supportedOutputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.WEBP,
  MimeType.BMP,
  MimeType.AVIF,
]);

const typeMap: Record<MimeType, MagickFormat> = {
  [MimeType.SVG]: MagickFormat.Svg,
  [MimeType.JPEG]: MagickFormat.Jpeg,
  [MimeType.PNG]: MagickFormat.Png,
  [MimeType.GIF]: MagickFormat.Gif,
  [MimeType.WEBP]: MagickFormat.Webp,
  [MimeType.BMP]: MagickFormat.Bmp,
  [MimeType.TIFF]: MagickFormat.Tiff,
  [MimeType.AVIF]: MagickFormat.Avif,
};

export const wasmTransformer: Transformer = {
  name: "wasmTransformer",
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
      blurRadius,
      rotate,
      crop,
    }
  ) => {
    await initializeImageMagick();

    return new Promise((resolve) => {
      ImageMagick.read(data, (image) => {
        if (crop) {
          const cropGeometry = new MagickGeometry(
            crop.x,
            crop.y,
            crop.width,
            crop.height
          );
          image.crop(cropGeometry);
        }

        const newSize = new MagickGeometry(width);
        if (height) {
          newSize.height = height;
        }
        newSize.ignoreAspectRatio = false;
        if (fit === ImageFit.FILL) {
          newSize.ignoreAspectRatio = true;
          newSize.fillArea = true;
        }
        if (fit === ImageFit.CONTAIN) {
          //
        }
        if (fit === ImageFit.COVER) {
          newSize.limitPixels = true;
        }
        if (fit === ImageFit.INSIDE) {
          newSize.less = true;
        }
        if (fit === ImageFit.OUTSIDE) {
          newSize.greater = true;
        }
        if (position === ImagePosition.TOP) {
          //
        }
        if (position === ImagePosition.LEFT) {
          //
        }
        if (position === ImagePosition.RIGHT) {
          //
        }
        //newSize.
        image.resize(newSize);

        if (rotate && rotate != 0) {
          image.rotate(rotate);
        }

        if (blurRadius && blurRadius > 0) {
          image.blur(blurRadius);
        }

        if (background) {
          image.backgroundColor = new MagickColor(...background);
        }

        if (quality) {
          image.quality = quality;
        }

        image.write(
          (data) => {
            resolve(data);
          },
          outputContentType ? typeMap[outputContentType] : undefined
        );
      });
    });
  },
};
