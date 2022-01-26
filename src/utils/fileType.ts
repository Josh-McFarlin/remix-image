import { RemixImageError } from "../types/error";
import type { MimeType } from "../types/file";

const check = (buffer: Buffer, headers: number[], offset = 0): boolean =>
  headers.every((val, index) => val === buffer[index + offset]);

const getMagicNumbers = (buffer: Buffer, length: number, offset = 0): string =>
  buffer.slice(offset, offset + length).toString("hex");

export const fromBuffer = (buffer: Buffer): MimeType => {
  if (!buffer || buffer.byteLength < 1) {
    throw new RemixImageError("Buffer is not a valid image!");
  }

  if (check(buffer, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  } else if (check(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return "image/png";
  } else if (check(buffer, [0x57, 0x45, 0x42, 0x50], 8)) {
    return "image/webp";
  } else if (check(buffer, [0x47, 0x49, 0x46])) {
    return "image/gif";
  } else if (check(buffer, [0x42, 0x4d])) {
    return "image/bmp";
  }

  console.log("MAGIC NUMBERS:", getMagicNumbers(buffer, 8, 0));

  throw new RemixImageError("Buffer is not a supported image file type!");
};
