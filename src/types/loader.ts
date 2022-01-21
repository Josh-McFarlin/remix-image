import { Cache } from "./cache";

export interface LoaderConfig {
  selfUrl: string;
  whitelistedDomains?: string[];
  cache?: Cache;
}

export type AssetLoader = (
  config: LoaderConfig,
  request: Request
) => Promise<Response>;
