---
sidebar_position: 8
---

# ClientLoader

Client Loader Functions are used to construct the URL for the `Image` and `BaseImage` components and the `useResponsiveImage` hook.

Using `remixImageLoader` enables Remix-Image’s advanced transformation options, which includes transformation caching and image operations such as `resize`, `crop`, `rotate`, `blur`, and `flip`.

However, using alternative (and likely paid) services and their client loaders may result in faster response times, as the Remix server will not be slowed down by requests for new image transformations.

We suggest trying the default `remixImageLoader` function to see if it works for your apps, and then upgrade to a paid alternative if needed. Only websites with high traffic and/or many dynamic image assets will need an alternative client loader.

## Supported Loaders

### Remix Image Loader

`remixImageLoader` is the default loader used by Remix-Image. In most cases you will want to use this loader.

### Cloudflare Images Loader

`cloudflareImagesLoader` is a loader used to transform images using the paid [Cloudflare Images](https://developers.cloudflare.com/images/) service. 

### Cloudinary Loader

`cloudinaryLoader` is a loader used to transform images using the paid [Cloudinary](https://cloudinary.com/) service. 

**Note**: Remember to set `loaderUrl` to your API url! This should be a string similar to `https://res.cloudinary.com/<cloud_name>/`

### Imgix Loader

`imgixLoader` is a loader used to transform images using the paid [Imgix](https://imgix.com/) service. 

**Note**: Remember to set `loaderUrl` to your API url! This should be a string similar to `https://<subdomain>.imgix.net/`

## Usage

### `BaseImage` and `Image` Components

```typescript jsx
import { Image, remixImageLoader, cloudflareImagesLoader, cloudinaryLoader, imgixLoader } from "remix-image";

<Image
  loaderUrl="/api/image" // Required when using cloudinaryLoader or imgixLoader
  loader={remixImageLoader or cloudflareImagesLoader or cloudinaryLoader or imgixLoader}
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

### `useResponsiveImage` Hook

```typescript jsx
import { useResponsiveImage, remixImageLoader, cloudflareImagesLoader, cloudinaryLoader, imgixLoader } from "remix-image";

const Image: React.FC<ImageProps> = ({
  className, 
  loaderUrl = "/api/image", // Required when using cloudinaryLoader or imgixLoader
  responsive = [],
  ...imgProps
}) => {
  const responsiveProps = useResponsiveImage(imgProps, responsive, [1], loaderUrl, remixImageLoader or cloudflareImagesLoader or cloudinaryLoader or imgixLoader);

  return (
    <img
      className={clsx(classes.root, className)}
      {...imgProps}
      {...responsiveProps}
    />
  );
};
```