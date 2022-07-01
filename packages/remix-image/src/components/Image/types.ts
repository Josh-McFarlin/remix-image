import * as React from "react";
import { ClientLoader, ResponsiveSize, SizelessOptions } from "../../types";

export type OnLoadingComplete = (result: {
  naturalWidth: number;
  naturalHeight: number;
}) => void;

export interface BaseImageProps extends React.ComponentPropsWithRef<"img"> {
  loaderUrl?: string;
  loader?: ClientLoader;
  responsive?: ResponsiveSize[];
  options?: SizelessOptions;
  dprVariants?: number | number[];
}

export type ImageProps = Omit<BaseImageProps, "placeholder"> &
  (
    | {
        unoptimized: true;
        placeholder?: never;
        blurDataURL?: never;
        placeholderAspectRatio?: never;
        onLoadingComplete?: never;
      }
    | {
        unoptimized?: false | never;
        placeholder?: "blur" | "empty";
        blurDataURL?: string | null;
        placeholderAspectRatio?: number | null;
        onLoadingComplete?: OnLoadingComplete | null;
      }
  );
