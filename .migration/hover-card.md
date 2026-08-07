# hover-card

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI PreviewCard.

## Changed

- `packages/ui/src/components/hover-card.tsx`: mapped the public HoverCard wrapper to Base UI PreviewCard Root, Trigger, Portal, Positioner, and Popup.
- Routed positioning props to Positioner and updated state selectors and transform-origin variable.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Existing HoverCard export names, default placement, width, styling, controlled state, and hover/focus intent behavior remain available.

## Behavior changes

Base UI calls this primitive PreviewCard; the project keeps its HoverCard names to avoid consumer churn.

## Verify by hand

- Verify delayed hover and keyboard-focus opening, pointer travel into content, dismissal, collision handling, alignment, and animations.
