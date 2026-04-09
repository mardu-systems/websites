# Implementierung von Solutions und Product Catalog in Payload CMS

## 1. Goal
Vollständige Implementierung der Datenmodelle für "Solutions" und den "Product Catalog" (Categories, Technologies, Carriers, Products) im Payload CMS (apps/platform), inkl. Anpassung der Konfiguration und Migration von statischen Mock-Daten zu CMS-Datenstrukturen.

## 2. Approach
Das aktuelle Setup von `apps/platform` nutzt `@payloadcms/db-postgres` und definiert Collections via Typescript.
Um die DTOs in `@mardu/content-core` und die Mock-Daten in `apps/mardu-space/data/catalog` & `apps/mardu-space/data/solutions.ts` zu bedienen, müssen wir entsprechende Collections erstellen.
Anstatt Frontend-Code umzuschreiben, was außerhalb des expliziten Auftrags liegt (oder zu umfangreich für eine einzelne Aufgabe ist), erstellen wir zunächst *alle notwendigen CMS-Collections* und registrieren diese im `payload.shared-config.mjs` sowie in den relevanten Plugins (MCP, SEO), damit Redakteure und AI-Agents diese pflegen können. 

## 3. File Changes
- **Modify** `apps/platform/collections/solution.ts`: Umbenennen des Slugs von `solution-posts` zu `solutions`, Hinzufügen der fehlenden Felder aus dem `SolutionDetailDto` (wie `tagline`, `summary`, `themeTone`, `heroTitle`, `heroIntro`, `problemTitle`, `problemBody`, `contentBlocks` array).
- **Create** `apps/platform/collections/product-categories.ts`: Collection für `CatalogCategoryDto` (`name`, `slug`, `eyebrow`, `description`, `image`, `featured`, `products` relation).
- **Create** `apps/platform/collections/product-technologies.ts`: Collection für `CatalogTechnologyDto` (`name`, `slug`, `description`, `visualLabel`, `image`).
- **Create** `apps/platform/collections/product-carriers.ts`: Collection für `CatalogCarrierDto` (`name`, `slug`, `description`, `visualLabel`, `technologyLabel`).
- **Create** `apps/platform/collections/products.ts`: Collection für `CatalogProductDetailDto` (`name`, `slug`, `badge`, `eyebrow`, `description`, `image`, `priceFrom`, relations zu variants, categories, technologies, carriers, featureGroups).
- **Create** `apps/platform/collections/product-variants.ts`: Collection für `CatalogVariantDto` (`name`, `sku`, `price`, `image`).
- **Modify** `apps/platform/payload.shared-config.mjs`: Importieren der neuen Collections, Registrieren im `collections`-Array und Hinzufügen zum `mcpPlugin` und `seoPlugin`.

## 4. Implementation Steps
1. **Task 1: Solutions Collection aktualisieren**
   - Ändere in `apps/platform/collections/solution.ts` den Exportnamen auf `Solutions` und den slug auf `solutions`.
   - Füge Text/Textarea-Felder für `tagline`, `summary`, `heroTitle`, `heroIntro`, `problemTitle`, `problemBody`, `ctaLabel`, `ctaHref` hinzu.
   - Ändere das `coverImage` zu getrennten Relationen (`image` und `heroImage`).
   - Füge ein Block/Array-Feld für `contentBlocks` hinzu, inkl. `eyebrow`, `title`, `body`, `image` und `imageSide` (select: left/right).
   - Füge ein Select-Feld `themeTone` hinzu.
2. **Task 2: Product Catalog Taxonomy Collections erstellen**
   - Erstelle `apps/platform/collections/product-categories.ts`.
   - Erstelle `apps/platform/collections/product-technologies.ts`.
   - Erstelle `apps/platform/collections/product-carriers.ts`.
3. **Task 3: Products und Variants Collections erstellen**
   - Erstelle `apps/platform/collections/product-variants.ts`.
   - Erstelle `apps/platform/collections/products.ts`, verknüpfe es mit den zuvor erstellten Taxonomien via `relationship` Feldern.
4. **Task 4: Payload Konfiguration aktualisieren**
   - Öffne `apps/platform/payload.shared-config.mjs`.
   - Importiere alle neu erstellten Collections.
   - Füge sie im Array `collections` hinzu.
   - Füge sie im `mcpPlugin` mit Beschreibungen für die AI-Bearbeitung hinzu.
   - Ergänze sie im `seoPlugin` (sinnvollerweise `solutions` und `products`).

## 5. Acceptance Criteria
- [ ] Alle neuen/angepassten Dateien weisen keine TypeScript- oder Linting-Fehler auf.
- [ ] `payload.shared-config.mjs` referenziert die neuen Collections korrekt (kein Laufzeitfehler beim Start von Payload).
- [ ] Das `Solution` Schema spiegelt vollständig das `SolutionDetailDto` (bis auf die ID-Zuordnung, die über Payload Slugs läuft).
- [ ] Product Catalog Felder aus Mock-Daten (`categories.ts`, `products.ts`) lassen sich auf die CMS-Struktur mappen.

## 6. Verification Steps
- Führe `pnpm tsc --noEmit` im `apps/platform` Projektverzeichnis aus, um die Typensicherheit zu gewährleisten.
- Führe den Payload Development Server (`pnpm --filter platform dev`) testweise aus, um sicherzustellen, dass die Collections von der Payload-Runtime fehlerfrei geladen und migriert (im Memory/DB) werden können.

## 7. Risks & Mitigations
- **Risiko:** Die TypeScript-Abhängigkeiten in `payload.shared-config.mjs` könnten durch falsche Import-Pfade oder -Namen brechen (da die Datei eine `.mjs` ist, aber TS-Module lädt).
  - **Mitigation:** Exakte Einhaltung des bestehenden Patterns in `payload.shared-config.mjs` (`resolveCollectionExport(module, 'ExportName')`).
- **Risiko:** Das Datenmodell weicht leicht von den DTOs im `@mardu/content-core` ab.
  - **Mitigation:** Wir modellieren die Payload-Collections so nah wie möglich an den statischen Datenstrukturen aus `apps/mardu-space/data/` und den benannten DTOs. Das endgültige Mapping vom Payload-REST-Response zum DTO findet später im Frontend statt, weshalb leichte Feld-Abweichungen unkritisch sind, solange alle *Inhalte* erfassbar sind.