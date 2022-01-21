import { Cache } from "../../../types/cache";
import type { AssetLoader } from "../../../types/loader";
import { generateKey } from "../../../utils/cache";
import { fetchImage } from "../../../utils/fetch";
import { imageResponse, textResponse } from "../../../utils/response";
import { decodeQuery } from "../../../utils/url";

export const imageLoader: AssetLoader = async (config, request) => {
  const cache = config.cache instanceof Cache ? config.cache : null;

  const selfUrl = new URL(config.selfUrl);
  const whitelistedDomains = new Set([
    ...(config.whitelistedDomains || []),
    selfUrl.host,
  ]);

  const url = new URL(request.url);
  const width = decodeQuery(url.searchParams, "width") || "";
  const height = decodeQuery(url.searchParams, "height") || "";
  const quality = decodeQuery(url.searchParams, "quality") || "80";
  const src = decodeQuery(url.searchParams, "src") || "";

  const webpSupport =
    request.headers.has("accept") &&
    request.headers.get("accept")!.includes("image/webp");

  let resultImg: Buffer | undefined;
  let contentType = "image/svg+xml";

  const cacheKey = generateKey(src, width, quality, webpSupport);

  if (cache && (await cache.has(cacheKey))) {
    if ((await cache.status(cacheKey)) == "stale") {
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

        await cache.set(cacheKey, resultImg);
      }, 1000);
    }

    const cacheValue = await cache.get(cacheKey);
    console.log(`Retrieved image [${cacheKey}] from cache.`);

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

      console.log(`Fetched image [${cacheKey}] directly.`);
      if (cache) {
        await cache.set(cacheKey, resultImg);
      }
    }
  }

  if (!resultImg) {
    return textResponse(404, "Requested Image not found!");
  }

  return imageResponse(
    resultImg,
    200,
    contentType,
    cache
      ? `private, max-age=${cache.config.ttl}, max-stale=${cache.config.tbd}`
      : `public, max-age=${60 * 60 * 24 * 365}`
  );
};
