---
sidebar_position: 3
---

# Cloudflare

Some platforms like Cloudflare Workers do not support file-systems and Node packages.
Therefore, you must setup Remix-Image to not use any of these packages.

## Transformer
To use `remix-image` on Cloudflare and similar, use `MemoryCache` and `pureTransformer` because they are pure JavaScript.

**Note**: Because of bundling issues, you must import this package from `remix-image/serverPure`.

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

## Web Assembly Transformer
In addition to the `pureTransformer`, Cloudflare Workers (not Cloudflare Pages at the moment!) supports the `wasmTransformer` that offers improved performance.

If you are interested in using this faster transformer, follow the [Web Assembly tutorial](./web-assembly.md).

## Resolver for Cloudflare Workers
By default, `remix-image` will work on Cloudflare Workers if all assets are being fetched from another server.
If you are trying to serve assets stored in your app's `public` directory, you must use the `kvResolver`.

If you would like to use both `fetchResolver` and `fsResolver`, you can create a custom resolver as shown below:
```typescript jsx
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
  Resolver
} from "remix-image/serverPure";

export const myResolver: Resolver = async (asset, url, options) => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return kvResolver(asset, url, options);
  } else {
    return fetchResolver(asset, url, options);
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


## Resolver for Cloudflare Pages
By default, `remix-image` will work on Cloudflare Pages if all assets are being fetched from another server.
If you are trying to serve assets stored in your app's `public` directory, you must create a custom resolver that uses info from the request:
```typescript jsx
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
  Resolver,
  MimeType,
  RemixImageError
} from "remix-image/serverPure";

const cache = new MemoryCache({
  maxSize: 5e7,
});

export const loader: LoaderFunction = ({ request, context }) => {
  const SELF_URL = context?.env?.SELF_URL || context?.SELF_URL;

  const resolver: Resolver = async (asset, url, options, basePath) => {
    if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
      const imageResponse = await context.ASSETS.fetch(url, request.clone());
      const arrBuff = await imageResponse.arrayBuffer();

      if (!arrBuff || arrBuff.byteLength < 2) {
        throw new RemixImageError("Invalid image retrieved from resolver!");
      }

      const buffer = new Uint8Array(arrBuff);
      const contentType = imageResponse.headers.get(
        "content-type"
      )! as MimeType;

      return {
        buffer,
        contentType,
      };
    } else {
      return fetchResolver(asset, url, options, basePath);
    }
  };

  const config = {
    selfUrl: SELF_URL,
    cache,
    resolver,
  };

  return imageLoader(config, request);
};
```

This setup also requires setting an environment variable `SELF_URL` with the URL of your server.
For development, you can set the following script in your `package.json`:
```json
"dev:wrangler": "cross-env NODE_ENV=development wrangler pages dev ./public --binding \"SELF_URL\"=\"http://localhost:8788\"",
```
For production, you should create the environment variable `SELF_URL` on the [Cloudflare website](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables).

For an example project hosted on Cloudflare Pages, look at [this example](https://github.com/Josh-McFarlin/remix-image/tree/master/examples/cloudflare-pages).
