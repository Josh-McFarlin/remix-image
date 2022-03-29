import type { LoaderFunction } from "remix";
import {
  imageLoader,
  MemoryCache,
  fetchResolver,
  Resolver,
  MimeType,
  RemixImageError,
} from "remix-image/serverPure";

const cache = new MemoryCache({
  maxSize: 5e7,
});

export const loader: LoaderFunction = ({ request, context }) => {
  const SELF_URL = context?.env?.SELF_URL || context?.SELF_URL;

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
