import { ClientLoader } from "../types/client";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

const numberToHex = (num: number): string =>
  ("0" + Number(num).toString(16)).slice(-2).toUpperCase();

export const imgixLoader: ClientLoader = (src, loaderUrl, loaderOptions) => {
  const url = new URL(`${loaderUrl}${normalizeSrc(src)}`);
  const params = url.searchParams;

  if (loaderOptions.width) {
    params.set("w", loaderOptions.width.toString());
  }

  if (loaderOptions.height) {
    params.set("h", loaderOptions.height.toString());
  }

  if (loaderOptions.background) {
    params.set(
      "bg",
      numberToHex(loaderOptions.background[3]) +
        numberToHex(loaderOptions.background[0]) +
        numberToHex(loaderOptions.background[1]) +
        numberToHex(loaderOptions.background[2])
    );
  }

  if (loaderOptions.crop) {
    params.set(
      "rect",
      `${loaderOptions.crop.x},${loaderOptions.crop.y},${loaderOptions.crop.width},${loaderOptions.crop.height}`
    );
  }

  if (loaderOptions.flip === "horizontal") {
    params.set("flip", "h");
  } else if (loaderOptions.flip === "vertical") {
    params.set("flip", "v");
  } else if (loaderOptions.flip === "both") {
    params.set("flip", "hv");
  }

  if (loaderOptions.rotate) {
    params.set("rot", loaderOptions.rotate.toString());
  }

  if (loaderOptions.blurRadius) {
    params.set("blur", loaderOptions.blurRadius.toString());
  }

  if (loaderOptions.fit === "contain") {
    params.set("fit", "fill");
  } else if (loaderOptions.fit === "cover") {
    params.set("fit", "crop");
  } else if (loaderOptions.fit === "fill") {
    params.set("fit", "scale");
  } else if (loaderOptions.fit === "inside") {
    params.set("fit", "fillmax");
  } else if (loaderOptions.fit === "outside") {
    params.set("fit", "max");
  }

  if (loaderOptions.quality) {
    params.set("q", loaderOptions.quality.toString());
  }

  if (loaderOptions.contentType) {
    params.set(
      "format",
      loaderOptions.contentType.replace("image/", "").replace("jpeg", "jpg")
    );
  } else {
    params.set("auto", "format");
  }

  return url.href;
};
