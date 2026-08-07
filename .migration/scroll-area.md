# scroll-area

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with horizontal measurement support.

## Changed

- `packages/ui/src/components/scroll-area.tsx`: replaced Radix parts with Base UI Root, Viewport, Content, Scrollbar, Thumb, and Corner; added the Base UI Content wrapper needed for correct horizontal overflow measurement.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/scroll-area.tsx` returned no matches.

## Left alone

- No current application consumers import the shared ScrollArea wrapper, so no call-site changes were required.
- Native page scrolling and unrelated overflow containers were not modified.

## Behavior changes

Radix's `type` and `scrollHideDelay` props have no Base UI equivalents; scrollbar visibility is CSS-driven in Base UI. No current consumer uses those props.

## Verify by hand

- Render content taller than the viewport and confirm the vertical thumb can be dragged and responds to wheel scrolling.
- Add a horizontal ScrollBar and wide content, then confirm horizontal overflow is measured correctly.
- Keyboard-focus the viewport and confirm the existing focus ring remains visible.
