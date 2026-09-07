# Mardu.de

This is the official repository for the Mardu website.

## License

**Copyright © 2026 Mardu. All Rights Reserved.**

This project is not open source. The source code is available for viewing and educational purposes only. You may not use, copy, modify, or distribute the code, assets, or designs without explicit written permission from the copyright holder.

## Getting Started

Install dependencies at the repository root and start the app (öffentliches Frontend inklusive Payload-CMS, Admin und Lead-Backend in einer Instanz):

```bash
bun install
bun run dev:mardu-de
```

## Environment Variables

Set `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` to your Google Analytics 4 measurement ID to enable analytics. If the variable is not provided, analytics will remain disabled and a warning will be logged during initialization.

To enable email delivery from the configurator, configure the following variables:

```
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_TO=
APP_URL=
NEWSLETTER_SECRET=
TWENTY_API_KEY=
TWENTY_API_BASE_URL=https://twenty.mardu.systems/rest
TWENTY_SYNC_TIMEOUT_MS=6000
TWENTY_CONTACT_MESSAGE_FIELD=
TWENTY_CONTACT_SOURCE_FIELD=
TWENTY_CONTACT_NEWSLETTER_OPT_IN_FIELD=
```

The newsletter signup uses a double opt-in process. `APP_URL` should match the frontend domain and `NEWSLETTER_SECRET` signs the lead tokens. Payload runs locally in this app: configure `DATABASE_URI`, `PAYLOAD_SECRET` and `PAYLOAD_PUBLIC_SERVER_URL` (see `.env.example`); the admin is served at `/admin`.

If `TWENTY_API_KEY` is set, confirmed newsletter events and contact leads are synchronized to Twenty. This integration is optional and non-blocking.

For contact leads, optional custom field mappings can be configured:

- `TWENTY_CONTACT_MESSAGE_FIELD`: stores the contact message on the person record.
- `TWENTY_CONTACT_SOURCE_FIELD`: stores the source (`contact-form`, `configurator` or `admin-software`).
- `TWENTY_CONTACT_NEWSLETTER_OPT_IN_FIELD`: stores whether newsletter opt-in was checked.

Open [http://localhost:3000](http://localhost:3000) with your browser. Payload content is read directly from the local database via `getPayload()`; Katalog, Solutions, Roadmap und Sitemap nutzen die eigene Content-API unter `/api` (Basis `APP_URL`).

`PAYLOAD_FETCH_TIMEOUT_MS` controls the server-side content request timeout. It defaults to 10 seconds; accepted values range from 1,000 to 30,000 milliseconds.

Payload-Typen und Admin-Importmap werden bei Bedarf neu erzeugt:

```bash
bun run --cwd apps/mardu-de generate:types
bun run --cwd apps/mardu-de generate:importmap
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The app uses Next.js 16 and Bun workspace tooling.
