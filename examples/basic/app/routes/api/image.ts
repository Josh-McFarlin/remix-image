import type { LoaderFunction } from "remix";
import {
  imageLoader,
  MemoryCache,
  fsResolver,
  fetchResolver,
  Resolver,
} from "remix-image/server";

export const fetchImage: Resolver = async (asset, src) => {
  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {
    return fsResolver(asset, src);
  } else {
    return fetchResolver(asset, src);
  }
};

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
  resolver: fetchImage,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
