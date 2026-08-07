# button

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully while preserving the project-specific variants and classes.

## Changed

- `packages/ui/src/components/button.tsx`: replaced the Radix `Slot`/`asChild` implementation with the real Base UI `Button` primitive and retained state-aware `className` support.
- `packages/layout/src/site-header.tsx`: converted internal and external CTA links from `asChild` to Base UI `render` composition.
- `packages/catalog-ui/src/catalog-hero.tsx`: converted both CTA links to `render` composition.
- `packages/catalog-ui/src/catalog-product-card.tsx`: converted the product detail link to `render` composition.
- `packages/catalog-ui/src/catalog-product-detail-hero.tsx`: converted inquiry and configurator links to `render` composition.
- `packages/catalog-ui/src/catalog-sticky-inquiry-bar.tsx`: converted both sticky inquiry links to `render` composition.
- `packages/sections/src/brand-assets-page.tsx`: converted both contact CTAs to `render` composition.
- `packages/sections/src/configurator-teaser.tsx`: converted the configurator CTA to `render` composition.
- `packages/sections/src/cta-section.tsx`: converted primary and secondary linked buttons to `render` composition.
- `packages/sections/src/dual-image-section.tsx`: converted card links to `render` composition.
- `packages/sections/src/feature-section.tsx`: converted the feature CTA to `render` composition.
- `packages/sections/src/newsletter-status-page.tsx`: converted primary and secondary navigation actions to `render` composition.
- `apps/mardu-de/app/about/page.tsx`: converted the contact CTA to `render` composition.
- `apps/mardu-de/app/configurator/configurator-page-client.tsx`: converted the completion link to `render` composition.
- `apps/mardu-de/app/whitepaper/success/page.tsx`: converted the download and home links to `render` composition.
- `apps/mardu-de/components/layout/site-shell.tsx`: converted the footer CTA to `render` composition.
- `apps/platform/app/(frontend)/page.tsx`: converted both platform navigation actions to `render` composition.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/button.tsx` returned no matches.

## Left alone

- Other UI wrappers remain unchanged in this component commit and will be migrated separately in dependency order.
- `command`, `drawer`, `sonner`, `input-otp`, `calendar`, and `chart` wrappers are intentionally excluded because their primitives are not Radix migration targets.

## Behavior changes

None. Link semantics, button styling, disabled behavior, focus styles, and all existing variants remain intact.

## Verify by hand

- Open header, footer, catalog, configurator, newsletter, and platform CTAs and confirm each link navigates to the same destination.
- Keyboard-tab through linked buttons and confirm the visible focus ring and Enter activation.
- Trigger the whitepaper download and confirm the browser still treats it as a download.
