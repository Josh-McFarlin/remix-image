---
sidebar_position: 5
---

# Loader

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

## Options
|        Name        |    Type     | Required |     Default     |                                                    Description                                                     |
|:------------------:|:-----------:|:--------:|:---------------:|:------------------------------------------------------------------------------------------------------------------:|
|      selfUrl       |   string    |    X     |                 |                                            The URL of the local server.                                            |
|       cache        |    Cache    |          |                 |             The configuration for the local image cache. Setting this to null will disable the cache.              |
|    transformer     | Transformer |          | pureTransformer |                                      The image transformation library to use.                                      |
|      resolver      |  Resolver   |          |  fetchResolver  |                                             The image resolver to use.                                             |

## Cache Types

| Name        | Description                                                                                                                            | Options                                               |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| DiskCache   | A cache that stores images in memory and on disk (depending on size) for the best efficiency. To use, install the `hybrid-disk-cache` library from npm. | { path: string, ttl: number, tbd: number }            |
| MemoryCache | A cache that only stores images in memory. Designed for platforms that do not have native disk access like Cloudflare.                 | { maxSize: number (bytes), ttl: number, tbd: number } |

**Note:**
Due to [remix request purging](https://remix.run/docs/en/v1.1.1/other-api/serve), `MemoryCache` will clear itself automatically on each request in development. This will not occur during production, and it will perform as expected.

## Transformer Types
| Name            | Description                                                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------|
| pureTransformer | The default image transformer, supports all platforms at the cost of performance.                                                |
| sharp           | A faster image transformer that uses the file-system, offers the best performance. To use, install the `sharp` library from npm. |

## Resolver Types
| Name          | Description                                                                                                               |
|---------------|---------------------------------------------------------------------------------------------------------------------------|
| fetchResolver | The default image resolver, fetches images over the network.                                                              |
| fsResolver    | An image resolver that retrieves local images from the file-system.                                                       |
| kvResolver    | A resolver for assets stored in Workers KV (for retrieving local images on Remix projects hosted on Cloudflare Workers.) To use, install the `@cloudflare/kv-asset-handler` library from npm. |

You can create a custom resolver by combining resolvers and passing this to the loader options:

```typescript jsx
import {
  imageLoader,
  MemoryCache,
  fsResolver,
  fetchResolver,
} from "remix-image/server";

export const myResolver = async (
  asset: string,
  url: string
): Promise<{
  buffer: Buffer;
  contentType: string;
}> => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return fsResolver(asset, url);
  } else {
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

## Cloudflare / Platforms Without File-System Access
Some platforms like Cloudflare Workers do not support file-systems and Node packages.
In this case, several options need to be provided to the loader config, so take a look at **[these docs](./tutorial-extras/cloudflare.md)**.
