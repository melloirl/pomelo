# omelodev

Dark-first Vue 3 + Vite + Tailwind CSS v4 starter.

## Scripts

- `bun run dev` - start local dev server
- `bun run build` - type-check and production build
- `bun run preview` - preview production build

## Deployment

- GitHub Pages deploys automatically on each push to `main` via `.github/workflows/deploy-pages.yml`.
- In CI, `VITE_BASE_URL` comes from `actions/configure-pages` (`base_path`) so repo renames are handled automatically.

## Environment

- Copy `.env.example` to `.env.local` for local overrides.
- Any client-exposed variable must use the `VITE_` prefix.
