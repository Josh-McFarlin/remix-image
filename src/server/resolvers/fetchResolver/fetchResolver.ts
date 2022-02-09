import { Request as NodeRequest } from "@remix-run/node/fetch";
import { MimeType } from "../../../types/file";
import type { Resolver } from "../../../types/resolver";

export const fetchResolver: Resolver = async (_asset, url) => {
  const imgRequest = new Request(url, {
    headers: {
      accept: "image/*",
    },
  }) as unknown as NodeRequest;

  const imageResponse = await fetch(imgRequest as unknown as Request);
  const arrBuff = await imageResponse.arrayBuffer();

  const buffer = new Uint8Array(arrBuff);
  const contentType = imageResponse.headers.get("content-type")! as MimeType;

  return {
    buffer,
    contentType,
  };
};
