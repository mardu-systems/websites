# Roadmap Content Contracts

Die öffentliche Roadmap für `mardu.space` wird über die Payload-Collection `roadmap-items` gepflegt und in `@mardu/content-core` in renderfähige DTOs übersetzt.

## Rollenverteilung

- `apps/platform`
  - stellt die Collection `roadmap-items` bereit
  - verwaltet Drafts, Veröffentlichungen und `sites`-Sichtbarkeit
- `packages/content-core`
  - definiert die öffentlichen DTOs `RoadmapItemDto` und `RoadmapPhaseDto`
  - liefert die Fetcher `getPlatformRoadmapItems(origin, site)` und `getPlatformRoadmapPhases(origin, site)`
- `apps/mardu-space`
  - rendert `/roadmap`
  - bleibt Owner von Metadata und Seitenkomposition

## Collection Contract: `roadmap-items`

Öffentlich relevante Felder:

- `title`
- `slug`
- `summary`
- `phaseLabel`
- `timeLabel`
- `sortOrder`
- `status`
- `category`
- `bodyMarkdown`
- `featured`
- `sites`

Redaktionelle Regeln:

- Ein Dokument entspricht genau einem Vorhaben oder Feature.
- `phaseLabel` und `timeLabel` definieren die Gruppierung auf der öffentlichen Seite.
- `sortOrder` steuert die Reihenfolge innerhalb einer Phase.
- `bodyMarkdown` ist das öffentliche Inhaltsfeld und wird auf `mardu.space` als Markdown dargestellt.

## Öffentliche DTOs

### `RoadmapItemDto`

- `id: string`
- `slug: string`
- `title: string`
- `summary: string`
- `phaseLabel: string`
- `timeLabel: string`
- `sortOrder: number`
- `status: 'planned' | 'in-progress' | 'beta' | 'done'`
- `category: 'software' | 'hardware' | 'platform' | 'integrations'`
- `bodyMarkdown: string`
- `featured: boolean`

### `RoadmapPhaseDto`

- `title: string`
- `time: string`
- `items: RoadmapItemDto[]`

## Gruppierungs- und Sortierlogik

- Es werden nur veröffentlichte (`_status = published`) und für die angefragte Site sichtbare Dokumente verwendet.
- Gruppierung erfolgt über `phaseLabel + timeLabel`.
- Sortierung erfolgt zuerst über `sortOrder`, danach stabil über `title`.
- Die öffentliche `mardu.space`-Roadmap hat in v1 keine Detailseiten, Filter oder sichtbare Status-UI.
