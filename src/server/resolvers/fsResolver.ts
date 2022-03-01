import fs from "fs";
import path from "path";
import isSvg from "is-svg";
import mimeFromBuffer from "mime-tree";
import { RemixImageError, UnsupportedImageError } from "../../types/error";
import { MimeType } from "../../types/file";
import type { Resolver } from "../../types/resolver";

export const fsResolver: Resolver = async (asset, _url, _options, basePath) => {
  const filePath = path.resolve(basePath, asset.slice(1));

  const buffer = fs.readFileSync(filePath);

  if (!buffer || buffer.byteLength < 2) {
    throw new RemixImageError("Invalid image retrieved from resolver!");
  }

  let contentType: MimeType | null = null;
  try {
    contentType = mimeFromBuffer(buffer);
  } catch (error) {
    if (isSvg(new TextDecoder().decode(buffer))) {
      contentType = MimeType.SVG;
    } else {
      throw new UnsupportedImageError("Buffer is not a supported image type!");
    }
  }

  return {
    buffer: new Uint8Array(buffer),
    contentType,
  };
};
