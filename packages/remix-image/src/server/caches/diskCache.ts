import { tmpdir } from "os";
import Keyv from "keyv";
import { KeyvFile } from "keyv-file";
import { CacheConfig, Cache, CacheStatus } from "../../types/cache";

export interface DiskCacheConfig extends CacheConfig {
  /**
   * Path: the relative path where the cache should be stored
   */
  path: string;
}

export class DiskCache extends Cache {
  config: DiskCacheConfig;
  cache: Keyv<Uint8Array>;

  constructor(config: Partial<DiskCacheConfig> | null | undefined = {}) {
    super();

    this.config = {
      path: config?.path ?? `${tmpdir()}/img`,
      ttl: config?.ttl ?? 24 * 60 * 60,
      tbd: config?.tbd ?? 365 * 24 * 60 * 60,
    };

    // @ts-ignore Fix deserialize field having wrong type
    this.cache = new Keyv<Uint8Array>({
      store: new KeyvFile<Uint8Array>({
        filename: `${this.config.path}/images.json`,
        expiredCheckDelay: this.config.tbd,
        writeDelay: 100,
      }),
      ttl: this.config.ttl,
      serialize: (item) => item.value.toString(),
      deserialize: (val) => Uint8Array.from(val.split(",").map(parseInt)),
    });
  }

  async status(key: string): Promise<CacheStatus> {
    return (await this.cache.has(key)) ? CacheStatus.HIT : CacheStatus.MISS;
  }

  async has(key: string): Promise<boolean> {
    return (await this.status(key)) !== CacheStatus.MISS;
  }

  async get(key: string): Promise<Uint8Array | null> {
    if (!(await this.has(key))) {
      return null;
    }

    return (await this.cache.get(key))!;
  }

  async set(key: string, resultImg: Uint8Array): Promise<void> {
    await this.cache.set(key, resultImg, this.config.ttl);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }
}
