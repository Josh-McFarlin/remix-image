import { Request as NodeRequest } from "@remix-run/node/fetch";
import type { Resolver } from "../../../types/resolver";
import { fromBuffer } from "../../../utils/fileType";

export const fetchResolver: Resolver = async (_asset, url) => {
  const imgRequest = new Request(url, {
    headers: {
      accept: "image/*",
    },
  }) as unknown as NodeRequest;

  const imageResponse = await fetch(imgRequest as unknown as Request);
  const arrBuff = await imageResponse.arrayBuffer();

  const buffer = Buffer.from(arrBuff);
  // const contentType = imageResponse.headers.get("content-type")!;
  const contentType = fromBuffer(buffer);

  return {
    buffer,
    contentType,
  };
};
