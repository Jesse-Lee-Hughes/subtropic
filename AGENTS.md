# Repository Guidelines

## Project Structure & Module Organization
The Next.js app lives in `src/app`, with `layout.tsx` handling shared chrome and `page.tsx` defining the root route. Global styles and Tailwind tokens are in `src/app/globals.css`. Static assets (favicons, images) belong in `public/`. Build and framework configuration is centralized in `next.config.ts`, `tailwind.config.ts`, and `tsconfig.json`; tweak these rather than scattering project-level settings in feature files.

## Build, Test, and Development Commands
- `npm run dev` launches the Turbopack dev server at `http://localhost:3000`, updating on save.
- `npm run build` compiles the production bundle; run it before proposing deployment-facing changes.
- `npm run start` serves the production build locally for smoke-testing.
- `npm run lint` executes the Next.js ESLint rules; treat a clean run as the minimum bar for every PR.

## Coding Style & Naming Conventions
Use TypeScript throughout and prefer colocating server/client components by route segment. Keep React components PascalCased (`HeroSection.tsx`) and helper utilities camelCased. Maintain two-space indentation consistent with the existing files. Favor Tailwind utility classes for styling; extend design tokens via `tailwind.config.ts` when utilities repeat. Run `npm run lint` to enforce the shared ESLint + Next config before pushing.

## Testing Guidelines
A formal automated test suite is not yet in place; when adding one, prefer Playwright or Jest/Testing Library under `src/__tests__/`. Until then, rely on `npm run lint` plus manual verification in the dev server. Document any new test commands in `package.json` scripts and mirror their usage here.

## Commit & Pull Request Guidelines
Commits in this repo are short, imperative statements (e.g., “Fix GTM”). Follow that style and keep commits scoped to a single concern. For pull requests, include: a concise summary of the change, screenshots for visual updates, steps to reproduce or verify, and references to related issues or tickets. Ensure PRs pass `npm run lint` and note any remaining manual QA steps.

## Deployment & Configuration Notes
Production builds deploy via Netlify (`netlify.toml`). When modifying routes or headers, update that file alongside the corresponding code. Document any required environment variables in `README.md` and confirm they are set in Netlify before merging.
