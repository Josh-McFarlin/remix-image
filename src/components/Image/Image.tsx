import React from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { ResponsiveSize } from "../../types/image";
import { useResponsiveImage } from "../../utils";

export interface ImageProps extends ComponentPropsWithoutRef<"img"> {
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
}

const Image: React.FC<ImageProps> = ({
  loaderUrl = "/api/image",
  responsive = [],
  ...imgProps
}) => {
  const responsiveProps = useResponsiveImage(imgProps, loaderUrl, responsive);

  return <img {...imgProps} {...responsiveProps} />;
};

export default Image;
