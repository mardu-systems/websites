# Mardu Claims, Reifegrade und Nachweise

**Stand:** 1. August 2026<br>
**Status:** verbindliche Freigabereferenz für öffentliche Aussagen<br>
**Wichtig:** Dieses Dokument ersetzt keine rechtliche oder arbeitsschutzfachliche Prüfung.

## 1. Zweck

Mardu arbeitet in einem sicherheitsnahen, integrationsintensiven Umfeld. Produktideen, Pilotfunktionen und technische Teilkomponenten dürfen deshalb nicht versehentlich als serienreife, zertifizierte oder rechtlich garantierte Gesamtleistung erscheinen.

Vor Veröffentlichung wird jede starke Aussage nach Status, Geltungsbereich und Beleg geprüft.

## 2. Interne Reifegrade

| Status               | Definition                                                                                  | Öffentliche Verwendung                          |
| -------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Produktbelegt**    | in reproduzierbarem Test oder realer Installation nachgewiesen und versioniert dokumentiert | präzise als aktuelle Leistung formulierbar      |
| **Kontext belegt**   | Primärquelle belegt fachlichen oder rechtlichen Kontext, nicht Mardus Wirkung               | zur Einordnung, niemals als Wirkungsbeleg       |
| **Intern berichtet** | Team-, Businessplan- oder Gesprächsaussage ohne unabhängigen Nachweis                       | nicht als externer Fakt verwenden               |
| **Pilot**            | begrenzter Einsatz mit definiertem Umfang und Voraussetzungen                               | ausdrücklich als Pilot kennzeichnen             |
| **Hypothese**        | plausibler Nutzen ohne Messung oder Kundenbeleg                                             | als Frage oder Validierungsziel formulieren     |
| **Zukunftsbild**     | strategisch sinnvoll, aber nicht zugesagt                                                   | als Untersuchung zeigen, nicht als Lieferumfang |
| **Nicht verwenden**  | zu absolut, falsch oder nicht verantwortbar                                                 | aus Copy, Metadaten und UI entfernen            |

## 3. Öffentliche Statusbegriffe

### Verfügbar

Nur für produktbelegte Standardleistung und mit dokumentiertem Geltungsbereich.

### Im Pilot

Für tatsächlich laufende oder angebotene Pilotumfänge. Voraussetzungen und Grenzen werden genannt.

### In Untersuchung

Für Hypothesen und Zukunftsfelder. Keine Datums- oder Lieferzusage.

## 4. Claim-Register

Jeder wiederverwendete Claim sollte intern mindestens diese Felder besitzen:

| Feld            | Bedeutung                                                 |
| --------------- | --------------------------------------------------------- |
| ID              | stabile interne Kennung                                   |
| Text            | freigegebene Formulierung                                 |
| Status          | interner Reifegrad                                        |
| Geltungsbereich | Produkt, Version, Maschine, Standort oder Zielgruppe      |
| Beleg           | Spezifikation, Test, Installation, Case oder Primärquelle |
| Beleglink       | auffindbarer interner oder öffentlicher Nachweis          |
| Owner           | fachlich verantwortliche Person                           |
| geprüft am      | letztes Prüfdatum                                         |
| gültig bis      | optionales Wiedervorlagedatum                             |
| Hinweise        | Grenzen, Disclaimer oder benötigte Freigaben              |

Bevor ein neues DTO oder CMS-Modell entsteht, wird geprüft, ob ein gleichwertiger Vertrag bereits vorhanden ist.

## 5. Belegarten

### Produktspezifikation

Belegt, was das System in einer bestimmten Version tun soll. Sie ersetzt keinen realen Funktionstest.

### Reproduzierbarer Test

Belegt einen definierten Ablauf mit dokumentierter Umgebung, Ergebnis und Grenzfällen.

### Reale Installation

Belegt den konkreten Umfang an einem Standort. Sie beweist nicht automatisch allgemeine Skalierung oder Kompatibilität.

### Kundenfall

Benötigt Ausgangslage, Umfang, Zeitraum, Methode, Ergebnis, Grenze und Freigabe.

### Primärquelle

Gesetz, Behörde, Normgeber oder technische Originaldokumentation belegt Kontext. Sie beweist keine Mardu-Wirkung.

### Partneraussage

Benötigt schriftliche Freigabe und eine klare Beschreibung der Beziehung. Ein Lieferant ist nicht automatisch Referenzkunde oder Zertifizierungspartner.

## 6. Bevorzugte, aber zu bestätigende Produktformulierungen

