---
sidebar_position: 2
---

# Web Assembly

## What?
Web Assembly is a faster image transformer that offers performance between the `pureTransformer` and `sharpTransformer`.

However, because Web Assembly uses additional code and setup, it must be installed separately.

If you would like to use Web Assembly, follow the steps below:

## Install
If you want to use a faster image transformer, install:
```bash
npm install -S remix-image-wasm
yarn add remix-image-wasm
```

## Add To Your Loader Config

```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader, DiskCache, MemoryCache } from "remix-image/server";
import { wasmTransformer } from "remix-image-wasm";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: wasmTransformer
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

## Add Wasm Files To Your Environment


### Cloudflare:

Add the following lines to the bottom of your `wrangler.toml` file:
```
[wasm_modules]
AVIF_ENC_WASM = "node_modules/remix-image-wasm/avif_enc.wasm"
AVIF_DEC_WASM = "node_modules/remix-image-wasm/avif_dec.wasm"
JPEG_ENC_WASM = "node_modules/remix-image-wasm/jpeg_enc.wasm"
JPEG_DEC_WASM = "node_modules/remix-image-wasm/jpeg_dec.wasm"
PNG_WASM = "node_modules/remix-image-wasm/png.wasm"
WEBP_ENC_WASM = "node_modules/remix-image-wasm/webp_enc.wasm"
WEBP_DEC_WASM = "node_modules/remix-image-wasm/webp_dec.wasm"
RESIZE_WASM = "node_modules/remix-image-wasm/resize.wasm"
```

For an example project using Web Assembly, look at [this example](https://github.com/Josh-McFarlin/remix-image/tree/master/examples/cloudflare-workers).
