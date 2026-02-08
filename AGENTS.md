# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains application code: entrypoint in `src/main.ts`, root UI in `src/App.vue`, and global design tokens/styles in `src/style.css`.
- `public/` stores static assets served as-is.
- `index.html` is the Vite HTML shell.
- `dist/` is generated build output; do not edit or commit it.
- Tooling and compiler settings live in `vite.config.ts` and `tsconfig*.json`.

## Build, Test, and Development Commands
- `bun install` installs dependencies from `package.json`/`bun.lock`.
- `bun run dev` starts the local Vite dev server with hot reload.
- `bun run build` runs TypeScript checking (`vue-tsc -b`) and creates a production build in `dist/`.
- `bun run preview` serves the production build locally for final verification.

## Coding Style & Naming Conventions
- Use Vue 3 SFCs with TypeScript and Tailwind CSS v4 utilities.
- Keep 2-space indentation across `.ts`, `.vue`, and `.css`.
- Follow existing TypeScript style: single quotes and minimal semicolons.
- Name Vue components in PascalCase (for example, `HeroPanel.vue`).
- Name composables/utilities in camelCase (for example, `useTheme.ts`).
- Prefer existing inline Tailwind utility classes over introducing custom `<style>` blocks.
- Before proposing custom styles, extend the Tailwind v4 theme/tokens first.
- Prefer theme tokens from `src/style.css` over ad-hoc hardcoded colors.

## Testing Guidelines
- No automated test framework is currently configured.
- Treat `bun run build` as the minimum pre-PR quality gate.
- For UI changes, manually verify in both `bun run dev` and `bun run preview`.
- If adding tests, prefer Vitest + Vue Test Utils and use `*.spec.ts` naming.

## Commit & Pull Request Guidelines
- Current history has only an `Initial commit`, so no established pattern exists yet.
- Use Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`) going forward.
- Use one commit per feature and keep each commit focused on one logical change.
- Prefer scoped commit subjects when possible (for example, `feat(auth): add session timeout`).
- PRs should include: a short summary, related issue (if available), verification steps run, and screenshots for visible UI updates.

## Security & Configuration Tips
- Never commit secrets; keep local values in `.env.local`.
- Commit examples only (such as `.env.example`) when documenting configuration.
