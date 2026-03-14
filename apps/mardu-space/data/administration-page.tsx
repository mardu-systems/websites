import type { LucideIcon } from 'lucide-react';
import { ArrowLeftRight, BadgeCheck, Blocks, Layers3, PlugZap } from 'lucide-react';

/**
 * DTO for the hero content of the `/verwaltungssoftware` marketing page.
 * It keeps the copy and contact targets configurable without touching layout code.
 */
export interface AdministrationHeroDto {
  overline: string;
  title: string;
  description: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  keyFigures: AdministrationHeroKeyFigureDto[];
}

/**
 * DTO for compact proof points shown inside the marketing hero.
 */
export interface AdministrationHeroKeyFigureDto {
  label: string;
  value: string;
  description: string;
}

export type AdministrationStoryMediaKind =
  | 'user-management'
  | 'integration-flow'
  | 'access-rules'
  | 'group-management'
  | 'tag-enrollment';

/**
 * DTO for one narrative section on the `/verwaltungssoftware` page.
 * Each section maps a business problem to one software capability and one visual motif.
 */
export interface AdministrationStorySectionDto {
  id: string;
  eyebrow: string;
  title: string;
  description: string[];
  benefitTitle: string;
  benefits: AdministrationStoryBenefitDto[];
  media: AdministrationStoryMediaDto;
}

/**
 * DTO for one compact benefit that supports a story section.
 */
export interface AdministrationStoryBenefitDto {
  title: string;
  description: string;
}

/**
 * DTO for the planned media treatment next to a story section.
 * The `kind` tells the page which visual component to render.
 */
export interface AdministrationStoryMediaDto {
  kind: AdministrationStoryMediaKind;
  badge: string;
  title: string;
  description: string;
}

/**
 * DTO for a future-facing capability area.
 * These blocks stay strategic and intentionally avoid hard roadmap promises.
 */
export interface AdministrationGrowthPillarDto {
  id: string;
  title: string;
  description: string;
  proof: string;
  icon: LucideIcon;
}

/**
 * DTO for the final conversion section of the `/verwaltungssoftware` page.
 */
