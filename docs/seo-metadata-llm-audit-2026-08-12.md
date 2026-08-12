# SEO-, Metadaten- und LLM-Audit für mardu.de

Stand: 12. August 2026

> Umsetzungsstatus: Die lokal behebbaren P0-/P1-Befunde wurden am 12. August 2026 im Repository korrigiert. Dazu gehören Canonicals, `noindex` für Statusseiten, Social-Metadaten, Sitemap-Fallback und -Abdeckung, interne Solution-Links, DTO-basierte strukturierte Daten sowie die neue `llms.txt`. Produktionsdeploy, Host-Redirect-Konfiguration, Search Console, Felddaten und redaktionelle Veröffentlichungen bleiben externe Betriebsschritte.

> Verifikation: Beide Next.js-Anwendungen wurden erfolgreich als Produktions-Build erstellt. Alle 46 URLs der lokalen Sitemap, die Startseite und deren interne Links antworteten im abschließenden Crawl mit HTTP 200. Die JSON-LD-Blöcke der Start-, Produkt-, Lösungs- und Integrationsseiten wurden erfolgreich als JSON geparst.

## Executive Summary

Die technische Basis im aktuellen Repository ist solide, aber noch nicht launchbereit. Next.js Metadata, Canonicals, Robots, Sitemap, Open Graph, Twitter Cards, Google-Verifizierung und globales JSON-LD sind bereits zentral angelegt. Alle 20 lokal geprüften HTML-Routen antworten mit genau einer H1 und alle gerenderten Bilder besitzen ein `alt`-Attribut.

Die größten Risiken liegen nicht in fehlender Grundtechnik, sondern in Inkonsistenzen zwischen Route, Sitemap, Canonical, Content-Backend und Produktion:

1. **Produktion ist deutlich hinter dem Repository:** Sieben von elf geprüften Zielrouten liefern aktuell 404; die produktive Sitemap enthält nur fünf URLs und die produktive `llms.txt` beschreibt noch die alte Positionierung.
2. **Vier indexierbare Routen kanonisieren fälschlich auf die Startseite:** `/platform`, `/configurator`, `/whitepaper` und `/whitepaper/success`.
3. **Statusseiten sind indexierbar:** `/newsletter/anmeldung`, `/newsletter/abmeldung` und `/whitepaper/success` sollten nicht in Suchergebnissen erscheinen.
4. **Interne Links führen zu 404:** Vier Lösungsseiten werden verlinkt, obwohl keine passende Detailseite aus dem Content-Backend geliefert wird.
5. **Die Sitemap ist vom Payload-Backend abhängig:** Ist Payload nicht erreichbar, antwortet `/sitemap.xml` mit 500. Außerdem wird für statische Seiten bei jedem Abruf ein neues `lastModified` erzeugt.
6. **LLM-/AEO-Signale sind noch schwach:** Es gibt nur globales `Organization`- und `WebSite`-JSON-LD. Seitenbezogene Entitäten wie `Article`, `Product`, `BreadcrumbList` und die vorhandene FAQ fehlen als strukturierte Daten.

Gesamtbewertung:

| Bereich         | Status   | Einordnung                                                                                            |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| Metadaten       | Gelb     | Gute Basis, aber falsche Canonicals und unvollständige Social-Metadaten                               |
| Technisches SEO | Rot/Gelb | Produktionsdrift, Sitemap-Abhängigkeit und interne 404s blockieren einen sauberen Launch              |
| On-Page SEO     | Gelb     | Saubere H1-Struktur und klare Themen, aber uneinheitliche Snippets und wenig belegbare Fachinhalte    |
| LLM-/AI-SEO     | Gelb/Rot | Crawler dürfen zugreifen, aber Entitäten, Aktualität, Quellen und maschinenlesbare Seitentypen fehlen |

## Umfang und Methodik

Geprüft wurden:

