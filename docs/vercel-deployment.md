# Vercel Deployment

Diese Anleitung macht die drei deploybaren Apps in diesem Monorepo reproduzierbar auf Vercel konfigurierbar.

## Zielbild

- ein Git-Repository
- drei getrennte Vercel-Projekte
- jeweils ein Root Directory pro Projekt:
  - `apps/mardu-de`
  - `apps/mardu-space`
  - `apps/platform`

## Repo-Status

Dieses Repository ist fuer das Setup vorbereitet:

- Workspace-Manager ist `bun` auf Repo-Ebene
- gemeinsame Packages liegen unter `packages/*`
- die Next-Apps transpilen die gemeinsam genutzten Workspace-Pakete inklusive `@mardu/layout`
- jede App hat ein lokales `vercel.json` mit Bun-Konfiguration

## Vercel-Projekte anlegen

Lege in Vercel drei Projekte an, jeweils aus demselben Git-Repository:

1. Projekt `mardu-de`
   - Root Directory: `apps/mardu-de`
2. Projekt `mardu-space`
   - Root Directory: `apps/mardu-space`
3. Projekt `platform`
   - Root Directory: `apps/platform`

## Empfohlene Build Settings

Framework Preset:

- `Next.js`

Install Command:

- nicht überschreiben
- Vercel erkennt `bun.lock` und verwendet `bun install`

Build Command:

- nicht überschreiben
- Vercel verwendet das jeweilige App-Script `build`

Output Directory:

- nicht überschreiben
- Next.js wird automatisch erkannt

Node/Bun:

- Bun ist über `vercel.json` pro App auf `1.x` festgelegt

## Monorepo-Verhalten

In den Project Settings sollte zusätzlich pro Projekt aktiviert werden:

- Root Directory wie oben gesetzt
- `Include source files outside of the Root Directory`, damit `packages/*` im Build verfügbar sind
- `Skip deployments for unchanged projects`, damit nur betroffene Apps neu gebaut werden

## Vor jedem ersten Deploy lokal prüfen

```bash
bun install
bun run --cwd apps/mardu-de type-check
bun run --cwd apps/mardu-space type-check
bun run --cwd apps/platform type-check
bun run --cwd apps/mardu-de build
bun run --cwd apps/mardu-space build
bun run --cwd apps/platform build
```

## Wichtige Hinweise

- Gemeinsame Packages dürfen nicht nur im Repo existieren, sie müssen über den Workspace aufgelöst werden. Deshalb immer mit dem Root-`bun.lock` deployen.
- Workspace-Pakete, die Next.js zur Laufzeit bundeln soll, müssen in `transpilePackages` stehen. `@mardu/layout` ist bereits ergänzt.
- Wenn eine App nach einem Refactor optisch “unvollständig” aussieht, zuerst prüfen, ob das jeweilige Package per Tailwind `@source` in der App eingebunden ist.

## Vercel CLI

Optional kann jedes Projekt auch per CLI mit dem jeweiligen Vercel-Projekt verlinkt werden:

```bash
vercel link
vercel pull
vercel build
vercel deploy
```

Wichtig ist dabei, dass das verknüpfte Projekt zur jeweiligen App und ihrem Root Directory passt.
