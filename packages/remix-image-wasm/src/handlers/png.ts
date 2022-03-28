import decode, { init as initDecode } from "@jsquash/png/decode";
import encode, { init as initEncode } from "@jsquash/png/encode";
import { ImageHandler } from "../types";

export const PngHandler: ImageHandler = {
  async decode(buffer) {
    await initDecode(PNG_DEC_WASM);

    return decode(buffer);
  },
  async encode(image) {
    await initEncode(PNG_ENC_WASM);

    return encode(image);
  },
};
