import Jimp from "jimp/es";
import type { ImageTransformer } from "../../../types/transformer";

export const jimpTransformer: ImageTransformer = async (
  buffer,
  { width, quality }
) => {
  const image = await Jimp.read(buffer);

  const contentType = image.getMIME() || Jimp.MIME_PNG;
  const resultImg = await image
    .resize(width, Jimp.AUTO)
    .quality(quality)
    .deflateLevel(9)
    .getBufferAsync(contentType);

  return {
    resultImg: resultImg,
    contentType: contentType,
  };
};
