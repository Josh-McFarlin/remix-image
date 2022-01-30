import { redirect } from "@remix-run/server-runtime";
import { Cache } from "../../../types/cache";
import { RemixImageError } from "../../../types/error";
import type { AssetLoader } from "../../../types/loader";
import { generateKey } from "../../../utils/cache";
import { fromBuffer } from "../../../utils/fileType";
import { imageResponse, textResponse } from "../../../utils/response";
import { decodeQuery, decodeResizeQuery, parseURL } from "../../../utils/url";
import { fetchResolver } from "../../resolvers/fetchResolver";
import { pureTransformer } from "../../transformers";

export const imageLoader: AssetLoader = async (config, request) => {
  const reqUrl = parseURL(request.url);
  const cache = config.cache instanceof Cache ? config.cache : null;
  const imageTransformer = config.transformer || pureTransformer;
  const resolver = config.resolver || fetchResolver;
  const defaultOptions = config.defaultOptions || {};
  const fallbackTransformer = config.fallbackTransformer || true;
  let redirectOnFail = defaultOptions.redirectOnFail || false;
  const selfUrl = parseURL(config.selfUrl);
  const src = decodeQuery(reqUrl.searchParams, "src");

  try {
    const resizeOptions = decodeResizeQuery(reqUrl.search);
    redirectOnFail = resizeOptions.redirectOnFail;

    if (!src) {
      throw new RemixImageError("An image URL must be provided!");
    }

    const assetUrl = parseURL(src, selfUrl);

    if (resizeOptions.width && resizeOptions.width > 8000) {
      return textResponse(406, "Requested Image too large!");
    }
    if (resizeOptions.height && resizeOptions.height > 8000) {
      return textResponse(406, "Requested Image too large!");
    }

    let resultImg: Buffer | undefined;

    const cacheKey = generateKey(
      src,
      resizeOptions.width,
      resizeOptions.height,
      resizeOptions.quality,
      resizeOptions.contentType
    );

    if (cache && (await cache.has(cacheKey))) {
      const cacheValue = await cache.get(cacheKey);

      if (cacheValue) {
        console.log(`Retrieved image [${cacheKey}] from cache.`);
        resultImg = cacheValue;
      }
    }

    if (!resultImg) {
      let res;

      try {
        res = await resolver(src, assetUrl.toString());

        if (!res || !res.buffer) {
          return textResponse(404, "Requested image not found!");
        }
      } catch (error) {
        return textResponse(500, "Failed to retrieve requested image!");
      }

      try {
        resultImg = await imageTransformer(
          {
            data: res.buffer,
            width: 0,
            height: 0,
            contentType: res.contentType,
          },
          {
            ...defaultOptions,
            ...resizeOptions,
          }
        );
      } catch (error: any) {
        if (fallbackTransformer) {
          try {
            resultImg = await pureTransformer(
              {
                data: res.buffer,
                width: 0,
                height: 0,
                contentType: res.contentType,
              },
              {
                ...defaultOptions,
                ...resizeOptions,
              }
            );
          } catch (error2: any) {
            return textResponse(500, "Failed to transform image!");
          }
        }
      }

      console.log(`Fetched image [${cacheKey}] directly.`);
    }

    if (!resultImg) {
      return textResponse(404, "Requested Image not found!");
    }

    if (cache) {
      await cache.set(cacheKey, resultImg);
    }

    const resultContentType = fromBuffer(resultImg);

    return imageResponse(
      resultImg,
      200,
      resultContentType,
      cache
        ? `private, max-age=${cache.config.ttl}, max-stale=${cache.config.tbd}`
        : `public, max-age=${60 * 60 * 24 * 365}`
    );
  } catch (error: any) {
    console.error("RemixImage loader error:", error?.message || error);

    if (redirectOnFail && src) {
      return redirect(src);
    }

    if (error instanceof RemixImageError) {
      return textResponse(500, error.message);
    } else {
      return textResponse(500, "RemixImage encountered an unknown error!");
    }
  }
};
