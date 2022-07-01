import { ClientLoader } from "../types/client";
import { ImagePosition } from "../types/transformer";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

const numberToHex = (num: number): string =>
  ("0" + Number(num).toString(16)).slice(-2).toUpperCase();

const positionMap: Record<ImagePosition, string> = {
  "center bottom": "south",
  "center center": "center",
  "center top": "north",
  "left bottom": "south_west",
  "left center": "west",
  "left top": "north_west",
  "right bottom": "south_east",
  "right center": "east",
  "right top": "north_east",
  bottom: "south",
  center: "center",
  left: "west",
  right: "east",
  top: "north",
};

export const cloudinaryLoader: ClientLoader = (
  src,
  loaderUrl,
  loaderOptions
) => {
  const params = [];

  if (loaderOptions.background) {
    params.push(
      `b_${
        numberToHex(loaderOptions.background[0]) +
        numberToHex(loaderOptions.background[1]) +
        numberToHex(loaderOptions.background[2]) +
        numberToHex(loaderOptions.background[3])
      }`
    );
  }

  if (loaderOptions.crop) {
    params.push(`c_crop`);
    params.push(`g_north_west`);
    params.push(`h_${loaderOptions.crop.height}`);
    params.push(`w_${loaderOptions.crop.width}`);
    params.push(`x_${loaderOptions.crop.x}`);
    params.push(`y_${loaderOptions.crop.y}`);
  }

  if (loaderOptions.rotate) {
    params.push(`a_${loaderOptions.rotate}`);
  }

  if (loaderOptions.blurRadius) {
    params.push(`e_blur:${loaderOptions.blurRadius}`);
  }

  if (loaderOptions.fit === "outside") {
    params.push("c_fit");

    if (loaderOptions.width && loaderOptions.height) {
      params.push(`w_${Math.max(loaderOptions.width, loaderOptions.height)}`);
      params.push(`h_${Math.max(loaderOptions.width, loaderOptions.height)}`);
    } else if (loaderOptions.width) {
      params.push(`w_${loaderOptions.width}`);
    } else if (loaderOptions.height) {
      params.push(`h_${loaderOptions.height}`);
    }
  } else {
    if (loaderOptions.fit === "contain") {
      params.push("c_pad");
    } else if (loaderOptions.fit === "cover") {
      params.push("c_fill");
    } else if (loaderOptions.fit === "fill") {
      params.push("c_scale");
    } else if (loaderOptions.fit === "inside") {
      params.push("c_fit");
    }

    if (loaderOptions.width) {
      params.push(`w_${loaderOptions.width}`);
    }

    if (loaderOptions.height) {
      params.push(`h_${loaderOptions.height}`);
    }
  }

  if (loaderOptions.position) {
    params.push(
      `g_${positionMap[loaderOptions.position as ImagePosition] || "center"}`
    );
  }

  params.push(`q_${loaderOptions.quality || "auto"}`);

  if (loaderOptions.contentType) {
    params.push(
      "f_",
      loaderOptions.contentType.replace("image/", "").replace("jpeg", "jpg")
    );
  } else {
    params.push("f_auto");
  }

  const paramsString = params.join(",") + "/";
  return `${loaderUrl}${paramsString}${normalizeSrc(src)}`;
};
