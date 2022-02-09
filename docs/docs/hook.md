---
sidebar_position: 7
---

# Hook

Optionally, this library also exports the hook used to generate responsive props for images.
In most use cases you can simply use the `Image` component, but you might need the hook for custom components.

```typescript jsx
import { useResponsiveImage } from "remix-image";

const Image: React.FC<ImageProps> = ({
  className,
  loaderUrl = "/api/image",
  responsive = [],
  ...imgProps
}) => {
  const responsiveProps = useResponsiveImage(imgProps, loaderUrl, responsive);

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
|    Name    |                                Type                                | Required | Default |                                     Description                                     |
|:----------:|:------------------------------------------------------------------:|:--------:|:-------:|:-----------------------------------------------------------------------------------:|
|  imgProps  |                          { src: string }                           |     X    |         |                   The props to be passed to the base img element.                   |
| loaderUrl  |                               string                               |     X    |    []   |                    The path of the image loader resource route.                     |
| responsive | { size: { width: number; height: number; }; maxWidth?: number; }[] |          |    []   |                            An array of responsive sizes.                            |
|  options   |                          TransformOptions                          |          |         | TransformOptions that can be used to override the defaults provided to the loader.  |
