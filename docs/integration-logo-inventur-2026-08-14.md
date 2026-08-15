# Logo-Inventur für Payload-Integrationen

Stand: 14. August 2026

## Zweck und Ergebnis

Diese Inventur ordnet allen 27 aktuell in Payload vorhandenen Integrationen eine
Logo- oder Piktogrammstrategie zu. Sie unterscheidet zwischen:

- eigenen Mardu-Assets, die direkt verwendet werden können,
- offiziellen Markenassets mit belastbarer Download- oder Richtlinienquelle,
- Markenassets, die erst nach Freigabe oder Markenprüfung verwendet werden sollten,
- generischen Protokollen und Mardu-Funktionen, für die ein neutrales Mardu-Piktogramm
  verständlicher und rechtlich sauberer ist.

Die Recherche ist keine rechtliche Freigabe. Markenrechte bleiben bei den jeweiligen
Rechteinhabern. Ein Logo auf einer kommerziellen Integrationsseite kann außerdem eine
Partnerschaft oder Zertifizierung suggerieren, obwohl technisch nur Kompatibilität
oder eine geplante Anbindung gemeint ist.

## Technischer Stand

- In Payload existieren 27 Integrationen; bei allen ist das Feld `logo` derzeit leer.
- Die Payload-Medienbibliothek enthält derzeit keine Medien.
- Der verfügbare Payload-MCP-Server kann Medien lesen, stellt aber kein Werkzeug zum
  Hochladen oder Erstellen von Medien bereit. Logos können deshalb erst nach einem
  Upload im Payload-Admin mit den Integrationen verknüpft werden.
- Die öffentliche Integrationsseite besitzt jetzt für alle 27 Slugs lokale
  Logo-Fallbacks. Ein in Payload hinterlegtes Logo hat weiterhin Vorrang.
- Das sichtbare Logo wird in einer ungefähr 32 x 32 Pixel großen Fläche dargestellt.
  Breite Wortmarken und Logos mit Mindestgrößen von 100 Pixeln sind dafür ungeeignet.

## Umsetzungsstand

- Direkt eingebunden wurden die vorhandenen Markenassets für LDAP, Microsoft, MQTT
  und IP500 sowie offizielle Vektorquellen für OpenAPI und GitHub.
- Die aktuellen Anbieter-Favicons von easyVerein, Stripe, Vonage, Node-RED, n8n und
  Twenty wurden als kompakte, unveränderte Bildzeichen eingebunden.
- Für alle übrigen Einträge wurden neutrale Mardu-Piktogramme erstellt. Das
  geschützte OpenID-Zeichen und die alten, unzureichenden Stripe-/easyVerein-Dateien
  werden nicht mehr verwendet.
- Das UniNow-Pressekit wurde gefunden, der Logo-Ordner erfordert beim Abruf jedoch
  eine Google-Anmeldung. Bis zur manuellen Freigabe des Originalassets verwendet die
  Website deshalb ein neutrales Hochschul-Piktogramm.
- Der Upload und die Beziehungspflege im Payload-CMS bleiben offen, bis eine aktive
  SSO-Sitzung im Payload-Admin vorliegt.

## Entscheidungslegende

| Kennzeichen | Bedeutung                                                                               |
| ----------- | --------------------------------------------------------------------------------------- |
| A           | Direkt nutzbares eigenes Asset oder offizielle Quelle mit passender Verwendung          |
| B           | Offizielle Quelle gefunden; Freigabe, Markenprüfung oder andere Darstellungsgröße nötig |
| C           | Kein sinnvolles Einzel-Markenlogo; neutrales Mardu-Piktogramm empfohlen                 |

## Vollständige Zuordnung

