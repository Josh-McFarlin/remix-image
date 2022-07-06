---
sidebar_position: 5
---

# Loader

Create a new resource route that imports the `imageLoader` function and exports as `loader`.
By default, the image component uses the route `"/api/image"`, but any route can be used.
```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader, DiskCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

## Options
|          Name          |              Type              | Required |       Default       |                                                   Description                                                    |
|:----------------------:|:------------------------------:|:--------:|:-------------------:|:----------------------------------------------------------------------------------------------------------------:|
|        selfUrl         |             string             |   Yes    |                     |                                           The URL of the local server.                                           |
|        resolver        |            Resolver            |          |    fetchResolver    |                                            The image resolver to use.                                            |
|      transformer       |      Transformer or null       |          |   pureTransformer   | A transformer function that handles mutations of images. If this option is null, transformation will be skipped. |
|   useFallbackFormat    |            boolean             |          |        true         |           If RemixImage should fallback to the fallback mime type if the output type is not supported.           |
|     fallbackFormat     |            MimeType            |          |    MimeType.PNG     |             The output mime type the image should fallback to if the provided type is not supported.             |
| useFallbackTransformer |            boolean             |          |        true         |              If RemixImage should fallback to the default transformer if custom transformer fails.               |
|  fallbackTransformer   |          Transformer           |          |   pureTransformer   |                 The transformer the loader should use if the provided custom transformer fails.                  |
|         cache          |             Cache              |          |                     |            The configuration for the local image cache. Setting this to null will disable the cache.             |
|     defaultOptions     | Partial&lt;SizelessOptions&gt; |          |                     |                        Default TransformOptions to use, can be overridden by the client.                         |
|     redirectOnFail     |            boolean             |          |        false        |                              Redirect image to original source if RemixImage fails.                              |
|      skipFormats       |  Set&lt;MimeType&gt; or null   |          | Set([MimeType.SVG]) |                       A set of mime types that should be returned without transformation.                        |
|        basePath        |             string             |          |      "public"       |                                    The base file path used for the resolver.                                     |

## Cache Types
| Name        | Description                                                                                                                                                         | Options                                               |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| DiskCache   | A cache that stores images in memory and on disk (depending on size) for the best efficiency. To use, install the `@next-boost/hybrid-disk-cache` library from npm. | { path: string, ttl: number, tbd: number }            |
| MemoryCache | A cache that only stores images in memory. Designed for platforms that do not have native disk access like Cloudflare.                                              | { maxSize: number (bytes), ttl: number, tbd: number } |

**Note:**
Due to [Remix request purging](https://remix.run/docs/en/v1.1.1/other-api/serve), `MemoryCache` will clear itself automatically on each request in development. This will not occur during production, and it will perform as expected.

## Transformer Types
| Name            | Description                                                                                                                                                              |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pureTransformer | The default image transformer, supports all platforms at the cost of performance.                                                                                        |
| sharp           | A faster image transformer that uses the file-system, offers the best performance. To use, take a look at **[these docs](./tutorial-extras/sharp.md)**.                  |

**Note:**
By default, Remix-Image uses `pureTransformer`, which supports image transformations for the following types: `JPEG`, `PNG`, `GIF` (non-animated), `BMP`, and `TIFF`.
If you would like to use additional file types, you must use a custom transformer.

## Resolver Types
| Name          | Description                                                                                                                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fetchResolver | The default image resolver, fetches images over the network.                                                                                                                                  |
| fsResolver    | An image resolver that retrieves local images from the file-system.                                                                                                                           |
| kvResolver    | A resolver for assets stored in Workers KV (for retrieving local images on Remix projects hosted on Cloudflare Workers.) To use, install the `@cloudflare/kv-asset-handler` library from npm. |

You can create a custom resolver by combining resolvers and passing this to the loader options:

```typescript jsx
import {
  imageLoader,
  MemoryCache,
  fsResolver,
  fetchResolver,
  Resolver
} from "remix-image/server";

export const myResolver: Resolver = async (asset, url, options, basePath) => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
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
