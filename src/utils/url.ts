import qs from "query-string";
import { RemixImageError } from "../types/error";
import { MimeType } from "../types/file";
import type { Color, TransformOptions } from "../types/image";
import { ImageFit } from "../types/image";

export const decodeQuery = (
  queryParams: URLSearchParams,
  key: string
): string | null =>
  queryParams.has(key) ? decodeURIComponent(queryParams.get(key)!) : null;

export const encodeTransformQuery = (query: TransformOptions): string =>
  qs.stringify(query, {
    skipNull: true,
    arrayFormat: "bracket",
  });

export const decodeTransformQuery = (
  queryString: string
): Required<TransformOptions> => {
  const parsed = qs.parse(queryString, {
    arrayFormat: "bracket",
  });

  return {
    src: parsed.src ? parsed.src!.toString() : "",
    contentType: parsed.contentType ? (parsed.contentType as MimeType) : null,
    width: parsed.width ? parseInt(parsed.width.toString(), 10) : -1,
    height: parsed.height ? parseInt(parsed.height.toString(), 10) : null,
    fit: (parsed.fit as ImageFit) || ImageFit.COVER,
    position: parsed.position?.toString() || "center",
    background: (parsed.background
      ? (parsed.background as string[]).map((i) => parseInt(i, 10))
      : [0x00, 0x00, 0x00, 0x00]) as Color,
    quality: parsed.quality ? parseInt(parsed.quality.toString(), 10) : 80,
    compressionLevel: parsed.compressionLevel
      ? parseInt(parsed.compressionLevel.toString(), 10)
      : 9,
    loop: parsed.loop ? parseInt(parsed.loop.toString(), 10) : 0,
    delay: parsed.delay
      ? (parsed.delay as string[]).map((i) => parseInt(i, 10))
      : null,
    redirectOnFail: parsed.redirectOnFail
      ? parsed.redirectOnFail === "true"
      : false,
  };
};

export const parseURL = (rawUrl: string, baseUrl?: URL | string): URL => {
  let urlObject: URL;

  try {
    urlObject = new URL(rawUrl, baseUrl);
  } catch (error) {
    throw new RemixImageError(`Invalid URL: ${rawUrl}`, 400);
  }

  return urlObject;
};
