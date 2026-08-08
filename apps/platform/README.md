# Mardu Platform

This app hosts the central Payload admin, content APIs and lead platform for the Mardu monorepo.

## License

**Copyright © 2026 Mardu. All Rights Reserved.**

This project is not open source. The source code is available for viewing and educational purposes only. You may not use, copy, modify, or distribute the code, assets, or designs without explicit written permission from the copyright holder.

## Getting Started

Install dependencies at the repository root and start the platform on port 4000:

```bash
bun install
bun run dev:platform
```

## Environment Variables

Set `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` to your Google Analytics 4 measurement ID to enable analytics. If the variable is not provided, analytics will remain disabled and a warning will be logged during initialization.

To enable email delivery from the configurator, configure the following variables:

```
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_TO=
MARDU_PLATFORM_ORIGIN=
NEWSLETTER_SECRET=
TWENTY_API_KEY=
TWENTY_API_BASE_URL=https://twenty.mardu.systems/rest
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

The newsletter signup uses a double opt-in process. `MARDU_PLATFORM_ORIGIN` should match the public platform domain, and `NEWSLETTER_SECRET` signs confirmation, unsubscribe and whitepaper tokens.

If `TWENTY_API_KEY` is set, confirmed newsletter/whitepaper events and contact leads are synchronized to Twenty. This integration is optional and non-blocking.

For contact leads, optional custom field mappings can be configured:
- `TWENTY_CONTACT_MESSAGE_FIELD`: stores the contact message on the person record.
- `TWENTY_CONTACT_SOURCE_FIELD`: stores the source (`contact-form`, `configurator` or `admin-software`).
- `TWENTY_CONTACT_NEWSLETTER_OPT_IN_FIELD`: stores whether newsletter opt-in was checked.


Open [http://localhost:4000](http://localhost:4000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The app uses Next.js 16, Payload 3 and Bun workspace tooling.
