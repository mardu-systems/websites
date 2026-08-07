# dialog

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Dialog.

## Changed

- `packages/ui/src/components/dialog.tsx`: replaced Radix Dialog with Base UI Root, Trigger, Portal, Backdrop, Popup, Close, Title, and Description while preserving the existing layout and styling.
- Converted all application DialogTrigger consumers from `asChild` to Base UI's `render` composition.
- Updated animation selectors from Radix `data-state` to Base UI `data-open` and `data-closed` states; the wrapper contains no Radix imports.

## Left alone

- Controlled dialog state, forms, close-button option, content dimensions, accessibility labels, and business behavior remain unchanged.

## Behavior changes

DialogTrigger now uses `render` instead of `asChild`. Base UI owns focus management, dismissal, scroll locking, and portal behavior.

## Verify by hand

- Open and close newsletter, whitepaper, CTA, and roadmap dialogs by mouse and keyboard.
- Verify focus trapping/restoration, Escape and backdrop dismissal, scroll locking, animations, labels, descriptions, and form submission.
