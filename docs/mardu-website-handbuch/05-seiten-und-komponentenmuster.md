# Mardu Seiten- und Komponentenmuster

**Stand:** 1. August 2026<br>
**Status:** strukturelle Referenz für Wireframes und Implementierung<br>
**Geltungsbereich:** Marketingseiten der neuen `mardu.de`

## 1. Grundsatz

Seiten werden aus wiederverwendbaren Argumentations- und Belegmustern aufgebaut. Komponenten sind keine neutrale Dekoration: Jede Komponente beantwortet eine Käuferfrage und hat einen klaren Inhaltsvertrag.

Vor einer neuen Komponente wird geprüft, ob `@mardu/sections`, `@mardu/ui` oder eine bestehende seitenspezifische Komponente den Zweck bereits erfüllt.

## 2. Globale Seitenstruktur

```text
Header
→ Hero
→ Vertrauenssignal oder Problem
→ Mechanik
→ Nutzen
→ Anwendung oder System
→ Beleg
→ Sicherheit/Betrieb
→ nächster Schritt
→ Footer
```

Nicht jede Unterseite benötigt alle Blöcke. Hero, Seitenrolle, Beleg, Grenze und CTA müssen jedoch klar erkennbar sein.

## 3. Hero

### Zweck

In wenigen Sekunden erklären, für wen die Seite ist, was sich verändert und was als Nächstes zu tun ist.

### Pflichtinhalt

- optionaler Kicker,
- eine Headline mit genau einer Aussage,
- Subline mit Zielgruppe und Mechanismus,
- ein primärer CTA,
- maximal ein sekundärer CTA,
- reales Visual oder Produktbeleg,
- optional eine Vertrauens- oder Einschränkungszeile.

### Varianten

#### Marken-Hero

Breites Nutzenversprechen, reale Werkstattszene und Freigabe-UI.

#### Produkt-Hero

Konkrete Mechanik, reales Hardware-/UI-Zusammenspiel und „Maschine prüfen lassen“.

#### Lösungs-Hero

Zielgruppensituation, konkreter betrieblicher Nutzen und „Standort besprechen“.

#### Trust-Hero

Verantwortungsbereich, klare Abgrenzung und technische Unterlagen.

### Nicht verwenden

- mehrere gleichgewichtete Headlines,
- Slider,
- abstrakte Hardwarecollage,
- Produktnamen ohne Nutzen,
- KPI ohne Quelle,
- drei oder mehr CTAs.

## 4. Vertrauensstreifen

### Zweck

Früh zeigen, warum Mardu glaubwürdig ist.

### Erlaubte Inhalte

- bestätigte Pilot- oder Kundenlogos,
- genehmigte Technologiepartner,
- Herkunft aus ARTandTECH.space, korrekt als Eigenbetrieb eingeordnet,
- exakt benannte Zertifikate einzelner Komponenten,
- gemessene Kennzahl mit Quelle und Methodik.

### Leerer Zustand

Wenn keine externen Belege freigegeben sind, wird der Streifen weggelassen. Es werden keine Platzhalterlogos oder generischen Aussagen eingesetzt.

## 5. Problemblock

### Aufbau

1. beobachtbare Ausgangssituation,
2. zwei bis drei konkrete Reibungen,
3. betriebliche Folge,
4. Übergang zur Mardu-Mechanik.

### Beispiel

**Headline:** Einweisungen, Schlüssel und Maschinenrechte laufen nebeneinander her.

Einweisungen liegen in Listen, Türen folgen einer separaten Schließlogik und Maschinen werden manuell freigegeben. Dadurch entstehen Rückfragen, doppelte Pflege und Lücken zwischen dokumentierter Berechtigung und tatsächlicher Nutzung.

## 6. Freigabeablauf

### Zweck

Mardus Kernmechanik verständlich und wiederholbar erklären.

### Schritte

1. Berechtigung oder Qualifikation hinterlegen beziehungsweise übernehmen.
2. Person mit freigegebenem Medium identifizieren.
3. Bedingungen für Ressource und Zeitpunkt prüfen.
4. administrative Freigabe erteilen oder nicht erteilen.
5. relevanten Vorgang zweckgebunden nachvollziehbar machen.

### Zustände

- bereit,
- Prüfung,
- administrative Freigabe erteilt,
- administrative Freigabe nicht erteilt,
- Einweisung abgelaufen,
- Ressource administrativ gesperrt,
- Verbindung eingeschränkt oder offline,
- technischer Fehler.

„Gesperrt“ darf nicht ohne Kontext eine sicherheitsgerichtete Sperre oder sichere Energietrennung suggerieren.

## 7. Nutzen-Trio

### Steuern

Identitäten, Qualifikationen, Rollen, Zeiten und Ressourcen zusammenführen.

### Ermöglichen

Wiederkehrende Freigaben reduzieren und kontrollierte Nutzung unterstützen.