- Quellcode in `apps/mardu-de`, `apps/platform` und den gemeinsam genutzten Content-/UI-Paketen
- 20 lokal gerenderte öffentliche HTML-Routen
- lokale `robots.txt`, `sitemap.xml`, `llms.txt` und JSON-LD-Ausgabe
- interne Links der gerenderten Seiten
- produktive Startseite, zehn weitere Zielrouten sowie produktive `robots.txt`, `sitemap.xml` und `llms.txt`
- Titel, Beschreibungen, Canonicals, Robots-Meta, H1, Open-Graph-Bilder und JSON-LD

Nicht geprüft wurden mangels Zugängen oder Messdaten:

- Google Search Console und Bing Webmaster Tools
- reale Rankings, Impressionen, CTR und Indexabdeckung
- GA4-/Vercel-Analytics-Traffic
- aktuelle Erwähnungen und Zitate in ChatGPT, Perplexity, Gemini, Copilot und Google AI Overviews
- belastbare Core-Web-Vitals-Felddaten; der öffentliche PageSpeed-Endpunkt war wegen ausgeschöpfter API-Quote nicht verfügbar

## Positive Befunde

- `robots.txt` erlaubt den Crawl für `*`; damit werden GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Bingbot und andere Bots nicht explizit blockiert.
- HTTPS, HSTS, CSP, Referrer Policy, `X-Content-Type-Options` und weitere Sicherheitsheader sind produktiv vorhanden.
- HTTP wird auf HTTPS umgeleitet; der bevorzugte Host ist `www.mardu.de`.
- Das aktuelle Frontend setzt `metadataBase`, Canonicals, Open Graph, Twitter Cards, Icons, Manifest und Google-Verifizierung über Next.js Metadata.
- Alle 20 lokal geprüften Routen haben genau eine H1.
- Kein gerendertes Bild fehlte vollständig ohne `alt`-Attribut. Leere Alt-Texte werden überwiegend für dekorative Assets verwendet und müssen nur bei funktionalen/inhaltlichen Bildern manuell gegengeprüft werden.
- Die Startseite besitzt acht klar formulierte FAQ-Antworten und eine nachvollziehbare Einführung in mehreren Schritten. Das ist eine gute Basis für Answer-Engine-Optimierung.
- Blog- und Integrationsdetailseiten haben dynamische Titel, Beschreibungen, Canonicals und Social-Metadaten. Nicht gefundene Blog-/Integrationsinhalte werden auf `noindex, nofollow` gesetzt.
- Das globale JSON-LD bildet `Organization` und `WebSite` mit Logo, Telefon, E-Mail, Umsatzsteuer-ID und LinkedIn-Profil ab.

## Kritische und hohe Befunde

### P0 – Produktionsstand entspricht nicht dem aktuellen Repository

**Impact:** Kritisch

**Evidenz:** Am 12. August 2026 lieferten `/about`, `/platform`, `/products`, `/solutions`, `/roadmap`, `/whitepaper` und `/configurator` auf `www.mardu.de` HTTP 404. Die produktive Sitemap enthielt nur Startseite, Kontakt, Brand, Datenschutz und Impressum. Die produktive Startseite und `llms.txt` nannten weiterhin `mardu.space` und `mardu.construction`, während der Repository-Stand bereits eine neue Produkt-/Lösungsarchitektur enthält.

**Maßnahme:** Vor jeder Indexierungs- oder AI-Visibility-Arbeit den Zielstand deployen. Danach alle Sitemap-URLs und alle primären Navigationsziele produktiv mit einem automatisierten Smoke-Test auf Status 200, korrekten Canonical und `index, follow` prüfen.

**Akzeptanzkriterium:** Produktions-Sitemap und Navigationscrawl enthalten ausschließlich gewollte 200-Routen; kein primäres Ziel liefert 404; Positionierung in HTML, Metadaten, JSON-LD und `llms.txt` ist identisch.

### P0 – Interne Links auf vier nicht vorhandene Lösungsdetails

**Impact:** Hoch

**Evidenz:** Der lokale Crawl fand 404 für:

