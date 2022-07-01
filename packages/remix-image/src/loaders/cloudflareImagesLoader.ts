import { ClientLoader } from "../types/client";
import { ImagePosition } from "../types/transformer";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

const positionMap: Record<ImagePosition, string> = {
  "center bottom": "0.5x1",
  "center center": "0.5x0.5",
  "center top": "0.5x0",
  "left bottom": "0x1",
  "left center": "0x0.5",
  "left top": "0x0",
  "right bottom": "1x1",
  "right center": "1x0.5",
  "right top": "1x0",
  bottom: "bottom",
  center: "0.5x0.5",
  left: "left",
  right: "right",
  top: "top",
};

export const cloudflareImagesLoader: ClientLoader = (
  src,
  _loaderUrl,
  loaderOptions
) => {
  const params = [];

  if (loaderOptions.background) {
    params.push(
      `background=rgba(${loaderOptions.background[0]},${
        loaderOptions.background[1]
      },${loaderOptions.background[2]},${Number(
        loaderOptions.background[3] / 255
      ).toFixed(2)})`
    );
  }

  if (loaderOptions.crop) {
    params.push(
      `trim=${loaderOptions.crop.y};${
        loaderOptions.crop.x + loaderOptions.crop.width
      };${loaderOptions.crop.height};${loaderOptions.crop.x}`
    );
  }

  if (loaderOptions.rotate) {
    params.push(`rotate=${loaderOptions.rotate}`);
  }

  if (loaderOptions.blurRadius) {
    params.push(`blur=${loaderOptions.blurRadius}`);
  }

  if (loaderOptions.fit === "outside") {
    params.push(`fit=contain`);

    if (loaderOptions.width && loaderOptions.height) {
      params.push(
        `width=${Math.max(loaderOptions.width, loaderOptions.height)}`
      );
      params.push(
        `height=${Math.max(loaderOptions.width, loaderOptions.height)}`
      );
    } else if (loaderOptions.width) {
      params.push(`width=${loaderOptions.width}`);
    } else if (loaderOptions.height) {
      params.push(`height=${loaderOptions.height}`);
    }
  } else {
    if (loaderOptions.fit === "contain") {
      params.push(`fit=pad`);
    } else if (loaderOptions.fit === "cover") {
      params.push(`fit=cover`);
    } else if (loaderOptions.fit === "fill") {
      params.push(`fit=fill`);
    } else if (loaderOptions.fit === "inside") {
      params.push(`fit=contain`);
    }

    if (loaderOptions.width) {
      params.push(`width=${loaderOptions.width}`);
    }

    if (loaderOptions.height) {
      params.push(`height=${loaderOptions.height}`);
    }
  }

  if (loaderOptions.position) {
    params.push(
      `gravity=${
        positionMap[loaderOptions.position as ImagePosition] || "0.5x0.5"
      }`
    );
  }

  if (loaderOptions.quality) {
    params.push(`quality=${loaderOptions.quality}`);
  }

  const paramsString = params.join(",");
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};
