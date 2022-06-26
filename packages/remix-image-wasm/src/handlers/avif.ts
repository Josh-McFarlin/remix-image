import decode, { init as initDecode } from "@jsquash/avif/decode";
import encode, { init as initEncode } from "@jsquash/avif/encode";
import { ImageHandler } from "../types/transformer";

export const AvifHandler: ImageHandler = {
  async decode(buffer) {
    await initDecode(AVIF_DEC_WASM);

    return decode(buffer);
  },
  async encode(image) {
    await initEncode(AVIF_ENC_WASM);

    return encode(image);
  },
};