### Verstehen

Pilot- und Zukunftsdaten für Nutzung und Planung aufbauen.

Jeder Pfeiler enthält genau eine Erklärung und einen Beleg oder Status. „Verstehen“ wird nicht wie eine fertige Analytics-Suite dargestellt, solange diese nicht produktbelegt ist.

## 8. Anwendungsgeschichte

### Zweck

Eine abstrakte Regel als konkrete Personenreise zeigen.

### Struktur

- Person und Rolle,
- vorhandenes Identmedium,
- relevante Einweisung/Berechtigung,
- Tür- oder Maschinenentscheidung,
- verständliches Ergebnis,
- verbleibende Betreiberregel.

### Beispiel

Eine Studentin hat Zutritt zur Lehrwerkstatt und eine gültige Berechtigung für den Laserschneider, nicht aber für die Formatkreissäge. Nach der Identifikation kann die Tür freigegeben werden. Für den Laserschneider kann eine administrative Betriebsfreigabe erteilt werden; für die Säge nicht. Die erforderliche Aufsicht richtet sich weiterhin nach dem Betreiber- und Sicherheitskonzept.

## 9. Systemebenen

| Ebene         | Käuferfrage                                    | Darstellungsform                                |
| ------------- | ---------------------------------------------- | ----------------------------------------------- |
| Identität     | Wer ist die Person?                            | echter Ausweis/Tag und bestätigte Integrationen |
| Regeln        | Welche Bedingungen gelten?                     | reale Rollen-, Zeit- und Qualifikations-UI      |
| Kommunikation | Wie erreicht die Entscheidung den Standort?    | vereinfachtes, technisch korrektes Diagramm     |
| Tür           | Welcher Bereich darf geöffnet werden?          | reale Türkomponente im Einbau                   |
| Maschine      | Welche administrative Freigabe ist vorgesehen? | reale Maschinenanbindung                        |
| Protokoll     | Was muss nachvollziehbar bleiben?              | reale UI mit Rollen und Aufbewahrungskontext    |

## 10. Rollen-Nutzen-Matrix

### Zweck

Eine Plattform für unterschiedliche Verantwortungen verständlich machen.

### Rollen

- Werkstattleitung,
- Arbeitsschutz/HSE,
- IT/IAM,
- Datenschutz/Betriebsrat,
- Leitung/Einkauf,
- Nutzende.

Jede Rolle erhält genau eine Leitfrage, einen Nutzen und einen geeigneten Beleg. Keine Rolle bekommt eine isolierte Featureliste.

## 11. Leistungsstatus

### Verfügbar

Nur produktbelegte Standardleistung.

### Im Pilot

Tatsächlich begrenzter, begleiteter Einsatz mit Voraussetzungen.

### In Untersuchung

Hypothese oder Zukunftsfeld ohne Lieferzusage.

Der Statusblock besitzt ein internes Prüfdatum und einen Owner. Eine öffentliche Roadmap mit festen Versprechen ersetzt dieses Muster nicht.

## 12. Case Study

### Pflichtstruktur

1. Standort und Zielgruppe,
2. konkrete Ausgangslage,
3. vorab definiertes Ziel,
4. tatsächlicher Umfang,
5. Einführungsablauf,
6. Ergebnis mit Zeitraum und Methode,
7. Grenzen,
8. freigegebene Stimme,
9. nächster Schritt.

### Darstellung

- reale Standortbilder,
- ein verständliches Systembild,
- höchstens drei Hauptkennzahlen,
- Methodik direkt an der Kennzahl,
- keine große Zahl ohne Kontext,
- Eigenbetrieb eindeutig als Eigenbetrieb kennzeichnen.

## 13. Sicherheit-und-Betrieb-Block

### Zweck

Verantwortungsgrenzen früh und sichtbar erklären.

### Pflichtaussage

> Mardu unterstützt definierte organisatorische Freigabeprozesse. Das System ersetzt weder Gefährdungsbeurteilung, technische Schutzeinrichtungen, praktische Unterweisung, sichere Energietrennung noch erforderliche Aufsicht.

Zusätzlich verlinkt der Block:

- Rolle im Betreiberkonzept,
- Datenschutz und Protokolle,
- lokaler Betrieb und Ausfallverhalten,
- Maschinenprüfung und Installation.

## 14. Projektablauf

1. Standort verstehen.
2. repräsentative Türen und Maschinen prüfen.
3. Pilot und Messziel begrenzen.
4. Betrieb, Nutzerablauf und Support validieren.
5. bewusst erweitern.

Der Ablauf wird nicht als automatischer Fünf-Minuten-Onboardingprozess dargestellt.

## 15. FAQ

### Pflichtfragen

