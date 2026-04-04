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
];
