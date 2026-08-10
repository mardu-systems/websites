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
bun test
bun run build
```

Die öffentliche Website benötigt die Payload-Plattform für Katalog, Lösungen,
Integrationen, Blog und Rechtstexte. Der reguläre Startbefehl startet deshalb
beide Apps gemeinsam:

```bash
bun run dev:mardu-de
```

Für die getrennte Entwicklung stehen weiterhin die einzelnen Prozesse bereit:

```bash
bun run dev:mardu-de:frontend
bun run dev:platform
```

## Vercel Deployment

Die Vercel-Einrichtung für dieses Monorepo ist in [docs/vercel-deployment.md](./docs/vercel-deployment.md) dokumentiert.
