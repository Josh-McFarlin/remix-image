import type { LoaderFunction } from "@remix-run/cloudflare";
import type { Resolver, MimeType } from "remix-image/serverPure";
import {
  imageLoader,
  MemoryCache,
  fetchResolver,
  RemixImageError,
} from "remix-image/serverPure";

const cache = new MemoryCache({
  maxSize: 5e7,
});

const SELF_URL = "http://localhost:8788";

export const loader: LoaderFunction = ({ request, context }) => {
  const resolver: Resolver = async (asset, url, options, basePath) => {
    if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
      const imageResponse = await context.ASSETS.fetch(url, request.clone());
      const arrBuff = await imageResponse.arrayBuffer();

      if (!arrBuff || arrBuff.byteLength < 2) {
        throw new RemixImageError("Invalid image retrieved from resolver!");
      }

      const buffer = new Uint8Array(arrBuff);
      const contentType = imageResponse.headers.get(
        "content-type"
      )! as MimeType;

      return {
        buffer,
        contentType,
      };
    } else {
      return fetchResolver(asset, url, options, basePath);
    }
  };

  const config = {
    selfUrl: SELF_URL,
    cache,
    resolver,
  };

  return imageLoader(config, request);
};
