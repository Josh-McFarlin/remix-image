import type { Cache } from "./cache";
import type { TransformOptions } from "./image";
import type { Resolver } from "./resolver";
import type { Transformer } from "./transformer";

export interface LoaderConfig {
  selfUrl: string;
  cache?: Cache;
  transformer?: Transformer;
  resolver?: Resolver;
  fallbackTransformer?: boolean;
  defaultOptions?: TransformOptions;
}

export type AssetLoader = (
  config: LoaderConfig,
  request: Request
) => Promise<Response>;
