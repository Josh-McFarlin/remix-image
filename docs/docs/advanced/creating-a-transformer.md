---
sidebar_position: 3
---

# Creating a Transformer

You may want to create a Transformer if you want to **modify** images in a way that is not currently supported by this library.
An example could be resizing images using Cloudinary or Cloudflare Images.

## Instructions

To make your own, just make a class that follows the [Transformer format](https://github.com/Josh-McFarlin/remix-image/blob/master/packages/remix-image/src/types/transformer.ts):
```typescript
export type Transformer = {
  name: string;
  supportedInputs: Set<MimeType>;
  supportedOutputs: Set<MimeType>;
  fallbackOutput: MimeType;
  transform: (
    input: {
      url: string;
      data: Uint8Array;
      contentType: MimeType;
    },
    output: TransformOptions
  ) => Promise<Uint8Array>;
};
```

You will then provide this object to the `transformer` field of the ‘loader’ config
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

## Examples

* [Sharp](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image-sharp)
* [WebAssembly](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image-wasm)

## Show Off

Create something cool that you think others would use? Upload it to GitHub and [show it off on the Remix-Image repo](https://github.com/Josh-McFarlin/remix-image/discussions/3)!
