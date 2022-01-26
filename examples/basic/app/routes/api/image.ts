import type { LoaderFunction } from "remix";
import {
  imageLoader,
  DiskCache,
  fsResolver,
  fetchResolver,
} from "remix-image/server";
import sharp from "sharp";

export const fetchImage = async (
  src: string
): Promise<{
  buffer: Buffer;
  contentType: string;
}> => {
  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {
    return fsResolver(src);
  } else {
    return fetchResolver(src);
  }
};

const config = {
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
  cache: new DiskCache(),
  transformer: sharp,
  resolver: fetchImage,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
