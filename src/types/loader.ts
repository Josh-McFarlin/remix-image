import type { Cache } from "./cache";
import type { Resolver } from "./resolver";
import type { TransformerMaker } from "./transformer";

export interface LoaderConfig {
  selfUrl: string;
  cache?: Cache;
  transformer?: TransformerMaker;
  resolver?: Resolver;
}

export type AssetLoader = (
  config: LoaderConfig,
  request: Request
) => Promise<Response>;
