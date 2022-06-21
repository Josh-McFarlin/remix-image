---
sidebar_position: 2
---

# Creating a Resolver

You may want to create a Resolver if you want to **retrieve** images in a way that is not currently supported by this library.
An example could be retrieving images stored on an authenticated server that is separate from your app.

## Instructions

To make your own, just make a function that follows the [Resolver format](https://github.com/Josh-McFarlin/remix-image/blob/master/packages/remix-image/src/types/resolver.ts):
```typescript
export type Resolver = (
  asset: string,
  url: string,
  options: TransformOptions,
  basePath: string
) => Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
}>;
```
such as:
```typescript
import { fsResolver, fetchResolver, Resolver } from "remix-image/server";

export const myResolver: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith("/") && (url.length === 1 || url[1] !== "/")) {
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
  }
};
```

You will then provide this function to the `resolver` field of the loader config
```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader } from "remix-image/server";
import myResolver from "...";

const config = {
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
  resolver: myResolver,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

## Examples

* [fsResolver](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image/src/server/resolvers/fsResolver)
* [fetchResolver](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image/src/server/resolvers/fetchResolver)
* [kvResolver](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image/src/server/resolvers/kvResolver)

## Show Off

Create something cool that you think others would use? Upload it to GitHub and [show it off on the Remix-Image repo](https://github.com/Josh-McFarlin/remix-image/discussions/3)!
