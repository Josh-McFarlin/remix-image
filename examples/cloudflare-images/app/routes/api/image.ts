import type { LoaderFunction } from "remix";
import { imageLoader } from "remix-image/serverPure";
import { cloudflareResolver } from "../../../cfImagesResolver";

declare global {
  // @ts-ignore fix missing
  const SELF_URL: string;
}

const config = {
  selfUrl: SELF_URL,
  resolver: cloudflareResolver,
  transformer: null,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
