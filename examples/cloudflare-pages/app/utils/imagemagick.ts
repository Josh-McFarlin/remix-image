import gm from "gm";
import { FlipDirection, MimeType, Transformer } from "remix-image";

let im: gm.SubClass;
try {
  im = gm.subClass({ imageMagick: true });
} catch (error) {
  im = gm;
}

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
  MimeType.TIFF,
  MimeType.AVIF,
]);

const outputMap = {
  [MimeType.SVG]: "svg",
  [MimeType.JPEG]: "jpeg",
  [MimeType.PNG]: "png",
  [MimeType.GIF]: "gif",
  [MimeType.WEBP]: "webp",
  [MimeType.BMP]: "bmp",
  [MimeType.TIFF]: "tiff",
  [MimeType.AVIF]: "avif",
};

export const magickTransformer: Transformer = {
  name: "magickTransformer",
  supportedInputs,
  supportedOutputs,
  transform: async (
    { data },
    {
      contentType: outputContentType,
      width,
      height,
      background,
      quality,
      blurRadius,
      rotate,
      flip,
      crop,
    }
  ) => {
    let image = im(data as Buffer);

    const bgHex = background ? "#" + background?.join("") : "#00000000";

    if (crop) {
      image = image.crop(crop.width, crop.height, crop.x, crop.y);
    }

    if (flip === FlipDirection.VERTICAL || flip === FlipDirection.BOTH) {
      image = image.flip();
    }

    if (flip === FlipDirection.HORIZONTAL || flip === FlipDirection.BOTH) {
      image = image.flop();
    }

    if (rotate) {
      image = image.rotate(bgHex, rotate);
    }

    if (background && background[3] > 0) {
      image = image.background(bgHex);
    }

    image = image.resize(width, height);

    if (blurRadius) {
      image = image.blur(blurRadius);
    }

    return new Promise((resolve, reject) =>
      image
        .quality(quality!)
        .toBuffer(outputMap[outputContentType!], function (err, buffer) {
          if (err) {
            reject(err);
          }

          resolve(buffer);
        })
    );
  },
};
