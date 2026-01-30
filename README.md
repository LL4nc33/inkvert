# INKvert

<p align="center">
  <img src="public/favicon.svg" alt="INKvert" width="64" height="64" />
</p>

<p align="center">
  <strong>Client-side file converter.</strong><br>
  All processing happens in your browser. No uploads. No servers. Complete privacy.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.3-black?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/wasm-powered-black?style=flat-square" alt="WASM" />
  <img src="https://img.shields.io/badge/client--side-only-black?style=flat-square" alt="Client-side" />
  <img src="https://img.shields.io/badge/license-AGPL--3.0-black?style=flat-square" alt="License" />
</p>

---

## Features

- **Image conversion** -- PNG, JPG, WebP, BMP, GIF, TIFF, AVIF, ICO, SVG, HEIC, PSD, TGA, QOI, APNG, EXR, DDS and more via ImageMagick WASM
- **RAW photo import** -- NEF, CR2, DNG, ARW (input only) via ImageMagick WASM
- **Audio conversion** -- MP3, WAV, OGG, FLAC, AAC, M4A, OPUS, AIFF, WMA, AC3, WavPack, AMR via FFmpeg WASM
- **Document conversion** -- DOCX, Markdown, HTML, Plain Text via mammoth + showdown
- **Video conversion** -- MP4, WebM, AVI, MOV, MKV, FLV, MPG, M4V, 3GP, TS, WMV with 90-second limit via FFmpeg WASM
- **Kindle-inspired UI** -- monochrome design with dark mode, serif typography, no distractions
- **Batch conversion** -- drag & drop multiple files, convert all at once
- **Settings** -- quality, bitrate, resolution, sample rate, auto-download
- **Zero server** -- everything runs in-browser using WebAssembly, nothing leaves your device

---

## Quick Start

```bash
git clone https://github.com/LL4nc33/inkvert.git
cd inkvert
npm install
npm run dev
```

Open [https://localhost:5173](https://localhost:5173) and drop files.

### Docker

```bash
docker build -t inkvert .
docker run -d -p 8090:8080 inkvert
```

Open [https://localhost:8090](https://localhost:8090) (self-signed SSL for WASM headers).

> **Note:** FFmpeg WASM requires `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers. The Vite dev server and Docker nginx config set these automatically. For other deployments, ensure your web server sends these headers.

---

## Screenshots

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light Mode](docs/screenshots/light.png) | ![Dark Mode](docs/screenshots/dark.png) |

---

## Documentation

| Topic | Description |
|-------|-------------|
| [Architecture](docs/architecture.md) | System diagram, data flow, project structure |
| [Development](docs/development.md) | Local setup, build commands, conventions |
| [Browser Support](docs/browser-support.md) | Compatibility, SharedArrayBuffer, memory |
| [Roadmap](ROADMAP.md) | Planned features and future ideas |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18, TypeScript, Vite |
| UI | @oidanice/ink-ui, Tailwind CSS |
| Images | @imagemagick/magick-wasm |
| Audio/Video | @ffmpeg/ffmpeg (WASM) |
| Documents | mammoth, showdown |
| Routing | React Router v6 |

---

## Supported Formats

| Category | Formats |
|----------|---------|
| Image | PNG, JPG, WebP, BMP, GIF, TIFF, AVIF, ICO, SVG, HEIC, PSD, TGA, QOI, JFIF, APNG, CUR, PBM, PGM, PPM, PNM, PCX, EXR, DDS |
| Image (input only) | NEF, CR2, DNG, ARW (RAW photo formats) |
| Audio | MP3, WAV, FLAC, OGG, AAC, M4A, Opus, AIFF, WMA, AC3, WavPack, AMR |
| Document | DOCX, Markdown, HTML, RTF, Plain Text, CSV, JSON, EPUB, ODT |
| Video | MP4, WebM, MKV, AVI, MOV, FLV, MPG, M4V, 3GP, TS, WMV (max 90 seconds) |

---

## Security

No data leaves the browser. No uploads. No tracking. No analytics. No server-side processing.

WASM engines run sandboxed inside the browser. See [SECURITY.md](SECURITY.md) for details.

---

Built by [OidaNice](https://github.com/LL4nc33) -- powered by WebAssembly -- built with [Claude Workflow Engine](https://github.com/LL4nc33/claude-workflow-engine) -- v0.0.3
