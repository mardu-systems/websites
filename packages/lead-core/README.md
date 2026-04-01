# `@mardu/lead-core`

Shared DTOs, schemas, and lead-flow helpers for the public Mardu frontends.

## Public API

- request/response DTOs and validation schemas for contact, newsletter, and preorder flows
- `ContactErrorResponseDto`
- `NewsletterErrorResponseDto`
- `ConsentPreferences`
- `ContactForm`
- `createContactSchema`
- `RecaptchaProvider`
- `useRecaptcha`
- `@mardu/lead-core/consent-server` for cookie persistence helpers
- `@mardu/lead-core/use-consent` for the shared consent client hook
- `@mardu/lead-core/recaptcha` for the shared reCAPTCHA provider and hook

## Contract

- DTOs are documented and intentionally app-neutral.
- The package does not own app routing or site-specific UI.
- Consent helpers use the shared `cookie_preferences` cookie contract across all public apps.
- `ContactForm` standardizes the public contact form UI and submit flow while apps still inject submit routes, phone normalization and optional reCAPTCHA execution.
- `token` remains formally optional in the shared DTOs for compatibility, but production lead endpoints may require it server-side.
- Apps using `ContactForm` or `CTASection` newsletter flows are expected to wire `executeRecaptcha` or `getRequestToken` when the backend enforces captcha.
- `RecaptchaProvider` and `useRecaptcha` centralize the client integration so public apps do not duplicate provider or hook logic.
