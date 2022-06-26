import decode, { init as initDecode } from "@jsquash/jpeg/decode";
import encode, { init as initEncode } from "@jsquash/jpeg/encode";
import { ImageHandler } from "../types/transformer";

export const JpegHandler: ImageHandler = {
  async decode(buffer) {
    await initDecode(JPEG_DEC_WASM);

    return decode(buffer);
  },
  async encode(image, options) {
    await initEncode(JPEG_ENC_WASM);

    return encode(image, options);
  },
};
