import type { LoaderFunction } from "remix";
import {
  imageLoader,
  DiskCache,
  fsResolver,
  fetchResolver,
  wasmTransformer,
} from "remix-image/server";

export const fetchImage = async (
  asset: string,
  src: string
): Promise<{
  buffer: Buffer;
  contentType: string;
}> => {
  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {
    return fsResolver(asset, src);
  } else {
    return fetchResolver(asset, src);
  }
};

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  //transformer: sharp,
  transformer: wasmTransformer,
  resolver: fetchImage,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
