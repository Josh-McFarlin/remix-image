import type { LoaderFunction } from "remix";
// eslint-disable-next-line import/no-unresolved
import { imageLoader, DiskCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
  cache: new DiskCache(),
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
