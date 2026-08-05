import type { RoadmapItemDto } from '@mardu/content-core';

/**
 * Public editorial fallback for local previews and temporarily empty CMS environments.
 * Published Payload entries always take precedence in the route component.
 */
export const roadmapFallbackItems: RoadmapItemDto[] = [
  {
    id: 'fallback-automation',
    slug: 'automatisierte-freigaben',
    title: 'Automatisierte Freigaben',
    summary:
      'Wiederkehrende Freigabeabläufe lassen sich schneller und mit weniger manuellen Zwischenschritten verwalten.',
    phaseLabel: 'Betriebsabläufe',
    timeLabel: 'Aktuell',
    sortOrder: 10,
    status: 'in-progress',
    category: 'software',
    bodyMarkdown: '',
    featured: true,
  },
  {
    id: 'fallback-rule-engine',
    slug: 'erweiterte-regel-engine',
    title: 'Erweiterte Regel-Engine',
    summary:
      'Komplexere Bedingungen und mehrstufige Freigaben bilden reale Verantwortlichkeiten im Betrieb besser ab.',
    phaseLabel: 'Berechtigungen',
    timeLabel: 'Vorgesehen',
    sortOrder: 20,
    status: 'planned',
    category: 'software',
    bodyMarkdown: '',
    featured: true,
  },
  {
    id: 'fallback-qualifications',
    slug: 'qualifikations-management',
    title: 'Qualifikations-Management',
    summary:
      'Unterweisungen und Zertifikate erhalten Laufzeiten, nachvollziehbare Zustände und gezielte Erinnerungen.',
    phaseLabel: 'Berechtigungen',
    timeLabel: 'Vorgesehen',
    sortOrder: 30,
    status: 'planned',
    category: 'software',
    bodyMarkdown: '',
    featured: true,
  },
  {
    id: 'fallback-first-run',
    slug: 'first-run-wizard',
    title: 'Geführte Erstinstallation',
    summary:
      'Ein Einrichtungsassistent führt Verantwortliche strukturiert durch die ersten System- und Standortschritte.',
    phaseLabel: 'Einführung',
    timeLabel: 'Vorgesehen',
    sortOrder: 40,
    status: 'planned',
    category: 'platform',
    bodyMarkdown: '',
    featured: false,
  },
  {
    id: 'fallback-self-onboarding',
    slug: 'self-onboarding',
    title: 'Self-Onboarding',
    summary:
      'Nutzer können sich selbst registrieren und passende Freigaben über einen kontrollierten Approval-Flow anfragen.',
    phaseLabel: 'Nutzerverwaltung',
    timeLabel: 'Vorgesehen',
    sortOrder: 50,
    status: 'planned',
    category: 'platform',
    bodyMarkdown: '',
    featured: false,
  },
  {
    id: 'fallback-energy',
    slug: 'energie-monitoring',
    title: 'Energie-Monitoring',
    summary:
      'Verbrauchsdaten an ausgewählten Maschinen werden als gesonderter Pilot erfasst und im Betrieb auswertbar.',
    phaseLabel: 'Datenpilot',
    timeLabel: 'Vorgesehen',
    sortOrder: 60,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown: '',
    featured: false,
  },
  {
    id: 'fallback-interlock',
    slug: 'interlock-bedingungen',
    title: 'Verknüpfte Maschinenbedingungen',
    summary:
      'Nebenaggregate und weitere technische Voraussetzungen lassen sich als geprüfte Bedingungen einbeziehen.',
    phaseLabel: 'Maschinenzugang',
    timeLabel: 'Vorgesehen',
    sortOrder: 70,
    status: 'planned',
    category: 'hardware',
    bodyMarkdown: '',
    featured: false,
  },
  {
    id: 'fallback-plugins',
    slug: 'erweiterbare-integrationen',
    title: 'Erweiterbare Integrationen',
    summary:
      'Zusätzliche Module sollen Raumbuchung, Lernplattformen und weitere Bestandssysteme mit Mardu verbinden.',
    phaseLabel: 'Ökosystem',
    timeLabel: 'Vorgesehen',
    sortOrder: 80,
    status: 'planned',
    category: 'integrations',
    bodyMarkdown: '',
    featured: false,
  },
];
