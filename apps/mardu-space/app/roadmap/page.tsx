import type { Metadata } from 'next';
import { Overline } from '@mardu/ui/components/typography';
import { RoadmapTimeline, type RoadmapMilestone } from '@mardu/sections';

export const metadata: Metadata = {
  title: 'Roadmap & Ausblick',
  description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title: 'Roadmap & Ausblick | mardu.space',
    description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
    url: '/roadmap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Roadmap & Ausblick | mardu.space',
    description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
  },
};

export default function RoadmapPage() {
  const items: RoadmapMilestone[] = [
    {
      title: 'Phase 1: Erweiterte Maschinensteuerung & Logik',
      time: 'Q2 2026',
      cards: [
        {
          description: (
            <ul className="space-y-3">
              <li>
                <strong>Erweiterte Regel-Engine:</strong> Implementierung komplexer
                Freigabe-Szenarien, wie z.B. das &quot;Vier-Augen-Prinzip&quot; (Freigabe nur durch zwei
                autorisierte Personen).
              </li>
              <li>
                <strong>First Run Wizard:</strong> Ein web-basierter Einrichtungsassistent führt durch die Erstinstallation
                (Datenbank, Admin-User), um die Inbetriebnahme ohne Konfigurationsdateien zu
                ermöglichen. Einrichtung ohne Hilfe von mardu.
              </li>
              <li>
                <strong>Qualifikations-Management:</strong> Tiefere Integration von Zertifikaten und
                Unterweisungen mit automatischem Ablaufdatum und Benachrichtigungen.
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'Phase 2: User Experience & Self-Service',
      time: 'Q2-3 2026',
      cards: [
        {
          description: (
            <ul className="space-y-3">
              <li>
                <strong>Dynamische Konfigurations-UI:</strong> Administratoren können
                Systemeinstellungen direkt über die Weboberfläche anpassen, ohne Neustarts oder Serverzugriff.
              </li>
              <li>
                <strong>Interlock-Zwang:</strong> Technische Kopplung von Maschinenbedingungen, z.B. &quot;Maschine
                startet nur, wenn die Absaugung aktiv ist&quot; oder &quot;Kühlmittel läuft&quot;.
              </li>
              <li>
                <strong>Self-Onboarding:</strong> Neue Nutzer können sich selbst registrieren und Freigaben
                beantragen, die durch Administratoren genehmigt werden (Approval-Flow).
              </li>
              <li>
                <strong>Energie-Monitoring:</strong> Erfassung und Auswertung von Verbrauchsdaten
                direkt an den Maschinen zur Optimierung der Energiekosten.
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'Phase 3: Ökosystem & Integration',
      time: 'Q3 2026 - Q2 2027',
      cards: [
        {
          description: (
            <ul className="space-y-3">
              <li>
                <strong>Plugin-Marktplatz:</strong> Module von Drittanbietern für Raumbuchung,
                Bezahlsysteme oder LMS (Moodle, ILIAS, Uni-Now).
              </li>
              <li>
                <strong>Hardware-backed Keystore:</strong> Unterstützung spezieller Sicherheits-Chips
                für maximalen Schutzbedarf.
              </li>
            </ul>
          ),
        },
      ],
    },
  ];

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Produkt</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Roadmap & Ausblick
          </h1>
          <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
            Unsere geplanten Features und Entwicklungsziele für mardu.space.
          </p>
        </div>

        <RoadmapTimeline
          className="pt-8 md:pt-10"
          variant="plain"
          items={items}
        />
      </section>
    </main>
  );
}
