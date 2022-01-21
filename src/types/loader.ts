import { Cache } from "./cache";
import { ImageTransformer } from "./transformer";

export interface LoaderConfig {
  selfUrl: string;
  whitelistedDomains?: string[];
  cache?: Cache;
  transformer?: ImageTransformer;
}

export type AssetLoader = (
  config: LoaderConfig,
  request: Request
) => Promise<Response>;
