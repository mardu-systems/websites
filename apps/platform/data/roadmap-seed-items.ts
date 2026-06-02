export type RoadmapSeedItem = {
  title: string;
  slug: string;
  summary: string;
  phaseLabel: string;
  timeLabel: string;
  sortOrder: number;
  status: 'planned' | 'in-progress' | 'beta' | 'done';
  category: 'software' | 'hardware' | 'platform' | 'integrations';
  bodyMarkdown: string;
};

export const roadmapSeedItems: RoadmapSeedItem[] = [
  {
    title: 'Erweiterte Regel-Engine',
    slug: 'erweiterte-regel-engine',
    summary: 'Komplexe Freigabelogik für belastbare Abläufe im Betrieb.',
    phaseLabel: 'Phase 1: Erweiterte Maschinensteuerung & Logik',
    timeLabel: 'Q2 2026',
    sortOrder: 10,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Implementierung komplexer Freigabe-Szenarien, wie z. B. das **Vier-Augen-Prinzip**, bei dem eine Freigabe nur durch zwei autorisierte Personen erfolgt.',
  },
  {
    title: 'First Run Wizard',
    slug: 'first-run-wizard',
    summary: 'Einrichtungsassistent für die Erstinstallation ohne Konfigurationsdateien.',
    phaseLabel: 'Phase 1: Erweiterte Maschinensteuerung & Logik',
    timeLabel: 'Q2 2026',
    sortOrder: 20,
    status: 'planned',
    category: 'platform',
    bodyMarkdown:
      'Ein web-basierter Einrichtungsassistent führt durch die Erstinstallation von Datenbank und Admin-Usern, damit die Inbetriebnahme ohne Hilfe von mardu möglich wird.',
  },
  {
    title: 'Qualifikations-Management',
    slug: 'qualifikations-management',
    summary: 'Zertifikate und Unterweisungen mit Laufzeit und Benachrichtigungen.',
    phaseLabel: 'Phase 1: Erweiterte Maschinensteuerung & Logik',
    timeLabel: 'Q2 2026',
    sortOrder: 30,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Tiefere Integration von Zertifikaten und Unterweisungen mit automatischen Ablaufdaten und Benachrichtigungen.',
  },
  {
    title: 'Dynamische Konfigurations-UI',
    slug: 'dynamische-konfigurations-ui',
    summary: 'Systemeinstellungen direkt in der Weboberfläche ändern.',
    phaseLabel: 'Phase 2: User Experience & Self-Service',
    timeLabel: 'Q2-3 2026',
    sortOrder: 10,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Administratoren können Systemeinstellungen direkt über die Weboberfläche anpassen, ohne Neustarts oder Serverzugriff.',
  },
  {
    title: 'Interlock-Zwang',
    slug: 'interlock-zwang',
    summary: 'Technische Kopplung von Maschinenbedingungen und Nebenaggregaten.',
    phaseLabel: 'Phase 2: User Experience & Self-Service',
    timeLabel: 'Q2-3 2026',
    sortOrder: 20,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown:
      'Technische Kopplung von Maschinenbedingungen, z. B. „Maschine startet nur, wenn die Absaugung aktiv ist“ oder „Kühlmittel läuft“.',
  },
  {
    title: 'Self-Onboarding',
    slug: 'self-onboarding',
    summary: 'Selbstregistrierung und Freigabeanträge mit Approval-Flow.',
    phaseLabel: 'Phase 2: User Experience & Self-Service',
    timeLabel: 'Q2-3 2026',
    sortOrder: 30,
    status: 'planned',
    category: 'platform',
    bodyMarkdown:
      'Neue Nutzer können sich selbst registrieren und Freigaben beantragen, die durch Administratoren genehmigt werden.',
  },
  {
    title: 'Energie-Monitoring',
    slug: 'energie-monitoring',
    summary: 'Verbrauchsdaten an Maschinen erfassen und auswerten.',
    phaseLabel: 'Phase 2: User Experience & Self-Service',
    timeLabel: 'Q2-3 2026',
    sortOrder: 40,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown:
      'Erfassung und Auswertung von Verbrauchsdaten direkt an den Maschinen zur Optimierung der Energiekosten.',
  },
  {
    title: 'Plugin-Marktplatz',
    slug: 'plugin-marktplatz',
    summary: 'Drittmodule für Raumbuchung, Bezahlsysteme und LMS-Anbindungen.',
    phaseLabel: 'Phase 3: Ökosystem & Integration',
    timeLabel: 'Q3 2026 - Q2 2027',
    sortOrder: 10,
    status: 'planned',
    category: 'integrations',
    bodyMarkdown:
      'Module von Drittanbietern für Raumbuchung, Bezahlsysteme oder LMS wie Moodle, ILIAS und Uni-Now.',
  },
  {
    title: 'Hardware-backed Keystore',
    slug: 'hardware-backed-keystore',
    summary: 'Unterstützung spezieller Sicherheits-Chips für hohen Schutzbedarf.',
    phaseLabel: 'Phase 3: Ökosystem & Integration',
    timeLabel: 'Q3 2026 - Q2 2027',
    sortOrder: 20,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown:
      'Unterstützung spezieller Sicherheits-Chips für Umgebungen mit maximalem Schutzbedarf.',
  },
  {
    title: 'Automatisierung & Steuerung (FHA)',
    slug: 'automatisierung-fha',
    summary: 'Sofortige Backend-Automatisierung für beschleunigte Freigaben.',
    phaseLabel: 'Phase 1: Dringende Kern-Features (Priorität 7-10)',
    timeLabel: 'Sofort / Q2 2026',
    sortOrder: 10,
    status: 'in-progress',
    category: 'software',
    bodyMarkdown:
      'Implementierung dringender Backend-Abläufe zur automatisierten Freigabeverwaltung. **Zuständigkeit:** FHA. **Umsetzungszeit:** ca. 1 Woche. Fokus auf sofortige Integration in bestehende Abläufe.',
  },
  {
    title: 'Integriertes Verleihsystem (ATS)',
    slug: 'verleihsystem-ats',
    summary: 'Geführtes Verleih-Konzept mit UI-Integration für Leih-Equipment.',
    phaseLabel: 'Phase 1: Dringende Kern-Features (Priorität 7-10)',
    timeLabel: 'Q2 2026',
    sortOrder: 20,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Konzeption und UI-Zeichnung eines benutzerfreundlichen Verleihtools für Werkzeuge und Kleingeräte. **Zuständigkeit:** ATS. **Umsetzungszeit:** 1 Monat. Vollständige Integration in das Haupt-Dashboard.',
  },
  {
    title: 'Mechanische Quellenauslösung (ATS)',
    slug: 'ausloesung-mechanische-quellen-ats',
    summary: 'Hardware-Kopplung zur sicheren Ansteuerung mechanischer Energiequellen.',
    phaseLabel: 'Phase 1: Dringende Kern-Features (Priorität 7-10)',
    timeLabel: 'Q2 2026',
    sortOrder: 30,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown:
      'Entwicklung der physischen Auslöseschnittstellen und der dazugehörigen Softwaresteuerung für mechanische Quellen. **Zuständigkeit:** ATS. **Umsetzungszeit:** 2 Wochen (Frontend-Fokus).',
  },
  {
    title: 'Integrierte Strommessung (FHA)',
    slug: 'strommessung-fha',
    summary: 'Hardware-Erweiterung für Echtzeit-Verbrauchserfassung an Maschinen.',
    phaseLabel: 'Phase 1: Dringende Kern-Features (Priorität 7-10)',
    timeLabel: 'Q2 2026',
    sortOrder: 40,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown:
      'Hardwareentwicklung und Programmierung zur präzisen Stromstärkenmessung direkt an den mardu Akteuren. **Zuständigkeit:** FHA. **Umsetzungszeit:** 5 Wochen.',
  },
  {
    title: 'Urkunden- & Zertifikatssystem (MSO, FHA)',
    slug: 'urkunden-schreibsystem-mso-fha',
    summary: 'Automatische Ausstellung von Zertifikaten gekoppelt an die Zeiterfassung.',
    phaseLabel: 'Phase 2: Erweiterte Betriebsfunktionen (Priorität 5-6)',
    timeLabel: 'Q3 2026',
    sortOrder: 10,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Programmierung eines Backend-Systems zur automatischen Generierung und Ablage von Sicherheitsurkunden und Einweisungsnachweisen. **Zuständigkeit:** MSO, FHA. **Umsetzungszeit:** 1 Monat.',
  },
  {
    title: 'Schnittstelle für Kassensysteme (MSO, FHA, ATS)',
    slug: 'kassensystem-mso-fha-ats',
    summary: 'Integration von Zahlungs- und Verkaufssystemen in App und Client.',
    phaseLabel: 'Phase 2: Erweiterte Betriebsfunktionen (Priorität 5-6)',
    timeLabel: 'Q3 2026',
    sortOrder: 20,
    status: 'planned',
    category: 'integrations',
    bodyMarkdown:
      'Anbindung und Entwicklung von Client- und Frontend-Komponenten zur Integration gängiger Point-of-Sale (POS) Abrechnungssysteme. **Zuständigkeit:** MSO, FHA, ATS. **Umsetzungszeit:** 1 Monat.',
  },
  {
    title: 'Integration Bandmaschine (ATS, FHA)',
    slug: 'bandmaschine-ats-fha',
    summary: 'Kurzfristige Einbindung physischer Bandlaufwerke/Analogschnittstellen.',
    phaseLabel: 'Phase 2: Erweiterte Betriebsfunktionen (Priorität 5-6)',
    timeLabel: 'Q3 2026',
    sortOrder: 30,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown:
      'Konzeptionelle und technische Planung zur Anbindung von analogen Bandmaschinen an das mardu Steuerungssystem. **Zuständigkeit:** ATS, FHA. **Planungszeit:** 1 Tag.',
  },
  {
    title: 'Netzaufnahme & App-Anbindung (FHA)',
    slug: 'netzaufnahme-fha',
    summary: 'Mobile Integration von Netzwerkparametern direkt im App Store.',
    phaseLabel: 'Phase 2: Erweiterte Betriebsfunktionen (Priorität 5-6)',
    timeLabel: 'Q3 2026',
    sortOrder: 40,
    status: 'planned',
    category: 'platform',
    bodyMarkdown:
      'Entwicklung und Bereitstellung einer App im App Store zur mobilen Vermessung und Erfassung lokaler Funknetzwerke. **Zuständigkeit:** FHA. **Umsetzungszeit:** 2 Monate.',
  },
  {
    title: 'Erweitertes Datenschutz-Dashboard (ATS)',
    slug: 'datenschutz-ats',
    summary: 'Nutzer-Dashboard zur Verwaltung von Einwilligungen und Löschungen.',
    phaseLabel: 'Phase 3: Zukunftsplanung & Community-Features (Priorität 2-4)',
    timeLabel: 'Q4 2026 - Q2 2027',
    sortOrder: 10,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Entwicklung datenschutzkonformer Oberflächen und Protokolle zur Einhaltung der DSGVO-Richtlinien im Makerspace-Alltag. **Zuständigkeit:** ATS. **Umsetzungszeit:** 1 Monat.',
  },
  {
    title: 'Infrastruktur-Umzugsmodul (HSM)',
    slug: 'umzug-hsm',
    summary: 'Export- und Importwerkzeuge für Systemumzüge im Hochschulbereich.',
    phaseLabel: 'Phase 3: Zukunftsplanung & Community-Features (Priorität 2-4)',
    timeLabel: 'Q4 2026 - Q2 2027',
    sortOrder: 20,
    status: 'planned',
    category: 'platform',
    bodyMarkdown:
      'Entwicklung von Migrations-Schnittstellen (Frontend/Backend/App) zur reibungslosen Verlagerung ganzer mardu-Strukturen bei Standortwechseln. **Zuständigkeit:** HSM. **Umsetzungszeit:** 1 Monat.',
  },
  {
    title: 'Gamifizierungs- & Spielsystem (FHA)',
    slug: 'spielsystem-fha',
    summary: 'Spielerische Vermittlung von Unterweisungen mit interaktiven Quizzes.',
    phaseLabel: 'Phase 3: Zukunftsplanung & Community-Features (Priorität 2-4)',
    timeLabel: 'Q4 2026 - Q2 2027',
    sortOrder: 30,
    status: 'planned',
    category: 'platform',
    bodyMarkdown:
      'Gamification-Modul in der App zur spielerischen Wissensvermittlung rund um Arbeitssicherheit. **Zuständigkeit:** FHA. **Umsetzungszeit:** 1 Woche (UI-Implementierung).',
  },
  {
    title: 'Bestands-Nutzungsmessung',
    slug: 'nutzungsmessung-bestand',
    summary: 'Erfassung von Nutzungszeiten und Auslastungen bestehender Maschinen.',
    phaseLabel: 'Phase 3: Zukunftsplanung & Community-Features (Priorität 2-4)',
    timeLabel: 'Q4 2026 - Q2 2027',
    sortOrder: 40,
    status: 'planned',
    category: 'software',
    bodyMarkdown:
      'Entwicklung eines Konzepts zur Erfassung der Auslastung von Bestandsgeräten ohne direkte Hardware-Nachrüstung. **Zuständigkeit:** Bestand. **Umsetzungszeit:** 2 Monate.',
  },
  {
    title: 'Open Educational Badges',
    slug: 'open-educational-badges',
    summary: 'Standardisierte Bildungszertifikate für nachweisbare Einweisungen.',
    phaseLabel: 'Phase 3: Zukunftsplanung & Community-Features (Priorität 2-4)',
    timeLabel: 'Q4 2026 - Q2 2027',
    sortOrder: 50,
    status: 'planned',
    category: 'integrations',
    bodyMarkdown:
      'Integration von Open-Badge-Schnittstellen zur Übertragung bestandener Unterweisungen an externe Bildungsträger. **Umsetzungszeit:** 1 Woche.',
  },
  {
    title: 'API-Anbindung für Verleihsysteme',
    slug: 'verleihsystem-api',
    summary: 'Schnittstelle für externe Verleihsoftware von Drittanbietern.',
    phaseLabel: 'Phase 3: Zukunftsplanung & Community-Features (Priorität 2-4)',
    timeLabel: 'Q4 2026 - Q2 2027',
    sortOrder: 60,
    status: 'planned',
    category: 'integrations',
    bodyMarkdown:
      'Entwicklung standardisierter API-Endpunkte zur Anbindung externer Werkzeugverleih-Plattformen an die mardu-Nutzerdatenbank. **Umsetzungszeit:** 2 Wochen.',
  },
];

