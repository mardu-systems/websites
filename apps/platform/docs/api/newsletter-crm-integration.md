# Newsletter + Contact CRM Integration

Quelle: [`apps/platform/lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/integrations/twenty.ts)

## Zweck

- bestaetigte Newsletter-Events und Unsubscribes nach Twenty spiegeln
- Contact-Leads als Person/Firma + Note synchronisieren
- CRM-Fehler nicht auf den Nutzerfluss durchschlagen lassen
- Sync-Status in Payload-Datensaetzen nachhalten

## Event DTO

Quelle: [`apps/platform/types/api/newsletter-crm.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/newsletter-crm.ts)

```ts
interface NewsletterCrmEventDto {
  type: 'newsletter_confirmed' | 'newsletter_unsubscribed';
  email: string;
  site: 'mardu-de' | 'mardu-space';
  role: string;
  source: 'newsletter' | 'whitepaper';
  firstName?: string;
  lastName?: string;
  company?: string;
  occurredAt: string;
  consentModel: 'double-opt-in';
}
```

## Contact DTO

Quelle: [`apps/platform/types/api/twenty-sync.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/twenty-sync.ts)

```ts
interface TwentyContactLeadDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: 'contact-form' | 'configurator' | 'admin-software';
  site: 'mardu-de' | 'mardu-space';
  consent?: boolean;
  newsletterOptIn?: boolean;
  config?: unknown;
}
```

## Environment

```env
TWENTY_API_BASE_URL=https://twenty.mardu.systems/rest
TWENTY_API_KEY=
TWENTY_SYNC_TIMEOUT_MS=6000
TWENTY_CONTACT_MESSAGE_FIELD=
TWENTY_CONTACT_SOURCE_FIELD=
TWENTY_CONTACT_NEWSLETTER_OPT_IN_FIELD=
TWENTY_CONTACT_SITE_FIELD=
TWENTY_CONTACT_CONSENT_FIELD=
TWENTY_NEWSLETTER_STATUS_FIELD=
TWENTY_NEWSLETTER_ROLE_FIELD=
TWENTY_NEWSLETTER_CONSENT_MODEL_FIELD=
```
