# `@mardu/ui`

Shared UI layer for `mardu.de`, `mardu.space`, and `platform`.

The package mirrors the `components/ui` baseline from `../mardu.de` and is the canonical home for the shared shadcn-style component set plus shared UI utilities.

## Public API

- Preferred imports use subpaths such as `@mardu/ui/components/button`
- Shared helpers use `@mardu/ui/lib/*` and `@mardu/ui/hooks/*`
- [`src/index.ts`](./src/index.ts) exists only as a compatibility barrel and should not be the default import path for app code
- Full shared `components/ui/*` set is copied from `../mardu.de`
- Additional shared building blocks exposed by this package:
  - `@mardu/ui/lib/utils` for the canonical `cn(...)` Tailwind merge helper
  - `@mardu/ui/hooks/use-mobile` for shared mobile-breakpoint state
  - `@mardu/ui/components/circle-number`
  - `@mardu/ui/components/dashed-connector`
  - `@mardu/ui/components/halftone-3d-illustration`

## `halftone-3d-illustration`

Client-Komponente für wiederverwendbare Three.js-Illustrationen mit Halftone-Postprocessing. Der öffentliche Vertrag ist über DTO-Typen dokumentiert und wird über Props gesteuert, ohne dass Consumer Three.js-Internals anfassen müssen.

```tsx
import {
  Halftone3DIllustration,
  type Halftone3DSettings,
  type Halftone3DShapeKey,
} from "@mardu/ui/components/halftone-3d-illustration";

export function Example() {
  return (
    <Halftone3DIllustration
      shapeKey="sphere"
      settings={{
        halftone: { scale: 18, dashColor: "#0f766e" },
        material: { color: "#e8e2d8" },
      }}
    />
  );
}
```

Exportierte API:

- `Halftone3DIllustration`
- `DollarCoin`
- `defaultHalftone3DSettings`
- `defaultDollarCoinPose`
- `Halftone3DIllustrationProps`
- `Halftone3DSettings`
- `Halftone3DShapeKey`
- `Halftone3DLightingSettings`
- `Halftone3DMaterialSettings`
- `Halftone3DHalftoneSettings`
- `Halftone3DAnimationSettings`
- `Halftone3DPose`
- `DeepPartial`

Props:

- `shapeKey?: Halftone3DShapeKey` wählt eine Builtin-Geometrie.
- `settings?: DeepPartial<Halftone3DSettings>` überschreibt Lighting, Material, Halftone, Background und Animation partiell.
- `initialPose?: Partial<Halftone3DPose>` wird beim Mount als Startpose verwendet.
- `previewDistance?: number` steuert die Kamera-Distanz und wird live übernommen.
- `className`, `style` und `onError` steuern Container und Fehlerbehandlung.

Interne Struktur:

- `components/halftone-3d-illustration.tsx` ist nur der öffentliche React-Wrapper.
- `components/halftone-3d/types.ts` enthält die dokumentierten DTOs.
- `components/halftone-3d/presets.ts` enthält Defaults und Resolver.
- `components/halftone-3d/builtin-geometries.ts` enthält die Builtin-Shape-Presets und Geometrie-Factories.
- `components/halftone-3d/renderer.ts` kapselt Three.js, Shader, Ressourcenverwaltung und Live-Updates.

## Contract

- Components are site-neutral UI building blocks.
- Business logic, API calls, DTO validation, and site-specific routing stay outside this package.
- Styling relies on the consuming app importing `@mardu/styles/base.css` and its site theme.

## Defaults and Side Effects

- This package intentionally includes client and server-safe UI modules together; consumers should import only the components they actually render.
- Several components depend on Radix/Base UI, motion, charts, form, and overlay libraries declared in [`package.json`](./package.json).
- When the component inventory changes in `../mardu.de/components/ui`, the shared package should be updated in lockstep to keep APIs aligned.
