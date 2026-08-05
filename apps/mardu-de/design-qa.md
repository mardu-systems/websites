# Design-QA: Mardu-Lösungsseite

## Ergebnis

final result: passed

Die neu gestaltete Lösungsseite wurde gegen die vom Nutzer bereitgestellte MAY-Studio-Referenz geprüft. Es bestehen keine offenen P0-, P1- oder P2-Abweichungen.

## Visuelle Wahrheit und Prüfstand

- Referenz: `/Users/lucaschoeneberg/Desktop/Bildschirmfoto 2026-08-03 um 19.26.52.png`
- Finale Implementierung: `design-qa-assets/solutions-implementation-desktop.png`
- Vollständiger Vergleich: `design-qa-assets/solutions-comparison-full.png`
- Fokussierter Inhaltsvergleich: `design-qa-assets/solutions-comparison-focus.png`
- Mobile Ansicht: `design-qa-assets/solutions-implementation-mobile.png`
- Vergleichsviewport: Referenz 1852 × 962 Pixel; Implementierung 1854 × 962 CSS-Pixel
- Dichtenormalisierung: Beide Desktopansichten wurden für den Vergleich auf eine gemeinsame Breite von 1854 Pixel gebracht. Die Referenz erhielt rechts zwei Pixel neutrale Ergänzung; Inhalte wurden nicht skaliert.
- Geprüfter Zustand: Lösungsübersicht am Seitenanfang, Register „Hochschulen“ aktiv

## Vollständiger Vergleich

Das Desktop-Raster entspricht der Referenz in seinen entscheidenden Proportionen: 288 Pixel Auswahlnavigation, 744 Pixel Inhaltsbereich und 444 Pixel Bildspalte. Die äußeren Seitenabstände betragen 24 Pixel; die freien Zwischenräume werden gleichmäßig verteilt. Titel, Einleitung, Auswahl und Bild beginnen in einem vergleichbaren vertikalen Rhythmus.

## Fokussierter Vergleich

Der fokussierte Vergleich zeigt Auswahlzustand, Tabellenlinien, nummerierte Inhaltsgruppen, Bildformat und weiterführende Links gemeinsam. Die Details sind ausreichend groß lesbar; weitere Ausschnittvergleiche waren nicht erforderlich.

## Geprüfte Fidelity-Oberflächen

- **Schrift und Typografie:** Die Referenz nutzt eine neutrale Grotesk. Die Implementierung verwendet bewusst die bestehende Mardu-Kombination aus Aktiv Grotesk und IBM Plex Sans. Größen, leichte Überschriftengewichte, Zeilenhöhen und Dichte entsprechen der Zielwirkung; Versalsatz wurde gemäß bestehender Mardu-Vorgabe vermieden.
- **Abstände und Raster:** Das zentrale Dreispaltenraster stimmt auf Desktop nahezu pixelgenau mit der Referenz überein. Auf Mobil werden Auswahl, Inhalt und Bild in sinnvoller Lesereihenfolge gestapelt. Es entsteht kein horizontaler Überlauf.
- **Farben und Tokens:** Der helle Referenzgrund wurde auf das bestehende Mardu-Papier-Token übertragen. Violett kennzeichnet den aktiven Bereich; Orange bleibt ein kleiner Kapitelakzent. Text- und Linienkontraste bleiben ausreichend deutlich.
- **Bildqualität und Assets:** Statt des fremden Produktmotivs werden vorhandene, optimierte Mardu- und Standortbilder mit fest reserviertem Seitenverhältnis verwendet. Die Bilder laden über `next/image`, besitzen aussagekräftige Alternativtexte und zeigen keine Verzerrung oder Platzhalter.
- **Copy und Inhalte:** Sämtliche Platzhalter- und Lorem-ipsum-Texte wurden durch konkrete Mardu-Anwendungsfälle, Vorteile und Betriebsargumente ersetzt. Maschinen bleiben sichtbar der Kern; Türen, Tore und weitere Zugänge erscheinen als Teil derselben Struktur.

## Bedienung und Barrierefreiheit

- Sechs Einsatzbereiche lassen sich per Maus oder Tastatur auswählen.
- Pfeiltasten, Pos1 und Ende wechseln die Register; Fokus und `aria-selected` folgen dem aktiven Inhalt.
- Register und Inhaltsbereich sind über `aria-controls` und `aria-labelledby` verbunden.
- Detailseite, Projektanfrage und Integrationen bleiben pro Auswahl erreichbar.
- Die verlinkte Hochschul-Detailseite wurde erfolgreich geöffnet; der lokale Inhaltsfallback verhindert eine 404-Seite bei nicht verfügbarem CMS-Inhalt.
- Mobile Prüfung bei 390 × 844 Pixel ohne horizontalen Überlauf.

## Laufzeitprüfung

- Keine JavaScript-Fehler im Browserprotokoll.
- Die aktive Bildspalte wird früh geladen und reserviert ihr quadratisches Format ohne Layoutsprung.
- Bekannte lokale Entwicklungswarnung: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` ist nicht gesetzt. Die Lösungsseite selbst verwendet kein reCAPTCHA.
- Lint: keine neuen Fehler; drei bereits bestehende Warnungen in `data/platform-page.tsx` und `lib/blog.ts`.
- React Doctor: 100/100, keine Befunde.
- Der vollständige Workspace-Typecheck bleibt wegen bereits bestehender, mehrfach installierter React- und `react-hook-form`-Typen in gemeinsamen Paketen rot. In den geänderten Lösungsdateien bestehen keine TypeScript-Fehler.

## Vergleichsverlauf

1. Die erste Umsetzung übernahm bereits die korrekte Dreiteilung, saß auf sehr breiten Viewports jedoch noch im global zentrierten Container.
2. Der Inhaltsbereich wurde auf das breite Referenzraster umgestellt. Auswahl, Inhalt und Bild liegen im finalen Vergleich bei x = 24, 477 und 1386 Pixel und besitzen Breiten von 288, 744 und 444 Pixel.
3. Mobile zeigte zunächst einen vom fixierten Header überlagerten Titel. Der obere Seitenabstand wurde mobil vergrößert; die finale Aufnahme beginnt vollständig unter dem Header.
4. Der erste Detail-Link führte wegen einer leeren CMS-Antwort auf die 404-Seite. Die bestehende Datenabfrage erhielt einen dokumentierten Fallback auf den lokalen Lösungskatalog; der erneute Browsertest war erfolgreich.

## Verbleibende P3-Abweichungen

- Der globale Mardu-Header bleibt erhalten und ersetzt die sehr kleine Navigationszeile der Referenz.
- Titel und Texte verwenden die Mardu-Schriftfamilien und normale deutsche Groß- und Kleinschreibung.
- Die Bildmotive sind echte Mardu- beziehungsweise Standortbilder und kopieren bewusst nicht das fremde Handheld-Produkt der Vorlage.
