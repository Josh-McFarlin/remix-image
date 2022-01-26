import type { LoaderFunction } from "remix";
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
} from "remix-image/serverPure";

declare global {
  // @ts-ignore fix missing
  const SELF_URL: string;
}

const whitelistedDomains = new Set([SELF_URL, "i.imgur.com"]);

export const myResolver = async (
  asset: string,
  url: string
): Promise<{
  buffer: Buffer;
  contentType: string;
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

const config = {
  selfUrl: SELF_URL,
  cache: new MemoryCache({
    maxSize: 5e7,
  }),
  resolver: myResolver,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
