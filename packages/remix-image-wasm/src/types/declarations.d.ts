/* eslint-disable no-var */
declare module "*.wasm";

declare global {
  var AVIF_ENC_WASM: "node_modules/remix-image-wasm/avif_enc.wasm" | undefined;
  var AVIF_DEC_WASM: "node_modules/remix-image-wasm/avif_dec.wasm" | undefined;
  var JPEG_ENC_WASM: "node_modules/remix-image-wasm/jpeg_enc.wasm" | undefined;
  var JPEG_DEC_WASM: "node_modules/remix-image-wasm/jpeg_dec.wasm" | undefined;
  var PNG_WASM: "node_modules/remix-image-wasm/png.wasm" | undefined;
  var WEBP_ENC_WASM: "node_modules/remix-image-wasm/webp_enc.wasm" | undefined;
  var WEBP_DEC_WASM: "node_modules/remix-image-wasm/webp_dec.wasm" | undefined;
  var RESIZE_WASM: "node_modules/remix-image-wasm/resize.wasm" | undefined;
}

export {};
