# Roadmap

What's planned and what might come next.

> Version source of truth: [`VERSION`](VERSION)

---

## v0.0.2 — Polish & Formats

- [ ] Self-host FFmpeg WASM (remove CDN dependency)
- [ ] PWA support (manifest, service worker, install prompt)
- [ ] Additional document formats (RTF, EPUB, ODT via extended converters)
- [ ] Drag & drop folder support
- [ ] File preview before conversion

## v0.0.3 — Advanced Conversion

- [ ] Image batch resize (bulk resize to specific dimensions)
- [ ] Audio waveform preview
- [ ] Video trimming before conversion (start/end time)
- [ ] Custom FFmpeg command input for power users
- [ ] Conversion presets (e.g., "Web-optimized", "Print quality")

## v0.0.4 — Performance

- [ ] Web Worker offloading for non-WASM operations
- [ ] Streaming conversion for large files
- [ ] IndexedDB caching for WASM modules
- [ ] Parallel WASM instances for image batch processing

## Backlog (no timeline)

- [ ] WebCodecs API for hardware-accelerated video conversion
- [ ] PDF support (pdf.js + jsPDF)
- [ ] Zip output (download all converted files as archive)
- [ ] Conversion history (in-memory or localStorage)
- [ ] i18n (German, English, Spanish)
- [ ] Browser extension (right-click → convert)
- [ ] Mobile-optimized layout with touch gestures

---

Ideas and suggestions: [open an issue](https://github.com/LL4nc33/inkvert/issues)
