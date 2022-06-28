import * as React from "react";
import { useResponsiveImage } from "../../hooks";
import type { ResponsiveSize } from "../../types/image";
import type { SizelessOptions } from "../../types/transformer";

export interface ImageProps extends React.ComponentProps<"img"> {
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
  options?: SizelessOptions;
  dprVariants?: number | number[];
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      loaderUrl = "/api/image",
      responsive = [],
      options = {},
      dprVariants = 1,
      ...imgProps
    },
    ref
  ) => {
    const responsiveProps = useResponsiveImage(
      imgProps,
      loaderUrl,
      responsive,
      options,
      dprVariants
    );

    return <img ref={ref} {...imgProps} {...responsiveProps} />;
  }
);

Image.displayName = "Image";
