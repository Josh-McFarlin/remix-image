---
sidebar_position: 3
---

# Cloudflare

## What?
Some platforms like Cloudflare Workers do not support file-systems and Node packages.

## Transformer
To use `remix-image` on Cloudflare and similar, use `MemoryCache` and `pureTransformer` because they are pure JavaScript.

**Note**: Because of bundling issues, you must import these helpers from `remix-image/serverPure`.

```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader, MemoryCache, pureTransformer } from "remix-image/serverPure";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
  transformer: pureTransformer
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```
Also, `pureTransformer` is used by default, it does not need to be specified in the config.
This is only shown in the following example to show it must be used instead of other `transformer` options.


## Resolver
By default, `remix-image` will work on Cloudflare if all assets server are being fetched from another server.
If you are trying to serve assets stored in your app's `public` directory, you must use the `kvResolver`.

If you would like to use both `fetchResolver` and `fsResolver`, you can create a custom resolver as shown below:
```typescript jsx
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
} from "remix-image/serverPure";

const whitelistedDomains = new Set(["http://localhost:3000", "i.imgur.com"]);

export const myResolver = async (
  asset: string,
  url: string
): Promise<{
  buffer: Buffer;
  contentType: string;
}> => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return kvResolver(asset, url);
  } else {
    if (!whitelistedDomains.has(new URL(url).host)) {
      throw new Error("Domain not allowed!");
    }

    return fetchResolver(asset, url);
  }
};

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
  resolver: myResolver,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

For an example project hosted on Cloudflare Workers, look at [this example](https://github.com/Josh-McFarlin/remix-image/tree/master/examples/cloudflare).