export interface AdministrationCtaDto {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export const administrationHero: AdministrationHeroDto = {
  overline: 'Verwaltungssoftware',
  title: 'Zentrale Verwaltungsapp für Nutzer, Zutrittspunkte und Freigaben.',
  description: [
    'Verwalten Sie Nutzer, Gruppen, Regeln und Zugangstags an einem Ort. Das vereinfacht Onboarding, senkt manuellen Aufwand und schafft Ordnung über Standorte hinweg.',
  ],
  primaryCtaLabel: 'Demo anfragen',
  primaryCtaHref: '/contact?source=admin-software&topic=verwaltungssoftware-demo',
  secondaryCtaLabel: 'Software-Überblick',
  secondaryCtaHref: '/platform',
  keyFigures: [
    {
      label: 'Verwaltung',
      value: 'Ein System',
      description: 'Nutzer, Zutrittspunkte, Gruppen und Tags an einem Ort.',
    },
    {
      label: 'Onboarding',
      value: 'Weniger Reibung',
      description: 'Neue Personen schneller anlegen und freischalten.',
    },
    {
      label: 'Skalierung',
      value: 'Mehr Struktur',
      description: 'Auch mehrere Standorte und Gruppen sauber organisieren.',
    },
  ],
};

export const administrationStorySections: AdministrationStorySectionDto[] = [
  {
    id: 'users',
    eyebrow: 'Benutzer einfach verwalten',
    title: 'Nutzer anlegen und pflegen ohne Verwaltungschaos',
    description: [
      'Neue Mitarbeitende, externe Personen und Zuständigkeiten lassen sich in einem klaren Ablauf anlegen, zuordnen und aktuell halten. Das reduziert Abstimmungsaufwand und beschleunigt das Onboarding.',
    ],
    benefitTitle: 'Was das im Alltag verbessert',
    benefits: [
      {
        title: 'Schnelleres Onboarding',
        description: 'Neue Nutzer sind schneller im richtigen Kontext angelegt.',
      },
      {
        title: 'Weniger manuelle Pflege',
        description: 'Stammdaten und Berechtigungen bleiben an einem Ort zusammen.',
      },
    ],
    media: {
      kind: 'user-management',
      badge: 'User Management',
      title: 'Nutzerverwaltung',
      description: 'Benutzerliste mit Status, Gruppen und nächstem Schritt.',
    },
  },
  {
    id: 'directories',
    eyebrow: 'Externe Benutzerdatenbanken anbinden',
    title: 'Bestehende Nutzerquellen anbinden statt doppelt pflegen',
    description: [
      'Bestehende Verzeichnisdienste oder HR-Systeme lassen sich anbinden, damit Daten nicht doppelt gepflegt werden müssen. Das spart Zeit, senkt Fehler und passt besser in bestehende Abläufe.',
    ],
    benefitTitle: 'Warum das wirtschaftlich relevant ist',
    benefits: [
      {
        title: 'Keine Doppelpflege',
        description: 'Bestehende Stammdaten bleiben in ihren führenden Systemen.',
      },
      {
        title: 'Weniger Fehler',
        description: 'Änderungen müssen nicht in mehreren Tools nachgezogen werden.',
      },
    ],
    media: {
      kind: 'integration-flow',
      badge: 'Integrationen',
      title: 'Verbindungslogik',
      description: 'Integration zwischen bestehenden Nutzerquellen und der Verwaltungsapp.',
    },
  },
  {
    id: 'rules',
    eyebrow: 'Zutrittsregeln flexibel steuern',
    title: 'Zugänge präzise und nachvollziehbar regeln',
    description: [
      'Freigaben lassen sich nach Personen, Zeiten und Bereichen sauber steuern. So bekommen die richtigen Personen zur richtigen Zeit Zugriff, ohne dass Regeln unübersichtlich werden.',
    ],
    benefitTitle: 'Was Kunden davon haben',
    benefits: [
      {
        title: 'Mehr Kontrolle',
        description: 'Freigaben bleiben lesbar statt historisch gewachsen.',
      },
      {
        title: 'Weniger Sonderlogik',
        description: 'Auch komplexere Regeln bleiben strukturiert pflegbar.',
      },
    ],
    media: {
      kind: 'access-rules',
      badge: 'Rules Engine',
      title: 'Freigaben und Bedingungen',
      description: 'Protokolle und Entscheidungen im operativen Verlauf.',
    },
  },
  {
    id: 'groups',
    eyebrow: 'Mit Gruppen schneller arbeiten',
    title: 'Gruppen zentral steuern statt einzeln pflegen',
    description: [
      'Sobald mehrere Nutzer oder Zutrittspunkte beteiligt sind, spart Gruppenlogik spürbar Zeit. Regeln lassen sich zentral anwenden und Änderungen schneller umsetzen.',
    ],
    benefitTitle: 'Der operative Nutzen',
    benefits: [
      {
        title: 'Zeit sparen',
        description: 'Regeln werden für Gruppen statt für jeden Einzelfall gepflegt.',
      },
      {
        title: 'Fehler reduzieren',
        description: 'Weniger Einzelpflege bedeutet weniger inkonsistente Berechtigungen.',
      },
    ],
    media: {
      kind: 'group-management',
      badge: 'Gruppenlogik',
      title: 'Zutrittspunkte und Gerätestruktur',
      description: 'Verwaltete Zutrittspunkte als Grundlage für zentrale Regeln und Gruppen.',
    },
  },
  {
    id: 'tags',
    eyebrow: 'Tags schnell und intuitiv ausgeben',
    title: 'Neue Zugangstags ohne Reibung erstellen und zuweisen',
    description: [
      'Die Tag-Ausgabe folgt einem klaren Prozess. Neue Zugangstags lassen sich schnell anlegen, zuweisen und dokumentieren, ohne lange Einarbeitung.',
    ],
    benefitTitle: 'Warum das für Teams wichtig ist',
    benefits: [
      {
        title: 'Wenig Schulungsaufwand',
        description: 'Die Ausgabe funktioniert ohne technische Spezialroutine.',
      },
      {
        title: 'Schnelle Bearbeitung',
        description: 'Neue Tags können direkt im Tagesgeschäft ausgegeben werden.',
      },
    ],
    media: {
      kind: 'tag-enrollment',
      badge: 'Enrollment',
      title: 'Tag-Anlage',
      description: 'Einfacher Enroll-Prozess für neue Zugangstags.',
    },
  },
];

export const administrationGrowthPillars: AdministrationGrowthPillarDto[] = [
  {
    id: 'integrations',
    title: 'Heute Ordnung, später anschlussfähig',
    description:
      'Die Software ist heute operativ nutzbar und bleibt offen für weitere Systeme und Prozesse.',
    proof: 'So entsteht erst Struktur und später saubere Erweiterbarkeit.',
    icon: PlugZap,
  },
  {
    id: 'automation',
    title: 'Wiederkehrende Abläufe später automatisieren',
    description:
      'Wiederkehrende Verwaltungsaufgaben lassen sich später schrittweise stärker standardisieren.',
    proof: 'Das reduziert Zusatzaufwand, wenn Nutzerzahlen und Standorte wachsen.',
    icon: ArrowLeftRight,
  },
  {
    id: 'structures',
    title: 'Standorte und Rollen sauber erweitern',
    description:
      'Mehr Gruppen, Standorte und Rollen bleiben beherrschbar, wenn die Struktur sauber mitwächst.',
    proof: 'Entscheidend ist eine Basis, die Ordnung schafft, bevor Komplexität teuer wird.',
    icon: Layers3,
  },
];

export const administrationGrowthSignals = [
  {
    title: 'Integrationen',
    description:
      'Bestehende Systeme besser anbinden, wenn Prozesse über einzelne Teams hinauswachsen.',
    icon: PlugZap,
  },
  {
    title: 'Automatisierung',
    description:
      'Wiederkehrende Verwaltungsaufgaben schrittweise verschlanken, ohne Kontrollverlust.',
    icon: Blocks,
  },
  {
    title: 'Skalierung',
    description:
      'Mehr Nutzer, Standorte und Regeln strukturiert handhaben statt Sonderfälle zu stapeln.',
    icon: BadgeCheck,
  },
];

export const administrationCta: AdministrationCtaDto = {
  title: 'Weniger Verwaltungsaufwand. Klarere Prozesse. Mehr Kontrolle.',
  description:
    'Wenn Sie Nutzer, Zutrittspunkte, Regeln und Tags zentral verwalten wollen, sprechen Sie mit uns über Ihre Anforderungen und eine passende Demo.',
  primaryButtonText: 'Demo anfragen',
  primaryButtonHref: '/contact?source=admin-software&topic=verwaltungssoftware-demo',
  secondaryButtonText: 'Kontakt aufnehmen',
  secondaryButtonHref: '/contact',
};
