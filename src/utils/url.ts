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