- `/solutions/hochschulen-und-universitaeten`
- `/solutions/labore`
- `/solutions/makerspaces-und-offene-werkstaetten`
- `/solutions/unternehmenswerkstaetten`

Die Übersichtsseite kann Explorer-Einträge darstellen, obwohl das Content-Backend keine veröffentlichten Detaildokumente liefert. Entsprechend enthält die Sitemap auch keine Lösungsdetails.

**Maßnahme:** Vor dem Rendern verlinkbarer Karten nur tatsächlich veröffentlichte, für `mardu-de` sichtbare Solution-Dokumente verwenden. Alternativ die vier Payload-Inhalte vor dem Deploy seed/publishen. Einen Test ergänzen, der alle aus `createSolutionExplorerItems` erzeugten Hrefs gegen die verfügbaren Slugs prüft.

**Akzeptanzkriterium:** Jeder interne Lösungslink liefert 200 und erscheint als kanonische URL in der Sitemap, oder wird bis zur Veröffentlichung nicht als Link ausgegeben.

### P1 – Vier falsche Canonicals durch vererbte Root-Metadaten

**Impact:** Hoch

**Evidenz:** Lokal gerendert:

| Route                 | Gerenderter Canonical  | Erwartung                                |
| --------------------- | ---------------------- | ---------------------------------------- |
| `/platform`           | `https://www.mardu.de` | `https://www.mardu.de/platform`          |
| `/configurator`       | `https://www.mardu.de` | eigener Canonical oder bewusst `noindex` |
| `/whitepaper`         | `https://www.mardu.de` | `https://www.mardu.de/whitepaper`        |
| `/whitepaper/success` | `https://www.mardu.de` | `noindex`; Canonical optional            |

Ursache ist der Root-Canonical in `app/layout.tsx`, wenn eine Route keine eigenen `alternates` definiert. `/platform` erbt zusätzlich ein falsches `hreflang=de-DE` zur Startseite.

**Maßnahme:** Root-Canonical nicht als universellen Fallback behandeln. Für jede indexierbare Route einen selbstreferenzierenden Canonical definieren. Status-/Token-Seiten auf `noindex, nofollow` setzen.

### P1 – Statusseiten sind indexierbar

**Impact:** Hoch

**Evidenz:** `/newsletter/anmeldung`, `/newsletter/abmeldung` und `/whitepaper/success` antworten lokal mit `index, follow`. Es handelt sich um zustands- bzw. tokenabhängige Abschlussseiten ohne eigenständigen Suchwert.

**Maßnahme:** Für alle drei Routen `robots: { index: false, follow: false }` setzen. Prüfen, ob weitere Bestätigungs-, Callback- oder Downloadseiten denselben Statusseiten-Pattern verwenden.

### P1 – Sitemap liefert bei Content-API-Ausfall HTTP 500

**Impact:** Hoch

**Evidenz:** Ohne laufendes Payload-Backend schlug der lokale Abruf von `/sitemap.xml` mit `ContentApiError: NETWORK` und HTTP 500 fehl. Der Fehler entsteht beim ungeschützten Aufruf von `getPlatformContentSitemapEntries(...)` in `app/sitemap.ts`.

**Maßnahme:** Content-Abruf mit einem klaren Fallback absichern. Bei temporärem Backend-Ausfall mindestens die stabilen statischen URLs ausliefern; den Fehler serverseitig beobachten. Ein Test sollte den Netzwerkfehler simulieren und weiterhin HTTP 200 mit gültigem XML erwarten.

### P1 – Statische `lastModified`-Werte sind bei jedem Sitemap-Abruf „jetzt“

**Impact:** Mittel bis hoch

**Evidenz:** `const lastModified = new Date()` wird für alle statischen Routen genutzt. Da die Sitemap `force-dynamic` ist, sieht jede statische Seite bei jedem Abruf frisch geändert aus, auch wenn ihr Inhalt unverändert blieb.

