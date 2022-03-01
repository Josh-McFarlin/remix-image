---
sidebar_position: 1
---

# Remix-Image

## 👋 Intro

A React component for responsive images in Remix.

This library lets you:
* Resize images to the minimum size needed for faster page loading
* Transform images to more efficient file types for faster speed
* Cache commonly requested assets for the best performance

Turning:

```typescript jsx
<Image
  src="https://i.imgur.com/5cQnAQC.png"
  responsive={[{
    size: {
      width: 100,
      height: 100,
    },
    maxWidth: 200,
  }]}
/>
```

Into:

```typescript jsx
<img
  class="Image-module_root__56rgX"
  src="/api/image?src=https%253A%252F%252Fi.imgur.com%252F5cQnAQC.png&amp;width=100&amp;height=100%2520100w"
  srcset="/api/image?src=https%253A%252F%252Fi.imgur.com%252F5cQnAQC.png&amp;width=100&amp;height=100%2520100w"
  sizes="(max-width: 200px) 100px"
>
```

Where the `responsive` sizes provided through the props are turned into image URLs served by the local server that are cached for fast and performant loading.

## 🚀 How to use

### Install

To install this library and its peer deps, use on of the following commands:
```bash
npm install -S remix-image @next-boost/hybrid-disk-cache
yarn add remix-image @next-boost/hybrid-disk-cache
```
