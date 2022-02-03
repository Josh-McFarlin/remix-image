import { MimeType } from "./file";

export type Resolver = (
  asset: string,
  url: string
) => Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
}>;
