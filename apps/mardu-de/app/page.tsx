import { IntegrationsPreview } from '@/components/integrations/integrations-preview';
import CTASectionWithRecaptcha from '@/components/utilities/cta-section-with-recaptcha';
import { MeetergoCTAButton } from '@/components/utilities/meetergo-cta-button';
import {
  DualImageSection,
  FeatureSection,
  Foerderung,
  HeroSection,
  ThreeArguments,
  TripleImageSection,
} from '@mardu/sections';
import { FileSearchCorner, HeartHandshake, Milestone } from 'lucide-react';

/* ===================== Seite ===================== */

export default async function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center md:justify-start">
      {/* Hero Header Section */}
      <section id="home">
        <HeroSection
          title="Zutrittskontrolle & Maschinenfreigabe für Werkstätten, Labore & Baustellen."
          overline="Engineering Access Platform"
          description={
            <>
              <p className="mb-4">
                Verwalte Zutritt und Maschinennutzung – mobil auf der Baustelle oder stationär in
                der Werkstatt.
                <br />
                Mardu passt sich an deine Bedürfnisse an.
              </p>
            </>
          }
          buttonText="Lösungen für Werkstätten"
          buttonHref="https://mardu.space"
          secondaryButtonText="Lösungen für Baustellen"
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
              description: 'Maschinenzugang per NFC in Werkstatt und Labor.',
              priority: true,
            },
            {
              href: '/#produkte',
              scrollTargetId: 'produkte',
              imageSrc: '/mardu-constructions.webp',
              imageAlt: 'Freischaltung einer Bautür mit mardu.construction',
              ariaLabel: 'Zu den Produktlösungen mardu.construction scrollen',
              badge: 'mardu.construction',
              description: 'Digitale Zutrittskontrolle für Baustellentüren und Tore.',
            },
          ]}
        />
      </section>

      <section id="loesung">
        <FeatureSection
          className="mb-10"
          title="Die Mardu-Lösung"
          description={
            <>
              <p>
                Mardu ist eine flexible, funkbasierte Lösung für Zugriffs- und Zutrittskontrolle.
                Alle Endgeräte sind per Funk vernetzt und dank Dual-Band-Mesh-Technologie
                ausfallsicher. Mardu kann zentral verwaltet oder vollständig lokal betrieben werden
                und deckt so verschiedenste Einsatzszenarien ab – von permanenter Installation bis
                temporärem Setup.
              </p>
              <p className="mt-4">
                Ideal für Innen- und Außenbereiche sowie temporäre Setups. Damit sichern Sie Türen,
                Tore, Drehkreuze, Maschinenzugänge und weitere kritische Bereiche.
              </p>
              <p className="mt-4">
                Alle Vorgänge werden nachvollziehbar und DSGVO-konform protokolliert. Das reduziert
                Verwaltungsaufwand und schafft belastbare Nachweise.
              </p>

              <p className="mt-4">
                Egal ob Standardprodukt oder Speziallösung: Wir begleiten Konzeption, Umsetzung und
                Betrieb.
              </p>
            </>
          }
          imageSrc="/Mardu-System.webp"
          imageAlt="Mardu System"
          buttonText="Kontaktiere uns"
          buttonHref="/contact"
        />
      </section>

      <IntegrationsPreview />

      <section id="produkte">
        <DualImageSection
          cards={[
            {
              imageSrc: '/mardu-space.webp',
              imageAlt: 'Zugriffskontrolle',
              title: 'mardu.space',
              description: (
                <>
                  <p>
                    Werkstätten, Produktionshallen und Labore sind Orte der täglichen Arbeit und
                    gleichzeitig sensible Sicherheitsbereiche.
                  </p>
                  <p className="mt-4">
                    Mit mardu.space stellt das Mardu-System sicher, dass nur berechtigte Personen
                    Maschinen nutzen können. Das System wird in Makerspaces, Schülerlaboren und
                    Universitäten eingesetzt, aber auch in produzierenden Betrieben und Werkstätten
                    mit vielen hundert Geräten.
                  </p>
                </>
              ),
              buttonText: 'Mehr erfahren',
              buttonHref: 'https://mardu.space',
            },
            {
              imageSrc: '/mardu-constructions.webp',
              imageAlt: 'Maschinenfreigabe',
              title: 'mardu.construction (Early Access)',
              description: (
                <>
                  <p>
                    mardu.construction steht für digitale, flexible und skalierbare
                    Zutrittskontrollen auf Baustellen. So erhalten Sie Übersicht über Bereiche,
                    Lieferanten, Subunternehmer und Mitarbeitende.
                  </p>
                  <p className="mt-4">
                    mardu.construction befindet sich aktuell im Early-Access-Projektstadium.
                    Funktionen werden gemeinsam mit ersten Anwendern erprobt, weiterentwickelt und
                    gezielt an reale Baustellenanforderungen angepasst.
                  </p>
                </>
              ),
            },
          ]}
        />
      </section>

      <section id="argumente">
        <ThreeArguments
          className="mt-12"
          title={<span>Drei Vorteile beim Einsatz von Mardu</span>}
          items={[
            {
              title: 'Mehr Sicherheit & Nachvollziehbarkeit',
              description: (
                <>
                  Unbefugte Zugriffe werden zuverlässig verhindert. Jeder Zutritt oder jede
                  Benutzung einer Maschine ist personen- und zeitbezogen geregelt und lückenlos
                  dokumentiert.
                </>
              ),
              icon: <HeartHandshake className="text-[#351B59]" size="72" />,
            },
            {
              title: 'Klare Regeln & weniger Aufwand',
              description: (
                <>
                  Berechtigungen lassen sich flexibel von überall vergeben, ändern oder entziehen.
                  Ganz ohne Schlüssel, Schlössertausch oder manuelle Listen.
                </>
              ),
              icon: <Milestone className="text-[#351B59]" size="72" />,
            },
            {
              title: 'Lokal und Zentral verwaltbar',
              description: (
                <>
                  Alle Berechtigungen werden vor Ort zentral gespeichert und verwaltet. Gleichzeitig
                  kann alles über Fernzugriff verwaltet werden. Hierdurch kann höchste
                  Ausfallsicherheit bei gleichzeitiger Flexibilität gewährleistet werden.
                </>
              ),
              icon: <FileSearchCorner className="text-[#351B59]" size="72" />,
            },
          ]}
        />
      </section>

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
                  für Systemintegration. Verantwortlich für Web-, App- und Backend-Entwicklung sowie
                  Nutzer- und Rechteverwaltung.
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
                  B.Sc. Elektrotechnik und Informationstechnik (Karlsruher Institut für Technologie,
                  KIT). Verantwortlich für Embedded Software und Hardware-Entwicklung.
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

      <section id="contact">
        <CTASectionWithRecaptcha
          title="Sicherheit, Transparenz und Kontrolle – zentral gesteuert"
          description="Sprechen Sie uns an. Gemeinsam entwickeln wir eine Lösung, die zu Ihren Prozessen, Flächen und Sicherheitsanforderungen passt."
          primaryButtonText="Jetzt für unseren Newsletter anmelden"
          secondaryActionSlot={
            <MeetergoCTAButton className="mt-0 ml-0 h-11 rounded-none border border-white/35 bg-white/12 px-5 text-sm uppercase tracking-[0.08em] text-white hover:bg-white/18 sm:mt-0 sm:ml-0">
              Beratung Vereinbaren
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
