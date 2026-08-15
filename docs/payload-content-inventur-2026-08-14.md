# Payload-Content-Inventur für mardu.de

Stand: 14. August 2026

## Zweck und Ergebnis

Dieses Dokument bündelt die für mardu.de und Payload verwertbaren Informationen aus:

- dem aktuellen Website- und Payload-Repository,
- dem aktuellen Backend-Code und dessen technischer Bestandsaufnahme,
- YouTrack aus den Projekten NER, MAR, MANAGEMENT, OTTER, MIN und WIE,
- dem Businessplan vom 6. Juli 2026,
- vorhandenen Website-, API- und SEO-Dokumenten,
- offiziellen Dokumentationen der genannten Standards und Anbieter.

Es ist eine redaktionelle Befüllungsgrundlage, keine Freigabe zur Veröffentlichung. In Payload wurden im Rahmen dieser Inventur keine Inhalte angelegt oder verändert.

## Kurzfazit

Mardu hat bereits mehr technische Substanz, als die aktuelle Website erkennen lässt. Besonders belastbar sind die Themen Identität, Berechtigungen, Geräteverwaltung, MQTT, lokale und zentrale OTA-Updates, LDAP, OIDC, Open Badges, Benachrichtigungen und auditierbare Zugriffsentscheidungen.

Die Hardware- und Marktreife ist dagegen noch pilotgeprägt. Türhardware, Maschinenfreigabe, BLE, IP500, QR-/NFC-Geräte-Onboarding und mehrere Partnerintegrationen sollten nicht pauschal als fertig oder sofort verfügbar kommuniziert werden. Hier braucht die Website klare Statusangaben wie „Beta“, „Pilot“, „Projektgeschäft“ oder „geplant“.

Die größte kurzfristige Content-Chance liegt in vier belastbaren Lösungspages und sechs bis acht Integrationsseiten. Produkte und Preise können ebenfalls vorbereitet werden, benötigen aber vor Veröffentlichung eine kommerzielle und technische Freigabe.

## Quellenhierarchie und Umgang mit Widersprüchen

Bei widersprüchlichen Aussagen gilt folgende Reihenfolge:

1. Aktueller Code, Tests und API-Dokumentation belegen, was technisch vorhanden ist.
2. Aktuelle Security- und Release-Nachweise begrenzen, welche Qualitäts- oder Sicherheitsversprechen zulässig sind.
3. YouTrack zeigt Arbeitsstand, offene Entscheidungen und geplante Funktionen.
4. Der Businessplan liefert Positionierung, Zielgruppen, Geschäftsmodell und zeitliche Planung.
5. Payload-Seeds und Website-Konzept sind redaktionelle Entwürfe, aber kein Implementierungsnachweis.
6. Offizielle externe Dokumentation erklärt Standards und realistische Integrationsnutzen, belegt aber nicht automatisch deren Umsetzung in Mardu.

Ein abgeschlossenes YouTrack-Ticket ist ein gutes Indiz, aber kein Ersatz für Code- oder Produktprüfung. Umgekehrt kann Code vorhanden sein, obwohl ein Ticket noch im Review oder Backlog steht.

## Empfohlenes öffentliches Statusmodell

Payload unterstützt bei Integrationen derzeit `available`, `beta` und `planned`. Für eine ehrliche Website sollten diese Begriffe intern so verwendet werden:

| Payload-Status | Bedeutung für Mardu                                                                                                | Zulässige Formulierung                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Verfügbar      | Implementiert, konfigurierbar, dokumentiert und für Kundenprojekte supportbar                                      | „verfügbar“, „kann angebunden werden“                                                  |
| Beta           | Implementiert oder pilotierbar, aber UI, Hardware, Betrieb oder Interoperabilität noch nicht vollständig validiert | „Beta“, „im Pilot verfügbar“, „projektbezogen“                                         |
| Geplant        | Roadmap, Ticket, Konzept oder bloße Protokollkompatibilität ohne fertigen Connector                                | „geplant“, „auf Anfrage prüfbar“, „über offene Schnittstellen grundsätzlich anbindbar“ |

„Kompatibel“ ist kein eigener Payload-Status. Dieser Sachverhalt gehört in `compatibilityNotes`; bis zu einer nachgewiesenen Produktintegration sollte der Datensatz `planned` bleiben.

## Positionierung, die durch die Quellen getragen wird

### Kernversprechen

Mardu verbindet physische Zugänge und Maschinenfreigaben mit Qualifikationen, Rollen, Zeitfenstern und nachvollziehbaren Ereignissen. Dadurch werden Schlüssel, Papierlisten, getrennte Benutzerverwaltungen und manuelle Freigaben in Werkstätten, Hochschulen, Laboren und Ausbildungsumgebungen reduziert.

### Produktlogik

Der Businessplan beschreibt drei verständliche Produktblöcke:

1. Tür-Controller für Türen, Tore, Zonen und Raumzugang.
2. Maschinen-Controller für qualifikationsabhängige Maschinenfreigabe und technische Bedingungen.
3. Steuerungs- und Integrationsgeräte für lokale Kommunikation, Automatisierung und die Anbindung bestehender Infrastruktur.

Diese Dreiteilung ist verständlicher als zwölf gleichrangige Einzelprodukte. Die vorhandenen Payload-Produkte können darunter als Modelle, Varianten, Zubehör oder Projektbausteine eingeordnet werden.

### Primäre Zielgruppen

