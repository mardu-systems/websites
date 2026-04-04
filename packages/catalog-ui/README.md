# `@mardu/catalog-ui`

Shared catalog and product-detail UI components for Mardu frontends.

## Public API

- `CatalogHero`
- `CatalogBreadcrumbs`
- `CatalogCategoryGrid`
- `CatalogTechnologyGrid`
- `CatalogCarrierGrid`
- `CatalogProductCard`
- `CatalogProductGrid`
- `CatalogProductDetailHero`
- `CatalogVariantCompare`
- `CatalogFeatureSpecSections`
- `CatalogRelatedProducts`
- `CatalogStickyInquiryBar`

## Contract

- Components consume render-ready DTOs from `@mardu/content-core`.
- Fetching, `searchParams` parsing, metadata generation, inquiry flow, and route ownership stay in the consuming app.
- Route paths are configurable through `basePath`, `buildHref`, `inquiryHref`, `configuratorHref`, or related props so the package does not hardcode app-only routing.

## Shared DTOs / Props

- `CatalogCategoryGridProps`
- `CatalogTechnologyGridProps`
- `CatalogCarrierGridProps`
- `CatalogProductCardProps`
- `CatalogProductGridProps`
- `CatalogProductDetailHeroProps`
- `CatalogVariantCompareProps`
- `CatalogFeatureSpecSectionsProps`
- `CatalogRelatedProductsProps`
- `CatalogStickyInquiryBarProps`
