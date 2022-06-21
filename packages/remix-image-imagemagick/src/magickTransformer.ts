import gm, { ResizeOption, GravityDirection } from "gm";
import {
  FlipDirection,
  ImageFit,
  ImagePosition,
  MimeType,
  Transformer,
} from "remix-image";

let imageMagick: gm.SubClass;
try {
  imageMagick = gm.subClass({ imageMagick: true });
} catch (error) {
  console.error("Could not load ImageMagick, falling back to GraphicsMagick!");
  imageMagick = gm;
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

const resizeTypeMap: Record<ImageFit, ResizeOption> = {
  [ImageFit.CONTAIN]: "^",
  [ImageFit.COVER]: "^",
  [ImageFit.FILL]: "!",
  [ImageFit.INSIDE]: "<",
  [ImageFit.OUTSIDE]: ">",
};

const outputTypeMap: Record<MimeType, string> = {
  [MimeType.SVG]: "svg",
  [MimeType.JPEG]: "jpeg",
  [MimeType.PNG]: "png",
  [MimeType.GIF]: "gif",
  [MimeType.WEBP]: "webp",
  [MimeType.BMP]: "bmp",
  [MimeType.TIFF]: "tiff",
  [MimeType.AVIF]: "avif",
};

const gravityMap: Record<ImagePosition, GravityDirection> = {
  [ImagePosition.CENTER]: "Center",
  [ImagePosition.BOTTOM]: "South",
  [ImagePosition.LEFT]: "West",
  [ImagePosition.LEFTBOTTOM]: "SouthWest",
  [ImagePosition.LEFTTOP]: "NorthWest",
  [ImagePosition.RIGHT]: "East",
  [ImagePosition.RIGHTBOTTOM]: "SouthEast",
  [ImagePosition.RIGHTTOP]: "NorthEast",
  [ImagePosition.TOP]: "North",
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
    }
  ) => {
    const image = imageMagick(data as Buffer);

    const bgHex = background ? "#" + background?.join("") : "#00000000";

    image.gravity(gravityMap[position!]);

    if (crop) {
      image.crop(crop.width, crop.height, crop.x, crop.y);
    }

    image.resize(width, height, resizeTypeMap[fit!]);

    if (flip) {
      if (flip === FlipDirection.HORIZONTAL || flip === FlipDirection.BOTH) {
        image.flop();
      }
      if (flip === FlipDirection.VERTICAL || flip === FlipDirection.BOTH) {
        image.flip();
      }
    }

    if (rotate && rotate != 0) {
      image.rotate(bgHex, rotate);
    }

    if (blurRadius && blurRadius > 0) {
      image.blur(blurRadius);
    }

    if (background && background[3] > 0) {
      image.background(bgHex);
    }

    if (delay) {
      image.delay(delay);
    }
    if (loop) {
      image.loop(loop);
    }

    return new Promise((resolve, reject) =>
      image
        .quality(quality!)
        .toBuffer(outputTypeMap[outputContentType!], (err, buffer) => {
          if (err) {
            reject(err);
          }

          resolve(buffer);
        })
    );
  },
};
