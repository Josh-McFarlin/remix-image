---
sidebar_position: 2
---

# Sharp

## What?
Sharp is a faster image transformer that uses native node packages.
Replacing the default image with Sharp will greatly increase the performance of initial image transformations.
However, Sharp because Sharp uses native node packages it cannot be used on Cloudflare, so it must be installed separately.
If you would like to use Sharp, follow the steps below:

## Install Sharp
If you want to use a faster image transformer, install:
```bash
npm install -S sharp
yarn add sharp
```

## Add To Your Loader Config

Create a new resource route that imports the `imageLoader` function and exports as `loader`.
By default, the image component uses the route `"/api/image"`, but any route can be used.
```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader, DiskCache, MemoryCache } from "remix-image/server";
import sharp from "sharp";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: sharp
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```
