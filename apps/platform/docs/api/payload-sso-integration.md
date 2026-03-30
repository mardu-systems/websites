# Payload OIDC SSO Integration

Diese Datei dokumentiert den OIDC-SSO-Vertrag fuer den Payload Admin Login.

## Ziel

- Login in `/admin` über externen Identity Provider (OIDC).
- Kompatibel mit Keycloak, Auth0, Okta, Azure Entra ID.
- Bun-basiertes Setup ohne zusaetzlichen Auth-Proxy.

## Endpunkte

Implementierung:
- [app/api/sso/login/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/sso/login/route.ts)
- [app/api/sso/callback/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/sso/callback/route.ts)
- [app/api/sso/logout/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/sso/logout/route.ts)

1. `GET /api/sso/login`
2. `GET /api/sso/callback`
3. `GET /api/sso/logout`
4. `GET /api/sso/debug` (nur bei `OIDC_DEBUG=true`)

## DTOs

Kanonische Typen:
[types/api/payload-sso.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/payload-sso.ts)

- `PayloadSsoLoginQueryDto`
- `PayloadSsoLogoutQueryDto`
- `PayloadSsoCallbackQueryDto`
- `PayloadSsoErrorCode`
- `PayloadSsoErrorDto`
- `PayloadSsoDebugDto`

## Query-Parameter

### `GET /api/sso/login`

- `returnTo` (optional): Relativer Pfad fuer Redirect nach erfolgreichem Login, default `/admin`.

### `GET /api/sso/callback`

- `code`: OIDC Authorization Code
- `state`: CSRF/PKCE state
- `error`: Provider-Fehlercode (falls Login abgebrochen/fehlgeschlagen)

### `GET /api/sso/logout`

- `redirect` (optional): Ziel nach Logout, default `/admin/login`

### `GET /api/sso/debug`

- Kein Input.
- Gibt Debug-Zustand fuer Cookies/Session/User-Lookup zurueck.
- Nur aktiv in `development` mit `OIDC_DEBUG=true`, sonst `404`.

## Laufzeit-Matrix

- OIDC aktiv:
  - Login zeigt OIDC-CTA plus Passwort-Form (Login-Modus: OIDC + Passwort).
  - Admin-Settings zeigen Auth-Status mit aktiver Strategy.
- OIDC inaktiv:
  - Login zeigt keinen OIDC-CTA.
  - Passwort-Login bleibt verfuegbar.
- Debug in Development:
  - `[OIDC]` Logs aktiv bei `OIDC_DEBUG=true`.
  - `/api/sso/debug` verfuegbar.
- Debug in Production:
  - keine OIDC-Debug-Logs.
  - `/api/sso/debug` liefert `404`.

## Access und Sicherheitsregeln

- Aktiv nur wenn `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET` gesetzt sind.
- OIDC-Flow nutzt PKCE (`S256`) und signed state-cookie.
- Session basiert auf signed, `httpOnly` Cookie (`mardu_oidc_session`).
- Optionales Hardening:
  - `OIDC_ALLOWED_EMAILS`
  - `OIDC_ALLOWED_EMAIL_DOMAINS`
- Optionales Auto-Provisioning:
  - `OIDC_AUTO_CREATE_USERS=true`
  - Default ohne gesetzte Variable: `true` in Development, `false` in Production
- Optionales Debugging:
  - `OIDC_DEBUG=true` schreibt Schritt-fuer-Schritt Logs in den Server-Output.
  - wirksam nur in `development`.

Auth-Strategie in Payload:
- [collections/users.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/users.ts)
- [lib/payload-sso-strategy.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/payload-sso-strategy.ts)

## Fehlerverhalten

Typische Redirect-Fehlercodes (auf `/admin/login?error=<code>`):

- `oidc_not_configured`
- `oidc_login_init_failed`
- `oidc_missing_callback_params`
- `oidc_state_missing`
- `oidc_state_invalid`
- `oidc_state_mismatch`
- `oidc_email_not_allowed`
- `oidc_user_not_found`
- `oidc_callback_failed`
- `oidc_<provider_error>`

`GET /api/sso/login` kann alternativ `503` JSON liefern, wenn OIDC nicht konfiguriert ist:

```json
{
  "error": "OIDC SSO is not configured."
}
```

## ENV-Vertrag

```env
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=

OIDC_ISSUER=
OIDC_DISCOVERY_URL=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
OIDC_REDIRECT_URI=http://localhost:3000/api/sso/callback
OIDC_JWKS_URI=
OIDC_ALLOWED_EMAILS=
OIDC_ALLOWED_EMAIL_DOMAINS=
OIDC_AUTO_CREATE_USERS=false
OIDC_SESSION_SECRET=
OIDC_DEBUG=false
```

`OIDC_DISCOVERY_URL` und `OIDC_JWKS_URI` sind optionale Overrides fuer Provider, deren Discovery- oder JWKS-Endpunkte von der Standardableitung aus `OIDC_ISSUER` abweichen.
