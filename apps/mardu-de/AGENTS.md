# mardu.space Contributor Guide

This repository powers **mardu.space**, a content-rich Next.js 15 (App Router) experience with Tailwind CSS 4 and a collection of reusable UI primitives. The goal of these guidelines is to keep the project approachable, performant, and easy to extend.

## Project Snapshot
- **App Router**: Pages, layouts, and API routes live under `app/` (`app/api/*` for endpoints).
- **Reusable UI**: Shareable building blocks reside in `components/` and `features/`.
- **Client & Server Utilities**: General helpers and integrations are in `lib/` and `hooks/`.
- **Static Assets & Data**: Use `public/` for images and favicons, `data/` for JSON/TS constants, and `types/` for shared TypeScript contracts.
- **Tooling**: Local Tailwind plugins in `plugin/`, maintenance scripts in `scripts/` (e.g., image compression).

## Tooling & Environment
- **Engines**: Node ≥ 18.17 and pnpm ≥ 9 are required (npm/yarn work if you prefer).
- **Environment variables**: Copy `.env.example` → `.env.development` before running local builds. Keep secrets out of source control. Critical keys include GA4 (`NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`) and email/newsletter settings (`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`, `APP_URL`, `NEWSLETTER_SECRET`).
- **Package Manager**: The repo ships with a `pnpm-lock.yaml`, but scripts are npm-compatible.

## Building, Running & Quality Gates
Before opening a pull request, validate your changes by running the full set of local checks:

```bash
npm run lint && npm run type-check && npm run build
```

This sequence mirrors CI expectations: ESLint (Next + TypeScript rules), strict type checking (`tsc --noEmit`), and a production Next.js build. For day-to-day work:
- `npm run dev` launches the Turbopack-powered dev server on port 3000.
- `npm run clean` removes stale `.next` artifacts.
- `npm run build:analyze` surfaces bundle insights when diagnosing performance issues.
- `npm run images:compress:overwrite` optimizes assets inside `public/` before committing large media updates.

## Testing & QA Strategy
The project currently relies on linting and type checking as mandatory automated gates. When adding critical logic—especially within `lib/` or hooks—prefer lightweight unit tests (Vitest or similar) colocated with the module (`*.test.ts[x]`). If you introduce new tests:
- Stick to `describe/it/expect/vi` conventions.
- Reset mocks with `vi.resetAllMocks()` in `beforeEach` and restore with `vi.restoreAllMocks()` in `afterEach`.
- Mock Node built-ins (`fs`, `os`, `path`, etc.) at the top of the file when they influence module-level state.

For UI work, manually verify the relevant route in `npm run dev`. Capture screenshots or recordings whenever you adjust visual components.

## Styling & Code Conventions
- **Language**: TypeScript in strict mode with the `@/*` path alias.
- **File naming**: Favor kebab-case for filenames (`cookie-banner.tsx`) and PascalCase exports for React components. Variables and functions remain in camelCase.
- **Tailwind CSS**: Use utility-first classes and composition instead of bespoke CSS whenever possible. Co-locate component-level styles with the component.
- **Formatting**: Prettier is available via `npm run format` and `npm run format:check`.

### TypeScript Practices
- Prefer plain objects with explicit `type`/`interface` definitions over classes for better React interoperability.
- Avoid the `any` type. Reach for `unknown` plus type narrowing if a value’s shape is uncertain.
- Be sparing with type assertions—consider factoring logic into smaller modules when internals need direct testing.
- Keep switch statements exhaustive; add default guards that throw or narrow explicitly when dealing with discriminated unions.

## React & Component Guidelines
- Write functional components with hooks; no class components or legacy lifecycle APIs.
- Keep render logic pure. Perform side effects (analytics, subscriptions, network calls) inside `useEffect` or event handlers.
- Respect one-way data flow. Lift shared state upward or introduce context providers rather than mutating globals.
- Never mutate state directly—use setters with immutable patterns (e.g., spread syntax).
- Follow the Rules of Hooks: call hooks at the top level, outside conditionals and loops.
- Use refs sparingly and only for imperative escape hatches (focus management, external integrations).
- Design for concurrency: assume components may render multiple times; prefer functional updates (`setCount(c => c + 1)`) and clean up effects.
- Lean on React Compiler optimizations—avoid premature memoization (`useMemo`, `useCallback`) unless profiling demonstrates a need.

## Git & Pull Requests
- Default branch: `main`.
- Commit messages should be concise and imperative (Conventional Commits encouraged: `feat:`, `fix:`, `refactor:`, etc.).
- Keep PRs focused. Include:
  - A summary of intent and key changes.
  - Screenshots/GIFs for UI updates.
  - Manual verification steps and impacted routes.
  - Linked issues and updated docs (`README.md`, `publisher.md`) when relevant.
- Ensure CI-parity checks (`lint`, `type-check`, `build`) pass before requesting review.

## Security & Assets
- Never commit secrets. Sanitize configuration before pushing.
- Optimize large images with the provided script before committing.
- Review analytics or email-related changes carefully to prevent regressions.

Adhering to these practices keeps the codebase resilient, maintainable, and ready for future growth.
