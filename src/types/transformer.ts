import { MimeType } from "./file";
import { TransformOptions } from "./image";

export type Transformer = (
  input: {
    data: Uint8Array;
    contentType: MimeType;
  },
  output: Required<TransformOptions>
) => Promise<Uint8Array>;
