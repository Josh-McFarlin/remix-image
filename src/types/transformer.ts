import { MimeType } from "./file";
import { ResizeOptions } from "./image";

export type TransformerMaker = (
  input: {
    data: Buffer;
    width: number;
    height: number;
    contentType: MimeType;
  },
  output: Required<ResizeOptions>
) => Promise<Buffer>;
