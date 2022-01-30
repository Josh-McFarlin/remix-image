import { MimeType } from "./file";

export type ResponsiveSize = {
  size: {
    width: number;
    height?: number;
  };
  maxWidth?: number;
};

export enum ImageFit {
  CONTAIN = "contain",
  COVER = "cover",
  FILL = "fill",
  INSIDE = "inside",
  OUTSIDE = "outside",
}

export interface ResizeOptions {
  /** The content type of the resulting image, uses source type if not defined. */
  contentType?: MimeType;
  /** Width of resulting image. */
  width?: number | null;
  /** Height of resulting image. If width is present, this take priority. */
  height?: number | null;
  /** How the image should be resized to fit both provided dimensions, one of cover, contain, fill, inside or outside. (optional, default 'cover') */
  fit?: ImageFit;
  /** Position, gravity or strategy to use when fit is cover or contain. (optional, default 'center') */
  position?: number | string;
  /** Background colour when using a fit of contain, parsed by the color module, defaults to black without transparency. (optional, default {r:0,g:0,b:0,alpha:1}) */
  background?: string;
  /** Quality, integer 1-100 (optional, default 80) */
  quality?: number;
  /** zlib compression level, 0-9 (optional, default 9) */
  compressionLevel?: number;
  /** Number of animation iterations, use 0 for infinite animation (optional, default 0) */
  loop?: number;
  /** List of delays between animation frames (in milliseconds) */
  delay?: number[] | null;
  /** Redirect image to original source if RemixImage fails (optional, default false) */
  redirectOnFail?: boolean;
}
