# Design-QA: Mardu-Startseite (Archiv)

## Ergebnis

final result: passed

Die neue Startseite wurde gegen die freigegebene Variante A geprüft. Es bestehen keine offenen P0-, P1- oder P2-Abweichungen.

## Visuelle Wahrheit und Prüfstand

- Referenz: `/Users/lucaschoeneberg/.codex/generated_images/019fba1b-d355-7193-90f6-40904bd226cd/exec-d1f5f7a7-66d5-421b-a1a5-b4ae69901423.png`
- Finale Implementierung: `.design-qa/implementation-home-1536x1024-final-v3.png`
- Direkter Vergleich: `.design-qa/reference-vs-implementation-final.png`
- Fokussierter Hero-Vergleich: `.design-qa/reference-vs-implementation-hero-final.png`
- Mobile Ansicht: `.design-qa/implementation-home-mobile-390-final-v2.png`
- Vergleichsviewport: 1536 × 1024 CSS-Pixel, identisch zur Referenz
- Geräte-Pixeldichte im In-App-Browser: DPR 2; die gespeicherten Screenshots wurden als CSS-Pixel ausgegeben
- Geprüfter Zustand: Startseite am Seitenanfang, Kapitel `[01] Ausgangslage` aktiv

## Vergleichsverlauf

1. Im ersten Browserdurchlauf waren die Desktop-Navigation zu nah am Logo und die Hero-Headline zu groß. Navigation, Spaltenverhältnis und Headline-Skalierung wurden korrigiert.
2. Im zweiten Durchlauf lagen Hero-Bilder und Textblock noch zu tief; außerdem schloss der Kapitelindex bündig mit dem Viewportrand ab. Der Hero wurde um 20 Pixel angehoben und der Index gemäß Referenz mit 32 Pixel Seitenabstand sowie 48 Pixel Abstand zum unteren Rand positioniert.
3. Die responsive Prüfung zeigte bei 390 Pixel Breite einen Überlauf durch lange zusammengesetzte deutsche Begriffe. Grid-Kinder erhielten eine begrenzbare Mindestbreite und Überschriften einen sicheren Wortumbruch. Der erneute Test ergab keinen horizontalen Überlauf.

## Geprüfte Oberflächen

- Desktop: 1536 × 1024, 1440 × 900 und 1024 × 768
- Tablet: 768 × 900
- Mobil: 390 × 844
- Header, Hero, primärer und sekundärer CTA
- alle acht Kapitelziele und aktive Kapitelmarkierung
- mobiler Kapitelindex und mobiles Hauptmenü
- FAQ-Aufklappzustand
- Abschlussbereich und Kontaktweiterleitung
- Footer, Rechtslinks und externe Kontaktkanäle

## Bedienung und Barrierefreiheit

- Kapitelanker scrollen zum korrekten Ziel und aktualisieren den Hash.
- Das achte Kapitel wird bei `#kontakt` aktiv markiert.
- Das mobile Menü öffnet und schließt, sperrt währenddessen den Hintergrund und gibt ihn anschließend wieder frei.
- Der primäre Hero-CTA öffnet die bestehende Kontaktseite.
- FAQ-Einträge lassen sich auf- und zuklappen.
- Überschriftenstruktur, Alternativtexte, Fokuszustände und Browser-Zoom wurden im Markup berücksichtigt.
- `prefers-reduced-motion` deaktiviert weiche Scroll- und Übergangsbewegungen.

## Laufzeitprüfung

- Keine JavaScript-Laufzeitfehler im Browserprotokoll.
- Bekannte Entwicklungswarnungen: fehlender lokaler reCAPTCHA-Schlüssel sowie durch Inhaltsblocker nicht geladene Vercel-Analytics-Skripte.
- Lint: keine Fehler; drei bereits bestehende Warnungen außerhalb der neuen Startseite.
- React Doctor: 100/100, keine Befunde.

## Verbleibende P3-Abweichungen

- Die freigegebene Mardu-Copy ersetzt bewusst die Beispieltexte der visuellen Referenz.
- Das zweite Referenzmotiv mit zusätzlichem Werkstatthintergrund wurde zugunsten eines realen, freigegebenen Mardu-Produktbilds nicht künstlich nachgebaut.
