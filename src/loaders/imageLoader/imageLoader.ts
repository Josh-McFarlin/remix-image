import fs from "fs";
import path from "path";
import { Request as NodeRequest } from "@remix-run/node/fetch";
import type { LoaderFunction } from "@remix-run/server-runtime";
import FileType from "file-type";
import Cache from "hybrid-disk-cache";
import sharp from "sharp";

const textResponse = (status: number, message = ""): Response =>
  new Response(message, {
    status,
  });

const imageResponse = (
  file: any,
  status: number,
  contentType: string,
  cacheControl: string
): Response =>
  new Response(file, {
    status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  });

const fetchImage = async (
  src: string,
  width: string,
  quality: string,
  allowWebP = false
) => {
  let contentType: string | undefined;
  let resultImg: Buffer | undefined;
  let buffer: Buffer | undefined;

  if (src.startsWith("/") && (src.length === 1 || src[1] !== "/")) {
    const filePath = path.resolve("public", src.slice(1));

    buffer = fs.readFileSync(filePath);
    contentType = (await FileType.fromFile(filePath))?.mime || "image/svg+xml";
  } else {
    const imgRequest = new Request(src.toString()) as unknown as NodeRequest;

    const imageResponse = await fetch(imgRequest as unknown as Request);

    const arrBuff = await imageResponse.arrayBuffer();
    buffer = Buffer.from(arrBuff);
    contentType = imageResponse.headers.get("content-type")!;
  }

  if (contentType === "image/svg+xml") {
    contentType = "image/svg+xml";
    resultImg = buffer;
  } else {
    const image = sharp(buffer);

    image
      .resize({
        width: parseInt(width),
      })
      .jpeg({
        quality: parseInt(quality),
        progressive: true,
        force: false,
      })
      .png({
        progressive: true,
        compressionLevel: 9,
        force: false,
      });

    if (allowWebP) {
      image.webp({
        quality: parseInt(quality),
      });
    }

    resultImg = await image.toBuffer();
    contentType = (await FileType.fromBuffer(resultImg))?.mime;
  }

  return {
    resultImg: resultImg,
    contentType: contentType,
  };
};

const decodeQuery = (
  queryParams: URLSearchParams,
  key: string
): string | null =>
  queryParams.has(key) ? decodeURIComponent(queryParams.get(key)!) : null;

const generateKey = (
  width: string,
  quality: string,
  src: string,
  webp: boolean
) => `${width}_${quality}_${src}_${webp}`;

interface LoaderOptions {
  selfUrl: string;
  whitelistedDomains?: string[];
  cache?: {
    path?: string;
    ttl?: number;
    tbd?: number;
  } | null;
}

const imageLoader = (options: LoaderOptions): LoaderFunction => {
  const selfUrl = new URL(options.selfUrl);
  const whitelistedDomains = new Set([
    ...(options.whitelistedDomains || []),
    selfUrl.host,
  ]);

  const cache = new Cache({
    path: "tmp/img",
    ttl: 24 * 60 * 60,
    tbd: 365 * 24 * 60 * 60,
  });

  return async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const width = decodeQuery(url.searchParams, "width") || "";
    const height = decodeQuery(url.searchParams, "height") || "";
    const quality = decodeQuery(url.searchParams, "quality") || "80";
    const src = decodeQuery(url.searchParams, "src") || "";

    const webpSupport =
      request.headers.has("accept") &&
      request.headers.get("accept")!.includes("image/webp");

    let cacheValue;
    let resultImg;
    let contentType: string;
    const cacheKey = generateKey(width, quality, src, webpSupport);

    if ((await cache.has(cacheKey)) !== "miss") {
      if ((await cache.has(cacheKey)) == "stale") {
        setTimeout(async () => {
          const myUrl = new URL(src, selfUrl);
          const res = await fetchImage(
            myUrl.toString(),
            width,
            quality,
            webpSupport
          );

          resultImg = res.resultImg;
          contentType = res.contentType!;

          await cache.set(cacheKey, resultImg);
        }, 1000);
      }

      cacheValue = await cache.get(cacheKey);
    }

    if (cacheValue) {
      try {
        contentType = (await FileType.fromBuffer(cacheValue))!.mime!;
      } catch {
        contentType = "image/svg+xml";
      }

      resultImg = cacheValue;
    } else {
      const myUrl = new URL(src, selfUrl);

      if (!whitelistedDomains.has(myUrl.host)) {
        return textResponse(403, "Domain not allowed!");
      } else if (parseInt(width) > 4000) {
        return textResponse(406, "Requested Image too large!");
      } else {
        const res = await fetchImage(
          myUrl.toString(),
          width,
          quality,
          webpSupport
        );
        resultImg = res.resultImg;
        contentType = res.contentType!;
      }
    }

    await cache.set(cacheKey, resultImg);

    return imageResponse(
      resultImg,
      200,
      contentType,
      `private, max-age=${cache.ttl}, max-stale=${cache.tbd}`
    );
  };
};

export default imageLoader;
