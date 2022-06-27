import fs from "fs/promises";
import path from "path";
import { imageLoader, LoaderConfig, Resolver, MimeType } from "../build/server";
import { encodeQuery } from "../src/utils/url";

const fetchResolver: Resolver = async () => {
  return {
    buffer: await fs.readFile(path.join(__dirname, "fixtures/camera.png")),
    contentType: MimeType.PNG,
  };
};

const selfUrl = "http://localhost:3000";
const srcHost = "localhost:8000";
const src = encodeQuery(selfUrl, {
  src: encodeURI(`http://${srcHost}/image.png`),
  width: 300,
  height: 300,
});

describe("imageLoader", () => {
  test("should throw error on empty selfUrl", async () => {
    const config: LoaderConfig = {
      selfUrl: "",
      resolver: fetchResolver,
    };

    const req = new Request(src, {});

    await expect(imageLoader(config, req)).rejects.toThrow(
      "selfUrl is required in RemixImage loader config!"
    );
  });

  test("should throw error on empty imageUrl", async () => {
    const config: LoaderConfig = {
      selfUrl,
      resolver: fetchResolver,
    };

    const req = new Request("http://localhost:5000", {});

    await expect(imageLoader(config, req)).rejects.toThrow(
      "An image URL must be provided!"
    );
  });

  test("should throw error on empty imageUrl", async () => {
    const config: LoaderConfig = {
      selfUrl,
      resolver: fetchResolver,
    };

    const req = new Request(selfUrl, {});

    await expect(imageLoader(config, req)).rejects.toThrow(
      "An image URL must be provided!"
    );
  });

  test("should throw error for imageUrl on blacklist", async () => {
    const config: LoaderConfig = {
      selfUrl,
      blacklistedDomains: [srcHost],
      resolver: fetchResolver,
    };

    const req = new Request(src, {});

    await expect(imageLoader(config, req)).rejects.toThrow(
      "The requested image host is not allowed!"
    );
  });

  test("should throw error for imageUrl not on whitelist", async () => {
    const config: LoaderConfig = {
      selfUrl,
      whitelistedDomains: [],
      resolver: fetchResolver,
    };

    const req = new Request(src, {});

    await expect(imageLoader(config, req)).rejects.toThrow(
      "The requested image host is not included on the whitelist!"
    );
  });

  test("should allow any image host if no whitelist is set", async () => {
    const config: LoaderConfig = {
      selfUrl,
      resolver: fetchResolver,
    };

    const req = new Request(src, {});

    await expect(imageLoader(config, req)).resolves.toBeDefined();
  });

  test("should allow any image host if whitelist is null", async () => {
    const config: LoaderConfig = {
      selfUrl,
      whitelistedDomains: null,
      resolver: fetchResolver,
    };

    const req = new Request(src, {});

    await expect(imageLoader(config, req)).resolves.toBeDefined();
  });
});
