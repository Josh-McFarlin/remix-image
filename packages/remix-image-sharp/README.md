# Remix-Image-Sharp

![](https://badgen.net/npm/v/remix-image-sharp)
![](https://badgen.net/npm/license/remix-image-sharp)
![](https://badgen.net/npm/types/remix-image-sharp)
![](https://badgen.net/bundlephobia/min/remix-image-sharp)
![](https://badgen.net/npm/dt/remix-image-sharp)

## 👋 Intro

A Sharp transformer for Remix-Image

## 🚀 How to use

### Install

To install this library, use one of the following commands:
```bash
npm install -S remix-image-sharp sharp
yarn add remix-image-sharp sharp
```

### Implement

To use this transformer, set the `transformer` property in your ImageLoader API route:
```typescript
import type { LoaderFunction } from "remix";
import { sharpTransformer } from "remix-image-sharp";
import { imageLoader, DiskCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: sharpTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

### Docs

- Documentation for this library can be found at: [https://remix-image.mcfarl.in](https://remix-image.mcfarl.in)
