# Remix-Image-ImageMagick

![](https://badgen.net/npm/v/remix-image-imagemagick)
![](https://badgen.net/npm/license/remix-image-imagemagick)
![](https://badgen.net/npm/types/remix-image-imagemagick)
![](https://badgen.net/bundlephobia/min/remix-image-imagemagick)
![](https://badgen.net/npm/dt/remix-image-imagemagick)

## 👋 Intro

An ImageMagick transformer for Remix-Image

## 🚀 How to use

### Install

To install this library, use on of the following commands:
```bash
npm install -S remix-image-imagemagick
yarn add remix-image-imagemagick
```

### Implement

To use this transformer, set the `transformer` property in your ImageLoader API route:
```typescript
import type { LoaderFunction } from "remix";
import { magickTransformer } from "remix-image-imagemagick";
import { imageLoader, DiskCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: magickTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

### Docs

- Documentation for this library can be found at: [https://remix-image.mcfarl.in](https://remix-image.mcfarl.in)
