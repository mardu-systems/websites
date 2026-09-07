# OIDC SSO Contract (`mardu.de`)

`mardu.de` betreibt Payload- und SSO-Endpunkte lokal in derselben App.

## Endpunkte

- `GET /api/sso/login`
- `GET /api/sso/callback`
- `GET /api/sso/logout`
- `GET /api/sso/debug` (nur mit `OIDC_DEBUG=true`)

## Source of Truth

- OIDC-/Payload-SSO-Implementierung: `lib/payload-sso.ts`, `lib/payload-sso-strategy.ts`
- DTOs: [`types/api/payload-sso.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/types/api/payload-sso.ts)
- Admin-Anbindung: `payload.config.ts`, `app/(payload)/admin/*`

## ENV-Vertrag

- `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`
- `OIDC_REDIRECT_URI` (zeigt auf `/api/sso/callback` der jeweiligen Origin)
- `OIDC_ALLOWED_EMAILS` / `OIDC_ALLOWED_EMAIL_DOMAINS`
- `OIDC_AUTO_CREATE_USERS`, `OIDC_SESSION_SECRET`, `OIDC_DEBUG`

Siehe `.env.example` für die vollständige Liste.
