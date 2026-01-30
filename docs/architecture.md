# Architecture

System overview and project structure.

---

## System Diagram

```
Browser
├── React SPA (Vite)
│   ├── Home ──── DropZone ──── file detection
│   ├── Convert ── FileCard[] ── converter pipeline
│   └── Settings ─ localStorage persistence
│
├── ConversionContext (global state)
│   ├── useFileQueue ── file list, status, progress
│   ├── useConverter ── orchestration, batch limit (2)
│   └── useSettings ── quality, bitrate, resolution
│
└── WASM Engines (lazy-loaded)
    ├── ImageMagick ── @imagemagick/magick-wasm
    ├── FFmpeg ─────── @ffmpeg/ffmpeg (shared singleton)
    └── Documents ──── mammoth + showdown
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DropZone.tsx     # Drag & drop, click, paste input
│   ├── FileCard.tsx     # File display with status/progress
│   ├── FormatSelector.tsx
│   ├── BatchActions.tsx
│   ├── ErrorBoundary.tsx
│   ├── Footer.tsx
│   └── Logo.tsx
├── pages/               # Route components (lazy-loaded)
│   ├── Home.tsx         # Landing page with DropZone
│   ├── Convert.tsx      # Conversion queue interface
│   └── Settings.tsx     # User preferences
├── context/
│   └── ConversionContext.tsx  # Global state provider
├── hooks/
│   ├── useFileQueue.ts  # File queue management
│   ├── useConverter.ts  # Conversion orchestration
│   └── useSettings.ts   # localStorage-backed settings
├── converters/
│   ├── types.ts         # Interfaces & defaults
│   ├── registry.ts      # Dynamic converter loader
│   ├── ImageConverter.ts
│   ├── AudioConverter.ts
│   ├── VideoConverter.ts
│   └── DocumentConverter.ts
├── lib/
│   ├── formats.ts       # Format registry (40+ formats)
│   ├── ffmpegInstance.ts # Shared FFmpeg singleton
│   ├── mime.ts          # MIME type mapping
│   ├── download.ts      # Blob download utility
│   └── fileUtils.ts     # File size, duration helpers
├── types/
│   ├── global.d.ts
│   └── mammoth.d.ts
├── App.tsx              # Router + provider setup
├── main.tsx             # React DOM entry
└── index.css            # Tailwind directives
```

---

## Data Flow

```
User drops files
  │
  ▼
DropZone ── detects category (image/audio/video/document)
  │
  ▼
useFileQueue ── creates ConverterFile with UUID, default output format
  │
  ▼
Navigate to /convert ── display FileCards
  │
  ▼
User clicks Convert (single or batch)
  │
  ▼
useConverter ── loads converter via registry (lazy import)
  │         ── max 2 concurrent conversions
  ▼
Converter.convert(file, format, settings, onProgress)
  │
  ▼
WASM engine processes file in-browser
  │
  ▼
Result Blob ── stored in ConverterFile.result
  │
  ▼
Download button (or auto-download if enabled)
```

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Shared FFmpeg singleton | Audio + video share one instance to reduce memory |
| Lazy route loading | Convert/Settings loaded on demand via React.lazy |
| Dynamic converter imports | WASM engines only loaded when needed |
| Max 2 concurrent conversions | Prevents browser memory exhaustion |
| CDN-loaded FFmpeg core | Reduces initial bundle (~25 MB saved) |
| localStorage for settings | No backend needed, persists across sessions |
| Class-based ErrorBoundary | Required by React for error catching |
| UUID file IDs | Prevents collisions in batch operations |

---

## WASM Requirements

FFmpeg WASM uses `SharedArrayBuffer`, which requires these HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Both Vite dev server and the Docker nginx config set these automatically.
