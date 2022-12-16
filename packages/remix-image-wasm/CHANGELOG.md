All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2022-12-15

### Added

- Exported `version` variable with the current version of the package

## [0.1.2] - 2022-07-05

### Changed

- Set `fallbackOutput` field to first loaded format in the order of `MimeType.PNG`, `MimeType.JPEG`, `MimeType.WEBP`, `MimeType.AVIF`
- Set `supportedInputs` and `supportedOutputs` to handlers that have had `.wasm` files included in environment

## [0.1.1] - 2022-06-28

### Fixed

- Fixed package name in README.md

### Changed

- Changed build settings to reduce dependencies and preserve function names for better debugging

## [0.1.0] - 2022-06-26

### Added

- Added image operations

### Changed

- Bump dependency versions
- Combined wasm files into build for easier installation

### Docs

- Update documentation

## [0.0.1]

### Fix

- Fix Rollup issues preventing publishing
