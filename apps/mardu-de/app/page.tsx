import { IntegrationsPreview } from '@/components/integrations/integrations-preview';
import CTASectionWithRecaptcha from '@/components/utilities/cta-section-with-recaptcha';
import { MeetergoCTAButton } from '@/components/utilities/meetergo-cta-button';
import NewsletterButton from '@/components/utilities/newsletter-button';
import {
  DualImageSection,
  EditorialBenefitsSection,
  FeatureSection,
  Foerderung,
  HeroSection,
  ProcessSteps,
  TripleImageSection,
} from '@mardu/sections';
/* ===================== Seite ===================== */

export default async function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center md:justify-start">
      {/* Hero Header Section */}
      <section id="home">
        <HeroSection
          title="Digitale Zutrittssteuerung und Maschinenfreigabe für sicherheitsrelevante Umgebungen."
          overline="Für Werkstatt, Industrie und Baustelle"
          description={
            <>
              <p className="mb-4">
                Mardu reduziert Verwaltungsaufwand bei Zutritt und Maschinennutzung, schafft mehr
                Übersicht im Betrieb und lässt sich in bestehende Systeme integrieren.
              </p>
              <p>
                Mit IP500-Funksystem, digitaler Verwaltung und klaren Zugangsregeln organisieren Sie
                Türen, Tore und Maschinen deutlich einfacher als mit Schlüsseln, Listen und
                isolierten Einzellösungen.
              </p>
            </>
          }
          buttonText="Mehr über mardu.space"
          buttonHref="https://mardu.space"
          secondaryButtonText="Mehr über mardu.construction"
          secondaryButtonHref="/#produkte"
          imageSrc="/_A7_9072_quer.webp"
          imageAlt="Zugriffskontrollsysteme im Makerspace"
          variant="landing"
          mediaCards={[
            {
              href: 'https://mardu.space',
              imageSrc: '/_A7_9094_quer.jpg',
              imageAlt: 'Maschinenfreischaltung an einer Drehbank mit mardu.space',
              ariaLabel: 'Zu mardu.space wechseln',
              badge: 'mardu.space',
              description:
                'Für Industrie, Werkstätten, Labore, Makerspaces, FabLabs und Hochschulen.',
              priority: true,
            },
            {
              href: '/#produkte',
              scrollTargetId: 'produkte',
              imageSrc: '/mardu-constructions.webp',
              imageAlt: 'Freischaltung einer Bautür mit mardu.construction',
              ariaLabel: 'Zu den Produktlösungen mardu.construction scrollen',
              badge: 'mardu.construction',
              badgePosition: 'bottom-right',
              description: 'Für Baustellenzugang, Tore und temporäre Sicherheitsbereiche.',
            },
          ]}
        />
      </section>

      <section id="produkte">
        <DualImageSection
          cards={[
            {
              imageSrc: '/mardu-space.webp',
              imageAlt: 'mardu.space in Werkstatt und Labor',
              title: 'mardu.space',
              description: (
                <>
                  <p>
                    Für Industrie, Werkstätten, Labore, Makerspaces, FabLabs und Hochschulen, in
                    denen Zutritt, Qualifikation und Maschinennutzung zuverlässig zusammenlaufen
                    müssen.
                  </p>
                  <p className="mt-4">
                    mardu.space organisiert Maschinenfreigabe, Zutritt und Verwaltung in einer
                    benutzerfreundlichen Lösung für den laufenden Betrieb.
                  </p>
                </>
              ),
              buttonText: 'Mehr erfahren',
              buttonHref: 'https://mardu.space',
            },
            {
              imageSrc: '/mardu-constructions.webp',
              imageAlt: 'mardu.construction für Baustellentüren und Tore',
              title: 'mardu.construction (Early Access)',
              description: (
                <>
                  <p>
                    Für Baustellenkoordination und Betreiber temporärer Flächen, die Zugriffe auf
                    Tore, Türen und sensible Bereiche sauber organisieren wollen.
                  </p>
                  <p className="mt-4">
                    mardu.construction befindet sich im Early Access und wird gemeinsam mit ersten
                    Anwendern an reale Baustellenprozesse angepasst.
                  </p>
                </>
              ),
              buttonText: 'Early Access anfragen',
              buttonHref: '/contact',
            },
          ]}
        />
      </section>

      <section id="loesung">
        <FeatureSection
          className="mb-10"
          title="Zutritt und Nutzung einfacher organisieren"
          description={
            <>
              <p>
                Mardu ersetzt manuelle Freigaben, Schlüsselorganisation und unübersichtliche
                Einzelprozesse durch ein digitales System für Türen, Tore und Maschinen.
              </p>
              <p className="mt-4">
                Der Vorteil liegt nicht in abstrakter Technologie, sondern im Alltag: weniger
                Abstimmung, weniger Listenpflege, mehr Übersicht und eine Verwaltung, die sich
                sauber in bestehende Infrastruktur einfügt.
              </p>
              <p className="mt-4">
                So behalten Betreiber den Überblick über Zugänge, Berechtigungen und Nutzung, ohne
                zusätzliche Komplexität in den Betrieb zu holen.
              </p>
              <p className="mt-4">
                Die technische Basis mit IP500-Funk und der Anbindung an bestehende Systeme sorgt
                dafür, dass digitale Organisation nicht an der Praxis vorbeigeht.
              </p>
            </>
          }
          imageSrc="/Mardu-System.webp"
          imageAlt="Mardu System"
          buttonText="Mehr erfahren"
          buttonHref="/contact"
        />
      </section>

      <IntegrationsPreview />

      <section id="argumente">
        <EditorialBenefitsSection
          className="mt-12"
          eyebrow="Vorteile"
          title={<span>Drei Vorteile, die im Alltag wirklich zählen</span>}
          intro={
            <>
              Mardu unterstützt Betreiber dabei, Zutritt und Nutzung einfacher zu organisieren,
              Abläufe übersichtlicher zu steuern und bestehende Systeme sinnvoll einzubinden.
            </>
          }
          items={[
            {
              id: 'sicherheit',
              badge: 'Verwaltung',
              title: 'Weniger Schlüssel, Listen und Abstimmung',
              description: (
                <>
                  Rechte, Zugänge und Nutzung lassen sich zentral organisieren, statt im Alltag über
                  Schlüssel, Excel-Listen und einzelne Rückfragen zusammengehalten zu werden.
                </>
              ),
              shape: {
                silhouette: 'shield',
                glyph: 'chevron',
                tone: 'mixed',
                density: 'default',
                anchor: 'top-left',
                fade: 'diagonal',
              },
            },
            {
              id: 'regeln',
              badge: 'Übersicht',
              title: 'Mehr Kontrolle ohne komplizierte Prozesse',
              description: (
                <>
                  Betreiber sehen klarer, wer worauf Zugriff hat, welche Bereiche abgesichert sind
                  und wie Zugänge und Nutzung im Alltag organisiert werden.
                </>
              ),
              shape: {
                silhouette: 'sliders',
                glyph: 'bar',
                tone: 'sky',
                density: 'default',
                anchor: 'top-center',
                fade: 'none',
              },
            },
            {
              id: 'verwaltung',
              badge: 'Integration',
              title: 'Passt in bestehende Systeme und reale Abläufe',
              description: (
                <>
                  Mit IP500-Funksystem und Anbindung an vorhandene Infrastruktur wird digitale
                  Zutrittsorganisation zu einer praktikablen Lösung statt zu einem zusätzlichen
                  Sonderprozess.
                </>
              ),
              shape: {
                silhouette: 'bridge',
                glyph: 'bar',
                tone: 'emerald',
                density: 'default',
                anchor: 'top-right',
                fade: 'none',
              },
            },
          ]}
        />
      </section>

      <section id="vorgehen" className="section-hairline">
        <ProcessSteps
          eyebrow="So läuft es ab"
          title="Von der Anfrage zur passenden Lösung"
          variant="plain"
          steps={[
            {
              title: 'Anwendungsfall verstehen',
              description:
                'Zu Beginn klären wir, welche Bereiche, Türen, Tore oder Maschinen organisiert werden sollen und welche Abläufe im Betrieb heute Zeit kosten.',
            },
            {
              title: 'System und Schnittstellen prüfen',
              description:
                'Danach prüfen wir die relevanten Zugangspunkte, die vorhandene Infrastruktur und wie sich Mardu sinnvoll in bestehende Systeme integrieren lässt.',
            },
            {
              title: 'Lösung und Einstieg festlegen',
              description:
                'Anschließend definieren wir den passenden Einstieg, von der Demo bis zum Pilot oder Early-Access-Setup.',
            },
          ]}
        />
      </section>

      <section id="team">
        <TripleImageSection
          cards={[
            {
              imageSrc: '/people/luca_schoeneberg.jpg',
              imageAlt: 'Luca Schöneberg',
              title: 'Luca Schöneberg',
              subtitle: '(Co-Founder)',
              linkedinUrl: 'https://www.linkedin.com/in/luca-sch%C3%B6neberg-150348186',
              email: 'luca.schoeneberg@mardu.de',
              description: (
                <>
                  <p>
                    B.Sc. Medieninformatik (Hochschule Osnabrück) und ausgebildeter Fachinformatiker
                    für Systemintegration. Verantwortlich für Web-, App- und Backend-Entwicklung
                    sowie Nutzer- und Rechteverwaltung.
                  </p>
                </>
              ),
            },
            {
              imageSrc: '/people/erik_frey.jpg',
              imageAlt: 'Erik Frey',
              title: 'Erik Frey',
              subtitle: '(Co-Founder)',
              linkedinUrl: 'https://www.linkedin.com/in/erik-frey-660236346',
              email: 'erik.frey@mardu.de',
              description: (
                <>
                  <p>
                    B.Sc. Elektrotechnik und Informationstechnik (Karlsruher Institut für
                    Technologie, KIT). Verantwortlich für Embedded Software und
                    Hardware-Entwicklung.
                  </p>
                </>
              ),
            },
            {
              imageSrc: '/people/melvin_valerius.jpg',
              imageAlt: 'Melvin Valerius',
              title: 'Melvin Valerius',
              subtitle: '(kauf. Leiter)',
              email: 'melvin.valerius@mardu.de',
              description: (
                <>
                  <p>
                    Studium Volkswirtschaftslehre (Universität Münster) und Ausbildung zum
                    Industriekaufmann. Zuständig für Finanzen, Buchhaltung und Controlling.
                  </p>
                </>
              ),
            },
          ]}
        />
      </section>

      <section id="contact">
        <CTASectionWithRecaptcha
          title="Mehr über Mardu erfahren"
          description="Erfahren Sie, wie Mardu Zutritt, Maschinenfreigabe und Verwaltung in Werkstatt, Industrie oder Baustelle einfacher organisiert. Für Updates und Einblicke können Sie den Newsletter abonnieren oder direkt eine Demo vereinbaren."
          primaryButtonText="Newsletter abonnieren"
          primaryActionSlot={<NewsletterButton primaryButtonText="Newsletter abonnieren" />}
          secondaryActionSlot={
            <MeetergoCTAButton className="mt-0 ml-0 h-11 rounded-none border border-white/35 bg-white/12 px-5 text-sm uppercase tracking-[0.08em] text-white hover:bg-white/18 sm:mt-0 sm:ml-0">
              Demo vereinbaren
            </MeetergoCTAButton>
          }
        />
      </section>

      <section id="foerderung">
        <Foerderung
          items={[
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
          ]}
          description={
            <>
              Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und
              Klimaschutz über den Europäischen Sozialfonds Plus (ESF Plus) das Programm{' '}
              <em>Existenzgründungen aus der Wissenschaft (EXIST)</em> in Deutschland.
            </>
          }
        />
      </section>
    </main>
  );
}
