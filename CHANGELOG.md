# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Image formats: JFIF, APNG, CUR, ICNS, PBM, PGM, PPM, PNM, PCX, EXR, DDS via ImageMagick WASM
- RAW photo input: NEF (Nikon), CR2 (Canon), DNG (Adobe), ARW (Sony) -- input only, convert to any image format
- Audio formats: AC3 (Dolby Digital), WavPack, AMR via FFmpeg WASM
- Video formats: FLV, MPG/MPEG, M4V, 3GP, TS, WMV via FFmpeg WASM
- `inputOnly` property on FormatInfo interface for formats that can be read but not written

## [0.0.2] - 2026-01-30

### Added

- Architecture documentation (`docs/architecture.md`)
- Development guide (`docs/development.md`)
- Browser support reference (`docs/browser-support.md`)
- Light and dark mode screenshots
- Documentation table in README

### Changed

- Removed internal planning files from repository history

## [0.0.1] - 2026-01-30

### Added

- Image conversion via @imagemagick/magick-wasm (PNG, JPG, WebP, BMP, GIF, TIFF, AVIF, ICO, SVG, HEIC, PSD, TGA, QOI)
- Audio conversion via @ffmpeg/ffmpeg WASM (MP3, WAV, FLAC, OGG, AAC, M4A, Opus, AIFF, WMA)
- Document conversion via mammoth + showdown (DOCX, Markdown, HTML, Plain Text)
- Video conversion via @ffmpeg/ffmpeg WASM with 90-second duration limit (MP4, WebM, MKV, AVI, MOV)
- Multi-file drag & drop with batch conversion (max 2 concurrent)
- Kindle-inspired monochrome UI via @oidanice/kindle-ui
- Dark mode toggle
- Settings page (image quality, audio bitrate/sample rate, video CRF/resolution, auto-download)
- localStorage settings persistence
- Lazy-loaded WASM converters (code-split chunks)
- Shared FFmpeg singleton (audio + video share one instance)
- Error Boundary for WASM crash recovery
- React.lazy route-based code splitting
- Docker deployment with self-signed SSL (COOP/COEP headers)

[0.0.2]: https://github.com/LL4nc33/inkvert/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/LL4nc33/inkvert/releases/tag/v0.0.1
