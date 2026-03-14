# Contact API (`mardu.space`)

`mardu.space` validiert Kontaktanfragen weiterhin lokal, persistiert sie aber nicht mehr selbst. Die kanonische Verarbeitung liegt in `apps/platform`.

## `POST /api/contact`

Quelle: [`apps/mardu-space/app/api/contact/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/api/contact/route.ts)

- validiert das Payload lokal
- normalisiert Telefonnummern
- ergaenzt `site: 'mardu-space'`
- leitet an `apps/platform /api/contact` weiter
- Response bleibt `{ ok: true }`

## DTO

Quelle: [`apps/mardu-space/types/api/contact.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/types/api/contact.ts)

```ts
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
```

## Verhalten

- reCAPTCHA bleibt erhalten
- `newsletterOptIn: true` startet auf der Plattform einen DOI-Flow
- Twenty-Sync und Lead-Persistenz laufen ausschließlich in `apps/platform`
- keine lokale JSON- oder DB-Speicherung mehr in `mardu.space`
