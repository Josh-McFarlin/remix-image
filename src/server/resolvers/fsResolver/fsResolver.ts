import fs from "fs";
import path from "path";
import type { Resolver } from "../../../types/resolver";
import { fromBuffer } from "../../../utils/fileType";

export const fsResolver: Resolver = async (asset) => {
  const filePath = path.resolve("public", asset.slice(1));

  const buffer = fs.readFileSync(filePath);
  const contentType = fromBuffer(buffer) || "image/svg+xml";

  return {
    buffer,
    contentType,
  };
};
