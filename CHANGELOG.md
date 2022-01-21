All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
