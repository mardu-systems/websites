# breadcrumb

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully from Radix Slot to Base UI render composition.

## Changed

- `packages/ui/src/components/breadcrumb.tsx`: replaced BreadcrumbLink's Radix Slot and `asChild` API with Base UI's typed `useRender` composition.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Breadcrumb structure, accessibility attributes, icons, labels, and styling remain unchanged.

## Behavior changes

BreadcrumbLink now uses Base UI's `render` prop for custom link components instead of `asChild`.

## Verify by hand

- Render native and Next.js links and confirm labels, current-page state, separators, hover, and keyboard focus.
