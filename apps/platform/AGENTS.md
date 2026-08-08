# mardu.de Contributor Guide

This app powers the central Mardu platform, a Next.js 16 and Payload 3 application with Tailwind CSS 4 and shared workspace packages.

## Project Snapshot
- **App Router**: Pages, layouts, and API routes live under `app/` (`app/api/*` for endpoints).
- **Reusable UI**: Shareable building blocks reside in `components/` and `features/`.
- **Client & Server Utilities**: General helpers and integrations are in `lib/` and `hooks/`.
- **Static Assets & Data**: Use `public/` for images and favicons, `data/` for JSON/TS constants, and `types/` for shared TypeScript contracts.
- **Tooling**: Local Tailwind plugins in `plugin/`, maintenance scripts in `scripts/` (e.g., image compression).

## Tooling & Environment
- **Engines**: Use the repository's Bun version from the root `packageManager` field.
- **Environment variables**: Copy `.env.example` → `.env.development` before running local builds. Keep secrets out of source control. Critical keys include GA4 (`NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`) and email/newsletter settings (`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`, `APP_URL`, `NEWSLETTER_SECRET`).
- **Package Manager**: Bun with the root `bun.lock` is the only documented workspace path.

## Building, Running & Quality Gates
Before opening a pull request, validate your changes by running the full set of local checks:

```bash
bun run lint && bun run type-check && bun test && bun run build
```

This sequence mirrors CI expectations: ESLint (Next + TypeScript rules), strict type checking (`tsc --noEmit`), and a production Next.js build. For day-to-day work:
- `bun run dev:platform` launches the platform development server on port 4000.
- `bun run clean` removes stale `.next` artifacts.
- `bun run build:analyze` surfaces bundle insights when diagnosing performance issues.
- `bun run --cwd apps/platform images:compress:overwrite` optimizes assets inside `public/` before committing large media updates.

## Testing & QA Strategy
The project currently relies on linting and type checking as mandatory automated gates. When adding critical logic—especially within `lib/` or hooks—prefer lightweight unit tests (Vitest or similar) colocated with the module (`*.test.ts[x]`). If you introduce new tests:
- Stick to `describe/it/expect/vi` conventions.
- Reset mocks with `vi.resetAllMocks()` in `beforeEach` and restore with `vi.restoreAllMocks()` in `afterEach`.
- Mock Node built-ins (`fs`, `os`, `path`, etc.) at the top of the file when they influence module-level state.

For UI work, manually verify the relevant route with `bun run dev:platform`. Capture screenshots or recordings whenever you adjust visual components.

## Styling & Code Conventions
- **Language**: TypeScript in strict mode with the `@/*` path alias.
- **File naming**: Favor kebab-case for filenames (`cookie-banner.tsx`) and PascalCase exports for React components. Variables and functions remain in camelCase.
- **Tailwind CSS**: Use utility-first classes and composition instead of bespoke CSS whenever possible. Co-locate component-level styles with the component.
- **Formatting**: Prettier is available via `bun run format` and `bun run format:check`.

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
