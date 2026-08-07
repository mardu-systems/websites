# popover

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Popover.

## Changed

- `packages/ui/src/components/popover.tsx`: replaced Radix with Base UI Root, Trigger, Portal, Positioner, and Popup.
- Preserved the public PopoverAnchor API with a small typed anchor context feeding Base UI Positioner, and changed its polymorphism to Base UI `render`.
- Updated state selectors and transform-origin variable; removed the type-check suppression and all Radix imports.

## Left alone

- Public exports, default alignment/offset, width, styles, collision behavior, and uncontrolled/controlled root behavior remain available.

## Behavior changes

Custom PopoverAnchor elements use `render` instead of `asChild`; positioning props are routed to Base UI Positioner.

## Verify by hand

- Test trigger-anchored and custom-anchor popovers, controlled and uncontrolled state, keyboard focus, Escape/outside dismissal, collision flipping, alignment, and animations.
