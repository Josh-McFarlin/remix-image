import { redirect } from "@remix-run/server-runtime";
import {
  ImageFit,
  ImagePosition,
  MimeType,
  TransformOptions,
  UnsupportedImageError,
} from "../../../types";
import { RemixImageError } from "../../../types/error";
import type { AssetLoader } from "../../../types/loader";
import { generateKey } from "../../../utils/cache";
import { mimeFromBuffer } from "../../../utils/fileType";
import { imageResponse, textResponse } from "../../../utils/response";
import {
  decodeQuery,
  decodeTransformQuery,
  parseURL,
} from "../../../utils/url";
import { fetchResolver } from "../../resolvers/fetchResolver";
import { pureTransformer } from "../../transformers";

export const imageLoader: AssetLoader = async (
  {
    selfUrl,
    cache = null,
    resolver = fetchResolver,
    transformer = pureTransformer,
    useFallbackTransformer = true,
    useFallbackFormat = true,
    fallbackFormat = MimeType.JPEG,
    defaultOptions = {},
    redirectOnFail = false,
  },
  request
) => {
  const reqUrl = parseURL(request.url);
  let src: string | null = null;

  try {
    if (!selfUrl) {
      throw new RemixImageError(
        "selfUrl is required in RemixImage loader config!",
        500
      );
    }

    src = decodeQuery(reqUrl.searchParams, "src");
    if (!src) {
      throw new RemixImageError("An image URL must be provided!", 400);
    }

    const decodedQuery = decodeTransformQuery(reqUrl.search);
    const transformOptions: TransformOptions = {
      fit: ImageFit.CONTAIN,
      position: ImagePosition.CENTER,
      background: [0x00, 0x00, 0x00, 0x00],
      quality: 80,
      compressionLevel: 9,
      loop: 0,
      delay: 100,
      ...defaultOptions,
      ...decodedQuery,
    } as TransformOptions;

    const assetUrl = parseURL(src, selfUrl);

    if (!transformOptions.width) {
      throw new RemixImageError("A width is required!", 400);
    }
    if (transformOptions.width && transformOptions.width > 8000) {
      throw new RemixImageError("Requested Image too large!", 406);
    }
    if (transformOptions.height && transformOptions.height > 8000) {
      throw new RemixImageError("Requested Image too large!", 406);
    }

    let resultImg: Uint8Array | undefined;

    const cacheKey = generateKey(
      src,
      transformOptions.width,
      transformOptions.height,
      transformOptions.quality,
      transformOptions.contentType
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
          throw new RemixImageError("Requested image not found!", 404);
        }
        if (transformOptions.contentType == null) {
          transformOptions.contentType = res.contentType;
        }

        console.log(
          `Fetched image [${cacheKey}] directly using resolver: ${resolver.name}.`
        );
      } catch (error) {
        throw new RemixImageError("Failed to retrieve requested image!", 500);
      }

      try {
        if (!transformer.supportedInputs.has(res.contentType)) {
          throw new UnsupportedImageError(
            `Transformer does not allow this input content type: ${res.contentType}!`
          );
        } else if (
          !transformer.supportedOutputs.has(transformOptions.contentType)
        ) {
          if (useFallbackFormat) {
            console.log(
              `Transformer does not allow this output content type: ${transformOptions.contentType}! Falling back to ${fallbackFormat}`
            );
            transformOptions.contentType = fallbackFormat;
          } else {
            throw new UnsupportedImageError(
              `Transformer does not allow this output content type: ${transformOptions.contentType}!`
            );
          }
        }

        resultImg = await transformer.transform(
          {
            data: res.buffer,
            contentType: res.contentType,
          },
          transformOptions
        );

        console.log(
          `Successfully transformed image using transformer: ${transformer.name}`
        );
      } catch (error: any) {
        console.error(
          "Failed to use provided transformer:",
          error?.message || error
        );

        if (
          useFallbackTransformer &&
          transformer !== pureTransformer &&
          pureTransformer.supportedInputs.has(res.contentType)
        ) {
          if (
            !pureTransformer.supportedOutputs.has(transformOptions.contentType)
          ) {
            if (useFallbackFormat) {
              console.log(
                `Transformer does not allow this output content type: ${transformOptions.contentType}! Falling back to ${fallbackFormat}`
              );
              transformOptions.contentType = fallbackFormat;
            } else {
              throw new UnsupportedImageError(
                `Fallback transformer does not allow this output content type: ${transformOptions.contentType}!`
              );
            }
          }

          resultImg = await pureTransformer.transform(
            {
              data: res.buffer,
              contentType: res.contentType,
            },
            transformOptions
          );

          console.log(
            `Successfully transformed image using fallback transformer: ${pureTransformer.name}`
          );
        } else {
          throw error;
        }
      }
    }

    if (!resultImg) {
      throw new RemixImageError("Failed to transform requested image!", 500);
    }

    if (cache) {
      await cache.set(cacheKey, resultImg);
    }

    const resultContentType = mimeFromBuffer(resultImg);

    return imageResponse(
      resultImg,
      200,
      resultContentType,
      cache
        ? `private, max-age=${cache.config.ttl}, max-stale=${cache.config.tbd}`
        : `public, max-age=${60 * 60 * 24 * 365}`
    );
  } catch (error: any) {
    console.error("RemixImage loader error:", error?.message);
    console.error(error);

    if (redirectOnFail && src) {
      return redirect(src);
    }

    if (error instanceof RemixImageError) {
      return textResponse(error.errorCode || 500, error.message);
    } else {
      return textResponse(500, "RemixImage encountered an unknown error!");
    }
  }
};
