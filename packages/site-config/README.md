# `@mardu/site-config`

Shared site metadata and feature-flag helpers for the public Mardu frontends.

## Public API

### Types

#### `SiteKey`

Supported site identifiers:

- `mardu-de`
- `platform`

#### `SiteLink`

Footer/meta link DTO shared by site configs.

- `href: string`
- `label: string`

#### `SiteFeatureKey`

Supported site-level feature toggles:

- `blog`
- `integrations`
- `products`

#### `SiteFeatureFlags`

DTO describing the resolved site feature state.

- `blog: boolean`
- `integrations: boolean`
- `products: boolean`

#### `SiteFeatureFlagOptionDto`

DTO for one documented override option in Vercel Flags Explorer.

- `label: string`
- `value: boolean`

#### `SiteFeatureFlagDefinitionDto`

Documented flag definition DTO exposed to app-local `flags.ts` modules.

- `key: SiteFeatureKey`
- `defaultValue: boolean`
- `description: string`
- `origin: string`
- `options: ReadonlyArray<SiteFeatureFlagOptionDto>`

#### `SiteFeatureFlagDefinitionsDto`

Map of documented flag definitions for one site.

- `blog: SiteFeatureFlagDefinitionDto`
- `integrations: SiteFeatureFlagDefinitionDto`
- `products: SiteFeatureFlagDefinitionDto`

#### `SiteConfig`

Shared configuration DTO for a site.

- `key: SiteKey`
- `label: string`
- `appName: string`
- `domain: string`
- `origin: string`
- `apiOrigin: string`
- `theme: string`
- `supportEmail: string`
- `contactPhone: string`
- `contactPhoneHref: string`
- `vatId: string`
- `newsletterSourceLabel: string`
- `contactPath: string`
- `newsletterSuccessPath: string`
- `newsletterUnsubscribePath: string`
- `whitepaperSuccessPath?: string`
- `whitepaperDownloadPath?: string`
- `emailLogoUrl: string`
- `emailBrandName: string`
- `features: SiteFeatureFlags`
- `footerMetaLinks: ReadonlyArray<SiteLink>`

### Functions

#### `getSiteConfig(site)`

Returns the static config DTO for the given site.

#### `getSiteFlagDefinitions(site)`

Returns the documented flag definition DTOs for the given site. These definitions are used by
app-local `flags.ts` modules and the `/.well-known/vercel/flags` discovery endpoint.

#### `getSiteFeatureFlags(site)`

Returns the resolved site feature flags asynchronously. Resolution order:

1. optional env override per site and feature
2. Vercel Flags evaluation
3. default values from `siteConfigs`

If no `FLAGS` SDK key is present, evaluation falls back to env overrides and site defaults without
loading the Vercel adapter. This keeps local builds and non-Vercel environments stable.

Recognized env variables:

- `MARDU_DE_ENABLE_BLOG`
- `MARDU_DE_ENABLE_INTEGRATIONS`
- `MARDU_DE_ENABLE_PRODUCTS`
- `MARDU_PLATFORM_ENABLE_BLOG`
- `MARDU_PLATFORM_ENABLE_INTEGRATIONS`
- `MARDU_PLATFORM_ENABLE_PRODUCTS`

Supported values:

- `true`: force enable
- `false`: force disable
- unset or any other value: fall back to config defaults

#### `isBlogEnabled(site)`

Async convenience helper for `(await getSiteFeatureFlags(site)).blog`.

#### `isIntegrationsEnabled(site)`

Async convenience helper for `(await getSiteFeatureFlags(site)).integrations`.

#### `isProductsEnabled(site)`

Async convenience helper for `(await getSiteFeatureFlags(site)).products`.

#### `getPlatformOrigin()`

Returns the platform origin, optionally overridden through `MARDU_PLATFORM_ORIGIN`.

## Boundaries

- This package resolves site-level availability only.
- Discovery metadata stays synchronous and framework-safe in `@mardu/site-config`.
- Runtime evaluation lives in `@mardu/site-config/feature-flags.server`.
- Feature evaluation uses Vercel Flags via `flags/next` and lazily loaded `@flags-sdk/vercel`.
- Payload content visibility per entry stays in `@mardu/content-core` via the existing `sites` fields.
- Frontends are responsible for using these helpers to gate navigation, routes, sitemap entries, and preview modules.

## mardu.de rollout flags

The Vercel flag keys are `blog`, `integrations`, and `products`. All three default to `false` for
`mardu-de`. They can be enabled independently in Vercel Flags for Preview or Production after the
corresponding content is approved. The static `MARDU_DE_ENABLE_*` variables remain explicit
emergency and local-development fallbacks; a value set there takes precedence over Vercel Flags.

Disabling one of these flags removes its public navigation and internal entry links, excludes its
routes from the sitemap and `llms.txt`, and makes direct page requests return HTTP 404.
Platform/Payload API contracts and CMS content are not disabled or modified by these frontend flags.
The mardu.de root layout is dynamic so changes to dashboard values also reach shared navigation on
otherwise static content pages without rebuilding the application.
