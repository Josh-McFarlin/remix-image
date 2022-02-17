import qs from "query-string";
import { RemixImageError } from "../types/error";
import type { TransformOptions } from "../types/image";

export const decodeQuery = (
  queryParams: URLSearchParams,
  key: string
): string | null =>
  queryParams.has(key) ? decodeURIComponent(queryParams.get(key)!) : null;

export const encodeQuery = (
  url: string,
  query: Record<string, any>
): string => {
  const fixedQuery = query;

  if (Object.prototype.hasOwnProperty.call(query, "crop")) {
    fixedQuery.crop = JSON.stringify(fixedQuery.crop);
  }

  return qs.stringifyUrl(
    {
      url,
      query: fixedQuery,
    },
    {
      skipNull: true,
      arrayFormat: "bracket",
      sort: false,
    }
  );
};

export const decodeTransformQuery = (
  queryString: string
): Partial<TransformOptions> => {
  const parsed = qs.parse(queryString, {
    arrayFormat: "bracket",
    parseNumbers: true,
    parseBooleans: true,
    sort: false,
  });

  if (
    Object.prototype.hasOwnProperty.call(parsed, "crop") &&
    parsed.crop != null
  ) {
    parsed.crop = JSON.parse(parsed.crop as string);
  }

  return parsed;
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
