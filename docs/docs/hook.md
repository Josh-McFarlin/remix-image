---
sidebar_position: 7
---

# Hook

Optionally, this library also exports the hook used to generate responsive props for images.
In most use cases you can simply use the `Image` component, but you might need the hook for custom components.

```typescript jsx
import { useResponsiveImage, remixImageLoader } from "remix-image";

const Image: React.FC<ImageProps> = ({
  className,
  loaderUrl = "/api/image",
  responsive = [],
  ...imgProps
}) => {
  const responsiveProps = useResponsiveImage(imgProps, responsive, [1], loaderUrl, remixImageLoader);

  return (
    <img
      className={clsx(classes.root, className)}
      {...imgProps}
      {...responsiveProps}
    />
  );
};
```

## Parameters
|    Name     |                                Type                                |                                 Required                                  |       Default       |                                                  Description                                                  |
|:-----------:|:------------------------------------------------------------------:|:-------------------------------------------------------------------------:|:-------------------:|:-------------------------------------------------------------------------------------------------------------:|
|  imgProps   |                          { src: string }                           |                                    Yes                                    |                     |                                The props to be passed to the base img element.                                |
| responsive  | { size: { width: number; height: number; }; maxWidth?: number; }[] |                                                                           |        `[]`         |                                         An array of responsive sizes.                                         |
|   options   |                          TransformOptions                          |                                                                           |                     |              TransformOptions that can be used to override the defaults provided to the loader.               |
| dprVariants |                         number or number[]                         |                                                                           |        `[1]`        | Different DPR variants to generate images for. This value will always be merged into an array with value [1]. |
|  loaderUrl  |                               string                               | Yes when using `cloudinaryLoader` or `imgixLoader` for `loader` parameter |   `"/api/image"`    |                                 The path of the image loader resource route.                                  |
|   loader    |                            ClientLoader                            |                                                                           | `remixImageLoader`  |                         The ClientLoader to use for generating the transformed image.                         |

### ClientLoader Options
By default, `remixImageLoader` is used. If you would like to use an external ClientLoader, please refer to the [ClientLoader documentation](./client-loader.md). 

### TransformOptions
```typescript
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
  position?: ImagePosition | string | number;
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
  /** The number of pixels to blur the image by. (optional, default null) */
  blurRadius?: number | null;
  /** The number of degrees to rotate the image by. (optional, default null) */
  rotate?: number | null;
  /** The direction to mirror the image by. (optional, default null) */
  flip?: FlipDirection | null;
  /** The location to crop the source image before any other operations are applied. (optional, default null) */
  crop?: CropOptions | null;
}
```
