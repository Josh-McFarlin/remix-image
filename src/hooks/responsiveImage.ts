import type { ResponsiveSize, SizelessOptions } from "../types/image";
import { encodeQuery } from "../utils/url";

export type ImageSource = {
  src?: string;
};

export type ResponsiveHookResult = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

export const useResponsiveImage = (
  image: ImageSource,
  loaderUrl: string,
  responsive: ResponsiveSize[],
  options: SizelessOptions = {}
): ResponsiveHookResult => {
  let largestSrc = image.src || "";
  let largestWidth = 0;
  const srcSet: string[] = [];

  for (const { size } of responsive) {
    const srcSetUrl = encodeQuery(loaderUrl, {
      src: encodeURI(image.src || ""),
      width: size.width,
      height: size.height,
      ...options,
    });

    srcSet.push(srcSetUrl + ` ${size.width}w`);

    if (size.width > largestWidth) {
      largestWidth = size.width;
      largestSrc = srcSetUrl;
    }
  }

  const sizes = [...responsive]
    .sort((resp1, resp2) => resp1.size.width - resp2.size.width)
    .map((resp) =>
      resp.maxWidth
        ? `(max-width: ${resp.maxWidth}px) ${resp.size.width}px`
        : `${resp.size.width}px`
    );

  if (responsive.length === 1 && responsive[0].maxWidth != null) {
    sizes.push(`${responsive[0].size.width}px`);
  }

  return {
    src: largestSrc,
    ...(srcSet.length && {
      srcSet: srcSet.join(", "),
      sizes: sizes.join(", "),
    }),
  };
};
