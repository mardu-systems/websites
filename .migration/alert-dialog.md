# alert-dialog

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI AlertDialog.

## Changed

- `packages/ui/src/components/alert-dialog.tsx`: replaced Radix primitives with Base UI Root, Trigger, Portal, Backdrop, Popup, Close, Title, and Description.
- Mapped both action and cancel controls to styled Base UI Close controls and updated animation selectors to `data-open`/`data-closed`.
- Leftover scan confirmed the wrapper contains no Radix imports.

## Left alone

- Public exports, visual structure, button variants, content sizing, and confirmation semantics remain unchanged.

## Behavior changes

Base UI now provides modal focus management and dismissal. Action and cancel remain distinct styled exports, with both closing the alert dialog as before.

## Verify by hand

- Verify trigger, focus trap/restoration, Escape handling, title/description announcement, action/cancel callbacks, close behavior, and open/close animations.
