import type { LoaderFunction } from "remix";
import type { LoaderConfig, Resolver, MimeType } from "remix-image";
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
} from "remix-image/serverPure";
import { wasmTransformer } from "../../../wasmTransformer";

declare global {
  // @ts-ignore fix missing
  const SELF_URL: string;
}

const whitelistedDomains = new Set([SELF_URL, "i.imgur.com"]);

export const myResolver: Resolver = async (
  asset: string,
  url: string
): Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
}> => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return kvResolver(asset, url);
  } else {
    if (!whitelistedDomains.has(new URL(url).host)) {
      throw new Error("Domain not allowed!");
    }

    return fetchResolver(asset, url);
  }
};

const config: LoaderConfig = {
  selfUrl: SELF_URL,
  cache: new MemoryCache({
    maxSize: 5e7,
  }),
  resolver: myResolver,
  transformer: wasmTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
