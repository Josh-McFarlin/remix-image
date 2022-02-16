import { MimeType } from "../../../types/file";
import type { Resolver } from "../../../types/resolver";

export const fetchResolver: Resolver = async (_asset, url) => {
  const imgRequest = new Request(url, {
    headers: {
      accept: "image/*",
    },
  });

  const imageResponse = await fetch(imgRequest);
  const arrBuff = await imageResponse.arrayBuffer();

  const buffer = new Uint8Array(arrBuff);
  const contentType = imageResponse.headers.get("content-type")! as MimeType;

  return {
    buffer,
    contentType,
  };
};
