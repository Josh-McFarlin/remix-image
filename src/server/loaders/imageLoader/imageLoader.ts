import { Cache } from "../../../types/cache";
import { RemixImageError } from "../../../types/error";
import type { AssetLoader } from "../../../types/loader";
import { generateKey } from "../../../utils/cache";
import { imageResponse, textResponse } from "../../../utils/response";
import { transformImage } from "../../../utils/transform";
import { decodeQuery } from "../../../utils/url";
import { fetchResolver } from "../../resolvers/fetchResolver";
import { pureTransformer } from "../../transformers";

export const imageLoader: AssetLoader = async (config, request) => {
  try {
    const cache = config.cache instanceof Cache ? config.cache : null;
    const imageTransformer = config.transformer || pureTransformer;
    const resolver = config.resolver || fetchResolver;

    let selfUrl: URL;
    try {
      selfUrl = new URL(config.selfUrl);
    } catch (error) {
      throw new RemixImageError(`Invalid selfUrl: ${config.selfUrl}`);
    }

    let reqUrl: URL;
    try {
      reqUrl = new URL(request.url);
    } catch (error) {
      throw new RemixImageError(`Invalid request url: ${request.url}`);
    }

    const width = decodeQuery(reqUrl.searchParams, "width") || "";
    const height = decodeQuery(reqUrl.searchParams, "height") || "";
    const quality = decodeQuery(reqUrl.searchParams, "quality") || "80";
    const src = decodeQuery(reqUrl.searchParams, "src") || "";

    const webpSupport =
      request.headers.has("accept") &&
      request.headers.get("accept")!.includes("image/webp");

    let resultImg: Buffer | undefined;
    let contentType = "image/svg+xml";

    if (parseInt(width) > 8000) {
      return textResponse(406, "Requested Image too large!");
    }

    const cacheKey = generateKey(src, width, quality, webpSupport);

    let assetUrl: URL;
    try {
      assetUrl = new URL(src, selfUrl);
    } catch (error) {
      throw new RemixImageError(`Cannot combine urls ${src} and ${selfUrl}`);
    }

    if (cache && (await cache.has(cacheKey))) {
      if ((await cache.status(cacheKey)) == "stale") {
        setTimeout(async () => {
          const res = await resolver(src, assetUrl.toString());

          if (res.contentType === "image/svg+xml") {
            contentType = res.contentType;
            resultImg = res.buffer;
          } else {
            const transformed = await transformImage(
              imageTransformer,
              res.buffer,
              {
                width: parseInt(width, 10),
                quality: parseInt(quality, 10),
                allowWebP: webpSupport,
              }
            );

            contentType = transformed.contentType;
            resultImg = transformed.resultImg;
          }

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
      const res = await resolver(src, assetUrl.toString());

      if (res.contentType === "image/svg+xml") {
        contentType = res.contentType;
        resultImg = res.buffer;
      } else {
        const transformed = await transformImage(imageTransformer, res.buffer, {
          width: parseInt(width, 10),
          quality: parseInt(quality, 10),
          allowWebP: webpSupport,
        });

        contentType = transformed.contentType;
        resultImg = transformed.resultImg;
      }

      console.log(`Fetched image [${cacheKey}] directly.`);
      if (cache) {
        await cache.set(cacheKey, resultImg);
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
  } catch (error: any) {
    console.error("imageLoader error:", error?.message || error);

    //if (error instanceof RemixImageError) {
    return textResponse(500, error?.message || error);
    //}
  }
};
