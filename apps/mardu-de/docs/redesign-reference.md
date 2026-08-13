# Mardu Rebuild & Redesign Reference

Dieses Dokument dient als zentrale Referenz (Single Source of Truth) für den geplanten Umbau von **mardu.de**. Es basiert auf den vorliegenden Design-Schnittstellen von MAY STUDIO und beschreibt die vollständige Navigationsstruktur, alle Unterseiten und die inhaltlichen Details.

---

## 1. Globale Navigationsstruktur

### 1.1 Hauptnavigation (Header)

Die Navigation folgt einer technischen Nummerierung in eckigen Klammern:

- **`[01 PRODUKTE]`**
  - `01.1 Door Access` (Leitet weiter zu `/products#door-access`)
  - `01.2 Machine Access` (Leitet weiter zu `/products#machine-access`)
- **`[02 PRICING]`**
  - `02.1 Hardware`
  - `02.2 Hardware + Service`
  - `02.3 HaaS (Hardware as a Service)`
- **`[03 LÖSUNGEN]`** (Direktlink zur interaktiven Branchen-Übersicht `/solutions`)
- **`[04 INTEGRATIONEN]`** (Anbindung an Drittsysteme `/integrations`)
- **`[05 KONFIGURATOR]`** (Geführte Projektplanung `/configurator`)
- **`[06 KONTAKT]`**
  - `06.1 Beratung`
  - `06.2 Projektanfrage`
- **`[07 ÜBER UNS]`**
  - `07.1 Team`
  - `07.2 Blog` (Verlinkung auf `/blog`)

### 1.2 Footer-Navigation

Der Footer ist horizontal aufgebaut und enthält folgende Abschnitte:

- `[COPYRIGHT © 2026 MARDU GMBH]` (linksbündig)
- `[WEBDESIGN MAY STUDIO]`
- `[08 FAQ]`
- `[09 ROADMAP]`
- `[10 KONTAKT]`
- `[11 IMPRESSUM]`
- `[12 DATENSCHUTZ]`
- `[13 DE | EN]` (Sprachwähler)

---

## 2. Seitenverzeichnis (Sitemap & Single-Page-Konzepte)

### 2.1 Startseite (Homepage)

- **Hero-Bereich:**
  - _Headline:_ EINE PLATTFORM. ZWEI KLARE ANWENDUNGEN: TÜR UND MASCHINE.
  - _Visuals:_ Teenage Engineering Mockup und ein Smartphone-Visual.
  - _CTAs:_ `[01 Konfigurator]` | `[02 Pricing]`
- **Inhaltsindex (Index-Menü direkt unter dem Hero):**
  - _PRODUKTE:_ `[01 Door Access]`, `[02 Machine Access]`
  - _SOFTWARE:_ `[01 Zentrale Verwaltung]`, `[02 Integrationen]`
  - _LÖSUNGEN:_ `[01 Arbeitsumgebungen]`
  - _ZUKUNFT & ERWEITERUNGEN:_ `[01 Nutzer-App]`, `[02 Automatisierungen]`
  - _ÜBER MARDU:_ `[01 Team]`, `[02 Trusted]`, `[03 Baustellen]`
  - _KONTAKT:_ `[01 Kontaktformular]`
- **Produktwelten-Grid:**
  - _Door Access:_ Digitale Zutrittssteuerung für Werkstätten, Hochschulen, Labore und weitere professionelle Umgebungen. -> Link: `[01 Konfigurator]`, `[02 Pricing]`, `[03 Produkte]`
  - _Machine Access:_ Maschinenfreigabe und Berechtigungsverwaltung in einem zentralen System. -> Link: `[01 Konfigurator]`, `[02 Pricing]`, `[03 Produkte]`
- **Plattform-Features-Quadrant:**
  - _Headline:_ EINE PLATTFORM FÜR VERWALTUNG UND FREIGABEN.
  - _Features:_
    - `[01 PERSONEN, GRUPPEN & RECHTE]` (Zentrale Verwaltung von Nutzern und Berechtigungen)
    - `[02 EREIGNISSE UND NACHWEISE]` (Nutzung und Freigaben bleiben nachvollziehbar)
    - `[03 INTEGRATIONEN]` (Verbindung mit bestehenden Systemen)
    - `[04 EINFACHE BEDIENUNG]` (Leistungsstarke Funktionen in verständlicher Oberfläche)
  - _CTAs:_ `[01 Lösungen]` | `[02 Kontakt]`
- **Lösungen-Teaser:**
  - _Headline:_ LÖSUNGEN – ENTWICKELT FÜR REALE ARBEITSUMGEBUNGEN.
  - _Inhalt:_ Liste der 6 Lösungen mit Kurzbeschreibungen (siehe Kap. 2.4).
  - _CTAs:_ `[01 Lösungen]` | `[02 Konfigurator]`
