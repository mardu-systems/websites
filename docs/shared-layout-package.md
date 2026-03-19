# Shared Layout Package API

Dieses Dokument beschreibt den oeffentlichen Vertrag von `@mardu/layout`.

## Ziel

- gemeinsame Header-, Footer- und Shell-Komponenten fuer mehrere Mardu-Frontends
- render-nahe DTOs statt App-spezifischer Implementierungsdetails
- Payload-ready, aber bewusst nicht Payload-modelliert

## Verantwortlichkeiten

- `@mardu/layout` rendert Layout-Komponenten auf Basis von DTOs
- konsumierende Apps liefern harte Routen, Branding und Inhalte
- Routing, Datenladen, Payload-Collections und Mapping auf DTOs bleiben ausserhalb des Packages

## DTO-Vertrag

### `LayoutLinkDto`

- `label: string`
- `href: string`
- `external?: boolean`
- `slug?: string`
- `documentId?: string`
- `cmsKey?: string`

### `HeaderNavItemDto`

- unterstuetzt heute vor allem `type: "link"` fuer die bestehende flache Navigation
- enthaelt bereits eine vorbereitende `mega`-Variante fuer spaetere CMS- oder Mega-Menu-Modelle

### `HeaderCtaDto`

- `label: string`
- `href: string`
- `mode?: "link" | "meetergo"`
- `prefill?: Record<string, string | undefined>`
- optionale Payload-Referenzfelder wie bei `LayoutLinkDto`

### `SiteHeaderProps`

- `brand`
- `items`
- `cta?`
- zusaetzliche UI-Labels fuer Accessibility und Mobile-Menu-Texte

### `FooterSocialLinkDto`

- `label`
- `href`
- `icon: "instagram" | "linkedin" | "github"`
- optionale Payload-Referenzfelder

### `SiteFooterProps`

- `brand`
- `description?`
- `navLinks?`
- `metaLinks?`
- `socialLinks?`
- `actions?`
- `onAction?`
- `theme?: "dark" | "light"`

### `SiteShellProps`

- `children`
- `header`
- `footer`
- `disabled?`
- `contentTheme?: "light" | "dark"`

## Payload-Readiness

- DTOs enthalten optionale Referenzfelder wie `slug`, `documentId` und `cmsKey`
- das Package kennt keine Payload-Collections, keine Fetch-Funktionen und keine lokalen Schemas
- spaetere Mapper von Payload-Dokumenten auf Layout-DTOs sollen ausserhalb des Packages liegen
