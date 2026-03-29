# `@mardu/layout`

Shared site-layout components for Mardu frontends.

## Public API

- `SiteShell`
- `SiteHeader`
- `SiteFooter`
- `NavLink`
- `useScrollToSection`
- documented DTOs from `@mardu/layout/types`

## Contract

- Routing stays in the consuming app. The package accepts render-ready hard links as DTOs.
- Payload readiness is intentionally light-weight. DTOs may expose optional CMS reference fields like `slug`, `documentId`, or `cmsKey`, but this package does not fetch or model Payload collections.
- Branding stays outside the package. Apps provide logo sources, labels, CTA copy, and navigation/footer link data.

## Components

### `SiteHeader`

- renders the shared fixed header with scroll state and a mobile menu
- accepts branding, navigation items, and an optional CTA DTO
- supports a regular link CTA or the current Meetergo scheduler CTA

### `SiteFooter`

- renders the shared footer shell based on the `mardu.space` footer structure
- accepts branding, description, nav/meta/social links, and optional footer actions
- supports an optional `onAction` callback for non-link footer interactions such as cookie settings

### `SiteShell`

- composes `SiteHeader`, themed content, and `SiteFooter`
- supports `disabled` for routes or wrappers that must bypass the shared shell

### `NavLink`

- renders a hard-linked navigation entry with optional in-page anchor scrolling
- accepts only render-ready link props; route ownership remains in the app

### `useScrollToSection`

- shared hook for anchor scrolling in marketing navigation
- supports optional hash updates so app-specific desktop/mobile menus can share the same behavior
