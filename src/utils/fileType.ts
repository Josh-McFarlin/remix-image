import { RemixImageError, UnsupportedImageError } from "../types/error";
import { MimeType } from "../types/file";

const check = (buffer: Uint8Array, headers: number[], offset = 0): boolean =>
  headers.every((val, index) => val === buffer[index + offset]);

const getMagicNumbers = (
  buffer: Uint8Array,
  offset: number,
  length: number
): string =>
  Array.from(buffer.slice(offset, offset + length))
    .map((i) => ("0" + i.toString(16)).slice(-2))
    .join("");

export const mimeFromBuffer = (buffer: Uint8Array): MimeType => {
  if (!buffer || buffer.byteLength < 1) {
    throw new RemixImageError("Buffer is not a valid image!");
  }

  if (check(buffer, [0xff, 0xd8, 0xff])) {
    return MimeType.JPEG;
  } else if (check(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return MimeType.PNG;
  } else if (check(buffer, [0x47, 0x49, 0x46])) {
    return MimeType.GIF;
  } else if (check(buffer, [0x57, 0x45, 0x42, 0x50], 8)) {
    return MimeType.WEBP;
  } else if (
    check(buffer, [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66], 4)
  ) {
    return MimeType.AVIF;
  } else if (
    check(buffer, [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x73], 4)
  ) {
    return MimeType.AVIF;
  } else if (check(buffer, [0x42, 0x4d])) {
    return MimeType.BMP;
  } else if (check(buffer, [0x49, 0x49, 0x2a, 0x00])) {
    return MimeType.TIFF;
  } else if (check(buffer, [0x4d, 0x4d, 0x00, 0x2a])) {
    return MimeType.TIFF;
  } else {
    const magic = getMagicNumbers(buffer, 0, 8);

    throw new UnsupportedImageError(
      `Unsupported file type with magic numbers: ${magic}`
    );
  }
};
