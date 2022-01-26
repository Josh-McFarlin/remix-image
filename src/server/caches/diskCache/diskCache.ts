import BaseCache from "hybrid-disk-cache";
import { CacheConfig, Cache } from "../../../types/cache";
import { fromBuffer } from "../../../utils/fileType";

export interface DiskCacheConfig extends CacheConfig {
  /**
   * Path: the relative path where the cache should be stored
   */
  path: string;
}

export class DiskCache extends Cache {
  config: DiskCacheConfig;
  cache: BaseCache;

  constructor(config: Partial<DiskCacheConfig> | null | undefined = {}) {
    super();

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
    let contentType: string;

    if (!(await this.has(key))) {
      return null;
    }

    const cacheValue = (await this.cache.get(key))!;
    try {
      contentType = fromBuffer(cacheValue);
    } catch {
      contentType = "image/svg+xml";
    }

    await this.cache.set(key, cacheValue);

    return {
      resultImg: cacheValue,
      contentType,
    };
  }

  async set(key: string, resultImg: Buffer): Promise<void> {
    await this.cache.set(key, resultImg);
  }

  async clear(): Promise<void> {
    await this.cache.purge();
  }
}
