import { MimeType, Transformer } from "remix-image";
import { GifHandler } from "./handler";

const supported = new Set([MimeType.GIF]);

export const gifTransformer: Transformer = {
  name: "gifTransformer",
  supportedInputs: supported,
  supportedOutputs: supported,
  transform: async (
    { data },
    {
      width,
      height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    }
  ) => {
    if (width <= 0 || (height != null && height <= 0)) {
      throw new Error("At least one dimension must be provided!");
    }

    return GifHandler(data, {
      width,
      height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    });
  },
};
