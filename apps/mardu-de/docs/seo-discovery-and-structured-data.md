# SEO-Discovery und strukturierte Daten

Diese Dokumentation beschreibt die öffentlichen SEO- und LLM-Discovery-Signale von `mardu.de`.

## Öffentliche Endpunkte

### `GET /robots.txt`

Quelle: `app/robots.ts`

- erlaubt den öffentlichen Crawl für alle User Agents
- sperrt API-Routen vom allgemeinen Crawl aus
- verweist auf `https://www.mardu.de/sitemap.xml`
- verwendet `https://www.mardu.de` als bevorzugten Host

### `GET /sitemap.xml`

Quelle: `app/sitemap.ts`

- enthält alle gewollt indexierbaren statischen Seiten
- nimmt Blog und Integrationen nur bei aktivem Feature Flag auf
- ergänzt veröffentlichte Blog-, Integrations-, Produkt- und Lösungsdetails aus Payload
- verwendet `updatedAt` ausschließlich, wenn das Content-Dokument einen belastbaren Wert liefert
- liefert bei einem temporären Payload-Ausfall weiterhin die stabilen statischen und aktivierten Landingpages mit HTTP 200 aus
- enthält keine Newsletter- oder Token-Statusseiten

### `GET /llms.txt`

Quelle: `public/llms.txt`

- verwendet ausschließlich kanonische `https://www.mardu.de`-URLs
- verlinkt nur vorhandene Routen und Startseiten-Anker
- trennt belastbare Kernaussagen von Roadmap-Inhalten
- ergänzt, ersetzt aber weder crawlbares HTML noch Sitemap, Metadata oder JSON-LD

## Metadata-Vertrag

Statische Seiten verwenden `createPageMetadata(...)` aus `lib/seo.ts`. Der Helper erzeugt konsistent:

- Titel und Description
- selbstreferenzierenden Canonical für indexierbare Seiten
- `noindex, nofollow` für Statusseiten
- Open-Graph-Metadaten inklusive Bild
- Twitter/X-Metadaten inklusive Bild

Dynamische Detailseiten beziehen Titel, Description, Canonical, Social Image und Aktualisierungszeit aus den bestehenden `@mardu/content-core`-DTOs. Fallbacks verwenden die sichtbaren Seitendaten.

## JSON-LD-Vertrag

`components/seo/json-ld.tsx` serialisiert JSON-LD serverseitig und ersetzt `<` durch `\\u003c`, damit CMS-Inhalte das Script-Element nicht vorzeitig schließen können.

Ausgegebene Schemas:

| Route              | Schema                                       |
| ------------------ | -------------------------------------------- |
| alle Seiten        | globaler `Organization`- und `WebSite`-Graph |
| Startseite         | `FAQPage` für die sichtbaren FAQ             |
| Blogdetail         | `BlogPosting` und `BreadcrumbList`           |
| Produktdetail      | `Product` und `BreadcrumbList`               |
| Lösungsdetail      | `WebPage` und `BreadcrumbList`               |
| Integrationsdetail | `WebPage` und `BreadcrumbList`               |

Regeln:

- JSON-LD wird aus denselben DTOs wie sichtbarer Inhalt und Metadata erzeugt.
- `dateModified` wird nur aus Payload-`updatedAt` ausgegeben.
- Ein `Product` erhält nur dann ein `Offer`, wenn ein numerischer `priceFrom`-Wert vorhanden ist.
- Breadcrumb-Daten entsprechen sichtbaren Navigationspfaden.
- Nicht veröffentlichte, nicht gefundene und statusabhängige Seiten werden nicht als eigenständige indexierbare Entitäten markiert.

## Validierung

Vor einem Produktionsdeploy prüfen:

1. `/robots.txt`, `/sitemap.xml` und `/llms.txt` liefern HTTP 200.
2. Jede Sitemap-URL liefert HTTP 200, einen selbstreferenzierenden Canonical und kein `noindex`.
3. Newsletter-Statusseiten liefern `noindex, nofollow`.
4. JSON-LD ist im gerenderten HTML vorhanden und lässt sich als JSON parsen.
5. Unterstützte Rich-Result-Typen werden im Google Rich Results Test geprüft.
6. Alle Schemas werden zusätzlich im Schema.org Validator geprüft.
