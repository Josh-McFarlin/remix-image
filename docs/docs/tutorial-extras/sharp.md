---
sidebar_position: 2
---

# Sharp

## What?
Sharp is a faster image transformer that uses native node packages.
Replacing the default image with Sharp will greatly increase the performance of initial image transformations.

However, because Sharp uses native node packages it cannot be used on Cloudflare, so it must be installed separately.

If you would like to use Sharp, follow the steps below:

## Install
If you want to use a faster image transformer, install:
```bash
npm install -S remix-image-sharp sharp
yarn add remix-image-sharp sharp
```

## Add To Your Loader Config

```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader, DiskCache, MemoryCache } from "remix-image/server";
import { sharpTransformer } from "remix-image-sharp";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: sharpTransformer
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

For an example project using Sharp, look at [this example](https://github.com/Josh-McFarlin/remix-image/tree/master/examples/sharp).
