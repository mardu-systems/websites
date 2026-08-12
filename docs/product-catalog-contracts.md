# Product Catalog Contracts

Dieses Dokument beschreibt den öffentlichen Vertrag für den wiederverwendbaren Produktkatalog von `mardu.de`.

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

### `apps/mardu-de`

- bleibt Eigentümer von:
  - Routing
  - Metadata
  - Anfragefluss
  - Seitenkomposition
- konsumiert renderfähige Payload-Daten über `@mardu/content-core`
- enthält keine Katalog-Seeds; Seed-Daten gehören ausschließlich zu `apps/platform/data/catalog`

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

`CatalogProductDetailDto` erweitert den sichtbaren Produktvertrag um optionale SEO- und Aktualitätsfelder:

- `seoTitle` / `seoDescription`
- `canonicalUrl`
- `ogImageUrl` / `ogImageAlt`
- `priceFrom` als numerischer Euro-Wert
- `updatedAt` als ISO-8601-Zeitpunkt

Diese Felder werden aus demselben Payload-Dokument wie die sichtbaren Produktdaten gemappt. Das Frontend darf ein strukturiertes `Offer` nur erzeugen, wenn `priceFrom` numerisch vorhanden ist; Textwerte wie „auf Anfrage“ werden nicht als Preis interpretiert.

`heroDescription` und `overview` bleiben Pflichtfelder des öffentlichen DTOs. Enthalten ältere Payload-Dokumente dort keinen Text, bildet der Mapper sie deterministisch aus `description` und danach `summary`. Ein `null`-Wert bei `priceFrom` wird nicht veröffentlicht.

Jedes veröffentlichte Produkt benötigt mindestens eine Kategorie. Die Liste `technologies` darf für Zubehör oder passive Komponenten leer sein; Consumer müssen ein leeres Array als gültigen Vertragswert behandeln.

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

`buildCatalogInquiryHref` transportiert diesen vollständigen Kontext über Query-Parameter. `/contact` validiert die Pflichtfelder, übernimmt den Kontext als `config` in `ContactRequestDto` und verwirft unvollständige Kontexte vollständig. Der Vertrag bleibt Eigentum der App und nicht des UI-Pakets.
