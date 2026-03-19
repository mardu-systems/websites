# `@mardu/ui`

Shared UI layer for `mardu.de`, `mardu.space`, and `platform`.

The package mirrors the `components/ui` baseline from `../mardu.de` and is the canonical home for the shared shadcn-style component set plus shared UI utilities.

## Public API

- Preferred imports use subpaths such as `@mardu/ui/components/button`
- Shared helpers use `@mardu/ui/lib/*` and `@mardu/ui/hooks/*`
- [`src/index.ts`](./src/index.ts) exists only as a compatibility barrel and should not be the default import path for app code
- Full shared `components/ui/*` set is copied from `../mardu.de`

## Contract

- Components are site-neutral UI building blocks.
- Business logic, API calls, DTO validation, and site-specific routing stay outside this package.
- Styling relies on the consuming app importing `@mardu/styles/base.css` and its site theme.

## Defaults and Side Effects

- This package intentionally includes client and server-safe UI modules together; consumers should import only the components they actually render.
- Several components depend on Radix/Base UI, motion, charts, form, and overlay libraries declared in [`package.json`](./package.json).
- When the component inventory changes in `../mardu.de/components/ui`, the shared package should be updated in lockstep to keep APIs aligned.
