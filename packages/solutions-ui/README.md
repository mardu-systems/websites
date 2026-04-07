# `@mardu/solutions-ui`

Shared UI components for Mardu branch and solution pages.

## Public API

- `SolutionsHero`
- `SolutionsGrid`
- `SolutionCard`
- `SolutionDetailHero`
- `SolutionContentSplit`

## Contract

- Components consume render-ready DTOs from `@mardu/content-core`.
- The package renders UI only. Routing, metadata, data loading, and page ownership remain in the consuming app.
- No app-specific paths are hardcoded. Link targets are supplied through `basePath`, `buildHref`, or direct `href` props.
- Existing editorial primitives from `@mardu/sections` may be used internally, but the package exposes a solutions-specific API.

## Shared DTOs / Props

- `SolutionListItemDto`
- `SolutionDetailDto`
- `SolutionFeatureDto`
- `SolutionContentBlockDto`
- `SolutionsHeroProps`
- `SolutionsGridProps`
- `SolutionCardProps`
- `SolutionDetailHeroProps`
- `SolutionContentSplitProps`