| Payload-Integration    | Klasse | Empfohlenes Motiv                                                     | Fundstelle und Entscheidung                                                                                                                                                                                                                                                                                                                                                                                            | Zielasset                                                                                  |
| ---------------------- | ------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| LDAP                   | A      | Mardu-Verzeichnis-Piktogramm                                          | Das vorhandene `ldap.png` ist laut bestehender Medien-Dokumentation eine eigene Mardu-Illustration. LDAP ist ein Protokoll und besitzt kein verbindliches Produktlogo.                                                                                                                                                                                                                                                 | `ldap.png` vorerst beibehalten; später als eigenes SVG neu zeichnen                        |
| OpenID Connect         | C      | Neutrales `OIDC`-/Identity-Piktogramm                                 | Die OpenID Foundation veröffentlicht zwar Logo-Richtlinien, untersagt nicht lizenzierten Nutzern aber die Nutzung des OpenID-Logos. Der vorhandene Simple-Icons-Fallback sollte daher nicht in Payload übernommen werden. Quelle: <https://openid.net/policies/> und <https://openid.net/wordpress-content/uploads/2017/06/OIDF-Policy-Trademark-Usage-Policy-Final-6-19-2017.pdf>                                     | `oidc-mardu.svg`                                                                           |
| Microsoft Entra ID     | A      | Offizielles Microsoft-Vierfarbzeichen                                 | Microsoft empfiehlt für von Entra ID verwaltete Arbeits- und Schulkonten das Microsoft-Zeichen und bietet SVG/PNG direkt an. Nicht verändern und keine Architektur-Icons für Marketing verwenden. Quelle: <https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-branding-in-apps>                                                                                                                       | vorhandenes `microsoft.svg`, gegen offiziellen Download prüfen                             |
| Open Badges            | A      | Eigenes Mardu-Badge-Piktogramm                                        | 1EdTech dokumentiert den Standard, stellt aber auf der Standardseite kein allgemeines, für Integrationsmarketing vorgesehenes Produktlogo bereit. Vorhanden ist bereits ein eigenes Mardu-Open-Badge-Asset. Quelle: <https://www.1edtech.org/standards/open-badges>                                                                                                                                                    | `open-badges-mardu.svg`, abgeleitet aus `open_badge_mardu_cloud.svg`                       |
| MQTT                   | B      | MQTT-Symbol                                                           | Ein lokales Simple-Icons-SVG ist vorhanden und `mqtt.org` verwendet das bekannte Symbol. Eine ausdrückliche Freigabe für kommerzielle Integrationskarten wurde in der offiziellen Quelle nicht gefunden. Quelle: <https://mqtt.org/>                                                                                                                                                                                   | `mqtt.svg` beibehalten, Markenhinweis prüfen                                               |
| REST API & OpenAPI     | A      | Offizielles OpenAPI-Specification-Symbol                              | Die OpenAPI Initiative stellt Farb-, Schwarz- und Weißversionen bereit und empfiehlt für die Spezifikation ausdrücklich die `OpenAPI_Specification_Logo_*`-Varianten. Quelle: <https://github.com/OAI/OpenAPI-Style-Guide>                                                                                                                                                                                             | `openapi-specification.svg`                                                                |
| Webhooks & Events      | C      | Webhook mit ausgehenden Ereignispunkten                               | Kein externer Anbieter und kein gemeinsames Markenlogo. Ein Mardu-Piktogramm beschreibt die Funktion präziser.                                                                                                                                                                                                                                                                                                         | `webhooks-events-mardu.svg`                                                                |
| GitHub App für OTA     | A      | Offizielle GitHub-Mark, nicht Octocat-Maskottchen                     | GitHub stellt im Brand Toolkit Logoassets und Nutzungsregeln bereit. Das Logo darf nur die GitHub-Anbindung kennzeichnen und keine Partnerschaft suggerieren. Quelle: <https://brand.github.com/> und <https://docs.github.com/en/site-policy/other-site-policies/github-logo-policy>                                                                                                                                  | `github-mark.svg`                                                                          |
| Lokale OTA-Verteilung  | C      | Mardu-Gerät mit lokalem Update-Pfeil                                  | Eigene Plattformfunktion ohne Fremdmarke.                                                                                                                                                                                                                                                                                                                                                                              | `local-ota-mardu.svg`                                                                      |
| SMTP                   | C      | Briefumschlag mit Server-/Relay-Punkt                                 | SMTP ist ein offenes Protokoll ohne kanonisches Markenlogo.                                                                                                                                                                                                                                                                                                                                                            | `smtp-mardu.svg`                                                                           |
| Vonage SMS             | B      | Vonage-Wort-/Bildmarke nur nach Freigabe; sonst SMS-Piktogramm        | Ein allgemeines öffentliches Vonage-Brand-Kit wurde nicht gefunden. Die veröffentlichten Bedingungen des Vonage-Referral-Programms verlangen für öffentliche Markendarstellungen eine vorherige Autorisierung und Prüfung; deshalb ist auch hier eine direkte Freigabe die konservative Wahl. Quelle: <https://share.vonage.com/zone/terms>                                                                            | bis zur Freigabe `sms-mardu.svg`                                                           |
| Web Push & Echtzeit    | C      | Benachrichtigung mit Live-Impuls                                      | Eigene Plattformfunktion; weder Web Push noch Echtzeitkommunikation haben ein gemeinsames Markenlogo.                                                                                                                                                                                                                                                                                                                  | `web-push-realtime-mardu.svg`                                                              |
| RabbitMQ & MassTransit | C      | Neutraler Message-Bus                                                 | RabbitMQ erlaubt nominative Textnutzung, reserviert das Logo aber für Broadcom. Ein kombiniertes RabbitMQ-/MassTransit-Logo wäre zusätzlich irreführend. Quelle: <https://www.rabbitmq.com/trademark-guidelines>                                                                                                                                                                                                       | `message-bus-mardu.svg`                                                                    |
| Model Context Protocol | C      | `MCP` mit standardisiertem Connector-Motiv                            | Das offizielle Projekt und die Linux Foundation sind eindeutig auffindbar, eine allgemeine öffentliche Logo-/Brand-Kit-Freigabe wurde jedoch nicht gefunden. Quelle: <https://github.com/modelcontextprotocol>                                                                                                                                                                                                         | `mcp-mardu.svg`                                                                            |
| IP500                  | B      | IP500-Zeichen nur nach Bestätigung der Alliance                       | Im Repository liegt bereits `ip500.svg`; die Alliance verwendet IP500® als Marke. Eine öffentliche Logo-Nutzungslizenz wurde auf der offiziellen Seite nicht gefunden. Quelle: <https://ip500.org/about/>                                                                                                                                                                                                              | vorhandenes `ip500.svg` erst nach Freigabe übernehmen; sonst `wireless-building-mardu.svg` |
| NFC & MIFARE DESFire   | C      | Neutrales Kontaktlos-/Karten-Piktogramm                               | NFC Forum Marks erfordern eine Lizenz; die Wayfinding Marks können zwar kostenlos lizenziert werden, sind aber primär Wegweiser am Tap-Punkt. NXP fordert für das MIFARE-Logo mindestens 100 Pixel Bildschirmbreite, während die Karte nur etwa 32 Pixel bietet. Quellen: <https://nfc-forum.org/build/branding> und <https://www.nxp.com/docs/en/supporting-information/MIFARE-Trademark-and-Branding-Guidelines.pdf> | `nfc-card-mardu.svg`                                                                       |
| QR-Geräte-Onboarding   | C      | QR-Code mit Gerät und Häkchen                                         | Eigener Mardu-Prozess ohne Fremdmarke.                                                                                                                                                                                                                                                                                                                                                                                 | `qr-onboarding-mardu.svg`                                                                  |
| OSDP & PHG Crypt       | C      | Kartenleser mit verschlüsselter Leitung                               | Das OSDP-Logo dürfen laut SIA-Richtlinie nur Mitglieder nutzen; `OSDP Verified` setzt zusätzlich ein erfolgreich verifiziertes Produkt voraus. Für die Kombination mit PHG Crypt existiert kein gemeinsames Markenlogo. Quelle: <https://www.securityindustry.org/wp-content/uploads/2020/07/OSDP-brand-guidelines-2020.pdf>                                                                                           | `secure-reader-protocol-mardu.svg`                                                         |
| Modbus                 | C      | Industrieller Register-/SPS-Connector                                 | Die Modbus Organization erteilt ohne schriftliche Vereinbarung keine Logo-Lizenz; das Logo-Programm ist an Mitgliedschaft gebunden. Quellen: <https://www.modbus.org/legal> und <https://www.modbus.org/toolkit-license-agreement>                                                                                                                                                                                     | `industrial-bus-mardu.svg`                                                                 |
| Node-RED               | B      | Offizielles Node-RED-Symbol erst nach Freigabe                        | Das Projekt stellt SVG- und PNG-Ressourcen bereit; Node-RED ist zugleich eine Marke der OpenJS Foundation. Deren Richtlinie verlangt für Logos auf Websites oder anderen Marketingmaterialien zur Bewerbung eigener Produkte und Dienste eine schriftliche Genehmigung. Quellen: <https://nodered.org/about/resources/> und <https://trademark-policy.openjsf.org/>                                                    | bis zur Freigabe `workflow-mardu.svg`, danach offizielles `node-red.svg`                   |
| n8n                    | A      | Offizielles n8n-Icon aus dem Logo-Kit                                 | n8n bietet Logo-Kit, Farben, Mindestgröße und klare Regeln. Für die kleine quadratische Darstellung muss die im Kit vorgesehene Icon-Variante verwendet werden, nicht eine selbst zugeschnittene Wortmarke. Quelle: <https://n8n.io/brandguidelines/>                                                                                                                                                                  | `n8n-icon.svg`                                                                             |
| Stripe                 | B      | Offizielles Stripe-Asset oder vorhandenes kleines Symbol nach Prüfung | Stripe stellt offizielle Wortmarken und Nutzungsbedingungen bereit. Die Wortmarke passt schlecht in die aktuelle 32-Pixel-Fläche; das vorhandene Simple-Icons-Symbol stammt nicht aus dem offiziellen Stripe-Kit. Quelle: <https://stripe.com/newsroom/information>                                                                                                                                                    | vorerst `stripe.svg`; für offiziell freigegebene Wortmarke Layout verbreitern              |
| EasyVerein             | B      | Offizielles easyVerein-App-/Markenicon                                | Vorhanden ist nur ein 446-Byte-Favicon, kein druck- oder retinafähiges Markenasset. Auf der offiziellen Website wurde kein öffentliches Brand Kit gefunden. Für ein sauberes SVG oder hochauflösendes PNG sollte easyVerein direkt angefragt werden. Quelle: <https://easyverein.com/>                                                                                                                                 | `easyverein.svg` nach Anbieterfreigabe; altes `.ico` ersetzen                              |
| Twenty CRM             | B      | Offizielles Twenty-Favicon/Signet                                     | Die offizielle, domainverifizierte GitHub-Organisation und `twenty.com` liefern ein klares Signet, aber kein eigenständiges öffentliches Brand Kit. Das offizielle Domain-Favicon eignet sich technisch für die kleine Fläche; Markennutzung vor Veröffentlichung bestätigen. Quelle: <https://github.com/twentyhq> und <https://twenty.com/>                                                                          | `twenty-crm.png` oder offizielles SVG                                                      |
| Moodle & ILIAS         | C      | Neutrales LMS-Piktogramm; alternativ Einträge trennen                 | ILIAS bietet ein offizielles Weblogo zur Kennzeichnung der Software und untersagt Veränderungen. Moodle schränkt kommerzielle Logo-Verwendung ein, wenn eine Verbindung oder Empfehlung suggeriert werden könnte. Ein gemeinsames Logo würde zwei Marken künstlich kombinieren. Quellen: <https://docu.ilias.de/go/cat/2818> und <https://moodle.com/de/warenzeichen/>                                                 | `lms-mardu.svg`; bei Trennung `ilias.png` und Moodle nur nach Freigabe                     |
| UniNow                 | A      | Logo aus dem offiziellen Pressekit                                    | UniNow stellt auf der eigenen Presseseite Logos und Bildmaterial zum Download bereit. Das Logo unverändert und nur zur Kennzeichnung der Integration verwenden. Quelle: <https://uninow.com/presse>                                                                                                                                                                                                                    | `uninow.svg` oder hochauflösendes PNG aus dem Pressekit                                    |
| Lexware & sevdesk      | C      | Neutrales Buchhaltungs-/Beleg-Piktogramm; alternativ Einträge trennen | Lexware stellt Logos auf der Presseseite für Medienarbeit und Vertrieb bereit, nicht pauschal für jede Partnerdarstellung. Für sevdesk wurde kein offizielles öffentliches Brand Kit gefunden. Eine kombinierte Wortmarke sollte nicht selbst gebaut werden. Quelle: <https://www.lexware.de/presse/> und <https://sevdesk.de/>                                                                                        | `accounting-sync-mardu.svg`; separate Logos nur nach beidseitiger Klärung                  |

