All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2022-12-15

### Added

- Exported `version` variable with the current version of the package

### Changed

- Added a `verbose` flag to silence excessive logs

## [1.3.3] - 2022-09-24

### Fixed

- Fixed aspect ratio calculation in `Image` component

### Changed

- Changed `parseURL` util to only accept `baseUrl?: string` for the second parameter

## [1.3.2] - 2022-07-05

### Fixed

- Fixed placeholder images not using `loader`
- Ensured `Image` still exists before ref operations

### Changed

- Added `fallbackOutput` field to `Transformer` type to customize default fallback for each transformer
- Set the `fallbackOutput` field for `pureTransformer` to `MimeType.PNG`
- Moved transformer defaults to `useResponsiveImage` hook

## [1.3.1] - 2022-07-02

### Fixed

- Fixed background image persisting when using `placeholder="blur"` with transparent images

## [1.3.0] - 2022-07-01

### Added

- Added Client Loader functions to enable the use of external image transformation services

### Changed

- Added optional `loader` prop to `Image` and `BaseImage` components
- **BREAKING**: Moved `loaderUrl` argument of `useResponsiveImage` hook to the end
- Added optional `loader` argument to the end of `useResponsiveImage` hook

## [1.2.0] - 2022-06-30

### Changed

- Modified the `Image` component to include image optimizations for placeholders, layout shift, and animations

### Added

- Created `BaseImage` component that is identical to the `Image` component before this update
- Added CSS styles to `"remix-image/remix-image.css"`

## [1.1.0] - 2022-06-28

### Added

- Added `dprVariants` property to `Image` component and `useResponsiveImage` hook

### Changed

- Changed build settings to reduce dependencies and preserve function names for better debugging

## [1.0.0] - 2022-06-26

### Added

- Created transformer packages for Sharp (`remix-image-sharp`) and WebAssembly (`remix-image-wasm`)

### Changed

- Modified repo to use npm packages
- Moved several transformation-related types to `src/types/transformer` for clarity
- Changed default image fit to `cover`

### Docs

- Update documentation to use new links for packages

## [0.4.0] - 2022-06-21

### Changed

- Change sorting method of responsiveImage hook to order by maxWidth
- Changed `ImagePosition` to string union with additional options
- Converted `ImageFit` and `FlipDirection` types to string unions to match `ImagePosition`

## [0.3.18] - 2022-04-23

### CI

- Remove install from release CI config

## [0.3.17] - 2022-04-23

### Fix

- Fix asset not using requested content type when specified

## [0.3.16] - 2022-03-01

### Fix

- Fix asset not being correctly output when retrieved from cache

## [0.3.15] - 2022-03-01

### Fix

- Verify resolvers throw errors on empty result and error is thrown on failed transformations

### Changed

- Simplify loader implementation for easier readability
- Move resolver error throwing from loader into resolver

## [0.3.14] - 2022-02-23

### Fix

- Retrieve content type for cached assets

### Changed

- Replaced built-in LRU cache with npm package `lru-cache`

## [0.3.13] - 2022-02-22

### Fix

- Remove `remix-image` from dependencies (added accidentally through automation)

## [0.3.12] - 2022-02-22

### Fix

- Update `js-image-lib` to fix incorrect size used for resizing

### Changed

- Replaced `utif` with `decode-tiff` for smaller size
- Update `mime-tree` to `0.1.4` to fix incorrect mime detection

## [0.3.11] - 2022-02-22

### Added

- Added `basePath` property to `LoaderConfig` and `Resolver` to allow custom base paths for assets

### Changed

- Replaced `hybrid-disk-cache` package with the updated version `@next-boost/hybrid-disk-cache`

### Documentation

- Added Vercel deployment example
- Replaced functions in examples with best practices (file cache, sharp)

## [0.3.10] - 2022-02-17

### Documentation

- Mark package as side-effect free

## [0.3.9] - 2022-02-17

### Changed

