---
sidebar_position: 4
---

# Use Component

Import the `Image` component and specify the url to the resource route used by the `imageLoader` function.
The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`.

```typescript jsx
import Image from "remix-image";

<Image
  loaderUrl="/api/image"
  src="..."
  responsive={[
    {
      size: {
        width: 100,
        height: 100,
      },
      maxWidth: 200,
    },
  ]}
  dprVariants={[1, 3]}
/>
```

## PropTypes
|    Name     |                                Type                                |                               Required                               |       Default       |                                                                   Description                                                                    |
|:-----------:|:------------------------------------------------------------------:|:--------------------------------------------------------------------:|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|
|  loaderUrl  |                               string                               | Yes when using `cloudinaryLoader` or `imgixLoader` for `loader` prop |   `"/api/image"`    | The path of the image loader resource route. The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`. |
|   loader    |                            ClientLoader                            |                                                                      | `remixImageLoader`  |                                          The ClientLoader to use for generating the transformed image.                                           |
| responsive  | { size: { width: number; height: number; }; maxWidth?: number; }[] |                                                                      |        `[]`         |                           An array of responsive sizes. The resource route is not called if this prop is not provided.                           |
|   options   |                          TransformOptions                          |                                                                      |        `{}`         |                                TransformOptions that can be used to override the defaults provided to the loader.                                |
| dprVariants |                         number or number[]                         |                                                                      |        `[1]`        |                  Different DPR variants to generate images for. This value will always be merged into an array with value [1].                   |

### ClientLoader Options
By default, `remixImageLoader` is used. If you would like to use an external ClientLoader, please refer to the [ClientLoader documentation](../client-loader.md).

**Note**: The `Image` component extends the native `img` element, so any props used with `img` can be provided to the `Image` component.

### TransformOptions
```typescript
export interface TransformOptions {
  /** Width of resulting image. (optional, default null) */
  width?: number | null;
  /** Height of resulting image. If width is present, this takes priority. (optional, default null) */
  height?: number | null;
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