- **Roadmap-Teaser:**
  - _Headline:_ ROADMAP.
  - _Inhalt:_ Teaser-Karten der Zukunftsfeatures.
  - _CTAs:_ `[01 Integrationen]` | `[02 Roadmap]`
- **Kunden & Partner:**
  - Logos von KIT und TH Mannheim.
- **Förderungs-Footer:**
  - Bundesministerium für Wirtschaft und Energie, ESF Plus und EXIST Logo.
- **Baustellen-Teaser:**
  - _Headline:_ SUCHEN SIE MARDU FÜR DIE BAUSTELLE?
  - _Beschreibung:_ Text über mardu.construction.
  - _CTA:_ `[01 mardu.construction]`

---

### 2.2 Produkte (Keine eigenen Produktdetailseiten)

Es gibt **keine separaten Unterseiten pro Produkt** (keine Routen `/products/[slug]`). Alle Produktinformationen werden direkt im Katalog oder auf der Preisseite dargestellt:

#### 2.2.1 Türzugang (Door Access)

- _Headline:_ TÜRZUGANG DIGITAL VERWALTEN
- _Beschreibung:_ Digitale Zutrittssteuerung für Werkstätten, Hochschulen, Labore und weitere professionelle Umgebungen.
- _Vorteile:_ Zentrale Rechteverwaltung, Flexible Zugangsberechtigungen, Nachvollziehbare Zugriffe, Weniger Schlüsselverwaltung.
- _Einsatzbereiche:_ Hochschulen, Werkstätten, Labore, Makerspaces, Community-Spaces.
- _Systemablauf:_
  1.  Nutzer identifiziert sich
  2.  Berechtigung wird geprüft
  3.  Zugang wird freigegeben
  4.  Ereignis wird dokumentiert
- _Produktgruppe:_
  - **DO1:** Elektronischer Halbzylinder -> `[01 Konfigurator]`, `[02 Pricing]`
  - **DO1-2:** Elektronischer Doppelknaufzylinder -> `[01 Konfigurator]`, `[02 Pricing]`
  - **DO1-1:** Elektronischer Knaufzylinder -> `[01 Konfigurator]`, `[02 Pricing]`
  - **B1:** Türbeschläge -> `[01 Konfigurator]`, `[02 Pricing]`

#### 2.2.2 Maschinenzugang (Machine Access)

- _Headline:_ MASCHINEN SICHER FREIGEBEN
- _Beschreibung:_ Maschinenfreigabe und Berechtigungsverwaltung in einem zentralen System.
- _Vorteile:_ Kontrollierte Nutzung, Qualifikationsbasierte Freigaben, Dokumentierte Nutzung, Höhere Sicherheit im Betrieb.
- _Einsatzbereiche:_ Werkstätten, Makerspaces, Ausbildungszentren, Labore.
- _Systemablauf:_
  1.  Nutzer identifiziert sich
  2.  Berechtigung wird geprüft
  3.  Sicherheitsbedingungen werden kontrolliert
  4.  Maschine wird freigegeben
  5.  Nutzung wird dokumentiert
- _Produktgruppe:_
  - **D1:** Maschinenfreigabe mit BLE -> `[01 Konfigurator]`, `[02 Pricing]`
  - **D1-PRO:** Maschinenfreigabe mit IP500 und Strommessung -> `[01 Konfigurator]`, `[02 Pricing]`

---

### 2.3 Preisseite (Pricing)

- **Struktur:** Tabs für jedes Hardware-Modell (DO1, DO1-1, DO1-2, B1, D1, D1-Pro).
- **Betriebsmodelle (Unter-Tabs für jedes Modell):**
  - **`[01 HARDWARE]`**: Einmaliger Kauf der Geräte.
  - **`[02 HARDWARE + SERVICE]`**: Kauf + monatlicher Servicevertrag.
    - _Für wen:_ Hochschulen, Werkstätten, Labore, Makerspaces, Community-Spaces.
    - _Vorteile:_ Zentrale Rechteverwaltung, Flexible Zugangsberechtigungen, Nachvollziehbare Zugriffe, Weniger Schlüsselverwaltung.
    - _Modell:_ Ab **495 Euro + 25 Euro / Monat + USt.**
  - **`[03 HAAS (Hardware as a Service)]`**: Volles monatliches Mietmodell.
- **Beratungs-Teaser unten:** "NICHT SICHER, WELCHES MODELL PASST?" -> `[01 Konfigurator]`

---

### 2.4 Branchenlösungen (Lösungen – Reine Single Page)

