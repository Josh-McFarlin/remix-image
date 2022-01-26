import { TransformerMaker } from "../types/transformer";
import { fromBuffer } from "./fileType";

export const transformImage = async (
  transformer: TransformerMaker,
  buffer: Buffer,
  {
    width,
    quality,
    allowWebP,
  }: {
    width: number;
    quality: number;
    allowWebP: boolean;
  }
): Promise<{
  resultImg: Buffer;
  contentType: string;
}> => {
  const image = transformer(buffer);

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
  const contentType = fromBuffer(resultImg) || "image/svg+xml";

  return {
    resultImg: resultImg,
    contentType: contentType,
  };
};
