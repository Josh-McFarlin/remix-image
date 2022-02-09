import type { LoaderFunction } from "remix";
import {
  imageLoader,
  fsResolver,
  fetchResolver,
  Resolver,
  MemoryCache,
} from "remix-image/server";
import { sharpTransformer } from "../../../sharpTransformer";

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
  transformer: sharpTransformer,
  resolver: fetchImage,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
