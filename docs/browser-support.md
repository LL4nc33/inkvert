# Browser Support

INKvert runs entirely in-browser using WebAssembly. Browser compatibility depends on the WASM engines used.

---

## Requirements

| Feature | Required For | Minimum Support |
|---------|-------------|-----------------|
| WebAssembly | All conversions | All modern browsers |
| SharedArrayBuffer | FFmpeg WASM (audio/video) | Chrome 91+, Firefox 79+, Safari 15.2+ |
| COOP/COEP headers | SharedArrayBuffer | Server must set headers |
| ES2020 | Application code | Chrome 80+, Firefox 80+, Safari 14+ |
| File API | Drag & drop, file input | All modern browsers |
| Clipboard API | Paste files | Chrome 86+, Firefox 87+, Safari 13.1+ |

---

## Browser Compatibility

| Browser | Image | Audio | Video | Documents |
|---------|-------|-------|-------|-----------|
| Chrome 91+ | Yes | Yes | Yes | Yes |
| Firefox 79+ | Yes | Yes | Yes | Yes |
| Edge 91+ | Yes | Yes | Yes | Yes |
| Safari 15.2+ | Yes | Yes | Yes | Yes |
| Safari < 15.2 | Yes | No | No | Yes |
| Mobile Chrome | Yes | Yes | Yes | Yes |
| Mobile Safari 15.2+ | Yes | Yes | Yes | Yes |

Image and document conversion work without SharedArrayBuffer. Audio and video conversion requires it.

---

## SharedArrayBuffer

FFmpeg WASM needs `SharedArrayBuffer` to run. Browsers only enable this when the page is cross-origin isolated. The server must send:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**What happens without these headers:**
- Image conversion works normally
- Document conversion works normally
- Audio and video conversion will fail with a browser error

The Vite dev server and Docker nginx config set these headers automatically. For custom deployments, configure your web server accordingly.

---

## Memory Considerations

| Conversion Type | Approximate Memory |
|----------------|-------------------|
| Image (< 10 MB) | ~50 MB |
| Audio (< 5 min) | ~100 MB |
| Video (< 90 sec) | ~200-500 MB |
| FFmpeg WASM core | ~25 MB (loaded once) |

Video conversion is limited to 90 seconds to prevent excessive memory usage. The batch converter runs max 2 concurrent conversions.

---

## Known Limitations

- **iOS Safari**: SharedArrayBuffer support requires iOS 15.2+
- **Firefox private mode**: SharedArrayBuffer may be disabled
- **Low-memory devices**: Large video files may cause out-of-memory errors
- **HEIC/HEIF input**: Depends on ImageMagick WASM codec support, may not work on all platforms