| Thema               | Zielcopy                                                                                                   | Freigabebedingung                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Freigaberegel       | „Mardu prüft hinterlegte Berechtigungen, bevor eine angebundene Ressource administrativ freigegeben wird.“ | vollständiger End-to-End-Test                       |
| Qualifikation       | „Einweisungen und Qualifikationen können Teil der Freigaberegel sein.“                                     | unterstützte Daten- und Regelmodelle bestätigt      |
| Zeitregeln          | „Berechtigungen können auf Bereiche und Zeitfenster begrenzt werden.“                                      | Offline- und Grenzfälle getestet                    |
| Nachvollziehbarkeit | „Freigabevorgänge lassen sich entsprechend Ihrer Rollen- und Aufbewahrungsregeln nachvollziehen.“          | Logging, Rollen und Löschung dokumentiert           |
| Nachrüstung         | „Für viele Bestandsmaschinen nach technischer Prüfung nachrüstbar.“                                        | Prüfkriterien und reale Beispiele                   |
| vorhandene Ausweise | „Vorhandene Identmedien können je nach System eingebunden werden.“                                         | konkrete Karten-/IAM-Kompatibilität                 |
| lokaler Betrieb     | „Für lokalen beziehungsweise On-premise-Betrieb konzipiert.“                                               | tatsächliches Betriebsmodell dokumentiert           |
| Funk                | „Unabhängig vom Hallen-WLAN betreibbar.“                                                                   | Architektur, Reichweite und Ausfallverhalten belegt |

## 7. Aussagen mit zwingendem Ergebnisbeleg

- spart eine konkrete Zahl an Stunden,
- senkt Kosten um einen Betrag oder Prozentsatz,
- verlängert Öffnungszeiten um eine konkrete Dauer,
- reduziert Unfälle oder Vorfälle,
- skaliert auf eine konkrete Anzahl Maschinen oder Standorte,
- reduziert Energieverbrauch,
- erkennt eine definierte Anomalie,
- verhindert Ausfälle,
- verbessert Auslastung oder ROI.

Der Beleg nennt Kunde, Ausgangswert, Zeitraum, Umfang und Messmethode.

## 8. Nicht verwenden

- „Mardu verhindert Unfälle.“
- „Mardu senkt Ihre Versicherungsprämie.“
- „Haftungssicher“ oder „rechtssicher“.
- „Aufsichtspflicht stets erfüllt.“
- „Sicherer Betrieb ohne Aufsicht.“
- „Sie geben Verantwortung an Mardu ab.“
- „VdS-zertifiziert“ für das Gesamtsystem, wenn nur eine Komponente betroffen ist.
- „Für jede Maschine.“
- „Lückenlose Dokumentation.“
- „DSGVO-konform“ ohne geprüftes Gesamtsetup.
- „Erkennt Anomalien“ ohne validierte Sensorik, Datenbasis und Modell.
- „Predictive Maintenance inklusive.“
- „Erfüllt ISO 50001.“
- „Die einzige Lösung am Markt.“

## 9. Aufsicht und erweiterte Nutzung

### Richtige Trennung

1. Manuelle Freigabe durch eine Person.
2. Technische Prüfung organisatorischer Bedingungen.
3. Erforderliche Aufsicht aus Gefährdungsbeurteilung, Tätigkeit, Nutzergruppe und Betreiberkonzept.

Mardu kann Punkt 1 reduzieren und Punkt 2 unterstützen. Punkt 3 wird nicht pauschal durch Mardu ersetzt.

### Erlaubte Richtung

> Berechtigte Personen können vorgesehene Ressourcen selbstständig freischalten, soweit das Betriebs-, Aufsichts- und Sicherheitskonzept des Betreibers dies erlaubt.

### Pflichtabgrenzung

> Mardu ersetzt weder Gefährdungsbeurteilung, technische Schutzeinrichtungen, praktische Unterweisung, sichere Energietrennung noch erforderliche Aufsicht.

Für Studierende, Gäste und andere Nutzergruppen sind die jeweils einschlägigen hochschul-, haus-, unfallversicherungs- und weiteren Regeln gesondert zu bestimmen.

## 10. Maschinenänderung und Freigabe

Mardu wird im beschriebenen Umfang nicht als sicherheitsgerichtete Steuerung positioniert. Eine administrative Betriebsfreigabe ist nicht gleichbedeutend mit:

