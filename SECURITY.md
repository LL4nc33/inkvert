# Security

## Security Model

INKvert is a **fully client-side application**. No data is transmitted to any server. All file processing happens inside the browser using WebAssembly.

## How It Works

| Aspect | Detail |
|--------|--------|
| File Processing | All conversion runs in-browser via WASM (ImageMagick, FFmpeg) |
| Data Transmission | Zero -- files never leave the device |
| Storage | No persistent storage. Files exist only in browser memory during conversion |
| Tracking | None. No analytics, no cookies, no telemetry |
| External Requests | FFmpeg WASM core loaded from unpkg CDN on first audio/video conversion |

## WASM Sandbox

WebAssembly runs in the browser's sandbox with the same security guarantees as JavaScript:

- No filesystem access beyond what the user explicitly provides
- No network access (WASM modules cannot make HTTP requests)
- Memory-isolated from other tabs and the host system

## Required Headers

FFmpeg WASM requires `SharedArrayBuffer`, which needs these HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

These headers also enable cross-origin isolation, which is a security benefit.

## Known Considerations

- **CDN dependency**: FFmpeg WASM core (~25 MB) is loaded from `unpkg.com` on first use. A supply-chain attack on unpkg could serve malicious WASM. For maximum security, self-host the WASM files.
- **Document conversion**: HTML-to-text conversion uses `DOMParser` (safe, no script execution) instead of `innerHTML`.
- **No CSP**: The app does not set a Content Security Policy. Deployers should add one appropriate for their environment.

## Reporting Vulnerabilities

Report security issues via GitHub: https://github.com/LL4nc33/inkvert/issues