1. Werkstätten und technische Betriebsräume
2. Hochschulen und Universitäten
3. Labore und Forschungseinrichtungen
4. Schulen, Kammern und Ausbildungszentren
5. Makerspaces und offene Werkstätten

Spätere oder projektbezogene Segmente sind Vereine, kommunale Einrichtungen, industrielle Ausbildung, Technologiezentren und Community-Spaces.

## Integrationsinventur

### Übersicht und empfohlene Payload-Einordnung

| Integration oder Schnittstelle | Nachweis                                                                                                                                                     | Empfohlener Status                               | Öffentlich?                                           | Gelöstes Problem und Beitrag zum System                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LDAP / LDAPS                   | Backend mit Konfiguration, Validierung, Bind-/Base-DN-Diagnose, Login, Dry-Run, Sync, Historie und Startprüfung; NER-114                                     | Verfügbar nach Betriebsabnahme                   | Ja                                                    | Übernimmt bestehende Benutzer und Gruppen aus Verzeichnisdiensten; reduziert doppelte Stammdatenpflege und manuelle Kontenverwaltung.                                     |
| Microsoft Active Directory     | Durch LDAP-Implementierung ausdrücklich unterstützt                                                                                                          | Verfügbar nach Betriebsabnahme                   | Ja, als Kompatibilität von LDAP                       | Bindet bestehende Organisationsstrukturen und Gruppen ein.                                                                                                                |
| OpenID Connect                 | Mehrere Provider, Presets, Validierung, PKCE, Broker-Login, lokales Provisioning und Account-Merge im Backend; NER-115                                       | Verfügbar nach Betriebsabnahme                   | Ja                                                    | Ermöglicht SSO mit vorhandenen Identity-Providern und reduziert lokale Passwörter sowie Accountpflege.                                                                    |
| Microsoft Entra ID             | Über standardkonformes OIDC realistisch, aber kein gesonderter Connector-Nachweis                                                                            | Beta oder OIDC-Kompatibilität                    | Ja, innerhalb der OIDC-Seite                          | Macht Mardu für Microsoft-geprägte Hochschulen und Unternehmen anschlussfähig, ohne eine separate Identität aufzubauen.                                                   |
| Open Badges                    | Backend-Fassade für v1/v2, globale und benutzerbezogene Tokens, Sync, Trust- und Competency-Grants; NER-113 und UI-Tickets noch nicht vollständig konsistent | Beta                                             | Ja                                                    | Verknüpft nachweisbare Lernleistungen und Qualifikationen mit Freigaben; reduziert manuelle Zertifikatsprüfung. Keine v3-Konformität behaupten.                           |
| MQTT                           | Externer und optional eingebetteter Broker, TLS, Benutzer, ACL, Gerätekommunikation und Einstellungen; NER-45, NER-75, NER-118                               | Verfügbar für Kernpfade, Produktabnahme beachten | Ja                                                    | Entkoppelt Geräte und Plattform, erlaubt lokale IoT-Kommunikation und bildet die technische Grundlage für Zustände, Befehle und OTA.                                      |
| REST-API / OpenAPI             | Umfangreiche dokumentierte Backend-API                                                                                                                       | Verfügbar                                        | Ja                                                    | Ermöglicht kundenspezifische Anbindungen ohne proprietären Integrationszwang. Unterstützt ERP-, Campus-, Buchungs- und Verwaltungsprojekte.                               |
| Webhooks / Ereignisse          | Ereignis- und Benachrichtigungsarchitektur vorhanden; konkrete allgemeine Outbound-Webhook-Produktoberfläche nicht vollständig belegt                        | Beta                                             | Ja, nur präzise beschrieben                           | Liefert Zustandsänderungen an Drittsysteme und vermeidet Polling. Allgemeine Webhook-Selbstbedienung erst nach UI-/API-Nachweis versprechen.                              |
| GitHub App für OTA             | Zentrales Update-System kann private Repositories, Release-Kanäle und signierte Firmware verarbeiten                                                         | Verfügbar als Betriebsintegration                | Eher Technik-/Trust-Seite                             | Automatisiert kontrollierte Firmwarebereitstellung und trennt Repository-Berechtigungen granular. Für Kunden eher als Updatefähigkeit als als Integrationskarte erklären. |
| Lokale OTA-Verteilung          | MQTT-basierte lokale Firmwareverteilung implementiert                                                                                                        | Beta bis Feldvalidierung                         | Ja, als Plattformfunktion                             | Hält Geräte ohne manuellen Vor-Ort-Einsatz aktuell und unterstützt wiederholbare Rollouts.                                                                                |
| SMTP                           | Konfiguration, Test, Hot Reload und Templates vorhanden                                                                                                      | Verfügbar                                        | Optional öffentlich                                   | Nutzt vorhandene Mail-Infrastruktur für Einladungen, Reset, Warnungen und Benachrichtigungen.                                                                             |
| Vonage SMS                     | SMS-Provider im Benachrichtigungssystem implementiert                                                                                                        | Beta oder projektbezogen                         | Optional öffentlich                                   | Erreicht Verantwortliche auch außerhalb der App; sinnvoll für zeitkritische Betriebs- oder Sicherheitsmeldungen.                                                          |
| Web Push / SignalR             | Implementierte Benachrichtigungskanäle                                                                                                                       | Verfügbar als Plattformfunktion                  | Nicht als Fremdintegration nötig                      | Liefert Live-Status und Benachrichtigungen an Weboberflächen.                                                                                                             |
| RabbitMQ / MassTransit         | Optionaler Transport im Backend                                                                                                                              | Beta, intern                                     | Nein oder nur Architekturtext                         | Ermöglicht robuste asynchrone Verarbeitung bei größeren Installationen; ist eher Betriebsarchitektur als Kundennutzen.                                                    |
| MCP                            | Der Payload-MCP-Endpunkt ist erreichbar und liefert die konfigurierten Content-Tools; der Status eines allgemeinen Mardu-Core-MCP ist nicht belegt           | Beta                                             | Ja, nur als Payload-/Content- oder Entwicklerfunktion | Erlaubt KI-Werkzeugen strukturierten Zugriff auf freigegebene Daten und Aktionen. Scope und Berechtigungen müssen klar dokumentiert sein.                                 |
| IP500                          | Firmwarekommunikation und Prototypen nachgewiesen; Antenne, Prototypreife und Feldvalidierung noch offen; OTTER-175, OTTER-701, OTTER-702, KAT-9             | Beta / Pilot                                     | Ja                                                    | Liefert eine funkbasierte Gebäude- und Zutrittskommunikation. Nicht behaupten, dass das Mardu-Produkt selbst VdS-zertifiziert ist.                                        |
| NFC / MIFARE DESFire           | Tag-Verwaltung und Smartphone-Enrolment vorhanden; Android-Bibliothek und Bridge abgeschlossen                                                               | Beta bis Security-/Feldabnahme                   | Als Technologie, nicht zwingend als Integration       | Verbindet physische Identitäten mit Berechtigungen und ermöglicht robuste Karten-/Tag-Prozesse. Keine unbelegten Superlative verwenden.                                   |
| QR-Geräte-Onboarding           | Backend- und Produktkonzept vorhanden; NER-108 beschreibt noch den vollständigen sicheren Workflow                                                           | Beta / in Arbeit                                 | Ja, als Roadmap oder Beta                             | Vereinfacht Installation und Zuordnung von Geräten, senkt Inbetriebnahmezeit und Fehlkonfigurationen.                                                                     |
| Bluetooth Low Energy           | Control-Plane-Grundgerüst vorhanden, herstellerspezifisches Enrollment unvollständig                                                                         | Beta / geplant                                   | Ja, klar begrenzt                                     | Ermöglicht mobile oder lokale Gerätekommunikation; derzeit nicht als universell fertige BLE-Steuerung darstellen.                                                         |
| CES-Elektronikbeschläge        | Der Mardu Türdrücker nutzt einen CES-Elektronikbeschlag als White-Label-Grundlage; Schließzylinder werden herstellerneutral beschrieben                      | Beta / Projektgeschäft                           | Ja, bezogen auf den Türdrücker                        | Ermöglicht elektronische Beschläge für Vollblatt- und Rohrrahmentüren. Bauform, Innen-/Außeneinsatz und Montage werden projektbezogen ausgewählt.                         |
| OSDP / PHG Crypt               | In Hardware-Evaluation erwähnt, kein fertiger Produktpfad belegt                                                                                             | Geplant                                          | Roadmap                                               | Kann professionelle Leser und sichere Peripherie anbinden; relevant für bestehende Zutrittsinfrastruktur.                                                                 |
| Modbus TCP / RTU               | Payload-Seed nennt Beta, aber kein belastbarer Implementierungsnachweis in der technischen Bestandsaufnahme                                                  | Geplant, bis Codebeleg vorliegt                  | Ja, als Roadmap                                       | Würde SPS, HMI, Sensoren und bestehende Maschinensteuerungen anbinden und so Brownfield-Projekte erleichtern.                                                             |
| Node-RED                       | Offizielle Plattform passt über MQTT/REST; kein nativer Mardu-Connector belegt                                                                               | Geplant / kompatibel                             | Ja, als anfragbare Automation                         | Ermöglicht visuelle, ereignisgetriebene Abläufe ohne individuelle Backend-Entwicklung.                                                                                    |
| n8n                            | Im Payload-Seed als verfügbar geführt; Businessplan beschreibt n8n vor allem für interne Lead-Automation; kein nativer Produktconnector belegt               | Geplant / kompatibel                             | Nur nach Nachweis als Produktintegration              | Verknüpft Geschäfts- und Benachrichtigungsprozesse. Intern bereits als Automationsidee nützlich, öffentlich nicht als fertige Kundenintegration behaupten.                |
| Stripe                         | Payload-Seed und Roadmap, keine Umsetzung belegt                                                                                                             | Geplant                                          | Ja, Roadmap                                           | Könnte Abonnements, nutzungsbezogene Abrechnung und Zahlungsstatus automatisieren.                                                                                        |
| EasyVerein                     | Website-Konzept und Payload-Seed, keine Umsetzung belegt                                                                                                     | Geplant                                          | Ja                                                    | Könnte Mitglieder, Kontaktdaten und Abrechnungsabläufe mit Vereinszugängen verbinden.                                                                                     |
| Twenty CRM                     | Website-Code enthält eine Twenty-Anbindung für Leads/Newsletter; MAR-32 im Review                                                                            | Verfügbar intern                                 | Eher nicht im Produktkatalog                          | Verbessert Leadbearbeitung und Marketingbetrieb, erweitert aber nicht unmittelbar die Zutrittsplattform für Kunden.                                                       |
| Moodle / ILIAS / LMS           | Als naheliegender Hochschul- und Qualifikationspfad ableitbar, keine fertige Integration belegt                                                              | Geplant                                          | Ja, als Bedarf/Anfrage                                | Könnte bestandene Schulungen automatisiert in Maschinen- oder Raumfreigaben übersetzen.                                                                                   |
| UniNow                         | In bestehendem Lösungstext als Integration genannt, aber nur als Roadmap-/Beispielbezug nachweisbar                                                          | Geplant                                          | Nicht als „nahtlos integriert“                        | Kann Campuskommunikation oder Identitätsflüsse ergänzen; konkrete Schnittstelle und Use Case zuerst klären.                                                               |
| Lexware / sevdesk              | Im Website-Konzept als Beispiel, keine Umsetzung belegt                                                                                                      | Geplant                                          | Nur als anfragbare Kategorie                          | Könnte Rechnungen und wiederkehrende Leistungen in Kauf- oder HaaS-Modellen unterstützen.                                                                                 |

