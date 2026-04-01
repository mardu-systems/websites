# `@mardu/integrations-ui`

Shared integrations discovery and detail UI components for Mardu frontends.

## Public API

- `IntegrationCard`
- `IntegrationsGrid`
- `IntegrationsFilters`
- `IntegrationsHero`
- `IntegrationsPagination`
- `IntegrationProtocolBadges`
- `IntegrationStatusBadge`
- `IntegrationDetailHero`
- `IntegrationDetailSidebar`

## Contract

- Components consume render-ready DTOs from `@mardu/content-core`.
- Fetching, metadata generation, filter parsing, and page composition stay in the consuming app.
- Route paths are configurable through `basePath`, `hrefBase`, or `buildHref` props so the package does not hardcode app-only URLs.

## Shared DTOs / Props

- `IntegrationCardProps`
- `IntegrationsGridProps`
- `IntegrationsFiltersProps`
- `IntegrationsHeroProps`
- `IntegrationsPaginationProps`
- `IntegrationProtocolBadgesProps`
- `IntegrationStatusBadgeProps`
- `IntegrationDetailHeroProps`
- `IntegrationDetailSidebarProps`
