# Remix-Image-ImageMagick

![](https://badgen.net/npm/v/remix-image-wasm)
![](https://badgen.net/npm/license/remix-image-wasm)
![](https://badgen.net/npm/types/remix-image-wasm)
![](https://badgen.net/bundlephobia/min/remix-image-wasm)
![](https://badgen.net/npm/dt/remix-image-wasm)

## 👋 Intro

A WebAssembly transformer for Remix-Image

## 🚀 How to use

### Install

To install this library, use on of the following commands:
```bash
npm install -S remix-image-wasm
yarn add remix-image-wasm
```

### Implement

To use this transformer, set the `transformer` property in your ImageLoader API route:
```typescript
import type { LoaderFunction } from "remix";
import { wasmTransformer } from "remix-image-wasm";
import { imageLoader, DiskCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: wasmTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

### Docs

- Documentation for this library can be found at: [https://remix-image.mcfarl.in](https://remix-image.mcfarl.in)