### Externe Standards als sachliche Begründung

- OpenID Connect ist eine Identitätsschicht auf OAuth 2.0 und eignet sich für SSO mit vorhandenen Identity-Providern: <https://openid.net/developers/how-connect-works/>.
- LDAP kann Benutzer-, Gruppen- und Sicherheitsinformationen aus Verzeichnisdiensten bereitstellen: <https://learn.microsoft.com/en-us/entra/architecture/auth-ldap>.
- MQTT ist ein leichtgewichtiges Publish-/Subscribe-Protokoll für IoT- und M2M-Kommunikation: <https://www.oasis-open.org/standard/mqtt-v5-0-os/>.
- Open Badges beschreibt überprüfbare Leistungs- und Qualifikationsnachweise; Mardu darf dabei nur die tatsächlich implementierten Versionen nennen: <https://standards.1edtech.org/open-badges/specifications/standards/v3p0/cert>.
- Modbus verbindet unter anderem Steuerungen, HMIs und Feldgeräte über serielle und TCP-basierte Varianten: <https://www.modbus.org/modbus-specifications>.
- Node-RED modelliert ereignisgetriebene Abläufe als Flows und unterstützt MQTT-Konfiguration: <https://nodered.org/docs/user-guide/concepts>.
- GitHub Apps bieten granulare Repository-Berechtigungen und eignen sich deshalb für eine kontrollierte OTA-Quellanbindung: <https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps>.
- IP500 beschreibt einen herstellerneutralen Funkansatz für Gebäude- und Sicherheitsanwendungen. Die Standard- oder Modulbeschreibung ist kein Produktzertifikat für Mardu: <https://ip500.org/technology/>.