**Maßnahme:** Reale Änderungsdaten aus Content/Build/Config verwenden oder `lastModified` für statische Seiten weglassen. Dynamische Dokumente dürfen weiterhin ihr echtes `updatedAt` verwenden.

## Metadaten-Audit

### Routenabdeckung

| Route                   |                    Titel/Description |          Canonical |          Social-Metadaten | Indexierung | Bewertung                        |
| ----------------------- | -----------------------------------: | -----------------: | ------------------------: | ----------: | -------------------------------- |
| `/`                     |                          vollständig |            korrekt |    vollständig inkl. Bild |       index | gut                              |
| `/about`                | vollständig; Description 162 Zeichen |            korrekt |    vollständig inkl. Bild |       index | gut, Description kürzen optional |
| `/blog`                 |                          vollständig |            korrekt |                 ohne Bild |       index | verbessern                       |
| `/brand`                |                          vollständig |            korrekt |                 ohne Bild |       index | verbessern                       |
| `/configurator`         |                            vorhanden |        falsch: `/` |  geerbtes Startseitenbild |       index | kritisch korrigieren             |
| `/contact`              |                          vollständig |            korrekt |                 ohne Bild |       index | verbessern                       |
| `/fotos`                |                          vollständig |            korrekt |                 ohne Bild |       index | verbessern                       |
| `/integrations`         |                          vollständig |            korrekt |                 ohne Bild |       index | verbessern                       |
| `/newsletter`           |                          vollständig |            korrekt | Open Graph/Twitter geerbt |       index | bewusst ergänzen                 |
| `/platform`             |                   nur Root-Metadaten |        falsch: `/` |          Startseitenwerte |       index | kritisch korrigieren             |
| `/products`             |                          vollständig |            korrekt |         ohne Bild/Twitter |       index | verbessern                       |
| `/roadmap`              |                          vollständig |            korrekt |                 ohne Bild |       index | verbessern                       |
| `/solutions`            |                          vollständig |            korrekt |         ohne Bild/Twitter |       index | verbessern                       |
| `/whitepaper`           |                          vollständig |        falsch: `/` |  geerbte Startseitenwerte |       index | kritisch korrigieren             |
| `/whitepaper/success`   |                          dünn/geerbt |        falsch: `/` |  geerbte Startseitenwerte |       index | `noindex`                        |
| Newsletter-Statusseiten |                            vorhanden | selbstreferenziert |                    geerbt |       index | `noindex`                        |

### Weitere Metadaten-Befunde

1. **Open-Graph-Bilder sind nicht verlässlich vererbt.** Sobald eine Unterseite ein eigenes `openGraph`-Objekt definiert, fehlt bei vielen Routen das Bild in der gerenderten Ausgabe. Betroffen sind unter anderem Blog, Brand, Kontakt, Fotos, Integrationen, Produkte, Roadmap und Lösungen.
2. **Produkt- und Lösungsdetails sind unvollständig.** Beide erzeugen kein Twitter-Objekt und kein Social Image. Produktdetails sollten zusätzlich `Product`-Schema und Lösungsdetails mindestens Breadcrumb-/WebPage-Schema erhalten.
3. **Blog-Fallback-Titel kann die Marke doppeln.** Der Fallback baut bereits `${post.title} | Mardu`; zusätzlich existiert im Root-Layout das Template `%s | Mardu`. Den Content-Titel ohne Marken-Suffix an das Template geben oder `title.absolute` verwenden.
4. **Nicht gefundene Produkt-/Lösungsdokumente liefern leere Metadaten.** Zwar folgt danach `notFound()`, konsistenter wäre aber ein explizites `noindex`-Fallback wie bereits bei Blog und Integrationen.
5. **Einsprachige `hreflang`-Signale sind inkonsistent.** Die Startseite definiert `de-DE`, Unterseiten mit eigenen `alternates` verlieren diesen Eintrag; `/platform` erbt hingegen den falschen Startseiten-Link. Entweder konsequent selbstreferenziert pro Route oder bei einer rein deutschsprachigen Site ganz weglassen.
6. **Homepage-Titel nennt die Marke nicht.** Der gerenderte Titel lautet „Maschine, Tür und Schranke. Zentral geregelt.“. Der Claim ist stark, aber „Mardu“ sollte im Titel enthalten sein, um Marke und Angebot eindeutig zu verbinden.

