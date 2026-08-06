# Mardu Websites Monorepo

Dieses Repository bündelt das öffentliche Frontend `mardu.de` sowie die zentrale Payload-/Lead-Plattform in einem gemeinsamen Workspace.

## Apps

- `apps/mardu-de`: öffentliche Marketing- und Produktseite von `mardu.de`
- `apps/platform`: zentrales Payload-Admin, Content-API und Lead-Backend

## Packages

- `packages/ui`: wiederverwendbare UI-Primitives
- `packages/sections`: gemeinsame Marketing-Sektionen
- `packages/styles`: globale Basis-Styles und Site-Themes
- `packages/site-config`: zentrale Site-Registry, Domains und Branding
- `packages/content-core`: gemeinsame Content-Modelle und Frontend-Mapper
- `packages/lead-core`: gemeinsame DTOs, Lead-Services und CRM-Helfer
- `packages/eslint-config`: geteilte ESLint-Konfigurationen
- `packages/tsconfig`: geteilte TypeScript-Basiskonfigurationen

## Workspace-Befehle

```bash
bun install
bun run lint
bun run type-check
bun run build
```

Für einzelne Apps:

```bash
bun run dev:mardu-de
bun run dev:platform
```

## Vercel Deployment

Die Vercel-Einrichtung für dieses Monorepo ist in [docs/vercel-deployment.md](./docs/vercel-deployment.md) dokumentiert.