## Direkt nutzbare Integrationsinhalte

Die folgenden Kurztexte können als Grundlage für Payload-Drafts dienen. Vor Veröffentlichung müssen Status und Supportumfang freigegeben werden.

### LDAP

**Kurzbeschreibung:** Mardu bindet bestehende LDAP-Verzeichnisse ein und übernimmt Benutzer- und Gruppenstrukturen in die Zugriffsverwaltung.

**Anwendungsfälle:** Konten synchronisieren, Gruppen Rollen zuordnen, Verbindungen vor dem Speichern testen, geplante Synchronisationen prüfen und ausführen.

**Nutzen:** Weniger doppelte Datenpflege, schnellere Einführung und konsistente Berechtigungen über vorhandene Organisationsstrukturen.

**Kompatibilität:** OpenLDAP und Microsoft Active Directory; Verbindung, Bind, Base DN und Synchronisation müssen installationsbezogen konfiguriert werden.

### OpenID Connect

**Kurzbeschreibung:** Mardu nutzt vorhandene Identity-Provider für Single Sign-on und kann externe Identitäten kontrolliert lokalen Konten zuordnen.

**Anwendungsfälle:** Hochschul- oder Unternehmens-SSO, automatisches lokales Provisioning, mehrere Provider, bestehende Konten zusammenführen.

**Nutzen:** Weniger lokale Passwörter, geringerer Supportaufwand und ein konsistenter Anmeldeprozess.

**Kompatibilität:** Standardkonforme OIDC-Provider; konkrete Provider-Presets und Claims werden projektbezogen geprüft.

### MQTT

**Kurzbeschreibung:** MQTT verbindet Mardu-Geräte, lokale Plattformdienste und Automatisierungen über eine schlanke Publish-/Subscribe-Kommunikation.

**Anwendungsfälle:** Gerätestatus, Steuerbefehle, Provisionierung, lokale OTA-Verteilung und Anbindung an vorhandene IoT-Broker.

**Nutzen:** Lose gekoppelte Komponenten, lokaler Betrieb und skalierbare Kommunikation ohne direkte Punkt-zu-Punkt-Verbindungen.

**Kompatibilität:** Externe Broker und optionaler eingebetteter Broker; TLS, Benutzer und ACLs werden installationsbezogen eingerichtet.

### Open Badges

**Kurzbeschreibung:** Mardu kann digitale Qualifikationsnachweise mit Kompetenz- und Zugriffsregeln verbinden.

**Anwendungsfälle:** Schulungsnachweise synchronisieren, vertrauenswürdige Aussteller definieren und Kompetenzen für Raum- oder Maschinenfreigaben verwenden.

**Nutzen:** Qualifikationen werden prüfbar und Freigaben müssen nicht mehr ausschließlich manuell gepflegt werden.

**Kompatibilität:** Der aktuelle Backendpfad bildet Open-Badges-v1/v2-Funktionen ab. UI, Anbieterkompatibilität und produktiver Supportumfang sind vor Veröffentlichung zu prüfen.

### IP500

