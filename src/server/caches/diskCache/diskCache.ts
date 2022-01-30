import BaseCache from "hybrid-disk-cache";
import { CacheConfig, Cache, CacheStatus } from "../../../types/cache";

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

  async status(key: string): Promise<CacheStatus> {
    return (await this.cache.has(key)) as CacheStatus;
  }

  async has(key: string): Promise<boolean> {
    return (await this.status(key)) !== CacheStatus.MISS;
  }

  async get(key: string): Promise<Buffer | null> {
    if (!(await this.has(key))) {
      return null;
    }

    const cacheValue = (await this.cache.get(key))!;

    await this.cache.set(key, cacheValue);

    return cacheValue;
  }

  async set(key: string, resultImg: Buffer): Promise<void> {
    await this.cache.set(key, resultImg);
  }

  async clear(): Promise<void> {
    await this.cache.purge();
  }
}
