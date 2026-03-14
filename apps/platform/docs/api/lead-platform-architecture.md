# Lead Platform API

Zentrale Lead- und Newsletter-API fuer `mardu.de` und `mardu.space`.

## Verantwortung

- `apps/platform` ist System of Record fuer:
  - Newsletter-Subscriber
  - Contact-Leads
  - Preorder-Requests
- Persistenz erfolgt ueber Payload + PostgreSQL.
- `mardu.space` und `mardu.de` nutzen dafuer oeffentliche API-Routen oder Proxy-Routen.

## Gemeinsame DTOs

Quelle: [`packages/lead-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/lead-core/src/index.ts)

```ts
interface NewsletterRequestDto {
  email: string;
  site: 'mardu-de' | 'mardu-space';
  role: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  token?: string;
}

interface ContactRequestDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  consent: boolean;
  newsletterOptIn: boolean;
  site: 'mardu-de' | 'mardu-space';
  source: 'contact-form' | 'configurator' | 'admin-software';
  token?: string;
  config?: unknown;
}

interface PreorderRequestDto {
  email: string;
  site: 'mardu-de' | 'mardu-space';
}
```

## Kanonische Endpunkte

### `POST /api/newsletter`

Quelle: [`apps/platform/app/api/newsletter/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/newsletter/route.ts)

- validiert `NewsletterRequestDto`
- persistiert/aktualisiert einen Subscriber mit Status `pending`
- versendet die DOI-Mail
- prueft reCAPTCHA nur, wenn Token + Secret vorhanden sind
- Response: `{ ok: true }`

### `GET /api/newsletter/confirm`

Quelle: [`apps/platform/app/api/newsletter/confirm/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/newsletter/confirm/route.ts)

- bestaetigt den DOI-Token
- setzt den Subscriber auf `confirmed`
- erzeugt ein Twenty-Event `newsletter_confirmed`
- versendet eine Folge-Mail
- Whitepaper-Flows erzeugen einen site-korrekten Download-Link
- Redirect erfolgt site-abhaengig zur Success-Seite

### `GET /api/newsletter/unsubscribe`

Quelle: [`apps/platform/app/api/newsletter/unsubscribe/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/newsletter/unsubscribe/route.ts)

- validiert den Unsubscribe-Token
- setzt den Subscriber auf `unsubscribed`
- erzeugt ein Twenty-Event `newsletter_unsubscribed`
- versendet optional eine Bestaetigungs-Mail
- Redirect erfolgt site-abhaengig zur Abmeldeseite

### `POST /api/contact`

Quelle: [`apps/platform/app/api/contact/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/contact/route.ts)

- validiert `ContactRequestDto`
- persistiert den Lead in `contact-leads`
- versendet die interne Lead-Mail
- startet optional einen DOI-Flow
- synchronisiert den Lead best effort nach Twenty
- Response: `{ ok: true }`

### `POST /api/preorder`

Quelle: [`apps/platform/app/api/preorder/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/preorder/route.ts)

- validiert `PreorderRequestDto`
- persistiert/updatet den Request in `preorder-requests`
- versendet die interne Preorder-Mail
- Response: `{ ok: true }`

## Persistenzmodell

Collections:

- [`newsletter-subscribers`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/newsletter-subscribers.ts)
- [`contact-leads`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/contact-leads.ts)
- [`preorder-requests`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/preorder-requests.ts)

Wichtige Felder:

- Newsletter: `site`, `email`, `role`, `status`, `confirmedAt`, `unsubscribedAt`, `twentySyncStatus`
- Contact: `site`, `source`, `message`, `newsletterOptIn`, `emailDeliveryStatus`, `twentySyncStatus`
- Preorder: `site`, `email`, `status`, `emailDeliveryStatus`

## Twenty

Quelle: [`apps/platform/lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/integrations/twenty.ts)

- blockiert keine Nutzer-Requests
- schreibt Status zurueck in die Payload-Datensaetze
- optionale Feld-Mappings:
  - `TWENTY_CONTACT_SITE_FIELD`
  - `TWENTY_CONTACT_CONSENT_FIELD`
  - `TWENTY_NEWSLETTER_STATUS_FIELD`
  - `TWENTY_NEWSLETTER_ROLE_FIELD`
  - `TWENTY_NEWSLETTER_CONSENT_MODEL_FIELD`

## Site-Steuerung

Quelle: [`packages/site-config/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/site-config/src/index.ts)

- Redirects
- Mail-Branding
- Whitepaper-Download-Pfade
- Plattform-Ursprung (`MARDU_PLATFORM_ORIGIN`)