Es gibt **keine separaten Unterseiten pro Lösung** (keine Routen `/solutions/[slug]`).

- **CMS-Anbindung:** Die Inhalte (Titel, Taglines, typische Anwendungsfälle, Vorteile, Detailbeschreibungen) sind über das CMS (Payload oder lokale JSONs/Datenstrukturen) editierbar und veränderlich.
- **UI-Struktur:** Alle Branchen werden auf der Seite `/solutions` über eine linke vertikale Tab-Leiste angesteuert:
  - `Hochschulen`, `Werkstätten`, `Labore`, `Makerspaces`, `Ausbildungszentren`, `Community-Spaces`.
- **Dynamischer Content-Wechsel:** Beim Klick auf eine Branche ändert sich die Anzeige im zentralen Bereich verzögerungsfrei und lädt die folgenden CMS-gesteuerten Blöcke:
  - `[1] TYPISCHE ANWENDUNGSFÄLLE`: Dynamisch geladen aus den CMS-Daten für das ausgewählte Lösungssegment.
  - `[2] VORTEILE`: Dynamisch geladene Vorteile für die Branche.
  - `[3] DETAILBESCHREIBUNG`: Einleitungstext und längerer Fließtext aus dem CMS.
- _Rechter Bereich:_ Ein passendes Produktbild sowie Direktlinks zu Konfigurator, Pricing und Integrationen.

---

### 2.5 Integrationslandschaft (Integrationen – Reine Single Page)

Es gibt **keine separaten Unterseiten pro Integration** (keine Routen `/integrations/[slug]`).

- **CMS-Anbindung:** Alle verfügbaren und geplanten Schnittstellen werden dynamisch aus dem CMS bezogen.
- **Struktur auf `/integrations`:**
  - **Bereich 1: `[01 BEREITS VERFÜGBAR]`**
    - _LDAP:_ Beschreibungstext und Logo.
    - _OIDC:_ Beschreibungstext und Logo.
  - **Bereich 2: `[02 GEPLANTE INTEGRATIONEN]`**
    - _Microsoft Entra:_ Beschreibungstext und Logo.
    - _EasyVerein:_ Beschreibungstext und Logo.
    - _Lexware:_ Beschreibungstext und Logo.
    - _SevDesk:_ Beschreibungstext und Logo.
- _Darstellung:_ Detailbeschreibungen zu den einzelnen Systemen werden direkt inline oder in ausklappbaren Accordion-Elementen gerendert.

---

### 2.6 Interaktiver Konfigurator

- **Struktur:** Zirkulärer Projektplaner mit umlaufenden Orbit-Kugeln für die Teilschritte:
  - `[01] Drehstrom-Maschinen` (z. B. Sägen, Fräsen mit roten Steckern)
  - `[02] Eingangstüren`
  - `[03] Kühlschränke`
  - `[04] Schuko-Maschinen`
  - `[05] Elektrische Tore`
  - `[06] Zentrale Räume`
  - `[07] Zusammenfassung` (Kabelbedarfsrechnung: Zweiadriges und 12-adriges System)
  - `[08] Kontaktdaten für Angebot` (Formular mit DSGVO Checkbox)
  - `[09] Vielen Dank für Ihre Anfrage.` (Bestätigung mit CTAs zu Integrationen, Roadmap, FAQ)
- **Tooltip-Mechanik:** Zu jedem Eingabeschritt gibt es eine Info-Box (ausgelöst durch Klick auf das `+`-Symbol) mit Detailerklärungen zum jeweiligen Gerätetyp.

---

### 2.7 Roadmap

- **Headline:** ROADMAP – MARDU ENTWICKELT HARDWARE, SOFTWARE, PLATTFORMFUNKTIONEN UND INTEGRATIONEN KONTINUIERLICH WEITER.
- **Zustandsfilter / Status-Kategorien:**
  - `[01] KÜRZLICH UMGESETZT` (Grüner Punkt / Pfeil)
  - `[02] IN ARBEIT` (Blauer Punkt / Pfeil)
  - `[03] GEPLANT` (Oranger Punkt / Pfeil)
- **Interaktion:** Suchleiste ("Suche") oben rechts.

---

### 2.8 Über Uns

- **Mitgliederprofile:**
  - **Luca Schöneberg** (Co-founder): B.Sc. Medieninformatik (Hochschule Osnabrück) und ausgebildeter Fachinformatiker für Systemintegration. Verantwortlich für Web-, App- und Backend-Entwicklung sowie Nutzer- und Rechteverwaltung.
  - **Erik Frey** (Co-founder): B.Sc. Elektrotechnik und Informationstechnik (Karlsruher Institut für Technologie, KIT). Verantwortlich für Embedded Software und Hardware-Entwicklung.
  - **Melvin Valerius** (Kauf. Leiter): Studium Volkswirtschaftslehre (Universität Münster) und Ausbildung zum Industriekaufmann. Zuständig für Finanzen, Buchhaltung und Controlling.