## Lokaler Asset-Bestand nach der Umsetzung

- Marken- und Anbieterassets: `ldap.png`, `microsoft.svg`, `mqtt.svg`, `openapi.svg`,
  `github.svg`, `ip500.svg`, `easyverein.png`, `stripe.png`, `vonage.png`,
  `node-red.png`, `n8n.png` und `twenty.png`.
- Mardu-Piktogramme: `openid-connect.svg`, `open-badges.svg`,
  `webhooks-events.svg`, `local-ota.svg`, `smtp.svg`, `web-push.svg`,
  `message-queue.svg`, `mcp.svg`, `nfc-mifare.svg`, `qr-onboarding.svg`,
  `osdp-phg.svg`, `modbus.svg`, `learning.svg`, `university.svg` und
  `accounting.svg`.
- Nicht übernommen wurden die im Plattformprojekt vorhandenen MIFARE- und NFC-Marken,
  da ihre Nutzungsbedingungen beziehungsweise Mindestgrößen nicht zur 32-Pixel-Karte
  passen.

## Empfohlene erste Upload-Welle

Nach einem Upload in Payload können ohne neue Fremdmarkenentscheidung zuerst diese
Assets verknüpft werden:

1. LDAP – vorhandenes eigenes Asset.
2. Microsoft Entra ID – offizielles Microsoft-Zeichen.
3. Open Badges – eigenes Mardu-Badge-Piktogramm.
4. REST API & OpenAPI – offizielles OpenAPI-Specification-Symbol.
5. GitHub App für OTA – GitHub-Mark nach Toolkit.
6. n8n – offizielle Icon-Variante aus dem Logo-Kit.
7. UniNow – Originaldatei aus dem Pressekit.
8. Alle dreizehn neutralen Mardu-Piktogramme nach ihrer Gestaltung.

