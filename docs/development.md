# Development

Local setup, build commands, and project conventions.

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Setup

```bash
git clone https://github.com/LL4nc33/inkvert.git
cd inkvert
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |

---

## Docker

```bash
docker build -t inkvert .
docker run -d -p 8090:8080 inkvert
```

The Dockerfile uses a multi-stage build:

1. **Build stage** -- Node 20 Alpine, installs deps, runs `vite build`
2. **Production stage** -- Nginx Alpine, serves static files with COOP/COEP headers and self-signed SSL

---

## Project Conventions

**TypeScript**: Strict mode with `noUnusedLocals` and `noUnusedParameters`.

**Components**: Functional React with hooks. No class components except ErrorBoundary.

**Styling**: Tailwind CSS via `@oidanice/kindle-ui` preset. Monochrome palette only.

**Commits**: [Conventional Commits](https://www.conventionalcommits.org/) -- `feat:`, `fix:`, `refactor:`, `docs:`.

**Converters**: Each converter implements the `Converter` interface from `src/converters/types.ts`. Loaded lazily via `src/converters/registry.ts`.

---

## Adding a New Converter

1. Create `src/converters/MyConverter.ts` implementing the `Converter` interface
2. Register it in `src/converters/registry.ts`
3. Add format entries to `src/lib/formats.ts`
4. The UI automatically picks up new formats via the registry
