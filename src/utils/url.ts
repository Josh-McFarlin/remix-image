import qs from "qs";
import { RemixImageError } from "../types/error";
import { MimeType } from "../types/file";
import type { ResizeOptions } from "../types/image";
import { ImageFit } from "../types/image";

const createParamString = (
  params: Record<string, string | number | undefined> | null = null
): string => {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (key && value) {
        searchParams.set(key, encodeURIComponent(value));
      }
    });
  }

  return searchParams.toString();
};

export const createUrl = (
  url: string,
  params: Record<string, string | number | undefined> | null = null,
  merge = false
): string => {
  if (merge) {
    return url + "&" + createParamString(params);
  }

  return url + (params ? "?" : "") + createParamString(params);
};

export const decodeQuery = (
  queryParams: URLSearchParams,
  key: string
): string | null =>
  queryParams.has(key) ? decodeURIComponent(queryParams.get(key)!) : null;

export const encodeResizeQuery = (query: ResizeOptions): string =>
  qs.stringify(query, {
    skipNulls: true,
  });

export const decodeResizeQuery = (
  queryString: string
): Required<ResizeOptions> => {
  const parsed = qs.parse(queryString, {
    depth: 2,
  });

  return {
    contentType: parsed.contentType as MimeType,
    width: parsed.width ? parseInt(parsed.width.toString(), 10) : null,
    height: parsed.height ? parseInt(parsed.height.toString(), 10) : null,
    fit: (parsed.fit as ImageFit) || ImageFit.COVER,
    position: parsed.position?.toString() || "center",
    background: parsed.background?.toString() || "{r:0,g:0,b:0,alpha:1}",
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
    throw new RemixImageError(`Invalid URL: ${rawUrl}`);
  }

  return urlObject;
};
