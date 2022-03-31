import clsx from "clsx";
import React from "react";
import { useResponsiveImage } from "../../hooks";
import type { ResponsiveSize } from "../../types/image";
import type { SizelessOptions } from "../../types/transformer";
import classes from "./Image.module.scss";

export interface ImageProps extends React.ComponentProps<"img"> {
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
  options?: SizelessOptions;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      loaderUrl = "/api/image",
      responsive = [],
      options = {},
      ...imgProps
    },
    ref
  ) => {
    const responsiveProps = useResponsiveImage(
      imgProps,
      loaderUrl,
      responsive,
      options
    );

    return (
      <img
        ref={ref}
        className={clsx(classes.root, className)}
        {...imgProps}
        {...responsiveProps}
      />
    );
  }
);

Image.displayName = "Image";
