---
sidebar_position: 1
---

# Creating a Cache

You may want to create a Cache if you want to **store** transformed images on the server in a way that is not currently supported by this library.
An example could be storing images in a Cloud storage provider such as AWS S3 or Google Cloud Storage.

## Instructions

To make your own, just make a class that follows the [Cache format](https://github.com/Josh-McFarlin/remix-image/blob/master/packages/remix-image/src/types/cache.ts):
```typescript
export interface CacheConfig {
  /**
   * Time To Live: how long a key should remain in the cache
   */
  ttl: number;
  /**
   * Time Before Deletion: how long a key should remain in the cache after expired (ttl)
   */
  tbd: number;
}

export enum CacheStatus {
  /**
   * The cache contains the key and it has not yet expired
   */
  HIT = "hit",
  /**
   * The cache contains the key but it has expired
   */
  STALE = "stale",
  /**
   * The cache does not contain the key
   */
  MISS = "miss",
}

export abstract class Cache {
  abstract config: CacheConfig;

  abstract has(key: string): Promise<boolean>;

  abstract status(key: string): Promise<CacheStatus>;

  abstract get(key: string): Promise<Uint8Array | null>;

  abstract set(key: string, resultImg: Uint8Array): Promise<void>;

  abstract clear(): Promise<void>;
}
```

You will then provide an instance of this class to the `cache` field of the ‘loader’ config
```typescript jsx
import type { LoaderFunction } from "remix";
import { imageLoader } from "remix-image/server";
import MyCache from "...";

const config = {
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
  cache: new MyCache(),
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
```

## Examples

* [diskCache](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image/src/server/caches/diskCache)
* [memoryCache](https://github.com/Josh-McFarlin/remix-image/tree/master/packages/remix-image/src/server/caches/memoryCache)

## Show Off

Create something cool that you think others would use? Upload it to GitHub and [show it off on the Remix-Image repo](https://github.com/Josh-McFarlin/remix-image/discussions/3)!