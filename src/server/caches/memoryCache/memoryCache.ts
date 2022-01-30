import { Cache, CacheConfig, CacheStatus } from "../../../types/cache";
import { LRU } from "../../../utils/lru";

export interface MemoryCacheConfig extends CacheConfig {
  /**
   * Max Size: the max size of the cache in bytes
   */
  maxSize: number;
}

export class MemoryCache extends Cache {
  config: MemoryCacheConfig;
  cache: LRU<Buffer>;

  constructor(config: Partial<MemoryCacheConfig> | null | undefined = {}) {
    super();

    this.config = {
      maxSize: 5e7, // 50 MB
      ttl: 24 * 60 * 60,
      tbd: 365 * 24 * 60 * 60,
      ...config,
    };

    this.cache = new LRU<Buffer>(this.config.maxSize);
  }

  async status(key: string): Promise<CacheStatus> {
    return this.cache.has(key) ? CacheStatus.HIT : CacheStatus.MISS;
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async get(key: string): Promise<Buffer | null> {
    if (!(await this.has(key))) {
      return null;
    }

    const cacheValue = this.cache.get(key)!;

    this.cache.set(key, cacheValue, Buffer.byteLength(cacheValue));

    return cacheValue;
  }

  async set(key: string, resultImg: Buffer): Promise<void> {
    this.cache.set(key, resultImg, Buffer.byteLength(resultImg));
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}