- sicherer Energietrennung,
- Not-Halt,
- Verriegelung einer Schutzeinrichtung,
- Lockout/Tagout,
- Konformitätsbewertung,
- maschinenspezifischer Risikobeurteilung.

Bei Nachrüstung wird geprüft, ob neue Gefährdungen oder eine Risikoerhöhung entstehen und welche Verantwortlichkeiten für die Änderung gelten.

## 11. Versicherung und Prävention

Präventions- und Beitragsmodelle hängen vom zuständigen Unfallversicherungsträger, dessen Satzung und konkreten Kriterien ab. Mardu garantiert keine Anerkennung oder Beitragswirkung.

### Möglich

- „Mardu unterstützt nachvollziehbare Freigabeprozesse.“
- „Protokolle können nach vorab mit dem zuständigen Träger geklärten Kriterien als Gesprächsunterlage dienen.“

### Erst mit schriftlichem Partnerbeleg

- Anerkennung als konkrete Präventionsmaßnahme,
- Teilnahme an einem konkreten Prämiensystem,
- definierter Nachlass unter benannten Bedingungen.

### Nicht verwenden

- „Senken Sie mit Mardu Ihre Versicherungsprämie.“
- „Mardu verbessert automatisch Ihren Versicherungsschutz.“

## 12. Energie, Auslastung und Anomalien

### Reifestufen

1. Betriebsereignis: Start, Ende, Freigabe.
2. Messung: Strom, Leistung oder Energie mit definierter Genauigkeit.
3. Kontext: Maschine, Betriebsart, Auftrag oder Wartung.
4. Regelbasierter Hinweis: ungewöhnliche Dauer oder Schwellenabweichung.
5. Zustandsdiagnose: passende Sensorik, gelabelte Daten und Maschinenmodell.

Eine niedrigere Stufe darf nicht mit der Wirkung einer höheren Stufe beworben werden.

### Gute Zukunftscopy

> In Pilotprojekten untersuchen wir, wie Laufzeit-, Auslastungs- und Energiedaten Werkstattplanung und Wartung unterstützen können. Verfügbarkeit und Aussagekraft hängen von Maschine, Sensorik und Einbau ab.

## 13. Datenschutz und Mitbestimmung

Nutzungs- und Zugangsprotokolle sind regelmäßig personenbezogen, wenn sie einer identifizierten oder identifizierbaren Person zugeordnet werden können.

Öffentliche Aussagen nennen konkrete Produkt- oder Projektprinzipien statt pauschaler DSGVO-Konformität:

- zweckgebundene Erhebung,
- Datenminimierung,
- Rollen und Zugriffsrechte,
- konfigurierbare Aufbewahrung und Löschung, sofern produktbelegt,
- aggregierte Auswertung, wo möglich,
- keine still eingeführten Leistungsrankings,
- frühe Einbindung von Datenschutz und Betriebsrat.

## 14. Logos, Partner und Zertifikate

Vor Veröffentlichung wird schriftlich bestätigt:

- darf das Logo verwendet werden,
- in welchem Kontext,
- für welchen Zeitraum,
- welche Beziehung tatsächlich besteht,
- ob ein Pilot, Kunde, Lieferant, Förderer oder Technologiepartner gemeint ist,
- welches Produkt oder Bauteil zertifiziert ist,
- ob das Zertifikat aktuell ist.

## 15. Freigabeprozess

1. Redaktion formuliert Claim und Geltungsbereich.
2. Produkt/Technik prüft Leistungsstatus.
3. Fachverantwortliche prüfen Sicherheit, Datenschutz oder Integration.
4. Beleg und Prüfdatum werden eingetragen.
5. Marketing übernimmt nur die freigegebene Formulierung.
6. Metadaten, strukturierte Daten und Downloads werden mitgeprüft.
7. Bei Produktänderung oder Ablaufdatum wird der Claim erneut bewertet.

## 16. Claim-Review

- Ist die Aussage für den konkreten Geltungsbereich wahr?
- Ist sie als verfügbar, Pilot oder Untersuchung korrekt gekennzeichnet?
- Ist der Beleg auffindbar und aktuell?
- Wird eine Komponente nicht zum Gesamtsystem hochgerechnet?
- Wird organisatorische Freigabe nicht als Maschinensicherheit dargestellt?
- Wird Prävention nicht als garantierte Versicherungswirkung verkauft?
- Werden Datenfunktionen nicht höher dargestellt als Messkette und Modell erlauben?
- Stimmen Website, Metadaten, PDFs und Vertriebsmaterial überein?
