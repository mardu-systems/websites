# Mardu Websites Monorepo

Dieses Repository bündelt die öffentlichen Frontends `mardu.de` und `mardu.space` sowie die zentrale Payload-/Lead-Plattform in einem gemeinsamen Workspace.

## Apps

- `apps/mardu-de`: öffentliche Marketing- und Produktseite von `mardu.de`
- `apps/mardu-space`: öffentliche Marketing- und Whitepaper-Site von `mardu.space`
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
bun run dev:mardu-space
bun run dev:platform
```
