# form

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully from Radix Label/Slot types to native label semantics and Base UI render composition.

## Changed

- `packages/ui/src/components/form.tsx`: replaced Radix Slot with Base UI `useRender`, retained the existing child-element API, and typed FormLabel against the native label element.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- React Hook Form Controller integration, generated IDs, validation messages, accessibility relationships, and all existing consumers remain unchanged.

## Behavior changes

There is no consumer-facing API change. FormControl still accepts one React element and now composes its accessibility props through Base UI.

## Verify by hand

- Submit the contact form empty and verify labels, descriptions, invalid states, focus, validation messages, and successful entry remain correctly associated.
