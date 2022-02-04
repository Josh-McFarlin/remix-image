import type { LoaderFunction } from "remix";
import { imageLoader, fsResolver, DiskCache } from "remix-image/server";
import { gifTransformer } from "../../../gifTransformer";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache({
    ttl: 0,
    tbd: 0,
  }),
  resolver: fsResolver,
  transformer: gifTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
