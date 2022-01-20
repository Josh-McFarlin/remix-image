import FileType from "file-type";
import Cache from "hybrid-disk-cache";

type CacheConfig = {
  path: string;
  ttl: number;
  tbd: number;
};

const generateKey = (
  width: string,
  quality: string,
  src: string,
  webp: boolean
) => `${width}_${quality}_${src}_${webp}`;

class ImageCache {
  config: CacheConfig = {
    path: "tmp/img",
    ttl: 24 * 60 * 60,
    tbd: 365 * 24 * 60 * 60,
  };
  cache: Cache | null = null;

  constructor(config: Partial<CacheConfig> | null | undefined) {
    if (config) {
      this.config = {
        ...this.config,
        ...config,
      };

      this.cache = new Cache(this.config);
    }
  }

  get isUsing(): boolean {
    return this.cache != null;
  }

  async has(
    src: string,
    width: string,
    quality: string,
    webpSupport = false
  ): Promise<boolean> {
    if (!this.cache) {
      throw new Error("Cache is not in use!");
    }

    const cacheKey = generateKey(width, quality, src, webpSupport);

    return (await this.cache.has(cacheKey)) !== "miss";
  }

  async status(
    src: string,
    width: string,
    quality: string,
    webpSupport = false
  ): Promise<string> {
    if (!this.cache) {
      throw new Error("Cache is not in use!");
    }

    const cacheKey = generateKey(width, quality, src, webpSupport);

    return this.cache.has(cacheKey);
  }

  async get(
    src: string,
    width: string,
    quality: string,
    webpSupport = false
  ): Promise<{ resultImg: Buffer; contentType: string } | null> {
    if (!this.cache) {
      throw new Error("Cache is not in use!");
    }

    let cacheValue: Buffer | undefined;
    let resultImg: Buffer | undefined;
    let contentType: string | undefined;
    const cacheKey = generateKey(width, quality, src, webpSupport);

    if ((await this.cache.has(cacheKey)) !== "miss") {
      cacheValue = await this.cache.get(cacheKey);
    }

    if (cacheValue) {
      try {
        contentType = (await FileType.fromBuffer(cacheValue))!.mime!;
      } catch {
        contentType = "image/svg+xml";
      }

      resultImg = cacheValue;

      await this.cache.set(cacheKey, resultImg);

      return {
        resultImg,
        contentType,
      };
    }

    return null;
  }

  async set(
    src: string,
    width: string,
    quality: string,
    webpSupport = false,
    resultImg: Buffer
  ): Promise<void> {
    if (!this.cache) {
      throw new Error("Cache is not in use!");
    }

    const cacheKey = generateKey(width, quality, src, webpSupport);

    await this.cache.set(cacheKey, resultImg);
  }

  async clear(): Promise<void> {
    if (!this.cache) {
      throw new Error("Cache is not in use!");
    }

    await this.cache.purge();
  }
}

export default ImageCache;
