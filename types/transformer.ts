import { MimeType } from "./file";
import { TransformOptions } from "./image";

export type Transformer = {
  name: string;
  supportedInputs: Set<MimeType>;
  supportedOutputs: Set<MimeType>;
  transform: (
    input: {
      url: string;
      data: Uint8Array;
      contentType: MimeType;
    },
    output: TransformOptions
  ) => Promise<Uint8Array>;
};
