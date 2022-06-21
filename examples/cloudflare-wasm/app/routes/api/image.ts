import type { LoaderFunction } from "remix";
import { wasmTransformer } from "remix-image-wasm";
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
  LoaderConfig,
  Resolver,
} from "remix-image/serverPure";

declare global {
  // @ts-ignore fix missing
  const SELF_URL: string;
}

const whitelistedDomains = new Set([SELF_URL, "i.imgur.com"]);

export const myResolver: Resolver = async (asset, url, options, basePath) => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return kvResolver(asset, url, options, basePath);
  } else {
    if (!whitelistedDomains.has(new URL(url).host)) {
      throw new Error("Domain not allowed!");
    }

    return fetchResolver(asset, url, options, basePath);
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
