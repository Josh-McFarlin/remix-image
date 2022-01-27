# Remix-Image

## 👋 Intro

A React component for responsive images in Remix.

This library turns:

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

To install this library, use on of the following commands:
```bash
npm install -S remix-image
yarn add remix-image
```

### Docs

- Documentation for this library can be found at: [https://remix-image.mcfarl.in](https://remix-image.mcfarl.in)
- Several examples can be found in [examples/](examples/)

---

## Other

### Status

At the moment this library is experimental and has not been used in a production environment.
Further development is ongoing, but I welcome all pull-requests and issues created on GitHub.

### Credit

This repo expands on the following gists by:

- [jacob-ebey](https://gist.github.com/jacob-ebey/3a37a86307de9ef22f47aae2e593b56f)
- [olikami](https://gist.github.com/olikami/236e3c57ca73d145984ec6c127416340)
