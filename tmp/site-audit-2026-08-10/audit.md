# Mardu Website Audit – 10. August 2026

## Umfang

Geprüft wurde die lokale Website unter `http://localhost:3000` bei 1280 × 720 px und 390 × 844 px. Betrachtet wurden Startseite, Produkte, Lösungen, Integrationen, Über uns, Kontakt, Blog und das mobile Hauptmenü.

## Gesamturteil

Die visuelle Grundidee ist stark und konsistent. Vor einem öffentlichen Release müssen jedoch zuerst die Inhaltsversorgung und der Kontaktpfad stabilisiert werden. Danach folgen der Austausch interner Medienplatzhalter und die Korrektur der Überlagerungen durch den festen Kapitelindex.

## Prioritäten

### P0 – blockiert zentrale Nutzerziele

1. **CMS-Inhalte zuverlässig laden:** Produkte, Lösungen und Blog zeigen einen Fehlerzustand; Integrationen bleibt leer. Im lokalen Lauf war die Payload-API auf Port 4000 nicht erreichbar. Der Standard-Startweg muss Frontend und Content-Service gemeinsam starten oder belastbare Fallback-Inhalte liefern.
2. **Kontaktformular wiederherstellen:** Die Seite kündigt rechts ein Formular an, rendert dort aber nur eine leere Fläche. Damit endet der wichtigste CTA ohne Abschlussmöglichkeit.

### P1 – vor Veröffentlichung beheben

3. **Interne Medienplatzhalter ersetzen:** Auf der Startseite sind Produktionsbriefings wie „[P02] Medienproduktion“ öffentlich sichtbar. Benötigt werden mindestens ein Systemrendering, ein reales Dashboard-Motiv und eine technische Nachrüstgrafik.
4. **Festen Kapitelindex entkoppeln:** Bei flachen Desktop-Ansichten verdeckt die untere Navigation Trust-Signale und Abschnittsinhalte. Die Leiste sollte erst nach dem Hero erscheinen oder ihre Höhe muss vollständig im Layout und in Sprungzielen reserviert werden.
5. **Fehlerzustände vereinheitlichen:** Produkte, Lösungen und Blog zeigen einen verständlichen Fehlerzustand; Integrationen wirkt dagegen wie eine leere Seite. Alle datenabhängigen Bereiche brauchen dieselbe Fehler- und Wiederholungslogik.

### P2 – Wirkung und Verständlichkeit verbessern

6. **Startseite kürzen:** Die Seite ist bei 720 px Höhe über 12.000 px lang. System, Berechtigungen, Nutzen und Integration erklären ähnliche Zusammenhänge mehrfach. Die Startseite sollte stärker zusammenfassen und für Details in funktionierende Produkt- und Lösungsseiten verzweigen.
7. **Vertrauenssignale belegen:** „DSGVO im Projekt“ und „ISO 27001 als Referenz“ bleiben ohne Einordnung. Kurze Erläuterungen oder Links sollten erklären, was konkret zugesichert wird und was projektabhängig ist.
8. **Accessibility gezielt testen:** Semantik, Überschriften und sichtbare Fokuszustände sind grundsätzlich gut. Noch offen sind Tastaturreihenfolge, Kontrastmessung, reduzierte Bewegung und die Frage, ob der feste Kapitelindex fokussierte Inhalte verdeckt.

## Stärken

- Klare, wiedererkennbare Typografie und Bildsprache.
- Gute mobile Hauptnavigation mit sichtbarem CTA und Fokuszustand.
- Die Über-uns-Seite vermittelt Herkunft, Team und Produktverständnis glaubwürdig.
- Technische Grenzen und Betreiberverantwortung werden auf der Startseite transparent benannt.

## Evidenzgrenzen

Die Prüfung erfolgte gegen den lokalen Entwicklungsstand. Die Content-API auf Port 4000 war nicht erreichbar; deshalb konnten Inhaltslisten und Detailseiten nicht in ihrem regulären Zustand beurteilt werden. Aus Screenshots allein lässt sich keine vollständige WCAG-Konformität bestätigen.