- Ersetzt Mardu Aufsicht?
- Funktioniert Mardu mit jeder Maschine?
- Können vorhandene Ausweise genutzt werden?
- Ist Mardu eine sicherheitsgerichtete Steuerung?
- Was passiert bei Netzwerk-, Server- oder Funkproblemen?
- Welche Daten werden protokolliert?
- Sind Versicherungsnachlässe garantiert?
- Wie läuft die technische Prüfung ab?

### Interaktion

- Antwort ist ohne Animation erreichbar,
- Tastatur- und Screenreader-bedienbar,
- Fokus sichtbar,
- URL-Anker für direkte Verlinkung,
- keine wichtigen Haftungsgrenzen ausschließlich im geschlossenen Accordion.

## 16. Abschluss-CTA

### Standard

**Headline:** Zeigen Sie uns Ihre Werkstatt.

**Text:** In einem ersten Gespräch prüfen wir Nutzergruppen, Identitäten, Maschinenarten und das gewünschte Pilotziel.

**CTA:** Standort besprechen

### Erwartung

Beschreibt klar, was nach dem Klick passiert. Reaktionszeit oder Gesprächsdauer werden nur genannt, wenn sie verlässlich eingehalten werden.

## 17. Seitenmuster

### Homepage

Hero → Vertrauenssignal → Problem → Freigabeablauf → Nutzen-Trio → Anwendung → System → Rollen → Status → Referenz → Trust → Projektablauf → FAQ → CTA

### Systemübersicht

System-Hero → Ablauf → Ebenen → verfügbare Funktionen → Integrationen → Betriebsmodell → Status → Trust → CTA

### Maschinenfreigabe

Produkt-Hero → Problem → Freigaberegel → Nachrüstprüfung → Zustände → Anwendung → Abgrenzung zur Maschinensicherheit → FAQ → CTA

### Türzugang

Produkt-Hero → Bereiche und Zeitfenster → Identmedien → Türkomponenten → Offline-/Notfallverhalten → Grenzen wie Mitgehen → CTA

### Lösungsseite

Zielgruppen-Hero → typische Reibung → Personenreise → relevanter Systemumfang → Nutzen nach Rolle → Beleg → Voraussetzungen → CTA

### Sicherheit & Betrieb

Trust-Hero → Leistungsabgrenzung → Betreiberprozess → Maschinenänderung → Datenschutz → Betriebsmodell → Ausfallverhalten → Zertifikate → technische Unterlagen

### Wissensbeitrag

konkrete Frage → kurze Antwort → fachliche Erklärung → Praxisbeispiel → Grenzen/Quellen → verwandte Inhalte → ein nächster Schritt

## 18. Komponentenprüfung

- Beantwortet die Komponente eine konkrete Käuferfrage?
- Hat sie genau eine Hauptaussage?
- Sind Inhalt, Visual und CTA aufeinander bezogen?
- Sind alle Zustände und Fehlerfälle definiert?
- Funktioniert sie ohne Maus und ohne Bewegung?
- Werden Status oder Sicherheit nicht nur durch Farbe vermittelt?
- Verwendet sie reale Assets und Daten?
- Gibt es bereits ein geeignetes Muster im Repository?

## 19. Referenzbilder für Komponenten

Die folgenden Beispiele zeigen jeweils nur ein übertragbares Muster. Sie sind keine Aufforderung, Layout, Farben, Copy oder Produktversprechen zu kopieren.

### Hardware und Einführung zusammen erklären

![Fabman-Seitenabschnitt mit Hardwarevideo, kurzer Einführung und klarem nächsten Schritt](./assets/references/fabman-hardware-onboarding-2026-08-01.jpg)

**Quelle:** [fabman.io](https://fabman.io/), aufgenommen am 1. August 2026.

**Übertragbares Muster:** Ein konkretes Hardwarebild, eine kurze Erklärung und ein eindeutiger nächster Schritt stehen in einem Modul. Für Mardu wird daraus ein Abschnitt „So kommt Mardu an eine bestehende Maschine“ mit echtem Einbau, Prüfschritten und Standortgespräch – ohne pauschales Fünf-Minuten-Versprechen.

### Daten als lesbaren Betriebszustand zeigen

![MachineMetrics-Produktseite mit groß dargestellter Maschinenübersicht](./assets/references/machinemetrics-monitoring-2026-08-01.jpg)

**Quelle:** [MachineMetrics Machine Monitoring](https://www.machinemetrics.com/machine-monitoring), aufgenommen am 1. August 2026.

**Übertragbares Muster:** Die Oberfläche ist groß genug, um den Anwendungsfall sofort zu erkennen. Mardu zeigt keine dekorative Dashboardwand, sondern eine konkrete Betreiberfrage wie Nutzung, Laufzeit oder auffällige Abweichung. Das Modul erscheint erst öffentlich, wenn Messgrundlage, Status und Produktreife belegt sind.

Weitere Beispiele und die genaue Abgrenzung stehen in [09 – Visuelle Referenzen](./09-visuelle-referenzen.md).
