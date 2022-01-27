---
sidebar_position: 3
---

# Creating a Transformer

You may want to create a Transformer if you want to **modify** images in a way that is not currently supported by this library.
An example could be resizing images using Cloudinary or Cloudflare Images.

## Instructions

To make your own, just make a class that follows the [Transformer format](https://github.com/Josh-McFarlin/remix-image/blob/master/src/types/transformer.ts):
```typescript
import { JpegOptions, PngOptions, ResizeOptions, WebpOptions } from "sharp";

export abstract class ImageTransformer {
  abstract jpeg(options?: JpegOptions): this;
  abstract png(options?: PngOptions): this;
  abstract webp(options?: WebpOptions): this;

  abstract resize(options: ResizeOptions): this;
  abstract toBuffer(): Promise<Buffer>;
}
```

**Note**: Transformers use Buffer, a default Node package that is not available on platforms like Cloudflare Workers.
If you would like to use your custom transformer on these platforms, you will need to polyfill your custom transformer using a library like [`buffer`](https://www.npmjs.com/package/buffer).

Then make a function that takes in a buffer as the single parameter, and creates an instance of your Transformer class
```typescript
export type TransformerMaker = (buffer: Buffer) => ImageTransformer;
```

You will then provide this function to the ‘transformer’ field of the ‘loader’ config
```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader } from "remix-image/server";
import myTransformer from "...";

const config = {
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
  transformer: myTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

## Example

To see an example, look at [`pureTransformer`](https://github.com/Josh-McFarlin/remix-image/tree/master/src/server/transformers/pureTransformer) in the library.

## Show Off

Create something cool that you think others would use? Upload it to GitHub and [show it off on the Remix-Image repo](https://github.com/Josh-McFarlin/remix-image/discussions/3)!
