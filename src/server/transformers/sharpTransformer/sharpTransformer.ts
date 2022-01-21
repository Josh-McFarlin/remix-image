import FileType from "file-type";
import sharp from "sharp";
import type { ImageTransformer } from "../../../types/transformer";

export const sharpTransformer: ImageTransformer = async (
  buffer,
  { width, quality, allowWebP = false }
) => {
  const image = sharp(buffer);

  image
    .resize({
      width,
    })
    .jpeg({
      quality,
      progressive: true,
      force: false,
    })
    .png({
      progressive: true,
      compressionLevel: 9,
      force: false,
    });

  if (allowWebP) {
    image.webp({
      quality,
    });
  }

  const resultImg = await image.toBuffer();
  const contentType =
    (await FileType.fromBuffer(resultImg))?.mime || "image/svg+xml";

  return {
    resultImg: resultImg,
    contentType: contentType,
  };
};
