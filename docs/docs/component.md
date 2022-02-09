---
sidebar_position: 6
---

# Component

Import the `Image` component and specify the url to the resource route used by the `imageLoader` function.


```typescript jsx
import { Image } from "remix-image";

<Image
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
|    Name    |                                Type                                | Required |   Default    |                                                                   Description                                                                    |
|:----------:|:------------------------------------------------------------------:|:--------:|:------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|
| loaderUrl  |                               string                               |          | "/api/image" | The path of the image loader resource route. The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`. |
| responsive | { size: { width: number; height: number; }; maxWidth?: number; }[] |          |      []      |                           An array of responsive sizes. The resource route is not called if this prop is not provided.                           |
|  options   |                          TransformOptions                          |          |              |                                TransformOptions that can be used to override the defaults provided to the loader.                                |

**Note**: The `Image` component extends the native `img` element, so any props used with `img` can be provided to the `Image` component.
