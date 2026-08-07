# sheet

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Dialog primitives configured as a sheet.

## Changed

- `packages/ui/src/components/sheet.tsx`: replaced Radix Dialog primitives with Base UI Root, Trigger, Portal, Backdrop, Popup, Close, Title, and Description.
- Preserved all four side variants and updated open/closed animation selectors to Base UI state attributes.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Public Sheet API, side option, close control, layout, sizes, styles, and current Sidebar integration remain unchanged.

## Behavior changes

Base UI now provides focus management, dismissal, scroll locking, and portal behavior.

## Verify by hand

- Open sheets from every side and verify animations, backdrop/Escape dismissal, focus trap/restoration, scroll locking, close button, title, and description.
