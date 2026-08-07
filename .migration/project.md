# Project migration: Radix UI to Base UI

Date: 2026-08-07

## Result

- Migrated 34 Radix-backed UI wrappers component by component using the transformation engine required for the legacy `new-york` styling.
- Scanned all 65 shared TSX wrappers in `packages/ui/src/components`: 0 wrappers remain on Radix UI.
- Removed `radix-ui` and the four direct `@radix-ui/react-*` dependencies from all workspace manifests and regenerated `bun.lock`.
- Preserved existing Tailwind classes and public wrapper names; consumer composition was migrated from Radix `asChild` to Base UI `render` where applicable.

## Migrated families

- Controls: button, checkbox, radio group, switch, slider, toggle, toggle group, select.
- Disclosure and display: accordion, collapsible, tabs, progress, avatar, aspect ratio, separator, scroll area, direction, label.
- Composition: badge, breadcrumb, button group, item, form, sidebar.
- Overlays: dialog, alert dialog, sheet, tooltip, popover, hover card/PreviewCard.
- Menus and navigation: dropdown menu, context menu, menubar, navigation menu.

## Intentionally left alone

The skill's hard-rule wrappers remain on their own libraries and were not modified as part of the Radix migration:

- `command.tsx` and `combobox.tsx` (`cmdk`)
- `drawer.tsx` (`vaul`)
- `sonner.tsx` (`sonner`)
- `input-otp.tsx` (`input-otp`)
- `calendar.tsx` (`react-day-picker`)
- `chart.tsx` (`recharts`)

These are not Radix dependencies. The remaining `asChild` occurrence in `combobox.tsx` belongs to `cmdk`; the Meetergo button's `asChild` is a project-owned API.

## Compatibility notes

- Overlay and menu positioning now uses explicit Base UI Positioner/Popup composition.
- Radix `data-state` selectors were mapped to Base UI state attributes such as `data-open`, `data-closed`, `data-pressed`, and `data-active`.
- Tooltip provider delay uses Base UI's `delay` prop.
- Select retains the wrapper's `item-aligned`/`popper` option through Base UI Positioner configuration.
- Accordion, Tabs, ToggleGroup, and Slider reports document their value and activation-model differences.
- Both app-level `components.json` files remain on Shadcn's `new-york` style. Future Shadcn additions must use a Base UI registry source or be transformed before commit, otherwise the generator may reintroduce Radix code.

## Verification

Each migrated component passed the monorepo TypeScript check before its dedicated commit. Final audit, lint, typecheck, and production builds are recorded in the task handoff.
