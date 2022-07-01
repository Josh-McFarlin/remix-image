import { TransformOptions } from "./transformer";

export type ClientLoader = (
  src: string,
  loaderUrl: string,
  loaderOptions: TransformOptions
) => string;
