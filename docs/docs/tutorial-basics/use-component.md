---
sidebar_position: 3
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
/>
```

## PropTypes
|    Name    |                                Type                                | Required |   Default    |                                                                   Description                                                                    |
|:----------:|:------------------------------------------------------------------:|:--------:|:------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|
| loaderUrl  |                               string                               |          | "/api/image" | The path of the image loader resource route. The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`. |
| responsive | { size: { width: number; height: number; }; maxWidth?: number; }[] |          |      []      |                           An array of responsive sizes. The resource route is not called if this prop is not provided.                           |
|  options   |                          TransformOptions                          |          |              |                                TransformOptions that can be used to override the defaults provided to the loader.                                |


**Note**: The `Image` component extends the native `img` element, so any props used with `img` can be provided to the `Image` component.

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
