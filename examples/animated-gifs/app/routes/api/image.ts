import type { LoaderFunction } from "@remix-run/node";
import { imageLoader, fsResolver, MemoryCache } from "remix-image/server";
import { gifTransformer } from "../../../gifTransformer";

const config = {
  selfUrl: "http://localhost:3000",
  // cache: new MemoryCache(),
  resolver: fsResolver,
  transformer: gifTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