- **Geschichts-Bereich:**
  - _Headline:_ UNTERNEHMENSGESCHICHTE (Detaillierter Chroniktext).

---

### 2.9 Fachblog (Blog - `/blog` & `/blog/[slug]`)

- **Einbindung:** Übernommen in die Hauptnavigation unter `[07.2 Blog]`.
- **Konzept:**
  - Die Blog-Übersichtsseite zeigt Fachartikel rund um Zugangssysteme, Engineering und AI-Workflows.
  - Die Layouts von `@mardu/blog-ui` werden farblich und typografisch an das neue Teenage Engineering Design angeglichen (eckige Rahmen, eckige Klammern als Tags, Monospace-Uhrzeiten und -Lesezeiten).
  - Aufgrund der Natur langer Blogbeiträge bleiben die dynamischen Artikelseiten unter `/blog/[slug]` als eigenständige Leseansichten bestehen.

---

### 2.10 Foto-Galerie (`/fotos`)

- **Einbindung:** Als Unterbereich in `Über uns` und auf den Produktseiten verlinkt, um echten Anwendungsfokus zu visualisieren.
- **Struktur:** Eine aufgeräumte, minimalistische Kachel-Galerie mit Realfotos aus Projekten, Installationen vor Ort und Teamaufnahmen.

---

### 2.11 Marken-Assets (Brand Assets - `/brand`)

- **Einbindung:** Über den Footer oder das Impressum erreichbar.
- **Konzept:** Clean aufbereiteter Bereich zum Download des Mardu-Logos (SVG/PNG) und Farbpaletten-Spezifikationen im neuen, reduzierten Design.

---

### 2.12 Häufig gestellte Fragen (FAQ)

- **`[01]` Wie viele Geräte brauche ich?**
- **`[02]` Wie bekomme ich die Geräte?**
- **`[03]` Wir sind ein gemeinnütziger Verein – gibt es Vergünstigungen?**
  - _Antwort:_ Ja! Da wir selbst aus einem gemeinnützigen Makerspace entstanden sind, wissen wir, wie knapp Budgets oft sind. Deshalb bieten wir das System für Vereine zu deutlich vergünstigten Konditionen an. Zusätzlich könnt ihr Gehäuse kostensparend auf euren eigenen 3D-Druckern fertigen.
- **`[04]` Gibt es Datenblätter für die Geräte?**
- **`[05]` Welche Komponenten umfasst das System?**
- **`[06]` Funktioniert das System ohne Internetverbindung?**
- **`[07]` Wann sind die Produkte verfügbar?**
- **`[08]` Kann ich meine Badges in anderen Makerspaces verwenden?**

---

### 2.13 Kontakt

- _Sub-Headline:_ DU HAST FRAGEN ODER MÖCHTEST UNS BESUCHEN? MELDE DICH GERNE BEI UNS.
- `[01] KONTAKTFORMULAR`: Vorname/Nachname, E-Mailadresse, Firmenname, Telefonnummer, Nachricht, DSGVO-Einwilligung. Button `[01 Senden]`.
- `[02] ADRESSE`: Mardu GmbH, Alter Schlachthof 39 | A1, 76131 Karlsruhe, Deutschland. `info@mardu.de`
- `[03] ANFAHRT`: Beschreibung für ÖPNV (Tullastraße / Gottesauer Platz) und Auto (Durlacher Allee / Parkplätze).
- `[04] BERATUNG`: Einladung zur Kontaktaufnahme.

---

### 2.14 Impressum

- Angaben gemäß § 5 DDG (Firmenadresse, Registergericht, HRB 757158, Geschäftsführer und Umsatzsteuer-ID).
- Verantwortliche für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV.
- Erklärung zur Verbraucherstreitbeilegung.
- Hinweise zum Urheberrecht.

---

### 2.15 Datenschutz (Struktur & Abschnitte)

- Verantwortlicher und Rechtsgrundlagen.
- Vercel-Hosting, Server-Protokolle und Missbrauchsabwehr.
- Cookie-Einstellungen sowie Vercel Web Analytics und Speed Insights.
- Kontakt, Konfigurator und Newsletter einschließlich Resend und internem CRM.
- Google reCAPTCHA und einfache Links zu sozialen Netzwerken.
- Empfänger, internationale Übermittlungen, Speicherdauer und Betroffenenrechte.
