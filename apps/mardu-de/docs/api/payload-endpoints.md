# Payload-Vertrag (`mardu.de`)

`mardu.de` betreibt die Payload-Runtime lokal: Admin, Content-API, Lead-Backend und SSO laufen in derselben Next.js-Instanz. Es gibt kein separates Platform-Projekt mehr.

## Payload-API

Quelle: `app/api/[...slug]/route.ts`

- `GET|POST|PATCH|PUT|DELETE|OPTIONS /api/[...slug]`
- echte Payload-REST-Handler (`@payloadcms/next/routes`, `force-dynamic`)
- keine Proxy-Weiterleitung, keine Upstream-Abhängigkeit

## Admin und SSO

- Admin unter `/admin` (`app/(payload)/admin`, `force-dynamic`, `robots.txt` disallowt `/admin`)
- SSO-Einstiegspfade unter `/api/sso/*` (Login, Callback, Logout, Debug)

## Lead-Routen

- `POST /api/contact` und `POST /api/newsletter` schreiben direkt über `getPayload()` in die Collections `contact-leads` / `newsletter-subscribers`
- `GET /api/newsletter/confirm` und `GET /api/newsletter/unsubscribe` lösen Double-Opt-in-Token lokal auf und redirecten auf die `mardu-de`-Statusseiten
- Request-Verträge bleiben unverändert: `site` wird serverseitig auf `mardu-de` gesetzt

## Content-Zugriffe

- Blog, Integrationen und Legal-Pages lesen direkt via `getPayload()` (`lib/blog.ts`, `lib/integrations.ts`, `lib/legal-pages.ts`)
- Katalog, Solutions, Roadmap und Sitemap nutzen die Content-DTOs aus `@mardu/content-core` gegen die eigene Content-API (`getContentOrigin()`, Basis `APP_URL`)

## Source of Truth

- Payload-Config, Collections und Migrationen: `payload.config.ts`, `collections/`, `migrations/`
- Lead- und Content-DTOs: `packages/content-core/src/index.ts`, `packages/lead-core/src/index.ts`
