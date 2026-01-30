# Contributing

Thanks for your interest in INKvert! Here's how to get involved.

## Getting Started

```bash
git clone https://github.com/LL4nc33/inkvert.git
cd inkvert
npm install
npm run dev
```

## Workflow

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Ensure build passes: `npm run build`
5. Commit with a descriptive message (see below)
6. Open a Pull Request

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add HEIC to WebP conversion
fix: handle empty file drop gracefully
docs: update supported formats table
refactor: extract shared FFmpeg singleton
```

## Code Style

- **TypeScript strict** with `noUnusedLocals` and `noUnusedParameters`
- **Functional React components** with hooks
- **Tailwind CSS** via kindle-ui preset (monochrome only)
- **WHY: comments** to explain non-obvious decisions

## What to Work On

- Check [ROADMAP.md](ROADMAP.md) for planned features
- Look for [open issues](https://github.com/LL4nc33/inkvert/issues)
- New format support and bug fixes are always welcome

## Reporting Bugs

Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS version
- Console errors (if any)

## Security

Found a vulnerability? See [SECURITY.md](SECURITY.md).
