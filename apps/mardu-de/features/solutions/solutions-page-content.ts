import type { SolutionDetailDto } from '@mardu/content-core';
import { solutions } from '@/data/solutions';

export interface SolutionExplorerViewModel {
  id: string;
  index: string;
  slug: string;
  navigationLabel: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  applications: readonly string[];
  benefits: readonly string[];
  perspectiveTitle: string;
  perspectiveBody: string;
}

interface SolutionExplorerDefinition {
  slug: string;
  navigationLabel: string;
  imageUrl?: string;
  imageAlt?: string;
  applications: readonly string[];
  benefits: readonly string[];
  perspectiveTitle: string;
  perspectiveBody: string;
}

function requireSolution(slug: string): SolutionDetailDto {
  const solution = solutions.find((item) => item.slug === slug);

  if (!solution) {
    throw new Error(`Die Lösung „${slug}“ ist nicht konfiguriert.`);
  }

  return solution;
}

const explorerDefinitions: readonly SolutionExplorerDefinition[] = [
  {
    slug: 'hochschulen-und-universitaeten',
    navigationLabel: 'Hochschulen',
    imageUrl: '/landing/campus-architecture-berlin.webp',
    imageAlt: 'Moderner Hochschulcampus als Beispiel für vernetzte Zugangsbereiche',
    applications: [
      'Campuswerkstätten und Makerspaces',
      'Fachbereiche und Labore',
      'Semesterrollen und externe Projekte',
    ],
    benefits: [
      'Berechtigungen zentral steuern',
      'Vorhandene Identitäten weiterverwenden',
      'Weniger manuelle Pflege bei Rollenwechseln',
    ],
    perspectiveTitle: 'Vom einzelnen Spezialraum zur gemeinsamen Campusstruktur.',
    perspectiveBody:
      'Mardu ordnet Maschinen, Räume und weitere Zugangspunkte in derselben Logik, ohne die Unterschiede der Fachbereiche zu nivellieren.',
  },
  {
    slug: 'unternehmenswerkstaetten',
    navigationLabel: 'Werkstätten',
    imageUrl: '/landing/mardu-modern-cnc.webp',
    imageAlt: 'Mitarbeiter an einer modernen CNC-Maschine mit Mardu-Zugangspunkt',
    applications: [
      'Maschinen und Anlagen im Bestand',
      'Werkstattzonen und Materialbereiche',
      'Schichten, Teams und externe Fachkräfte',
    ],
    benefits: [
      'Qualifikationsbasierte Maschinenfreigaben',
      'Weniger Schlüssel und Einzelabsprachen',
      'Nutzung und Verantwortung nachvollziehen',
    ],
    perspectiveTitle: 'Freigaben werden dort wirksam, wo die Nutzung beginnt.',
    perspectiveBody:
      'Die organisatorische Berechtigung endet nicht in einer Liste, sondern erreicht die konkrete Maschine, Tür oder Werkstattzone.',
  },
  {
    slug: 'labore',
    navigationLabel: 'Labore',
    applications: [
      'Sensible Laborgeräte',
      'Prüf- und Technikbereiche',
      'Wechselnde Forschungsgruppen',
    ],
    benefits: [
      'Rollen und Qualifikationen präzise abbilden',
      'Zugriffe nachvollziehbar dokumentieren',
      'Geräte- und Raumzugang zusammenführen',
    ],
    perspectiveTitle: 'Mehr als Raumzutritt: Zugriff auf die konkrete Ressource.',
    perspectiveBody:
      'Im Labor zählt nicht nur, wer einen Bereich betreten darf. Entscheidend ist, welche Person welches Gerät unter welchen Bedingungen nutzen kann.',
  },
  {
    slug: 'makerspaces-und-offene-werkstaetten',
    navigationLabel: 'Makerspaces',
    imageUrl: '/_A7_9094_quer.webp',
    imageAlt: 'Gemeinsam genutzte Werkstatt mit Maschinen und Arbeitsbereichen',
    applications: [
      'Mitglieder- und Kursbetrieb',
      'Gemeinsam genutzte Maschinen',
      'Abend- und Wochenendnutzung',
    ],
    benefits: [
      'Einweisungen vor Ort berücksichtigen',
      'Eigenständige Nutzung besser ermöglichen',
      'Betrieb ohne permanente Schlüsselausgabe',
    ],
    perspectiveTitle: 'Mehr Eigenständigkeit, ohne Regeln unsichtbar zu machen.',
    perspectiveBody:
      'Mardu schafft eine belastbare Grundlage für offene Nutzung: Berechtigungen bleiben personenbezogen und können direkt am Zugangspunkt geprüft werden.',
  },
  {
    slug: 'schulen-und-ausbildungszentren',
    navigationLabel: 'Ausbildungszentren',
    imageUrl: '/_A7_9072_quer.webp',
    imageAlt: 'Professionelle Ausbildungsumgebung mit gemeinsam genutzter Infrastruktur',
    applications: [
      'Lehrwerkstätten und Fachräume',
      'Ausbildungsgruppen und Kurse',
      'Maschinen mit unterschiedlichen Voraussetzungen',
    ],
    benefits: [
      'Klare Rechte für Lernende und Lehrende',
      'Selbstständigere Lernumgebungen ermöglichen',
      'Freigaben zentral anpassen und entziehen',
    ],
    perspectiveTitle: 'Lehre bleibt praktisch, Zugänge bleiben kontrollierbar.',
    perspectiveBody:
      'Qualifikationen, Zeiträume und Verantwortungsbereiche lassen sich so verbinden, dass praktische Ausbildung nicht an Schlüsselprozessen hängen bleibt.',
  },
  {
    slug: 'vereine-und-community-spaces',
    navigationLabel: 'Community-Spaces',
    imageUrl: '/landing/mardu-gebaeudezugang-studierende.webp',
    imageAlt: 'Zwei Personen nutzen einen digital geregelten Gebäudezugang',
    applications: [
      'Vereinsräume und geteilte Flächen',
      'Werkzeuge und Geräteausstattung',
      'Veranstaltungen und Gastzugänge',
    ],
    benefits: [
      'Weniger Übergaben und Schlüsselverluste',
      'Verantwortlichkeiten sichtbar halten',
      'Ehrenamtliche Organisation entlasten',
    ],
    perspectiveTitle: 'Gemeinsam genutzte Orte werden nicht zu Sammlungen von Sonderfällen.',
    perspectiveBody:
      'Rollen, Zeiträume und Zugänge bleiben verständlich verwaltbar, auch wenn Verantwortung auf mehrere Personen verteilt ist.',
  },
];

export const solutionExplorerItems: readonly SolutionExplorerViewModel[] = explorerDefinitions.map(
  (definition, itemIndex) => {
    const solution = requireSolution(definition.slug);

    return {
      id: solution.id,
      index: String(itemIndex + 1).padStart(2, '0'),
      slug: solution.slug,
      navigationLabel: definition.navigationLabel,
      title: solution.title,
      summary: solution.summary,
      imageUrl: definition.imageUrl ?? solution.imageUrl,
      imageAlt: definition.imageAlt ?? solution.imageAlt,
      applications: definition.applications,
      benefits: definition.benefits,
      perspectiveTitle: definition.perspectiveTitle,
      perspectiveBody: definition.perspectiveBody,
    };
  },
);

export const solutionsPageIntro = {
  descriptionPrefix:
    'Mardu verbindet Maschinenfreigaben, Türen, Tore und weitere Zugangspunkte mit einer zentralen Berechtigungsstruktur – passend zu',
  descriptionEmphasis: 'Menschen, Qualifikationen und realen Betriebsabläufen.',
} as const;
