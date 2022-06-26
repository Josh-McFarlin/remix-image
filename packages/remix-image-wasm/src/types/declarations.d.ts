/* eslint-disable no-var */
declare module "*.wasm";

declare global {
  var AVIF_ENC_WASM: "node_modules/remix-image-wasm/avif_enc.wasm";
  var AVIF_DEC_WASM: "node_modules/remix-image-wasm/avif_dec.wasm";
  var JPEG_ENC_WASM: "node_modules/remix-image-wasm/jpeg_enc.wasm";
  var JPEG_DEC_WASM: "node_modules/remix-image-wasm/jpeg_dec.wasm";
  var PNG_WASM: "node_modules/remix-image-wasm/png.wasm";
  var WEBP_ENC_WASM: "node_modules/remix-image-wasm/webp_enc.wasm";
  var WEBP_DEC_WASM: "node_modules/remix-image-wasm/webp_dec.wasm";
  var RESIZE_WASM: "node_modules/remix-image-wasm/resize.wasm";
}

export {};
