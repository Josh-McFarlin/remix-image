import type { LoaderFunction } from "@remix-run/node";
import type { Resolver } from "remix-image/server";
import {
  imageLoader,
  DiskCache,
  fsResolver,
  fetchResolver,
} from "remix-image/server";

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith("/") && (url.length === 1 || url[1] !== "/")) {
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
  }
};

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  resolver: fetchImage,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
