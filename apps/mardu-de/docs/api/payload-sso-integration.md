# OIDC SSO Contract (`mardu.de`)

`mardu.de` stellt keine Payload- oder SSO-Endpunkte mehr bereit.

## Source of Truth

- Die eigentliche OIDC-/Payload-SSO-Implementierung liegt in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Der kanonische API- und DTO-Vertrag liegt in [`apps/platform/docs/api/payload-sso-integration.md`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/payload-sso-integration.md) und [`apps/platform/types/api/payload-sso.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/payload-sso.ts)

## Wirkung für `mardu.de`

- keine `/api/sso/login`
- keine `/api/sso/callback`
- keine `/api/sso/logout`
- keine `/api/sso/debug`

## Zuständigkeit

- Die eigentliche OIDC-/Payload-SSO-Implementierung liegt in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Fehlercodes, ENV-Vertrag, Redirect-Details und DTOs werden ausschliesslich in der Plattform-Dokumentation gepflegt