## Technisches SEO

### Sitemap-Abdeckung

Im aktuellen Code sind folgende indexierbare Routen nicht in der Sitemap:

- `/platform`
- `/fotos`
- `/newsletter`
- `/whitepaper`
- `/configurator` – nur aufnehmen, wenn die Route indexiert werden soll

Statusseiten gehören nicht in die Sitemap und sollten `noindex` sein. Bei `/brand` ist die Aufnahme vertretbar; bei Datenschutz und Impressum ist die Aufnahme optional und hat geringe Ranking-Relevanz.

### Host- und Redirect-Konsistenz

- `http://mardu.de` leitet zunächst auf `https://mardu.de/` und danach mit 307 auf `https://www.mardu.de/` um. Das ist eine unnötige Redirect-Kette.
- `https://mardu.de` nutzt einen temporären 307-Redirect zum kanonischen `www`-Host. Für eine dauerhafte Host-Normalisierung sollte ein permanenter 308/301 verwendet werden.
- `llms.txt` verwendet überwiegend `https://mardu.de/...`, während Metadata, Sitemap und Robots `https://www.mardu.de/...` verwenden.
- Trailing-Slash-Normalisierung ist korrekt: `/about/` wird permanent auf `/about` umgeleitet.

### Überschriften, Bilder und interne Links

- Genau eine H1 auf allen 20 lokal geprüften Routen: bestanden.
- Keine Bilder ohne `alt`-Attribut: bestanden.
- Vier interne 404-Links auf Solution-Details: nicht bestanden.
- Die produktive `/integrations`- und `/blog`-Übersicht hatte im geprüften Deployment keine H1. Der neue lokale Stand behebt dies; nach Deploy erneut testen.

## LLM-/AI-SEO-Audit

### Crawl-Zugriff

**Bestanden:** Die Wildcard-Regel in `robots.txt` erlaubt den gesamten öffentlichen Bereich. Es gibt keine explizite Blockade für GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended oder Bingbot.

Empfehlung: Die offene Policy als bewusste Geschäftsentscheidung dokumentieren. Falls später Training-Crawler anders behandelt werden sollen, Such-/Nutzer-Crawler nicht versehentlich mitblockieren.

### `llms.txt`

**Status: nicht aktuell und nicht kanonisch konsistent.**

Probleme im Repository-Stand:

- beschreibt Mardu weiter als Startup „auf Baustellen“ und nennt `mardu.construction`
- verwendet überwiegend den nichtkanonischen Host ohne `www`
- verlinkt alte/nicht vorhandene Anker `#loesung`, `#argumente`, `#produkte`, `#vorgehen` und `#contact`
- verlinkt die realen Schwerpunktseiten `/platform`, `/products`, `/solutions`, `/integrations`, `/roadmap`, `/blog`, `/whitepaper` nicht oder nur unzureichend
- verspricht bevorzugte Markdown-/Textvarianten, stellt aber keine solchen Seitenvarianten bereit
- bildet keine klaren, zitierbaren Fakten zu Produkt, Zielgruppen, Technik, Grenzen, Unternehmensdaten und Aktualisierungsstand ab

Maßnahme: `llms.txt` nach der aktuellen Informationsarchitektur neu schreiben, ausschließlich kanonische `www`-URLs verwenden und die Aussagen gegen Startseite, Metadaten und JSON-LD synchronisieren. `llms.txt` ist ein ergänzendes Discovery-Format, kein Ersatz für crawlbares HTML, gute interne Links, strukturierte Daten und externe Autorität.

### Strukturierte Daten

Aktuell wird auf jeder Seite nur derselbe globale Graph mit `Organization` und `WebSite` ausgegeben. Sinnvolle Erweiterungen:

