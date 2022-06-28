# Remix-Image

![](https://badgen.net/npm/v/remix-image)
![](https://badgen.net/npm/license/remix-image)
![](https://badgen.net/npm/types/remix-image)
![](https://badgen.net/bundlephobia/min/remix-image)
![](https://badgen.net/npm/dt/remix-image)

## 👋 Intro

A React component for responsive images in Remix.

This library lets you:
* Resize images to the minimum size needed for faster page loading
* Convert images to more efficient file types for faster page loader
* Apply transformations to images such as `resize`, `crop`, `rotate`, `blur`, and `flip`
* Cache commonly requested assets for the best performance

Turning:

```typescript jsx
<Image
  src="https://i.imgur.com/5cQnAQC.png"
  responsive={[
    {
      size: { width: 100, height: 100 },
      maxWidth: 500,
    },
    {
      size: { width: 600, height: 600 },
    },
  ]}
  dprVariants={[1, 3]}
/>
```

Into:

```typescript jsx
<img
  src="/api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=600&height=600"
  srcset="/api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=100&height=100 100w, /api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=600&height=600 600w, /api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=300&height=300 300w, /api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=1800&height=1800 1800w"
  sizes="(max-width: 500px) 100px, 600px"
>
```

Where the `responsive` sizes provided through the props are turned into image URLs served by the local server that are cached for fast and performant loading.

## 🚀 How to use

### Install

To install this library and its peer deps, use one of the following commands:
```bash
npm install -S remix-image @next-boost/hybrid-disk-cache
yarn add remix-image @next-boost/hybrid-disk-cache
```

### Docs

- Documentation for this library can be found at: [https://remix-image.mcfarl.in](https://remix-image.mcfarl.in)
- Several examples can be found in [examples/](../../examples/)
