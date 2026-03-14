## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Environment Variables

Set `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` to your Google Analytics 4 measurement ID to enable analytics. If the variable is not provided, analytics will remain disabled and a warning will be logged during initialization.

To enable email delivery from the configurator, configure the following variables:

```
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_TO=
APP_URL=
MARDU_PLATFORM_ORIGIN=
NEWSLETTER_SECRET=
```

The newsletter signup uses a double opt-in process. `APP_URL` should match the frontend domain, `MARDU_PLATFORM_ORIGIN` should point to `apps/platform`, and `NEWSLETTER_SECRET` signs the shared lead tokens.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
