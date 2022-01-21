import type { ComponentPropsWithoutRef } from "react";
import type { ResponsiveSize } from "../../types/image";
import { createUrl } from "../../utils/url";

export type ResponsiveHookResult = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

export const useResponsiveImage = (
  imgProps: ComponentPropsWithoutRef<"img">,
  loaderUrl = "/api/image",
  responsive: ResponsiveSize[]
): ResponsiveHookResult => {
  const baseURL = imgProps.src
    ? createUrl(loaderUrl, {
        src: imgProps.src,
      })
    : "";

  const result = responsive.reduce(
    (accum, { size, maxWidth }) => {
      const srcSetUrl = createUrl(
        baseURL,
        {
          width: size.width || "",
          height: `${size.height || ""} ${size.width}w`,
        },
        true
      );

      accum.srcSet.push(srcSetUrl);

      if (maxWidth) {
        accum.sizes.push(`(max-width: ${maxWidth}px) ${size.width}px`);
      }

      if (size.width > accum.largestWidth) {
        accum.largestWidth = size.width;
        accum.src = srcSetUrl;
      }

      return accum;
    },
    {
      src: imgProps.src || "",
      srcSet: [] as string[],
      sizes: [] as string[],
      largestWidth: 0,
    }
  );

  return {
    src: result.src,
    ...(result.srcSet.length && {
      srcSet: result.srcSet.join(", "),
    }),
    ...(result.sizes.length && {
      sizes: result.sizes.join(", "),
    }),
  };
};
