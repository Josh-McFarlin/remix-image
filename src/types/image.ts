import { MimeType } from "./file";

export type ResponsiveSize = {
  size: {
    width: number;
    height?: number;
  };
  maxWidth?: number;
};

/** RGBA hex values 0...255 */
export type Color = [number, number, number, number];

export enum ImageFit {
  CONTAIN = "contain",
  COVER = "cover",
  FILL = "fill",
  INSIDE = "inside",
  OUTSIDE = "outside",
}

export enum ImagePosition {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export interface TransformOptions {
  /** Width of resulting image. */
  width: number;
  /** Height of resulting image. If width is present, this take priority. */
  height?: number;
  /** The content type of the resulting image. (optional, default source type) */
  contentType?: MimeType;
  /** How the image should be resized to fit both provided dimensions. (optional, default 'contain') */
  fit?: ImageFit;
  /** Position to use when fit is cover or contain. (optional, default 'center') */
  position?: ImagePosition;
  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */
  background?: Color;
  /** Quality, integer 1-100. (optional, default 80) */
  quality?: number;
  /** zlib compression level, 0-9. (optional, default 9) */
  compressionLevel?: number;
  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */
  loop?: number;
  /** Delay between animation frames (in milliseconds). (optional, default 100) */
  delay?: number;
}

export type SizelessOptions = Omit<TransformOptions, "width" | "height">;
