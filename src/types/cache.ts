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

export abstract class Cache {
  abstract config: CacheConfig;

  abstract has(key: string): Promise<boolean>;

  abstract status(key: string): Promise<"hit" | "stale" | "miss">;

  abstract get(key: string): Promise<{
    resultImg: Buffer;
    contentType: string;
  } | null>;

  abstract set(key: string, resultImg: Buffer): Promise<void>;

  abstract clear(): Promise<void>;
}