## Offene Freigaben

Vor einer Übernahme in Payload sollten folgende Punkte schriftlich oder anhand einer
eindeutigen aktuellen Markenrichtlinie geklärt werden:

1. Entfernung des vorhandenen OpenID-Logos aus dem öffentlichen Fallback.
2. Verwendung des MQTT-Symbols auf einer kommerziellen Integrationsseite.
3. Vonage-Logo für die SMS-Integration.
4. IP500-Logo und gegebenenfalls Mitglieds-/Partnerstatus.
5. Node-RED-Logo unter der aktuellen OpenJS-Markenrichtlinie.
6. Geeignete kleine Stripe-Darstellung aus offiziellen Assets.
7. easyVerein-Vektorlogo.
8. Twenty-Signet beziehungsweise Favicon.
9. Moodle-Logo, falls Moodle nicht von ILIAS getrennt und nur textlich genannt wird.
10. Separate Lexware- und sevdesk-Logos, falls die gemeinsame Integration bestehen bleibt.

## Payload-Uploadkonvention

Für jedes hochgeladene Medium sollten mindestens folgende Angaben gepflegt werden:

- Dateiname in `kebab-case`, möglichst SVG, sonst transparentes PNG mit mindestens
  256 x 256 Pixeln.
- Alt-Text als reine Identifikation, zum Beispiel `GitHub` oder `Mardu-Piktogramm für
Webhooks und Ereignisse`.
- Quelle und Abrufdatum in der Medienbeschreibung.
- Rechteinhaber und Link zur Markenrichtlinie.
- Hinweis, ob es sich um ein offizielles Markenasset oder ein eigenes Mardu-Piktogramm
  handelt.
- Keine selbst gebauten Kombinationslogos. Bei kombinierten Integrationen entweder ein
  neutrales Funktionspiktogramm verwenden oder die Integrationen in getrennte Datensätze
  aufteilen.

## Empfehlung für das UI

Die aktuelle quadratische 32-Pixel-Fläche eignet sich für Signets, nicht für breite
Wortmarken. Wenn alle offiziellen Wortmarken dargestellt werden sollen, sollte das
Frontend vor dem Upload eine zweite Logoform unterstützen, etwa `icon` und `wordmark`
mit unterschiedlichen Größenregeln. Ohne diese Erweiterung sind neutrale quadratische
Mardu-Piktogramme für generische und kombinierte Integrationen die konsistenteste Lösung.
