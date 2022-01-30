import type { Cache } from "./cache";
import type { ResizeOptions } from "./image";
import type { Resolver } from "./resolver";
import type { TransformerMaker } from "./transformer";

export interface LoaderConfig {
  selfUrl: string;
  cache?: Cache;
  transformer?: TransformerMaker;
  resolver?: Resolver;
  fallbackTransformer?: boolean;
  defaultOptions?: ResizeOptions;
}

export type AssetLoader = (
  config: LoaderConfig,
  request: Request
) => Promise<Response>;