- Replaced built-in `pureTransformer` code with the library `js-image-lib` (which is the same code, but moved to its own library for better developer experience.)
- Replaced built-in mime type detector code with the library `mime-tree`

## [0.3.8] - 2022-02-16

### Added

- Added `crop` parameter to `TransformOptions` to allow cropping of images.
- Added `flip` parameter to `TransformOptions` to allow mirroring of images.
- Added `rotation` parameter to `TransformOptions` to allow rotation of images.
- Added `blurRadius` parameter to `TransformOptions` to allow Gaussian blur of images.

## [0.3.7] - 2022-02-14

### Added

- Added `options` parameter to resolver type to enable external API transformations

## [0.3.6] - 2022-02-14

### Added

- Added an optional `fallbackTransformer` parameter to `LoaderConfig`. Set to `pureTransformer` by default, this option lets you choose which transformer the loader will fall back to if your custom transformer fails or if the content type is not supported.
- Added an optional `skipFormats` parameter to `LoaderConfig`. This is a set of mime types that should be returned without transformation. Defaults to `Set([MimeType.SVG])`.

### Changed

- Made `null` a valid option for the `transformer` parameter of `LoaderConfig`. If this parameter is set to null, image transformation will be skipped.

### Docs

- Added documentation for `LoaderConfig` parameters: `defaultOptions`, `redirectOnFail`, and `skipFormats`.
- Added default (`pureTransformer`) supported file types to documentation.

## [0.3.5] - 2022-02-13

### Changed

- Added `url` parameter to transformer function to enable external transformer API usage

## [0.3.4] - 2022-02-13

### Fixed

- Added extra level of URI encode on url to preserve image src query

## [0.3.3] - 2022-02-13

### Fixed

- Added additional `src` decode on server for images that include query

## [0.3.2] - 2022-02-13

### Fixed

- Fixed Image query using wrong format if `src` property included its own query string

## [0.3.1] - 2022-02-09

### Changed

- Replaced `bmp-js` with `@wokwi/bmp-ts` for improved platform support.
- Replaced instances of `Buffer` with `Uint8Array`

## [0.3.0] - 2022-02-09

### Changed

- add supported content type fields to transformers
- modify how transform defaults are set and their types
- Simplify transformers by removing buffer dependency for external transformers, move sharp
  transformer to examples, and create wasm transformer
- **BREAKING**: Modified transformer to use a new function type, Sharp can no longer be passed in
  as is

### Docs

- Updated docs to use new transformer format
- Created multiple new examples for various transformers
- Created documentation for new usage of Sharp

## [0.2.0] - 2022-01-26

### Docs

- Created documentation website at [remix-image.mcfarl.in](http://remix-image.mcfarl.in)
- Updated `package.json` to include link to docs website
- Simplified `README.md`, moving most info to docs website

## [0.1.8] - 2022-01-26

### Changed

- Removed Jimp due to Node dependencies and replaced with pure JavaScript image transformations.

### Added

- Created a resolver for Cloudflare KV.

## [0.1.7] - 2022-01-21

### Added

- Moved image transformation logic into separate files to later support additional platforms.
- Created new image transformer that uses Jimp to transform images with pure JavaScript.

### Changed

- Switched default image transformer to Jimp support all platforms by default

## [0.1.6] - 2022-01-21

### Changed

- **BREAKING**: Modified Cache setup to use class instances to later support additional platforms.

### Added

- Created new MemoryCache that does not store files on the file system (for platforms that do not support file system access like Cloudflare)

## [0.1.5] - 2022-01-20

# Docs

- Add keywords to `package.json`

## [0.1.4] - 2022-01-20

### Refactor

- Change license to MIT

## [0.1.3] - 2022-01-20

### Fix

- Fix sub-export types directory

## [0.1.2] - 2022-01-20

### Docs

- Update repo with npm package info

## [0.1.1] - 2022-01-20

### Added

- First public release.

## [0.1.0] - 2022-01-20

### Fix

- Fix Rollup issues preventing publishing
