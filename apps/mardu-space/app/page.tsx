'use client';

import {
  Activity,
  Briefcase,
  CheckCircle,
  Cpu,
  Key,
  Lock,
  Server,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';

import SecurityAccordion from '@/components/utilities/security-accordion';
import WhitepaperTeaser from '@/components/utilities/whitepaper-teaser';
import { useRecaptcha } from '@/lib/recaptcha';
import {
  CardGrid,
  CTASection,
  ConfiguratorTeaser,
  Foerderung,
  HeroSection,
  InfoGrid,
  ProcessSteps,
  ScenarioShowcase,
  SplitContent,
} from '@mardu/sections';

const heroDescription = (
  <>
    <p className="mb-4 text-lg font-medium">
      Für Unternehmenswerkstätten, Hochschulen, Makerspaces und Labore.
    </p>
    <p>
      mardu.space organisiert Zutritt, Maschinenfreigaben und Qualifikationen in einem zentralen
      System. Betreiber steuern damit nachvollziehbar, wer wann welche Bereiche betreten und welche
      Maschinen nutzen darf.
    </p>
  </>
);

const summaryDescription = (
  <>
    <p className="text-balance">
      mardu.space steuert, wer welche Bereiche betreten und welche Maschinen nutzen darf und
      dokumentiert Freigaben nachvollziehbar in einem zentralen System.
    </p>
    <ul className="mt-10 space-y-6 list-disc list-inside">
      <li>Rechte rollenbasiert und zeitgesteuert vergeben</li>
      <li>Maschinen nur mit gültiger Qualifikation freischalten</li>
      <li>Ereignisse mit Zeit, Ort und Ergebnis protokollieren</li>
    </ul>
  </>
);

const summaryItems = [
  {
    title: 'Sicher und nachvollziehbar',
    description:
      'Personenbezogene Berechtigungen und lückenlose Protokolle schaffen Transparenz im Betrieb.',
    icon: ShieldCheck,
  },
  {
    title: 'Weniger Verwaltungsaufwand',
    description: 'Rechte digital vergeben, anpassen und entziehen statt manuell organisieren.',
    icon: Settings,
  },
  {
    title: 'Flexibel integrierbar',
    description:
      'Lokal oder zentral betreibbar, passend zu Infrastruktur, Compliance und Verfügbarkeit.',
    icon: Server,
  },
];

const cardGridItems = [
  {
    title: 'Unternehmen & Hochschulen',
    badge: 'Viele Beteiligte',
    description:
      'Hilfreich, wenn viele Räume, Maschinen und Nutzergruppen koordiniert und nachvollziehbar abgesichert werden müssen.',
    list: [
      'klare Zuständigkeiten trotz komplexer Strukturen',
      'saubere Nachweise für Betrieb und Aufsicht',
    ],
    icon: Briefcase,
    className: 'bg-card',
  },
  {
    title: 'Makerspaces',
    badge: 'Wenig Administration',
    description:
      'Besonders sinnvoll, wenn Einweisungen, wechselnde Nutzer und riskante Maschinen im Alltag zusammenkommen.',
    list: [
      'Qualifikation direkt mit Freigaben koppeln',
      'weniger manuelle Organisation trotz Fluktuation',
    ],
    icon: Users,
    className: 'bg-card',
  },
  {
    title: 'Private Werkstätten',
    badge: 'Einfacher Betrieb',
    description:
      'Passend, wenn Sicherheit, Komfort und überschaubare Verwaltung wichtiger sind als komplexe Organisationsstrukturen.',
    list: [
      'Schutz vor unbefugtem Zugriff auf Räume und Geräte',
      'einfaches Rechtemanagement ohne Listen und Schlüsselchaos',
    ],
    icon: Wrench,
    className: 'bg-card',
  },
];

const scenarioFeatures = [
  {
    id: 'central-release',
    title: 'Zentrale Freigabe',
    description: 'Aufsichtsschaltung für Räume und Anlagen.',
  },
  {
    id: 'credentials',
    title: 'Karte, Chip, App',
    description: 'Identifikation pro Nutzer und Gerät.',
  },
  {
    id: 'qualifications',
    title: 'Unterweisungen',
    description: 'Freigabe nur mit gültiger Qualifikation.',
  },
  {
    id: 'time-rules',
    title: 'Zeitsteuerung',
    description: 'Regeln nach Schicht, Kurs oder Feiertag.',
  },
  {
    id: 'audit-logs',
    title: 'Ereignisprotokolle',
    description: 'wer, wann, wo, Ergebnis — für Nachweise & Analyse.',
  },
  {
    id: 'integrations',
    title: 'API & Integrationen',
    description: 'Offene APIs, Anbindung an bestehende Systeme.',
  },
  {
    id: 'emergency',
    title: 'Notfall-Modus',
    description: 'Definierte Ausnahmen für Einsatz-/Störfälle.',
  },
  {
    id: 'reporting',
    title: 'Reports & Export',
    description: 'Auswertungen für Betrieb, Compliance und Vorfälle.',
  },
];

const scenarioScenarios = [
  {
    id: 'drehstrom-machines',
    label: 'Drehstrom‑Maschinen (3‑phasig)',
    teaser: 'Leistungsstarke Maschinen kontrolliert schalten – auch mit zentraler Freigabe.',
    imageSrc: '/configurator/32a.jpg',
    imageAlt: 'Drehstrom‑Stecker',
    featureIds: [
      'central-release',
      'qualifications',
      'time-rules',
      'audit-logs',
      'reporting',
      'integrations',
      'emergency',
    ],
  },
  {
    id: 'doors-gates',
    label: 'Türen & Tore',
    teaser: 'Zutritt für Eingänge, Werkstatt- und Außentore – regelbasiert und nachvollziehbar.',
    imageSrc: '/configurator/tor.jpg',
    imageAlt: 'Elektrisches Tor',
    featureIds: [
      'credentials',
      'audit-logs',
      'reporting',
      'integrations',
      'emergency',
      'time-rules',
    ],
  },
  {
    id: 'schuko-machines',
    label: 'Schuko‑Maschinen (1‑phasig)',
    teaser: 'Kleinere Maschinen und mobile Geräte sicher freigeben – flexibel und nachvollziehbar.',
    imageSrc: '/configurator/schuko.jpg',
    imageAlt: 'Schuko‑Stecker',
    featureIds: [
      'qualifications',
      'time-rules',
      'audit-logs',
      'reporting',
      'credentials',
      'integrations',
      'emergency',
    ],
  },
];

const infoGridItems = [
  {
    title: 'Identität & Zugang',
    icon: Key,
    features: [
      {
        label: 'Rollen & Rechte',
        description: 'Granulare Freigaben für Nutzer, Gruppen und Verantwortliche.',
      },
      {
        label: 'Login & Identifikation',
        description: 'Passkeys, NFC, Karten und App-Anbindung in einem Modell.',
      },
    ],
  },
  {
    title: 'Geräte & Maschinen',
    icon: Cpu,
    features: [
      {
        label: 'Maschinenfreigabe',
        description: 'Steuerung von Geräten und Maschinen auf Basis von Qualifikation und Regeln.',
      },
      {
        label: 'Vernetzung',
        description:
          'Einbindung von Türen, Steuerungen und Hardware in bestehende Infrastrukturen.',
      },
    ],
  },
  {
    title: 'Monitoring',
    icon: Activity,
    features: [
      {
        label: 'Ereignisprotokolle',
        description: 'Nachvollziehbar dokumentiert: wer, wann, wo und mit welchem Ergebnis.',
      },
      {
        label: 'Ablehnungsgründe',
        description: 'Transparente Hinweise, warum Zutritt oder Nutzung nicht freigegeben wurde.',
      },
    ],
  },
  {
    title: 'System & Sicherheit',
    icon: Lock,
    features: [
      {
        label: 'Schnittstellen',
        description: 'Anbindung an bestehende Systeme, Prozesse und Auswertungen.',
      },
      {
        label: 'Betriebsmodell',
        description: 'Lokal oder zentral betreibbar, passend zu Infrastruktur und Verfügbarkeit.',
      },
    ],
  },
];

const processSteps = [
  {
    title: 'Erstgespräch',
    description:
      'Zielsetzung, Umfang, Zonen, Maschinen, Rollen und Betriebsmodell werden gemeinsam geklärt.',
  },
  {
    title: 'Begehung oder Remote-Review',
    description:
      'Prüfung von Türen, Maschinen, Strom, Netzwerk, Identifikation und Sicherheitsanforderungen.',
  },
  {
    title: 'Angebot',
    description:
      'Transparente Positionen für Hardware, Montage, Inbetriebnahme, Schulung und optionalen Support.',
  },
  {
    title: 'Installation und Inbetriebnahme',
    description:
      'Montage der Komponenten, Systemkonfiguration, Tests im Alltag und Übergabe an Verantwortliche.',
  },
  {
    title: 'Pilot und Rollout',
    description:
      'Klein starten, Wirkung messen, Regeln nachschärfen und anschließend schrittweise erweitern.',
  },
];

const securityItems = [
  {
    id: 'compliance-1',
    title: 'Datenschutz & Governance (DSGVO)',
    content: (
      <div className="space-y-4">
        <p>
          Zutritts- und Nutzungsereignisse sind in der Regel personenbezogene Daten. mardu.space
          setzt Privacy by Design um: Protokolle werden nur zu klar definierten Zwecken geführt,
          insbesondere Betriebssicherheit, Vorfallklärung und Nachweisführung.
        </p>
        <p>
          Es gilt Datenminimierung: Es werden nur Ereignisse erfasst, die für diese Zwecke
          erforderlich sind. Ergänzend unterstützt das System Löschkonzepte über konfigurierbare
          Aufbewahrungsfristen für Logdaten, damit Retention-Policies nachvollziehbar umgesetzt und
          an interne Vorgaben angepasst werden können.
        </p>
      </div>
    ),
  },
  {
    id: 'compliance-2',
    title: 'Arbeitsschutz & Nachweise (DGUV / TRBS)',
    content: (
      <div className="space-y-4">
        <p>
          Unterweisungen müssen dokumentiert werden (DGUV Vorschrift 1). Für Arbeitsmittel ist eine
          Gefährdungsbeurteilung Pflicht (TRBS 1111).
        </p>
        <p>
          mardu.space unterstützt die operative Umsetzung: Qualifikationen werden zur technischen
          Voraussetzung für Zutritt und Freigabe. Ereignisse werden nachvollziehbar protokolliert.
        </p>
      </div>
    ),
  },
  {
    id: 'compliance-3',
    title: 'Maschinensicherheit & Schutzkonzepte',
    content: (
      <div className="space-y-4">
        <p>
          Technische Zugangskontrolle ist Teil eines Schutzkonzepts (TRBS 1111). Für Verriegelungen
          gelten Normen wie ISO 14119.
        </p>
        <p>
          Das System unterstützt diese Konzepte durch flexible Sperrlogiken und
          qualifikationsbasierte Freigaben.
        </p>
      </div>
    ),
  },
];

const foerderungItems = [
  {
    href: 'https://www.bmwk.de/',
    src: '/logos/bmwk.svg',
    alt: 'Bundesministerium für Wirtschaft und Klimaschutz',
  },
  {
    href: 'https://www.esf.de/portal/DE/ESF-Plus-2021-2027/Liste-der-Vorhaben/inhalt.html',
    src: '/logos/eu_esf.svg',
    alt: 'Europäische Union – Europäischer Sozialfonds Plus (ESF Plus)',
  },
  {
    href: 'https://www.exist.de/',
    src: '/logos/exist.svg',
    alt: 'EXIST – Existenzgründungen aus der Wissenschaft',
  },
];

const foerderungDescription = (
  <>
    Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und Klimaschutz
    über den Europäischen Sozialfonds Plus (ESF Plus) das Programm{' '}
    <em>Existenzgründungen aus der Wissenschaft (EXIST)</em> in Deutschland.
  </>
);

export default function HomePage() {
  const executeRecaptcha = useRecaptcha();

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Zum Inhalt springen
      </a>
      <section id="home">
        <HeroSection
          title="Wer darf was wann nutzen?"
          overline="Digitale Zutritts- und Maschinenfreigabe"
          description={heroDescription}
          buttonText="Konfigurator starten"
          buttonHref="/configurator"
          secondaryButtonText="Whitepaper"
          secondaryButtonHref="/#whitepaper"
          imageSrc="/_A7_9094_quer.jpg"
          imageAlt="mardu.space-System in einer Werkstatt"
          variant="landing"
          mediaCards={[
            {
              href: '/#produkte',
              scrollTargetId: 'produkte',
              imageSrc: '/_A7_9094_quer.jpg',
              imageAlt: 'mardu.space-System in einer Werkstatt',
              ariaLabel: 'Zu den Produktlösungen mardu.space scrollen',
              description:
                'Digitale Zutritts- und Maschinenfreigabe für Werkstätten, Labore und Makerspaces.',
              priority: true,
            },
          ]}
        />
      </section>

      <section id="loesung" className="section-hairline">
        <SplitContent
          title="Zutritt, Maschinenfreigabe und Qualifikation in einem System"
          eyebrow="Die Mardu-Lösung"
          description={summaryDescription}
          sideTitle="Vorteile für Betreiber"
          sideIcon={CheckCircle}
          items={summaryItems}
          variant="plain"
        />
      </section>

      <section id="argumente" className="section-hairline">
        <CardGrid
          eyebrow="Einsatzfelder"
          title="Wo mardu.space besonders hilft"
          itemMetaLabel="Fokus"
          variant="muted"
          items={cardGridItems}
        />
      </section>

      <section className="section-hairline">
        <ConfiguratorTeaser/>
      </section>

      <section id="produkte" className="section-hairline">
        <ScenarioShowcase
          eyebrow="Angebote"
          heading="Einsatzszenarien"
          subheading="Sichern Sie Türen, Tore und Maschinen, von Schuko-Geräten bis zu Drehstrom-Maschinen, regelbasiert und nachvollziehbar."
          features={scenarioFeatures}
          scenarios={scenarioScenarios}
        />
      </section>

      <section id="whitepaper" className="section-hairline">
        <WhitepaperTeaser />
      </section>

      <section className="section-hairline">
        <InfoGrid
          eyebrow="System"
          title="Spezifikation & Funktionsumfang"
          intro="Die Plattform verbindet Identität, Freigabe, Protokollierung und technische Durchsetzung in einem zusammenhängenden System statt in isolierten Einzelbausteinen."
          variant="cards"
          items={infoGridItems}
        />
      </section>

      <section className="section-hairline">
        <ProcessSteps
          eyebrow="Projektablauf"
          title="Von der Anforderung bis zum Rollout"
          steps={processSteps}
          variant="plain"
        />
      </section>

      <section className="section-hairline">
        <SecurityAccordion
          eyebrow="Sicherheit"
          title="Sicherheit, Datenschutz & Normen"
          items={securityItems}
        />
      </section>

      <CTASection
        title="Nächster Schritt: Bedarf strukturieren, dann sauber entscheiden."
        description="Starten Sie mit dem Konfigurator für eine erste Einordnung. Wenn Sie intern vertiefen oder weitergeben müssen, nutzen Sie ergänzend das Whitepaper."
        primaryButtonText="Konfigurator starten"
        primaryButtonHref="/configurator"
        secondaryButtonText="Whitepaper ansehen"
        secondaryButtonHref="/#whitepaper"
        newsletterDialog={{ getRequestToken: executeRecaptcha }}
      />

      <Foerderung
        items={foerderungItems}
        description={foerderungDescription}
        spacing="compact"
      />
    </main>
  );
}