**Kurzbeschreibung:** Mardu erprobt IP500 als Funkkommunikation für Zutritts- und Gebäudegeräte in Pilotinstallationen.

**Anwendungsfälle:** Funkvernetzte Türen, Statusübertragung und nachrüstbare Installationen mit reduziertem Verkabelungsaufwand.

**Nutzen:** Flexiblere Installation in Bestandsgebäuden und eine gemeinsame Kommunikationsbasis für verteilte Geräte.

**Kompatibilität:** Pilotstatus. Antenne, Reichweite, Geräteprofile und Feldstabilität müssen installationsbezogen validiert werden. Keine VdS-Zertifizierung des Mardu-Produkts behaupten.

### MCP

**Kurzbeschreibung:** Der Mardu-Content-Server kann freigegebene Inhalte und Aktionen über das Model Context Protocol für KI-Werkzeuge bereitstellen.

**Anwendungsfälle:** Inhalte abfragen, redaktionelle Arbeit unterstützen und klar abgegrenzte Content-Workflows automatisieren.

**Nutzen:** Strukturierter statt unkontrollierter KI-Zugriff; Werkzeuge arbeiten mit definierten Collections und Berechtigungen.

**Kompatibilität:** Der Payload-MCP-Endpunkt ist funktionsfähig. Der öffentliche Scope, Schreibrechte und Sicherheitsgrenzen müssen vor einer Vermarktung dokumentiert werden.

## Lösungsinventur

In Payload existieren acht Seed-Lösungen. Inhaltlich können alle als Draft angelegt werden; zuerst veröffentlicht werden sollten die vier Kernsegmente mit dem stärksten Beleg.

| Lösung                                 | Kernproblem                                                                                                 | Mardu-Beitrag                                                                                       | Relevante Integrationen                    | Priorität |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------- |
| Unternehmenswerkstätten                | Schlüssel, manuelle Einweisungslisten, unklare Maschinenberechtigung, fehlende Nachvollziehbarkeit          | Rollen-, gruppen-, zeit- und qualifikationsabhängige Raum- und Maschinenfreigabe; Ereignisprotokoll | LDAP, OIDC, MQTT, NFC, REST                | 1         |
| Hochschulen und Universitäten          | Viele wechselnde Nutzer, Semesterwechsel, dezentrale Werkstätten, getrennte Campus- und Qualifikationsdaten | SSO, Verzeichnissynchronisation, Gruppen, Qualifikationen, zeitlich begrenzte Freigaben             | OIDC, Entra, LDAP, Open Badges, LMS später | 1         |
| Labore und Forschung                   | Schutz sensibler Bereiche und Geräte, Projektpersonal, Nachweispflichten                                    | Zonen, Zeitfenster, Kompetenzregeln, Geräte- und Zugriffshistorie                                   | OIDC, LDAP, MQTT, REST                     | 1         |
| Schulen und Ausbildungszentren         | Einweisungen und Prüfungen werden getrennt von Raum- und Maschinenrechten verwaltet                         | Digitale Kompetenznachweise und automatisierte Freigaben nach erfolgreicher Qualifikation           | Open Badges, OIDC, LDAP, LMS später        | 1         |
| Makerspaces und Hochschul-Werkstätten  | Ehrenamtlicher Betrieb, heterogene Mitglieder, knappe Betreuungszeiten                                      | Self-Service-fähige Nutzerverwaltung, Qualifikationen, flexible Zugänge und HaaS-Potenzial          | EasyVerein später, Open Badges, MQTT, NFC  | 2         |
| Industrie und technische Betriebsräume | Brownfield-Maschinen, Schichtbetrieb, bestehende Identitäts- und Steuerungssysteme                          | Integration statt Insellösung, Maschinenfreigabe und technische Verriegelungslogik                  | AD/OIDC, MQTT, Modbus später, REST         | 2         |
| Kommunale Einrichtungen                | Verteilte Standorte, wechselnde Berechtigte, hoher Verwaltungsaufwand                                       | Zentral verwaltete Rollen, Zeitfenster und nachvollziehbare Zutritte                                | OIDC/LDAP, REST, NFC                       | 3         |
| Vereine und Community-Spaces           | Mitgliederwechsel, Ehrenamt, Beiträge und unterschiedliche Qualifikationen                                  | Gruppen- und zeitbasierte Zugänge, digitale Qualifikationen, spätere Verwaltungsanbindung           | EasyVerein/Stripe geplant, Open Badges     | 3         |

### Empfohlener Aufbau jeder Lösungspage

1. Konkrete Ausgangssituation der Zielgruppe
2. Drei bis fünf operative Probleme
3. Ablauf mit Mardu: Identität → Qualifikation → Regel → Tür oder Maschine → Protokoll
4. Relevante Produkte
5. Relevante Integrationen
6. Grenzen und Projektvoraussetzungen
7. Typischer Pilotumfang
8. FAQ und CTA zum Projektgespräch oder Konfigurator

Der vorhandene Hochschultext sollte „UniNow nahtlos integriert“ nicht weiter behaupten. Besser: „Campus- und Lernsysteme können über standardisierte oder projektspezifische Schnittstellen angebunden werden.“

## Produktinventur

### Vorhandene Payload-Produkte und Publikationsreife

