import { MimeType } from "./file";
import { TransformOptions } from "./transformer";

export type Resolver = (
  asset: string,
  url: string,
  options: TransformOptions,
  basePath: string
) => Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
}>;
