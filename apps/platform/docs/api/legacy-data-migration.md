# Legacy Data Migration

Diese Dokumentation beschreibt den einmaligen Import der Altbestaende in `apps/platform`.

## Ziel

- `newsletter.json` und `preorders.json` aus `apps/mardu-de` und `apps/platform` in die neuen Payload-Collections importieren.
- Deduplizierung über `subscriptionKey = site + email + role`.

## Script

Ausfuehrung:

```bash
bun run migrate:legacy-data
```

Implementierung:
[scripts/migrate-legacy-data.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/migrate-legacy-data.mjs)

## Standardquellen

- [apps/mardu-de/data/newsletter.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/data/newsletter.json)
- [apps/mardu-de/data/preorders.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/data/preorders.json)
- [apps/platform/data/newsletter.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/data/newsletter.json)
- [apps/platform/data/preorders.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/data/preorders.json)

## Ergebnis

- Newsletter-Eintraege landen in `newsletter-subscribers`
- Preorders landen in `preorder-requests`
- Bereits vorhandene Eintraege werden aktualisiert statt doppelt angelegt
