# `@mardu/site-config`

Shared site metadata and feature-flag helpers for the public Mardu frontends.

## Public API

### Types

#### `SiteKey`

Supported site identifiers:

- `mardu-de`
- `mardu-space`
- `platform`

#### `SiteLink`

Footer/meta link DTO shared by site configs.

- `href: string`
- `label: string`

#### `SiteFeatureKey`

Supported site-level feature toggles:

- `blog`
- `integrations`

#### `SiteFeatureFlags`

DTO describing the resolved site feature state.

- `blog: boolean`
- `integrations: boolean`

#### `SiteFeatureFlagDeclarations`

Map of concrete Vercel Flags declarations for a site.

- `blog: Flag<boolean>`
- `integrations: Flag<boolean>`

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

Returns the concrete Vercel Flags declarations for the given site. These declarations are used by
app-local `flags.ts` modules and the `/.well-known/vercel/flags` discovery endpoint.

#### `getSiteFeatureFlags(site)`

Returns the resolved site feature flags asynchronously. Resolution order:

1. optional env override per site and feature
2. Vercel Flags evaluation
3. default values from `siteConfigs`

Recognized env variables:

- `MARDU_DE_ENABLE_BLOG`
- `MARDU_DE_ENABLE_INTEGRATIONS`
- `MARDU_SPACE_ENABLE_BLOG`
- `MARDU_SPACE_ENABLE_INTEGRATIONS`
- `MARDU_PLATFORM_ENABLE_BLOG`
- `MARDU_PLATFORM_ENABLE_INTEGRATIONS`

Supported values:

- `true`: force enable
- `false`: force disable
- unset or any other value: fall back to config defaults

#### `isBlogEnabled(site)`

Async convenience helper for `(await getSiteFeatureFlags(site)).blog`.

#### `isIntegrationsEnabled(site)`

Async convenience helper for `(await getSiteFeatureFlags(site)).integrations`.

#### `getPlatformOrigin()`

Returns the platform origin, optionally overridden through `MARDU_PLATFORM_ORIGIN`.

## Boundaries

- This package resolves site-level availability only.
- Feature evaluation uses Vercel Flags via `flags/next` and `@flags-sdk/vercel`.
- Payload content visibility per entry stays in `@mardu/content-core` via the existing `sites` fields.
- Frontends are responsible for using these helpers to gate navigation, routes, sitemap entries, and preview modules.
