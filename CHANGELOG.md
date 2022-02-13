All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
