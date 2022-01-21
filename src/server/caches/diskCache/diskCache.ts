import FileType from "file-type";
import BaseCache from "hybrid-disk-cache";
import { CacheConfig, Cache } from "../../../types/cache";

export interface DiskCacheConfig extends CacheConfig {
  /**
   * Path: the relative path where the cache should be stored
   */
  path: string;
}

export class DiskCache implements Cache {
  config: DiskCacheConfig;
  cache: BaseCache;

  constructor(config: Partial<DiskCacheConfig> | null | undefined = {}) {
    this.config = {
      path: "tmp/img",
      ttl: 24 * 60 * 60,
      tbd: 365 * 24 * 60 * 60,
      ...config,
    };

    this.cache = new BaseCache(this.config);
  }

  async has(key: string): Promise<boolean> {
    return (await this.cache.has(key)) !== "miss";
  }

  async status(key: string): Promise<"hit" | "stale" | "miss"> {
    return this.cache.has(key);
  }

  async get(key: string): Promise<{
    resultImg: Buffer;
    contentType: string;
  } | null> {
    let cacheValue: Buffer | undefined;
    let resultImg: Buffer;
    let contentType: string;

    if ((await this.cache.has(key)) !== "miss") {
      cacheValue = await this.cache.get(key);
    }

    if (cacheValue) {
      try {
        contentType = (await FileType.fromBuffer(cacheValue))!.mime;
      } catch {
        contentType = "image/svg+xml";
      }

      resultImg = cacheValue;

      await this.cache.set(key, resultImg);

      return {
        resultImg,
        contentType,
      };
    }

    return null;
  }

  async set(key: string, resultImg: Buffer): Promise<void> {
    await this.cache.set(key, resultImg);
  }

  async clear(): Promise<void> {
    await this.cache.purge();
  }
}
