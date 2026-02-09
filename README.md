# omelodev

Dark-first Vue 3 + Vite + Tailwind CSS v4 starter.

## Scripts

- `bun run dev` - start local dev server
- `bun run build` - type-check and production build
- `bun run preview` - preview production build

## Deployment

- GitHub Pages deploys automatically on each push to `main` via `.github/workflows/deploy-pages.yml`.
- `base` is resolved from `VITE_BASE_URL` first, then falls back to the repository path on GitHub Actions.
- Set a repository variable named `VITE_BASE_URL` if you need to override the default Pages base path.

## Environment

- Copy `.env.example` to `.env.local` for local overrides.
- Any client-exposed variable must use the `VITE_` prefix.
