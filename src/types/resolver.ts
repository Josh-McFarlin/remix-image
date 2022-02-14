import { MimeType } from "./file";
import { TransformOptions } from "./image";

export type Resolver = (
  asset: string,
  url: string,
  options: TransformOptions
) => Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
}>;