| Seed-Produkt                    | Empfohlene Rolle                                             | Reifehinweis                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Mardu Gateway Pro               | Steuerungs- und Integrationsgerät / leistungsstarke Variante | Technische Daten, Lieferstatus und Preis bestätigen.                                                                                         |
| Mardu Gateway                   | Steuerungs- und Integrationsgerät / Basisvariante            | Technische Daten, Lieferstatus und Preis bestätigen.                                                                                         |
| Maschinenfreigabe Professionell | Professionelle Maschinenfreigabe                             | Verbindet Qualifikationen, Rollen, Zeitfenster und projektbezogene technische Bedingungen.                                                   |
| Mardu Access Point              | Tür-Controller / Basisvariante                               | Hardware- und Feldreife bestätigen.                                                                                                          |
| Smart Schütz Professionell      | Professionelle Schalt- und Freigabeeinheit                   | Schaltleistung, Last, Aktorik und Sicherheitskonzept werden je Maschine ausgelegt.                                                           |
| Mardu Smart Akteur              | Maschinen-Controller / Basisvariante                         | Pilotstatus und unterstützte Maschinentypen nennen.                                                                                          |
| Mardu QR                        | Onboarding- oder Zugangskomponente                           | Nicht „sofort verfügbar“ behaupten, solange NER-108 den vollständigen Workflow noch plant.                                                   |
| Mardu Schließzylinder           | Elektronische Türhardware                                    | Herstellerneutral als Mardu-Produkt beschreiben; Bauform, Zylindermaß, Funkweg und Verfügbarkeit projektbezogen klären.                      |
| Mardu Türdrücker                | White-Label-Elektronikbeschlag                               | Basiert auf einem CES-Elektronikbeschlag; schmale und breite Langschilder sowie eine Compact-Ausführung werden abhängig von der Tür gewählt. |
| NFC-Tags & Smartcards           | Identträger und Zubehör                                      | Standards, unterstützte Karten und Security-Freigabe sachlich dokumentieren.                                                                 |
| Schütze & SPS-Module            | Projektzubehör für Maschinen                                 | Nicht als universelles Standardpaket darstellen; Auslegung ist maschinen- und sicherheitsbezogen.                                            |
| Starter-Kits                    | Pilot- und Evaluationspaket                                  | Sehr gut für Lead-Konversion, sobald Umfang, Preis, Installation und Support definiert sind.                                                 |

### Empfohlene öffentliche Produktarchitektur

Statt zwölf gleich gewichteter Kacheln:

1. **Türzugang** – Access Point, unterstützte Türhardware und Identträger
2. **Maschinenfreigabe** – Smart Akteur, Verriegelungen, Sensorik und Qualifikationsregeln
3. **Plattform & Gateway** – lokale Verwaltung, Kommunikation, Integrationen und OTA
4. **Pilot-Kit** – klar abgegrenzter Einstieg mit Installation und Erfolgskriterien

Modelle, Pro-Varianten und Zubehör werden auf diesen Seiten untergeordnet dargestellt.

### Preis- und Angebotsdaten aus dem Businessplan

Diese Daten können in Payload-Drafts übernommen werden, aber erst nach kaufmännischer Freigabe veröffentlicht werden:

- Hardwarekauf ab 645 Euro netto pro Gerät
- HaaS ab 35 Euro netto pro Gerät und Monat
- Essential: 35 Euro netto pro Gerät und Monat
- Professional: 49 Euro netto pro Gerät und Monat
- Control: 89 Euro netto pro Gerät und Monat
- Projektstart: 390 Euro netto
- Inbetriebnahme: 790 Euro netto
- Integrationen: 290 Euro netto
- Installation und Automatisierung: individuelles Angebot

Das Website-Konzept enthält an anderer Stelle Beispielpreise ab 495 Euro sowie HaaS-Namen Basic, Plus und Premium. Diese Angaben widersprechen dem Businessplan und müssen vor der Befüllung vereinheitlicht werden.

## Roadmap-Inventur

Die 23 vorhandenen Roadmap-Seeds vermischen ältere Zielbilder, interne Experimente und Funktionen, die im Backend inzwischen zumindest teilweise umgesetzt sind. Sie sollten nicht unverändert veröffentlicht werden.

### Empfohlene öffentliche Roadmap

| Roadmap-Eintrag                             | Status                       | Zeitraum   | Inhalt                                                                                                                                  |
| ------------------------------------------- | ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Pilotfähiger Plattformkern                  | Beta oder kürzlich umgesetzt | Q3 2026    | Identitäten, Rollen, Zugriffsregeln, Geräteverwaltung, Protokollierung, LDAP, OIDC, MQTT und OTA in einen prüfbaren Pilotstand bringen. |
| Maschinenfreigabe und Verriegelungen        | In Arbeit                    | Q3 2026    | Maschinen nur bei gültiger Qualifikation und erfüllten technischen Bedingungen freigeben; Pilotprofile für ausgewählte Maschinen.       |
| Sicheres Geräte-Onboarding                  | In Arbeit                    | Q3–Q4 2026 | Wiederholbare QR-/NFC-gestützte Inbetriebnahme mit klaren Zuständen und Diagnose.                                                       |
| Türhardware und Funkvalidierung             | In Arbeit                    | Q3–Q4 2026 | Beschlag- und Zylinderausführungen, IP500-Antenne, Reichweite, Stabilität und Einbauaufwand validieren.                                 |
| Erster realer Pilotbetrieb                  | Geplant                      | Q4 2026    | Installationsaufwand, Support, Nutzerakzeptanz, technische Grenzen und wirtschaftlichen Nutzen messen.                                  |
| Produktisierter Marktstart                  | Geplant                      | H1 2027    | Wiederholbare Pakete, Dokumentation, Supportmodell, Preise und Vertrieb freigeben.                                                      |
| Wiederholbarer Rollout                      | Geplant                      | H2 2027    | Standardisierte Konfigurationen, Geräteprofile, Installation und Betrieb für mehrere Standorte.                                         |
| Nutzer-App für iOS und Android              | Geplant                      | später     | Mobile Identität, Freigaben, Benachrichtigungen und Self-Service.                                                                       |
| Nutzungs- und Betriebsanalysen              | Geplant                      | später     | Auslastung, Ereignisse, Wartungsbedarf und Wirkung von Zugriffsregeln sichtbar machen.                                                  |
| Allgemeine Bedingungs- und Automationslogik | Geplant                      | später     | Sensoren, Maschinenzustände und externe Systeme als Regeln verbinden.                                                                   |

