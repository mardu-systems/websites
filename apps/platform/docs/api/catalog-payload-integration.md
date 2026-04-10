# Catalog + Payload CMS Integration

Diese Dokumentation beschreibt den API-Vertrag für den Produktkatalog auf Basis der zentralen Payload-Plattform.

## Zweck

- Produktdaten, Taxonomien und Varianten zentral in Payload verwalten.
- Öffentliche Katalogausspielung nur für publizierte Datensätze.
- `mardu.space` konsumiert die Daten über `@mardu/content-core` als renderfähige DTOs.

## DTO-Vertrag

Kanonische Typen:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

- `CatalogCategoryDto`
- `CatalogTechnologyDto`
- `CatalogCarrierDto`
- `CatalogProductListItemDto`
- `CatalogProductDetailDto`
- `CatalogVariantDto`
- `CatalogFeatureGroupDto`
- `CatalogSpecGroupDto`
- `CatalogRelatedProductDto`
- `CatalogInquiryContextDto`

## Endpunktmatrix

Bereitstellung über:
[app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/[...slug]/route.ts)

1. `GET /api/product-categories`
2. `GET /api/product-technologies`
3. `GET /api/product-carriers`
4. `GET /api/product-variants`
5. `GET /api/products`
6. `GET /api/products/:id`

## Access-Regeln

- `products`, `product-categories`, `product-technologies`, `product-carriers` und `product-variants` nutzen Draft/Publish.
- Öffentlicher Read-Zugriff liefert nur `_status=published`.
- Sichtbarkeit für Consumer-Frontends wird zusätzlich über `sites` gesteuert.

## Mapping-Regeln

- Upload-Felder können über Payload `media` gepflegt werden.
- Alternativ können relative oder absolute Asset-URLs über `imageUrl` / `heroImageUrl` gepflegt werden.
- `@mardu/content-core` bevorzugt Media-Uploads und fällt sonst auf URL-Felder zurück.
- `relatedProducts` ist optional. Fehlt die Relation, darf der Consumer kontextbasierte Fallback-Empfehlungen ableiten.

## Seed- und Importpfad

Statische Ausgangsdaten:

- [apps/mardu-space/data/catalog/categories.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/catalog/categories.ts)
- [apps/mardu-space/data/catalog/products.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/catalog/products.ts)

Seed-Skript:

- [scripts/seed-catalog.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/seed-catalog.mjs)

Vertrag des Seed-Skripts:

- Upsert über `slug`
- publiziert Datensätze direkt mit `_status=published`
- setzt `sites=['mardu-space']`
- verknüpft Kategorien, Technologien, Carrier, Varianten und optionale Related Products deterministisch
