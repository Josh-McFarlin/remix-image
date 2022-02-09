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

## Create Transformer
```typescript
import { MimeType, Transformer } from "remix-image";
import sharp from "sharp";

const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.TIFF,
]);

const supportedOutputs = new Set([MimeType.JPEG, MimeType.PNG, MimeType.WEBP]);

export const sharpTransformer: Transformer = {
  name: "sharpTransformer",
  supportedInputs,
  supportedOutputs,
  transform: async (
    { data },
    {
      contentType: outputContentType,
      width,
      height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    }
  ) => {
    const image = sharp(data);

    image
      .resize(width, height, {
        fit,
        position,
        ...(background && {
          background: {
            r: background[0],
            g: background[1],
            b: background[2],
            alpha: background[3],
          },
        }),
      })
      .jpeg({
        quality,
        progressive: true,
        force: outputContentType === MimeType.JPEG,
      })
      .png({
        progressive: true,
        compressionLevel,
        force: outputContentType === MimeType.PNG,
      })
      // Possible, but requires additional sharp config
      // .gif({
      //   loop,
      //   delay: delay ? [delay] : undefined,
      //   force: outputContentType === MimeType.GIF,
      // })
      .webp({
        quality,
        force: outputContentType === MimeType.WEBP,
      })
      .tiff({
        quality,
        // cannot be displayed on browsers
        force: false,
      });

    return image.toBuffer();
  },
};
```

## Add To Your Loader Config

```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader, DiskCache, MemoryCache } from "remix-image/server";
import sharpTransformer from "...";

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
