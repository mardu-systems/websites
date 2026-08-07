# tooltip

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Tooltip.

## Changed

- `packages/ui/src/components/tooltip.tsx`: replaced Radix with Base UI Provider, Root, Trigger, Portal, Positioner, Popup, and Arrow.
- Moved positioning props to Positioner, renamed provider `delayDuration` to `delay`, adopted Base UI open/closed states and transform-origin variable.
- Converted Sidebar and cookie-setting triggers from `asChild` to `render`; the Tooltip wrapper contains no Radix imports.

## Left alone

- Default zero delay, visual styling, arrow, placement options, content API, and conditional Sidebar tooltip behavior remain unchanged.

## Behavior changes

Tooltip composition uses Base UI's `render` prop and Provider `delay`; positioning is now handled explicitly by Positioner.

## Verify by hand

- Test mouse hover and keyboard focus on cookie labels and collapsed Sidebar buttons.
- Verify delay, side/alignment, arrow position, collision handling, animation, dismissal, and focus restoration.
