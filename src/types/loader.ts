import { LoaderFunction } from "@remix-run/server-runtime";
import { Cache } from "./cache";

export interface LoaderOptions {
  selfUrl: string;
  whitelistedDomains?: string[];
  cache?: Cache;
}

export type AssetLoader = (options: LoaderOptions) => LoaderFunction;
