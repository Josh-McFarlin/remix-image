import React from "react";
import { useResponsiveImage } from "../../hooks";
import type { ResponsiveSize } from "../../types/image";
import type { SizelessOptions } from "../../types/transformer";

export interface ImageProps extends React.ComponentProps<"img"> {
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
  options?: SizelessOptions;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    { loaderUrl = "/api/image", responsive = [], options = {}, ...imgProps },
    ref
  ) => {
    const responsiveProps = useResponsiveImage(
      imgProps,
      loaderUrl,
      responsive,
      options
    );

    return <img ref={ref} {...imgProps} {...responsiveProps} />;
  }
);

Image.displayName = "Image";
