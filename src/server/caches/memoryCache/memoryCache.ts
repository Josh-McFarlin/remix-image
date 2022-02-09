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
  cache: LRU<Uint8Array>;

  constructor(config: Partial<MemoryCacheConfig> | null | undefined = {}) {
    super();

    this.config = {
      maxSize: 5e7, // 50 MB
      ttl: 24 * 60 * 60,
      tbd: 365 * 24 * 60 * 60,
      ...config,
    };

    this.cache = new LRU<Uint8Array>(this.config.maxSize);
  }

  async status(key: string): Promise<CacheStatus> {
    return this.cache.has(key) ? CacheStatus.HIT : CacheStatus.MISS;
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async get(key: string): Promise<Uint8Array | null> {
    if (!(await this.has(key))) {
      return null;
    }

    const cacheValue = this.cache.get(key)!;

    this.cache.set(key, cacheValue, cacheValue.byteLength);

    return cacheValue;
  }

  async set(key: string, resultImg: Uint8Array): Promise<void> {
    this.cache.set(key, resultImg, resultImg.byteLength);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}
