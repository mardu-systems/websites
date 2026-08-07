# Shared Layout Package API

Dieses Dokument beschreibt den öffentlichen Vertrag von `@mardu/layout`.

## Ziel

- gemeinsame Header-, Footer- und Shell-Komponenten für mehrere Mardu-Frontends
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
- `index?: string` für nummerierte Editorial-Navigation
- `description?: string` für eine optionale Kurzbeschreibung
- `slug?: string`
- `documentId?: string`
- `cmsKey?: string`

### `HeaderNavItemDto`

- unterstützt heute vor allem `type: "link"` für die bestehende flache Navigation
- enthält bereits eine vorbereitende `mega`-Variante für spätere CMS- oder Mega-Menu-Modelle

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
- `variant?: "default" | "editorial-index"`
- zusätzliche UI-Labels für Accessibility und Mobile-Menü-Texte

`editorial-index` rendert Indexnummer, Hauptlabel und optionale Kurzbeschreibung
als durchgehendes Kapitelraster. Auf kleineren Viewports wechselt die Variante
in ihr responsives Menü. Ankerauflösung und CTA-Verträge bleiben unverändert.

### `FooterSocialLinkDto`

- `label`
- `href`
- `icon: "instagram" | "linkedin" | "github" | "mail" | "phone"`
- optionale Payload-Referenzfelder

### `FooterAiSummaryLinkDto`

- `provider: "claude" | "chatgpt" | "perplexity"`
- `label`: zugängliche Beschreibung des externen Ziels
- `href`: Deeplink mit dem von der App vorbefüllten Prompt
- optionale Payload-Referenzfelder

### `SiteFooterProps`

- `brand`: enthält Logo, Copyright-Namen und optional `wordmarkSrc` für eine eigenständige
  SVG-Wortmarke im interaktiven Footerabschluss
- `description?`
- `primaryActionSlot?`
- `navLinks?`
- `metaLinks?`
- `socialLinks?`
- `aiSummaryLinks?`: optionale Deeplinks für externe KI-Zusammenfassungen; jeder Link enthält
  einen Provider (`claude`, `chatgpt` oder `perplexity`) sowie einen von der App verantworteten,
  vorbefüllten Prompt.
- `actions?`
- `onAction?`
- `theme?: "dark" | "light"`
- `variant?: "default" | "editorial-index"`

`editorial-index` rendert einen dunklen, gerasterten Footer. Ein optionaler
`primaryActionSlot` erscheint in der Markenspalte unter dem Abschlussslogan.
Wenn `brand.wordmarkSrc` gesetzt ist, wird die Wortmarke als SVG-Maske am unteren Rand
gerendert und durch einen mausfolgenden Lichtverlauf sichtbar. Der Bewegungslistener ist
nur aktiv, solange der Abschluss im oder nahe am sichtbaren Bereich liegt.
Ohne Angabe der Variante bleibt das bisherige Standardlayout aktiv.

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
