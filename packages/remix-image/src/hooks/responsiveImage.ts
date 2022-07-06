import * as React from "react";
import { remixImageLoader } from "../loaders";
import { ClientLoader } from "../types/client";
import type { ResponsiveSize } from "../types/image";
import type { SizelessOptions } from "../types/transformer";

export type ImageSource = {
  src?: string;
};

export type ResponsiveHookResult = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

const sizeComparator = (resp1: ResponsiveSize, resp2: ResponsiveSize): number =>
  (resp1.maxWidth || Infinity) - (resp2.maxWidth || Infinity);

const sizeConverter = (resp: ResponsiveSize): string =>
  resp.maxWidth
    ? `(max-width: ${resp.maxWidth}px) ${resp.size.width}px`
    : `${resp.size.width}px`;

export function useResponsiveImage(
  image: ImageSource,
  responsive: ResponsiveSize[],
  options: SizelessOptions = {},
  dprVariants: number | number[] = [1],
  loaderUrl = "/api/image",
  loader: ClientLoader = remixImageLoader
): ResponsiveHookResult {
  return React.useMemo<ResponsiveHookResult>(() => {
    let largestSrc = image.src || "";
    let largestWidth = 0;
    const srcSet: string[] = [];
    const multipliers = Array.from(
      new Set<number>([
        1,
        ...(typeof dprVariants === "number" ? [dprVariants] : dprVariants),
      ])
    ).sort();

    for (const multiplier of multipliers) {
      for (const { size } of responsive) {
        const srcSetUrl = loader(image.src || "", loaderUrl, {
          width:
            typeof size.width === "number"
              ? size.width * multiplier
              : size.width,
          height:
            typeof size.height === "number"
              ? size.height * multiplier
              : size.height,
          fit: "cover",
          position: "center",
          background: [0x00, 0x00, 0x00, 0x00],
          quality: 80,
          compressionLevel: 9,
          loop: 0,
          delay: 100,
          blurRadius: null,
          rotate: null,
          flip: null,
          crop: null,
          ...options,
        });

        srcSet.push(srcSetUrl + ` ${size.width * multiplier}w`);

        if (multiplier === 1 && size.width > largestWidth) {
          largestWidth = size.width;
          largestSrc = srcSetUrl;
        }
      }
    }

    const sizes = [...responsive].sort(sizeComparator).map(sizeConverter);

    if (responsive.length === 1 && responsive[0].maxWidth != null) {
      sizes.push(`${responsive[0].size.width}px`);
    }

    return {
      ...(srcSet.length > 0 && {
        srcSet: srcSet.join(", "),
        sizes: sizes.join(", "),
      }),
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      src: largestSrc,
    };
  }, [image.src, loaderUrl, loader, responsive, options, dprVariants]);
}
