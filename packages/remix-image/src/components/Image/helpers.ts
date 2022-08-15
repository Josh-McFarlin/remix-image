import { ResponsiveSize } from "../../types";
import { OnLoadingComplete } from "./types";

export type ImgElementWithDataProp = HTMLImageElement & {
  "data-loaded-src": string | undefined;
};

export function computePlaceholderSize(
  sizes: ResponsiveSize[] = [],
  aspectRatio: number | null
): {
  width: number;
  height: number;
} {
  let ratio = aspectRatio || 1;
  let largestWidth = 0;

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i].size || {};

    if (size.width) {
      if (size.width > largestWidth) {
        largestWidth = size.width;
      }

      if (!aspectRatio && size.height) {
        ratio = size.height / size.width;
      }
    }
  }

  return {
    width: largestWidth,
    height: Math.round(largestWidth * ratio),
  };
}

// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
export function handleLoading(
  img: ImgElementWithDataProp,
  src: string,
  onLoadingComplete: OnLoadingComplete | null | undefined
): void {
  if (!img || img["data-loaded-src"] === src) {
    return;
  }
  img["data-loaded-src"] = src;
  const p = "decode" in img ? img.decode() : Promise.resolve();
  p.catch(() => {}).then(() => {
    if (!img.parentNode) {
      return;
    }
    img.style.animationDuration = "0.125s";
    img.classList.remove("blur");
    if (onLoadingComplete) {
      const { naturalWidth, naturalHeight } = img;
      onLoadingComplete({ naturalWidth, naturalHeight });
    }
  });
}