| Seitentyp                             | Empfohlenes Schema                                                      | Benötigte Daten                                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Startseite                            | `FAQPage` zusätzlich zum bestehenden Graph                              | acht sichtbare Fragen und Antworten                                                                                     |
| Blogdetail                            | `BlogPosting` oder `Article`                                            | Headline, Description, Canonical, Bild, Autor, `datePublished`, `dateModified`, Publisher                               |
| Produktdetail                         | `Product`                                                               | Name, Beschreibung, Bild, Marke, SKU/MPN falls vorhanden, technische Eigenschaften; Angebot nur bei belastbaren Preisen |
| Integrationsdetail                    | `SoftwareApplication`, `TechArticle` oder neutrales `WebPage` je Inhalt | keine unpassenden Rich-Result-Typen erzwingen                                                                           |
| Produkt-/Lösungs-/Integrationsdetails | `BreadcrumbList`                                                        | sichtbare Breadcrumbs und kanonische URLs                                                                               |
| Über uns/Kontakt                      | erweiterte `Organization`                                               | `@id`, `legalName`, Anschrift, Gründungsdatum, Gründer/Team nur aus veröffentlichten Fakten                             |

Alle Schemas müssen aus denselben DTOs wie sichtbare Inhalte und Metadata erzeugt werden, damit Titel, Canonical, Bilder und Datumswerte nicht auseinanderlaufen. Vor Veröffentlichung im gerenderten DOM und mit einem Schema-/Rich-Results-Validator prüfen.

### Zitierbarkeit und fachliche Autorität

Stärken:

- klare, direkte FAQ-Antworten
- verständliche Prozessschritte
- konkrete technische Begriffe wie IP500, lokale Freigabe, Identmedien und Qualifikationen
- transparente Einschränkungen, etwa dass Mardu keine sicherheitsgerichtete Steuerung ersetzt
- Teamseite mit Rollen und fachlichem Hintergrund

Lücken:

- kaum externe Primärquellen oder verlinkte Normen/Herstellerdokumentationen für technische und rechtliche Aussagen
- keine sichtbaren Aktualisierungsdaten auf Evergreen-Seiten
- Blogautoren haben nur Name und Rolle, aber keine ausführliche Autorenbiografie, Profilseite oder nachprüfbare Fachreferenzen
- Blogdetail zeigt Veröffentlichungsdatum, aber kein „zuletzt aktualisiert“ und kein `dateModified`
- keine publizierten Blogbeiträge und Produkt-/Lösungsdetails in der lokal generierten Sitemap; dadurch fehlt zitierbare thematische Tiefe
- keine Vergleichstabellen, Referenzarchitekturen, originale Messdaten oder klar belegte Fallstudien
- Roadmap ist ein gutes Aktualitätssignal, aber ohne eigene strukturierte Entität und ohne sichtbaren Änderungszeitpunkt pro Inhalt nur eingeschränkt extrahierbar

### Empfohlene AI-Search-Testqueries

Nach dem Deploy monatlich in Google, ChatGPT mit Suche, Perplexity, Gemini und Copilot prüfen:

1. Was ist eine digitale Maschinenfreigabe?
2. Zutrittskontrolle für Hochschulwerkstätten
3. Maschinenzugang mit Qualifikationsnachweis
4. Zutrittssystem für Makerspaces
5. Werkstatt-Zutrittskontrolle ohne WLAN
6. IP500 Zutrittskontrolle
7. Vorhandene Mitarbeiterausweise für Maschinenfreigabe nutzen
8. Zutrittskontrolle mit OIDC oder Microsoft Entra ID
9. Mardu Erfahrungen / Mardu Referenzen
10. Mardu Alternativen

Je Query erfassen: Wird Mardu erwähnt, wird eine Mardu-Seite zitiert, welche Wettbewerber/Quellen werden zitiert, welche Passage wird extrahiert und ist die Darstellung fachlich korrekt?

