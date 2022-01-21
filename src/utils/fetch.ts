import fs from "fs";
import path from "path";
import { Request as NodeRequest } from "@remix-run/node/fetch";
import FileType from "file-type";

export const fetchImage = async (
  src: string
): Promise<{
  buffer: Buffer;
  contentType: string;
}> => {
  let contentType: string | undefined;
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

  return {
    buffer,
    contentType,
  };
};
