# Release-Checkliste: mardu.de und Platform

Diese Checkliste wird pro Release kopiert und mit Links beziehungsweise IDs statt mit Secrets ausgefüllt.

## Release-Kandidat

- [ ] Beabsichtigter Commit und Branch dokumentiert
- [ ] Keine Dateien aus `tmp/`, `.design-qa/`, `.codex-artifacts/` oder `.playwright-mcp/` enthalten
- [ ] Copy, Rechtstexte, DTO-/API-Dokumentation und CMS-Verträge reviewed
- [ ] GitHub CI grün
- [ ] Platform-Preview grün
- [ ] mardu.de-Preview grün

## Daten und Content

- [ ] Produktions-Snapshot erstellt; Snapshot-ID intern dokumentiert
- [ ] Migration auf isolierter Snapshot-Kopie erfolgreich
- [ ] `payload:migrate:status` vor und nach der Migration dokumentiert
- [ ] `release:content:audit` geprüft
- [ ] Fehlende Slugs freigegeben
- [ ] Bestehende Slugs gegen Seed-Daten verglichen
- [ ] Konflikte im Payload-Admin gezielt gelöst
- [ ] `seed:all` nicht gegen Produktion ausgeführt

## Preview-Abnahme

- [ ] `release:verify` ohne Fehler
- [ ] Viewports 320, 390, 768, 1024 und 1440 Pixel geprüft
- [ ] Reflow bei 200 % Zoom geprüft
- [ ] Tastatur, Fokus und mobile Navigation geprüft
- [ ] Browser-Konsole ohne neue Fehler
- [ ] Hero/LCP und neue Bilder ohne sichtbaren Layout Shift
- [ ] Kontakt, Konfigurator, Newsletter und Preorder Ende-zu-Ende geprüft

## Produktion

- [ ] Platform zuerst promotet und APIs geprüft
- [ ] Freigegebene Inhalte veröffentlicht
- [ ] mardu.de danach promotet
- [ ] Produktions-`release:verify` ohne Fehler
- [ ] Lead- und E-Mail-Zustellung bestätigt
- [ ] Vorherige Deployment-IDs für Rollback dokumentiert
- [ ] 24-Stunden-Monitoring gestartet
- [ ] Search-Engine-Sitemaps nach stabiler Abnahme eingereicht
