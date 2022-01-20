import type { LoaderFunction } from "@remix-run/server-runtime";
import ImageCache from "../../utils/cache";
import { fetchImage } from "../../utils/fetch";
import { imageResponse, textResponse } from "../../utils/response";
import { decodeQuery } from "../../utils/url";

interface LoaderOptions {
  selfUrl: string;
  whitelistedDomains?: string[];
  cache?: {
    path?: string;
    ttl?: number;
    tbd?: number;
  } | null;
}

const imageLoader = (options: LoaderOptions): LoaderFunction => {
  const selfUrl = new URL(options.selfUrl);
  const whitelistedDomains = new Set([
    ...(options.whitelistedDomains || []),
    selfUrl.host,
  ]);

  const cache = new ImageCache(options.cache);

  return async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const width = decodeQuery(url.searchParams, "width") || "";
    const height = decodeQuery(url.searchParams, "height") || "";
    const quality = decodeQuery(url.searchParams, "quality") || "80";
    const src = decodeQuery(url.searchParams, "src") || "";

    const webpSupport =
      request.headers.has("accept") &&
      request.headers.get("accept")!.includes("image/webp");

    let resultImg: Buffer | undefined;
    let contentType: string | undefined;

    if (cache.isUsing && (await cache.has(src, width, quality, webpSupport))) {
      if ((await cache.status(src, width, quality, webpSupport)) == "stale") {
        setTimeout(async () => {
          const myUrl = new URL(src, selfUrl);
          const res = await fetchImage(
            myUrl.toString(),
            width,
            quality,
            webpSupport
          );

          resultImg = res.resultImg;
          contentType = res.contentType;

          await cache.set(src, width, quality, webpSupport, resultImg);
        }, 1000);
      }

      const cacheValue = await cache.get(src, width, quality, webpSupport);

      if (cacheValue) {
        contentType = cacheValue.contentType;
        resultImg = cacheValue.resultImg;
      }
    } else {
      const myUrl = new URL(src, selfUrl);

      if (!whitelistedDomains.has(myUrl.host)) {
        return textResponse(403, "Domain not allowed!");
      } else if (parseInt(width) > 4000) {
        return textResponse(406, "Requested Image too large!");
      } else {
        const res = await fetchImage(
          myUrl.toString(),
          width,
          quality,
          webpSupport
        );

        resultImg = res.resultImg;
        contentType = res.contentType;

        if (cache.isUsing) {
          await cache.set(src, width, quality, webpSupport, resultImg);
        }
      }
    }

    if (!resultImg) {
      return textResponse(404, "Requested Image not found!");
    }

    return imageResponse(
      resultImg,
      200,
      contentType || "image/svg+xml",
      cache.isUsing
        ? `private, max-age=${cache.config.ttl}, max-stale=${cache.config.tbd}`
        : "private"
    );
  };
};

export default imageLoader;