### Einordnung vorhandener Seeds

- „First Run Wizard“: Backendpfad vorhanden, vollständiger Web-Wizard noch offen; als Beta statt schlicht geplant führen.
- „Qualifikationsverwaltung“, „Zertifikate“ und „Open Educational Badges“: Backend-Substanz vorhanden; UI und Produktabnahme bestimmen Beta oder erledigt.
- „Erweiterte Regel-Engine“, „Energie-Monitoring“, „Plugin-Marktplatz“, „Verleihsystem“, „POS“, „Gamification“ und externe Verleih-API: echte spätere Roadmap.
- Interne Einzelthemen wie Tape-Machine, mechanischer Quelltrigger oder Infrastrukturmigration sind für eine öffentliche Roadmap zu kleinteilig oder zu intern. Sie gehören in YouTrack, nicht zwingend auf mardu.de.
- Veraltete Quartalsangaben dürfen nicht weiterlaufen. Jede öffentliche Roadmap-Karte braucht ein sichtbares `updatedAt` und regelmäßige redaktionelle Prüfung.

## Weitere Payload-Collections, die befüllt werden können

### Integrationskategorien

- Identität & Single Sign-on
- Qualifikationen & Lernen
- Geräte & IoT
- Automatisierung & Steuerung
- Kommunikation & Benachrichtigungen
- Business, CRM & Verwaltung
- Abrechnung & Mitgliedschaft
- Entwickler- und Datenschnittstellen
- Tür- und Zutrittshardware

### Integrationsprotokolle

- LDAP / LDAPS
- OpenID Connect / OAuth 2.0
- MQTT
- REST / OpenAPI
- Webhooks
- SMTP
- HTTPS / SMS API
- GitHub App API
- MCP
- IP500
- BLE
- NFC / MIFARE DESFire
- Modbus TCP / RTU
- OSDP / PHG Crypt

### Produkttechnologien und Identträger

Vorhandene Seeds nennen NFC, MIFARE, BLE, IP500 und App Key sowie mehrere Identträger. Ergänzt oder präzisiert werden können QR, DESFire, Smartphone und projektspezifische Karten. Dabei muss zwischen Kommunikationstechnologie, Identträger und Produktfunktion unterschieden werden.

### Blog und Wissensbereich

Die folgenden fünf Content-Säulen passen zum Produkt, lösen konkrete Käuferfragen und stärken die fachliche Zitierbarkeit der Website.

#### 1. Sicherer Werkstattbetrieb

- Warum ein Türschlüssel noch keine Maschinenfreigabe ist
- Typische Haftungs- und Nachweisprobleme in Hochschulwerkstätten
- Pilot-Checkliste für digitale Zugangs- und Maschinenfreigabe
- Laser, Absaugung und Nachlaufzeiten als verständlicher Automations-Use-Case

#### 2. Qualifikation und Identität

- Von der Einweisung zur automatischen Freigabe
- LDAP und OIDC für Werkstätten einfach erklärt
- Open Badges als digitaler Qualifikationsnachweis
- Rollen, Gruppen, Zeitfenster und Zwei-Personen-Regeln im Vergleich

#### 3. Geräte, Edge und Betrieb

- Warum lokale Zugriffsentscheidungen und Cloud-Verwaltung zusammengehören
- MQTT in einer Zutritts- und Maschinenplattform
- OTA-Updates für verteilte Controller
- NFC, DESFire, QR und Smartphone: welcher Identträger passt wann?

#### 4. Integration und Automation

- Wie Mardu bestehende Campus-, Verzeichnis- und Steuerungssysteme ergänzt
- REST, Webhooks und MQTT: drei Wege zur Integration
- Modbus und Brownfield-Maschinen als künftiger Integrationspfad
- Node-RED oder n8n: Automationen ohne neue Insellösung

#### 5. Wirtschaftlichkeit und Einführung

- Kaufen, Service oder Hardware-as-a-Service
- Welche Kennzahlen ein Pilot messen sollte
- Kosten manueller Schlüssel-, Listen- und Einweisungsprozesse
- Vom Einzelprojekt zum wiederholbaren Rollout

Priorität haben zunächst die Beiträge „Türschlüssel ist keine Maschinenfreigabe“, „Von der Einweisung zur Freigabe“, „LDAP und OIDC“, „MQTT“, „Pilot-Checkliste“ und „Kaufen oder HaaS“. Sie decken Problemverständnis, technische Bewertung und Kaufentscheidung ab.

## Feldgenaue Payload-Befüllung

### Integrationen

