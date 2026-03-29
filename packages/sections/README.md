# `@mardu/sections`

Shared content sections for multiple Mardu frontends.

## Public API

- `WhitepaperSection`
- `Gallery`
- `ScenarioGrid`
- `FeatureList`

## `WhitepaperSection` contract

- Props:
  - `title?: string`
  - `description?: string`
  - `benefits?: string[]`
  - `coverImageSrc?: string`
  - `className?: string`
- Behavior:
  - posts to `/api/whitepaper/request`
  - shows a success dialog after a successful request
  - contains no site-specific branding or DTO validation logic

## Shared section DTOs

- `GalleryImage` / `GalleryProps`
- `ScenarioBlock` / `ScenarioHighlight` / `ScenarioGridProps`
- `FeatureListItemDef` / `FeatureListProps`

These DTOs are intentionally render-ready. Routing, fetching, and CMS mapping stay in the consuming app or in upstream core packages.
