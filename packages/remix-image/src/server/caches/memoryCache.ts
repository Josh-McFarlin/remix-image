import LRU from "lru-cache";
import { Cache, CacheConfig, CacheStatus } from "../../types/cache";
import { mB } from "../../utils/cache";

export interface MemoryCacheConfig extends CacheConfig {
  /**
   * Max Size: the max size of the cache in bytes
   */
  maxSize: number;
}

export class MemoryCache extends Cache {
  config: MemoryCacheConfig;
  cache: LRU<string, Uint8Array>;

  constructor(config: Partial<MemoryCacheConfig> | null | undefined = {}) {
    super();

    this.config = {
      maxSize: config?.maxSize ?? mB(50),
      ttl: config?.ttl ?? 24 * 60 * 60,
      tbd: config?.tbd ?? 365 * 24 * 60 * 60,
    };

    this.cache = new LRU<string, Uint8Array>({
      ttl: this.config.ttl,
      allowStale: true,
      updateAgeOnGet: true,
      maxSize: this.config.maxSize,
      sizeCalculation: (value) => value.byteLength,
    });
  }

  async status(key: string): Promise<CacheStatus> {
    return this.cache.has(key) ? CacheStatus.HIT : CacheStatus.MISS;
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async get(key: string): Promise<Uint8Array | null> {
    return this.cache.get(key) ?? null;
  }

  async set(key: string, resultImg: Uint8Array): Promise<void> {
    this.cache.set(key, resultImg, {
      size: resultImg.byteLength,
    });
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}