## Priorisierter Maßnahmenplan

### Phase 1 – vor dem nächsten Produktionsdeploy

1. Deployment-Stand angleichen und Positionierung in HTML, Metadata, JSON-LD und `llms.txt` synchronisieren.
2. Vier Solution-404s beheben oder die Links entfernen.
3. Canonicals für `/platform`, `/configurator` und `/whitepaper` korrigieren.
4. Newsletter-Statusseiten und `/whitepaper/success` auf `noindex, nofollow` setzen.
5. Sitemap bei Payload-Ausfall resilient machen.
6. Sitemap-Abdeckung für alle gewollt indexierbaren Routen vervollständigen.

### Phase 2 – Metadaten und strukturierte Daten

1. Gemeinsames, typisiertes Metadata-Pattern aus vorhandenen DTOs nutzen; keine parallelen SEO-Modelle einführen.
2. Social Images für Übersichts- und Detailseiten ergänzen.
3. Blog-Fallback-Titel entdoppeln.
4. Startseiten-FAQ als `FAQPage`, Blogposts als `BlogPosting`, Produkte als `Product` und Detailpfade als `BreadcrumbList` ausgeben.
5. `Organization` um stabile `@id`, `legalName`, Adresse und belegte Unternehmensdaten erweitern.
6. `llms.txt` vollständig neu auf die aktuelle Architektur ausrichten.

### Phase 3 – Content und Messung

1. Mindestens vier belastbare Lösungspages mit Problem, Zielgruppe, Vorgehen, Grenzen, technischen Details, FAQ und internem Link zum Produkt-/Integrationskontext veröffentlichen.
2. Blogautoren um Bio, Expertise und Profilseite erweitern; `dateModified` sichtbar und strukturiert ausgeben.
3. Quellenbasierte Fachbeiträge, Referenzarchitekturen, Vergleichstabellen und echte Fallstudien erstellen.
4. Google Search Console und Bing Webmaster Tools anbinden bzw. prüfen; Sitemap einreichen und Indexabdeckung überwachen.
5. Monatliches AI-Visibility-Tracking für die zehn Startqueries etablieren.
6. Nach dem Deploy Lighthouse/PageSpeed sowie reale Core Web Vitals prüfen.

## Empfohlene automatisierte Qualitätsgates

- Sitemap-Routen liefern 200, sind kanonisch und nicht `noindex`.
- Jede indexierbare Route hat genau einen selbstreferenzierenden Canonical.
- Status-/Token-/Bestätigungsseiten haben `noindex`.
- Kein interner Link liefert 4xx/5xx.
- Jede öffentliche HTML-Seite hat genau eine H1 und eine nicht leere Description.
- Dynamische Detailseiten haben vollständige OG-/Twitter-Metadaten und passendes JSON-LD.
- `/sitemap.xml` bleibt bei simuliertem Payload-Netzwerkfehler gültig und antwortet mit 200.
- `llms.txt` enthält nur kanonische 200-URLs und bekannte, vorhandene Anker.

## Wiederverwendbare bestehende Patterns

Für die Umsetzung sollten die vorhandenen Bausteine weiterverwendet werden:

- Next.js `Metadata` und `MetadataRoute`
- `@mardu/site-config` für Origin, Marke und Kontaktdaten
- vorhandene SEO-Felder und DTO-Mappings aus Payload/`@mardu/content-core`
- bestehende `generateMetadata`-Patterns aus Blog und Integrationen
- vorhandene FAQ-Daten aus `homepage-content.ts`
- bestehende sichtbare Breadcrumbs in Produkt- und Integrationsdetails
- `updatedAt` aus Payload für Sitemap und `dateModified`

Der Audit selbst änderte keine öffentlichen APIs oder DTO-Verträge. Die anschließende Umsetzung ergänzt Detail-DTOs additiv um bestehende Payload-SEO-, Preis- und Aktualitätsfelder; die aktualisierten Verträge sind in den jeweiligen API- und Content-Dokumentationen beschrieben.
