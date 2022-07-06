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

For an example project using Web Assembly, look at [this example](https://github.com/Josh-McFarlin/remix-image/tree/master/examples/cloudflare-workers).

## Add Wasm Files To Your Environment


### Cloudflare:

Add the following lines to the bottom of your `wrangler.toml` file:
```
[wasm_modules]
JPEG_ENC_WASM = "node_modules/remix-image-wasm/jpeg_enc.wasm"
JPEG_DEC_WASM = "node_modules/remix-image-wasm/jpeg_dec.wasm"
PNG_WASM = "node_modules/remix-image-wasm/png.wasm"
WEBP_ENC_WASM = "node_modules/remix-image-wasm/webp_enc.wasm"
WEBP_DEC_WASM = "node_modules/remix-image-wasm/webp_dec.wasm"
# AVIF_ENC_WASM = "node_modules/remix-image-wasm/avif_enc.wasm"    # uncomment for AVIF support
# AVIF_DEC_WASM = "node_modules/remix-image-wasm/avif_dec.wasm"    # uncomment for AVIF support
```

### Reducing Bundle Size

Going over the Cloudflare Worker file size limit?

You can solve this by only including the `.wasm` files for image types you want to speed up transformation for.

* Files ending with `_dec.wasm` are used for  image inputs
* Files ending with `_enc.wasm` are used for image outputs

**Note**: An exception is PNG, which uses a single `png.wasm` for image inputs and outputs.

If an input image is in a format that you haven’t included the `.wasm` files for in your environment,
it will use the `fallbackTransformer` option, which is `pureTransformer`
by default and supports JPEG, PNG, GIF, BMP, and TIFF images.

### Example

Let’s say we have a project that uses images that are JPEGs, PNGs, and WEBPs.
We want our faster `wasmTransformer` to handle our PNG→PNG, WEBP→WEBP, and PNG→WEBP transformations,
while letting any JPEG transformations (JPEG→JPEG, JPEG→PNG, PNG→JPEG, etc) be handled by the built-in `pureTransformer`
so we don’t have to include the large `JPEG_DEC.wasm` and `JPEG_ENC.wasm` files in our bundled project.

Therefore, we want our `supportedInputs` to be:
* MimeType.PNG
* MimeType.WEBP

And our `supportedOutputs` to be:
* MimeType.PNG
* MimeType.WEBP

Which we can do by setting the `[wasm_modules]` field in the `wrangler.toml` file to:
```
[wasm_modules]
PNG_WASM = "node_modules/remix-image-wasm/png.wasm"
WEBP_ENC_WASM = "node_modules/remix-image-wasm/webp_enc.wasm"
WEBP_DEC_WASM = "node_modules/remix-image-wasm/webp_dec.wasm"
```

**Note**: `pureTransformer` does not include any support for WEBP inputs or outputs.
If you do not include `WEBP_DEC.wasm` or `WEBP_ENC.wasm` in your environment, your WEBP images will not be transformed by Remix-Image.
