---
sidebar_position: 3
---

# Use Component

Import the `Image` component and specify the url to the resource route used by the `imageLoader` function.
The `loaderUrl` prop is optional if the resource route has been created at the path `"/api/image"`.

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
|    Name    |                                Type                                | Required |   Default    |                                         Description                                          |
|:----------:|:------------------------------------------------------------------:|:--------:|:------------:|:--------------------------------------------------------------------------------------------:|
|  loaderUrl |                               string                               |          | "/api/image" |                         The path of the image loader resource route.                         |
| responsive | { size: { width: number; height: number; }; maxWidth?: number; }[] |          |      []      | An array of responsive sizes. The resource route is not called if this prop is not provided. |
