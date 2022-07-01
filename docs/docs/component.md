---
sidebar_position: 6
---

# Component

Remix-Image now has two Image components: `Image` and `BaseImage`.

**Note**: `BaseImage` is the same component as `Image` in Remix-Image before v1.2.0.
If you have encountered issues with the `Image` component after updating Remix-Image to v1.2.0 or later, try the `BaseImage` component.

## Optimized Component: `Image`

Use `Image` element if you would like to use the performance optimizations built into Remix-Image:
* Placeholder images before the full-size image loads
* Predict image size before loading to prevent layout shift
* Blur-in animation

Import the `Image` component and specify the url to the resource route used by the `imageLoader` function.

```typescript jsx
import { Image, remixImageLoader } from "remix-image";

<Image
  loaderUrl="/api/image"
  loader={remixImageLoader}
  src="..."
  width="..."
  height="..."
  alt="..."
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
|          Name          |                                Type                                |                               Required                               |       Default       |                                                                                                Description                                                                                                |
|:----------------------:|:------------------------------------------------------------------:|:--------------------------------------------------------------------:|:-------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|       loaderUrl        |                               string                               | Yes when using `cloudinaryLoader` or `imgixLoader` for `loader` prop |   `"/api/image"`    |                             The path of the image loader resource route. The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`.                              |
|         loader         |                            ClientLoader                            |                                                                      | `remixImageLoader`  |                                                                       The ClientLoader to use for generating the transformed image.                                                                       |
|       responsive       | { size: { width: number; height: number; }; maxWidth?: number; }[] |                                                                      |        `[]`         |                                                       An array of responsive sizes. The resource route is not called if this prop is not provided.                                                        |
|        options         |                          TransformOptions                          |                                                                      |        `{}`         |                                                            TransformOptions that can be used to override the defaults provided to the loader.                                                             |
|      dprVariants       |                         number or number[]                         |                                                                      |        `[1]`        |                                               Different DPR variants to generate images for. This value will always be merged into an array with value [1].                                               |
|      unoptimized       |                              boolean                               |                                                                      |       `false`       |                                            Set this prop to `true` to disable all image optimizations, which is equivalent to using the `BaseImage` component.                                            |
|      placeholder       |                         "blur" or "empty"                          |                                                                      |      `"empty"`      |                              The type of placeholder to show before the image has loaded. `"blur"` displays a scaled and blurred 15px image, while `"empty"` shows nothing.                               |
|      blurDataURL       |                           string or null                           |                                                                      |       `null`        | The small image to show when `placeholder` is `"blur"`, which can be a URL or Base64 image. If this prop is not set or set to `null` it will automatically generate a small image using the image loader. |
| placeholderAspectRatio |                           number or null                           |                                                                      |       `null`        |                     The aspect ratio to use for the placeholder before the full size image loads. If `null`, Remix-Image will try to predict this value using the `responsive` prop.                      |
|   onLoadingComplete    |                     OnLoadingComplete or null                      |                                                                      |       `null`        |                                                       A callback function that receives the dimensions of the full-sized image once it has loaded.                                                        |

### ClientLoader Options
By default, `remixImageLoader` is used. If you would like to use an external ClientLoader, please refer to the [ClientLoader documentation](./client-loader.md).

**Note**: The `Image` component extends the native `img` element, so any props used with `img` can be provided to the `Image` component.

## Unoptimized Component: `BaseImage`

Use `BaseImage` if you prefer to use a raw `img` element without any performance optimizations.

Import the `BaseImage` component and specify the url to the resource route used by the `imageLoader` function.

```typescript jsx
import { BaseImage } from "remix-image";

<BaseImage
  loaderUrl="/api/image"
  src="..."
  width="..."
  height="..."
  alt="..."
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
|    Name     |                                Type                                |                               Required                               |       Default       |                                                                   Description                                                                    |
|:-----------:|:------------------------------------------------------------------:|:--------------------------------------------------------------------:|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|
|  loaderUrl  |                               string                               | Yes when using `cloudinaryLoader` or `imgixLoader` for `loader` prop |   `"/api/image"`    | The path of the image loader resource route. The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`. |
|   loader    |                            ClientLoader                            |                                                                      | `remixImageLoader`  |                                          The ClientLoader to use for generating the transformed image.                                           |
| responsive  | { size: { width: number; height: number; }; maxWidth?: number; }[] |                                                                      |        `[]`         |                           An array of responsive sizes. The resource route is not called if this prop is not provided.                           |
|   options   |                          TransformOptions                          |                                                                      |        `{}`         |                                TransformOptions that can be used to override the defaults provided to the loader.                                |
| dprVariants |                         number or number[]                         |                                                                      |        `[1]`        |                  Different DPR variants to generate images for. This value will always be merged into an array with value [1].                   |

### ClientLoader Options
By default, `remixImageLoader` is used. If you would like to use an external ClientLoader, please refer to the [ClientLoader documentation](./client-loader.md).

**Note**: The `BaseImage` component extends the native `img` element, so any props used with `img` can be provided to the `BaseImage` component.

## Other Types

### OnLoadingComplete
```typescript
export type OnLoadingComplete = (result: {
  naturalWidth: number;
  naturalHeight: number;
}) => void;
```

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