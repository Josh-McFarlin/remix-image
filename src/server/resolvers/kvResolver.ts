import type { Options as KvAssetHandlerOptions } from "@cloudflare/kv-asset-handler";
import { getAssetFromKV, NotFoundError } from "@cloudflare/kv-asset-handler";
import type { Resolver } from "../../types/resolver";
import { mimeFromBuffer } from "../../utils/fileType";

export interface FetchEvent {
  request: Request;
  waitUntil: (params: unknown) => Promise<void>;
}

const noOp = async () => {};

const handleAsset = (
  event: FetchEvent,
  options?: Partial<KvAssetHandlerOptions>
): Promise<Response> => {
  if (process.env.NODE_ENV === "development") {
    return getAssetFromKV(event, {
      cacheControl: {
        bypassCache: true,
      },
      ...options,
    });
  }

  let cacheControl = {};
  const url = new URL(event.request.url);
  const assetpath = "/build";
  const requestpath = url.pathname.split("/").slice(0, -1).join("/");

  if (requestpath.startsWith(assetpath)) {
    cacheControl = {
      bypassCache: false,
      edgeTTL: 31536000,
      browserTTL: 31536000,
    };
  }

  return getAssetFromKV(event, {
    cacheControl,
    ...options,
  });
};

export const kvResolver: Resolver = async (_asset, url) => {
  const imgRequest = new Request(url);

  const imageResponse = await handleAsset({
    request: imgRequest,
    waitUntil: noOp,
  });

  if (!imageResponse) {
    throw new NotFoundError("Image not found!");
  }

  const arrBuff = await imageResponse.arrayBuffer();

  const buffer = new Uint8Array(arrBuff);
  const contentType = mimeFromBuffer(buffer);

  return {
    buffer,
    contentType,
  };
};
