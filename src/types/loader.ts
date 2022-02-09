import type { Cache } from "./cache";
import type { MimeType } from "./file";
import type { SizelessOptions } from "./image";
import type { Resolver } from "./resolver";
import type { Transformer } from "./transformer";

export interface LoaderConfig {
  /** The URL for this Remix server. */
  selfUrl: string;
  /** A resolver function that handles retrieving image assets. (optional, default fetchResolver) */
  resolver?: Resolver;
  /** A transformer function that handles mutations of images. (optional, default pureTransformer) */
  transformer?: Transformer;
  /** If RemixImage should fallback to the fallback mime type if the output type is not supported. (optional, default true) */
  useFallbackFormat?: boolean;
  /** The output mime type the image should fallback to if the provided type is not supported. (optional, default MimeType.JPEG) */
  fallbackFormat?: MimeType;
  /** If RemixImage should fallback to the default transformer if custom transformer fails. (optional, default true) */
  useFallbackTransformer?: boolean;
  /** A cache to store computed RemixImage transformations. (optional) */
  cache?: Cache;
  /** Default TransformOptions to use. (optional) */
  defaultOptions?: Partial<SizelessOptions>;
  /** Redirect image to original source if RemixImage fails. (optional, default false) */
  redirectOnFail?: boolean;
}

export type AssetLoader = (
  config: LoaderConfig,
  request: Request
) => Promise<Response>;
