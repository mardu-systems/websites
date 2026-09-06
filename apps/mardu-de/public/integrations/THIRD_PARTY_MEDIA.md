# Drittanbieter-Medien

Die Integrationsübersicht verwendet Markenassets ausschließlich zur eindeutigen Kennzeichnung der jeweiligen Integration. Sie stehen in der Darstellung unterhalb der Marke Mardu und stellen keine Empfehlung oder Partnerschaft dar.

## Markenassets

- Microsoft: Microsoft-Markenzeichen aus der bestehenden Website-Mediathek.
- MQTT: bestehendes MQTT-Marken-Icon der Website.
- OpenAPI: offizielles farbiges Logo aus dem Repository der OpenAPI Initiative.
- GitHub: offizielles `mark-github` aus dem Primer-Octicons-Repository; Verwendung zur Kennzeichnung der GitHub-Integration.
- IP500: bestehendes IP500-Asset aus der Mardu-Plattform.
- easyVerein: offizielles Apple-Touch-Icon von `easyverein.com`.
- Stripe, Vonage, Node-RED, n8n und Twenty: aktuelle, öffentlich ausgelieferte Favicons der jeweiligen Anbieter-Websites.

Die Markenzeichen bleiben Eigentum der jeweiligen Rechteinhaber und dürfen nicht als Mardu-eigene Marken weiterverwendet werden.

## Mardu-Piktogramme

Für Protokolle, kombinierte Integrationen und Marken mit ungeeigneten oder eingeschränkt nutzbaren Logoformaten werden eigene, neutrale Mardu-Piktogramme eingesetzt. Das betrifft OpenID Connect, Open Badges, Webhooks, lokale OTA-Verteilung, SMTP, Web Push, RabbitMQ/MassTransit, MCP, NFC/MIFARE DESFire, QR-Onboarding, OSDP/PHG Crypt, Modbus, Moodle/ILIAS, UniNow und Lexware/sevdesk. Auch die LDAP- und Werkstattgrafiken sind Mardu-eigene Illustrationen.

## Technische Verwendung

Die Dateien unter `public/integrations/logos` sind lokale Fallbacks. Ein im Payload-CMS hinterlegtes Logo hat Vorrang, sodass die Redaktion ein Markenasset später ohne Codeänderung austauschen kann.

## Ergänzungen vom 4. September 2026

Die folgenden Originaldateien wurden von den Anbieter-Websites bzw. deren verlinkten Asset-Servern übernommen. Proportionen und Markenfarben bleiben erhalten.

- `auth0.svg`: https://cdn.auth0.com/website/website/favicons/auth0-favicon.svg
- `authentik.svg`: https://goauthentik.io/img/press-kit/icon-color.svg
- `keycloak.svg`: https://www.keycloak.org/resources/images/icon.svg
- `google.png`: https://developers.google.com/static/identity/images/g-logo.png
- `okta.svg`: https://www.okta.com/content/dam/okta---digital/en_us/images/header/logos/okta.svg
- `zitadel.svg`: https://cdn.sanity.io/images/y3uu7rkl/production/9e20c2656797f89279d7040dba5446ab0628f804-295x81.svg
- `home-assistant.svg`: https://www.home-assistant.io/images/favicon.svg
- `bacnet-ip.png`: https://bacnet.org/wp-content/uploads/sites/4/2025/08/cropped-BACnet-logo-300.png
- `knx-ip.svg`: https://www.knx.org/themes/custom/knx/src/assets/favicon/favicon.svg
- `siemens-s7.svg`: https://www.siemens.com/img/favicon.svg
- `zigbee2mqtt.png`: https://www.zigbee2mqtt.io/logo.png
- `lorawan-chirpstack.png`: https://www.chirpstack.io/img/logo.png
- `amazon-cognito.svg`: https://d1.awsstatic.com/onedam/marketing-channels/website/public/shared/architecture-icon-release/Icon-package_07312026.5846e92413caa21490223536cc97f1269e44fa92.zip#Architecture-Service-Icons_07312026/Arch_Security-Identity/64/Arch_Amazon-Cognito_64.svg

Für OPC UA, EtherNet/IP, SNMP, serielle Schnittstellen, SocketCAN und die kombinierte Matter/Thread-Anbindung wurden neutrale Mardu-Piktogramme ergänzt. Sie sind keine offiziellen Protokolllogos oder Zertifizierungszeichen. Das ChirpStack-Logo kennzeichnet den externen Netzwerkserver.

Die Fallback-Zuordnung in `lib/integration-logos.ts` gilt für Übersicht, Detailseiten, hervorgehobene und ähnliche Integrationen. CMS-Logos haben weiterhin Vorrang. Die Statuszähler verwenden die vorhandenen `statusCounts` aus der Content-API. Öffentliche API- und DTO-Verträge bleiben unverändert.
