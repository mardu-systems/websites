# Product Catalog Contracts

Dieses Dokument beschreibt den öffentlichen Vertrag für den wiederverwendbaren Produktkatalog von `mardu.space`.

## Zielbild

- Der Katalog wirkt wie ein Shop, bleibt aber B2B- und anfrageorientiert.
- Es gibt keinen Warenkorb, keine Bestellung und keine Zahlungslogik.
- Richtpreise dienen nur zur Einordnung und werden als `ab`-Preise dargestellt.
- Routen und Anfragefluss bleiben Eigentum der konsumierenden App.

## Paketrollen

### `@mardu/content-core`

- hält renderfähige, app-unabhängige DTOs
- enthält keine `next/*`-Abhängigkeiten
- enthält keine Routinglogik
- ist die einzige Quelle für öffentliche Katalogtypen

### `@mardu/catalog-ui`

- rendert wiederverwendbare Katalog- und Produkt-UI
- konsumiert ausschließlich DTOs aus `@mardu/content-core`
- darf keine App-Routen hart codieren
- bekommt Links und CTA-Ziele ausschließlich über Props

### `apps/mardu-space`

- bleibt Eigentümer von:
  - Routing
  - Metadata
  - Anfragefluss
  - Seitenkomposition
- konsumiert renderfähige Payload-Daten über `@mardu/content-core`
- kann app-nahe Seed-Daten weiterhin als Importquelle halten, aber nicht mehr als primäre Runtime-Quelle

## Öffentliche DTOs

- `CatalogCategoryDto`
- `CatalogProductListItemDto`
- `CatalogProductDetailDto`
- `CatalogVariantDto`
- `CatalogTechnologyDto`
- `CatalogCarrierDto`
- `CatalogFeatureGroupDto`
- `CatalogSpecGroupDto`
- `CatalogRelatedProductDto`
- `CatalogInquiryContextDto`
- `PaginatedCatalogProductsDto`

## Routing- und CTA-Contract

- Katalogseiten leben in der konsumierenden App, z. B.:
  - `/products`
  - `/products/[slug]`
- UI-Komponenten erwarten konfigurierbare Ziele, z. B.:
  - `buildHref`
  - `inquiryHref`
  - `configuratorHref`
- Produktanfragen können Query-Params oder App-State verwenden, müssen aber den `CatalogInquiryContextDto` logisch transportieren.

## Anfrage-Contract

Wenn Produktanfragen aus dem Katalog entstehen, muss mindestens folgender Kontext reproduzierbar sein:

- `productId`
- `productSlug`
- `productName`
- `category`
- `variantId?`
- `priceFrom?`
- `sourcePage`
- `technologyIds?`

Dieser Kontext darf im Contact-Flow als `config` oder über Query-Params übergeben werden, bleibt aber Eigentum der App und nicht des UI-Pakets.
