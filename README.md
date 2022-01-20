# Remix-Image

## 👋 Intro

- A React component for responsive images in Remix


## 🚀 How to use

### Install

At the moment, this library is only available on GitHub.
To install this library, use on of the following commands:
```bash
npm install -S https://github.com/Josh-McFarlin/remix-image.git
yarn add remix-image@https://github.com/Josh-McFarlin/remix-image.git
```

The following peer deps are also required:
```json
"peerDependencies": {
  "hybrid-disk-cache": "^0.2.0",
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0",
  "remix": "^1.0.0",
  "sharp": "^0.29.0"
}
```

This library will be uploaded to npm once a stable release has been created.

### Loader

Create a new resource route that imports the `imageLoader` function and exports as `loader`.
By default, the resource route `"/api/image"` is used, but any route can be used.
```typescript jsx
import { imageLoader } from "remix-image";

export const loader = imageLoader({
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
});
```

|        Name        |                       Type                        | Required |                            Default                             |                                                     Description                                                    |
|:------------------:|:-------------------------------------------------:|:--------:|:--------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------:|
|       selfUrl      |                      string                       |     X    |                                                                |                                            The URL of the local server.                                            |
| whitelistedDomains |                     string[]                      |          |                               []                               | Valid domains responsive images can be served from. selfUrl is automatically added at runtime and is not required. |
|        cache       |   { path: string, ttl: number, tbd: number } \| null    |                                                                   | { path: "tmp/img", ttl: 24 * 60 * 60, tbd: 365 * 24 * 60 * 60 } |              The configuration for the local image cache. Setting this to null will disable the cache.             |

### Component

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

|    Name    |                                Type                                | Required |    Default   |                  Description                 |
|:----------:|:------------------------------------------------------------------:|:--------:|:------------:|:--------------------------------------------:|
|  loaderUrl |                               string                               |          | "/api/image" | The path of the image loader resource route. |
| responsive | { size: { width: number; height: number; }; maxWidth?: number; }[] |          |      [ ]     |         An array of responsive sizes.        |


### Hook

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

|    Name    |                                Type                                | Required | Default |                   Description                   |
|:----------:|:------------------------------------------------------------------:|:--------:|:-------:|:-----------------------------------------------:|
|  imgProps  |                   ComponentPropsWithoutRef<"img">                  |     X    |         | The props to be passed to the base img element. |
|  loaderUrl |                               string                               |     X    |    []   |   The path of the image loader resource route.  |
| responsive | { size: { width: number; height: number; }; maxWidth?: number; }[] |          |    []   |          An array of responsive sizes.          |

## Other

### Status

At the moment this library is experimental and has not been used in a production environment.
Further development is ongoing, but I welcome all pull-requests and issues created on GitHub.

### Credit

This repo expands on the following gists by:

- [jacob-ebey](https://gist.github.com/jacob-ebey/3a37a86307de9ef22f47aae2e593b56f)
- [olikami](https://gist.github.com/olikami/236e3c57ca73d145984ec6c127416340)
