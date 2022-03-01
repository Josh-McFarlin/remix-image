import { RemixImageError } from "../../types/error";
import { MimeType } from "../../types/file";
import type { Resolver } from "../../types/resolver";

export const fetchResolver: Resolver = async (_asset, url) => {
  const imgRequest = new Request(url, {
    headers: {
      accept: "image/*",
    },
  });

  const imageResponse = await fetch(imgRequest);

  if (!imageResponse.ok) {
    throw new RemixImageError("Failed to fetch image!");
  }

  const arrBuff = await imageResponse.arrayBuffer();

  if (!arrBuff || arrBuff.byteLength < 2) {
    throw new RemixImageError("Invalid image retrieved from resolver!");
  }

  const buffer = new Uint8Array(arrBuff);
  const contentType = imageResponse.headers.get("content-type")! as MimeType;

  return {
    buffer,
    contentType,
  };
};
