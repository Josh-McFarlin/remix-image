export type ImageTransformer = (
  buffer: Buffer,
  options: {
    width: number;
    quality: number;
    allowWebP: boolean;
  }
) => Promise<{
  resultImg: Buffer;
  contentType: string;
}>;
