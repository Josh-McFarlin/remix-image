import clsx from "clsx";
import * as React from "react";
import { useResponsiveImage } from "../../hooks";
import { remixImageLoader } from "../../loaders";
import {
  ImgElementWithDataProp,
  computePlaceholderSize,
  handleLoading,
} from "./helpers";
import { ImageProps } from "./types";

export const Image = React.memo<ImageProps>(
  React.forwardRef<HTMLImageElement, ImageProps>(
    (
      {
        src,
        loaderUrl = "/api/image",
        loader = remixImageLoader,
        responsive = [],
        options = {},
        dprVariants = 1,
        decoding = "async",
        loading = "lazy",
        unoptimized = false,
        placeholder = "empty",
        blurDataURL = !unoptimized && placeholder === "blur"
          ? loader(src || "", loaderUrl, {
              width: 15,
              height: 15,
              fit: options?.fit || "cover",
              position: options?.position || "center",
              contentType: options.contentType,
            })
          : null,
        placeholderAspectRatio = null,
        onLoadingComplete,
        className,
        style = {},
        onLoad,
        ...imgProps
      }: ImageProps,
      ref
    ) => {
      const responsiveProps = useResponsiveImage(
        { src },
        responsive,
        options,
        dprVariants,
        loaderUrl,
        loader
      );

      const imageStyle = React.useMemo<React.CSSProperties>(() => {
        if (unoptimized) return style;

        const placeholderSize = computePlaceholderSize(
          responsive,
          placeholderAspectRatio
        );

        return {
          minWidth: placeholderSize.width,
          minHeight: placeholderSize.height,
          backgroundSize: options?.fit || "cover",
          backgroundPosition: options?.position || "center",
          ...(blurDataURL && {
            backgroundImage: `url("${blurDataURL}")`,
          }),
          ...style,
        };
      }, [
        unoptimized,
        responsive,
        placeholderAspectRatio,
        style,
        options?.fit,
        options?.position,
        blurDataURL,
      ]);

      return (
        <img
          ref={React.useCallback(
            (img: ImgElementWithDataProp) => {
              if (img != null) {
                if (!unoptimized) {
                  if (placeholder === "blur") {
                    img.classList.add("blur");
                  }
                  if (img?.complete) {
                    handleLoading(img, src!, onLoadingComplete);
                  }
                }
                if (ref) {
                  if (typeof ref === "function") {
                    ref(img);
                  } else {
                    (
                      ref as React.MutableRefObject<HTMLImageElement | null>
                    ).current = img;
                  }
                }
              }
            },
            [unoptimized, ref, src, placeholder, onLoadingComplete]
          )}
          decoding={decoding}
          loading={loading}
          style={imageStyle}
          className={clsx(
            !unoptimized && "remix-image",
            !unoptimized && placeholder === "blur" && "blur-in",
            className
          )}
          {...imgProps}
          {...responsiveProps}
          onLoad={(event) => {
            if (!unoptimized) {
              const img = event.currentTarget as ImgElementWithDataProp;
              handleLoading(img, src!, onLoadingComplete);
            }
            if (onLoad) {
              onLoad(event);
            }
          }}
        />
      );
    }
  )
);

Image.displayName = "Image";
