import fs from "fs";
import path from "path";
import { Request as NodeRequest } from "@remix-run/node/fetch";
import FileType from "file-type";
import sharp from "sharp";

export const fetchImage = async (
  src: string,
  width: string,
  quality: string,
  allowWebP = false
): Promise<{ resultImg: Buffer; contentType: string }> => {
  let contentType: string | undefined;
  let resultImg: Buffer | undefined;
  let buffer: Buffer | undefined;

  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {
    const filePath = path.resolve("public", src.slice(1));

    buffer = fs.readFileSync(filePath);
    contentType = (await FileType.fromFile(filePath))?.mime || "image/svg+xml";
  } else {
    const imgRequest = new Request(src.toString()) as unknown as NodeRequest;

    const imageResponse = await fetch(imgRequest as unknown as Request);

    const arrBuff = await imageResponse.arrayBuffer();
    buffer = Buffer.from(arrBuff);
    contentType = imageResponse.headers.get("content-type")!;
  }

  if (contentType === "image/svg+xml") {
    contentType = "image/svg+xml";
    resultImg = buffer;
  } else {
    const image = sharp(buffer);

    image
      .resize({
        width: parseInt(width),
      })
      .jpeg({
        quality: parseInt(quality),
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
        quality: parseInt(quality),
      });
    }

    resultImg = await image.toBuffer();
    contentType =
      (await FileType.fromBuffer(resultImg))?.mime || "image/svg+xml";
  }

  return {
    resultImg: resultImg,
    contentType: contentType,
  };
};