Bereits abdeckbar sind `title`, `slug`, `shortDescription`, `description`, `protocols`, `useCases`, `supportedActions`, `compatibilityNotes`, `vendor`, `docsUrl`, `requestUrl`, `availabilityStatus`, `comingAt`, `categories`, `sortOrder`, `featured`, Sichtbarkeit und SEO. Logos und Hero-Bilder benötigen getrennte Rechte- und Medienprüfung.

### Lösungen

Bereits abdeckbar sind Titel, Slug, Badge, Tonalität, Tagline, Summary, Detail-Markdown, Hero, Problemblock, Features, Inhaltsblöcke, CTA, Featured-Status, Veröffentlichungszeitpunkt, Sichtbarkeit und SEO. Bildfelder bleiben ohne freigegebene Action-Fotos zunächst offen.

### Produkte

Textlich abdeckbar sind Name, Slug, Tagline, Summary, Overview, Detail-Markdown, Feature- und Spezifikationsgruppen, Beziehungen, Technologien, Identträger, CTAs, Sortierung und SEO. Preise, Verfügbarkeit, technische Spezifikationen, Varianten und Bilder benötigen eine Produktfreigabe.

### Roadmap

Abdeckbar sind Titel, Slug, Summary, Phase, Zeitraum, Body-Markdown, Status, Kategorie, Sortierung, Featured-Status, Sichtbarkeit und SEO. Öffentliche Zeitangaben sollten bewusst grob bleiben und nur freigegebene Meilensteine enthalten.

## Konkrete Befüllungsreihenfolge

### Phase 1 – belastbare Drafts

1. LDAP
2. OpenID Connect
3. MQTT
4. REST / OpenAPI
5. Open Badges als Beta
6. IP500 als Pilot/Beta
7. Unternehmenswerkstätten
8. Hochschulen und Universitäten
9. Labore und Forschung
10. Schulen und Ausbildungszentren

### Phase 2 – Produkt- und Pilotangebot

1. Türzugang
2. Maschinenfreigabe
3. Plattform & Gateway
4. Pilot-Kit
5. Öffentliche Roadmap mit Pilotmeilensteinen
6. Preis-/HaaS-Seite nach kaufmännischer Freigabe

### Phase 3 – Ausbau und Nachfragevalidierung

1. Makerspaces
2. Industrie und Brownfield
3. EasyVerein, Stripe, Modbus, Node-RED und n8n als geplante oder anfragbare Integrationen
4. Blog- und Whitepaper-Cluster
5. Referenz- oder Pilotstory, sobald Name, Kennzahlen und Freigaben vorliegen

## Aussagen, die vorerst nicht veröffentlicht werden sollten

- „Mardu ist VdS-zertifiziert“ oder „VdS-abgenommen“
- „höchster Sicherheitsstandard“
- „CES liefert sämtliche Mardu-Türhardware“; bestätigt ist nur die White-Label-Grundlage des Türdrückers
- „UniNow ist nahtlos integriert“
- „n8n und Node-RED sind native, verfügbare Mardu-Integrationen“
- „Modbus ist produktionsreif“, solange der Codebeleg fehlt
- „QR-Onboarding ist sofort vollständig verfügbar“
- konkrete Lieferzeiten, Modelle oder Preise ohne Produkt- und Vertriebsfreigabe
- erfundene Kundenlogos, Referenzen, Wirkungskennzahlen oder Zertifikate

Der Security-Export im Backend dokumentiert viele behobene Findings und erfolgreiche Builds/Tests, weist aber weiterhin offene Findings aus. Vor öffentlichen Sicherheitsversprechen sollten der aktuelle Export, das Deployment und die relevanten Geräte-/Zugriffspfade erneut abgenommen werden.

## Offene Entscheidungen

1. Welche CES-Beschlagvarianten werden konkret als Mardu White-Label-Türdrücker angeboten und freigegeben?
2. Welche konkreten Hardwaremodelle sind heute bestellbar, pilotierbar oder nur geplant?
3. Gilt weiterhin die Preislogik aus dem Businessplan, oder das abweichende Website-Konzept mit 495 Euro und Basic/Plus/Premium?
4. Welche Integrationen werden vertraglich supportet und welche nur über offene Schnittstellen ermöglicht?
5. Dürfen ARTandTECH, FH Aachen, EXIST, CES oder andere Organisationen namentlich als Partner, Förderer, Pilot oder Referenz genannt und mit Logo gezeigt werden?
6. Welche nachweisbaren Pilotkennzahlen dürfen veröffentlicht werden: Installationszeit, Administrationsersparnis, Öffnungszeiten, Supportaufwand oder Auslastung?
7. Welche Security-Findings sind nach dem Stand vom 5. August zusätzlich geschlossen worden, und gibt es eine aktuelle externe oder produktionsnahe Abnahme?
8. Soll MCP öffentlich als Content-/Entwicklerintegration gezeigt werden oder vorerst nur intern genutzt werden?

## Empfohlener nächster Schritt

Alle Inhalte zunächst als Payload-Drafts anlegen. Danach eine kurze Freigaberunde mit Technik, Hardware und Vertrieb durchführen. Erst dann `availabilityStatus`, Produktverfügbarkeit, Preise, Partnernamen und `_status: published` setzen.

Die nächste operative Ausbaustufe kann aus dieser Inventur direkt erstellen:

- sechs vollständige Integrations-Drafts,
- vier vollständige Lösungs-Drafts,
- eine vereinfachte Produktarchitektur mit vier Einstiegspages,
- zehn aktualisierte Roadmap-Einträge,
- die benötigten Kategorien und Protokolltaxonomien.
