import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { EditorialActionButton } from '@mardu/ui/components/editorial-action-button';
import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import { EditorialAccent } from '@mardu/ui/components/typography';
import aboutContent from './about-content.md';
import lucaPhoto from '@/public/people/luca_schoeneberg.jpg';
import erikPhoto from '@/public/people/erik_frey.jpg';
import melvinPhoto from '@/media/Melvin.webp';

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  biography: string;
  image: StaticImageData;
  imagePosition?: string;
}

const team: ReadonlyArray<TeamMember> = [
  {
    name: 'Luca Schöneberg',
    role: 'Geschäftsführung',
    focus: 'Software, Backend und Systemintegration',
    biography:
      'Luca verantwortet die Plattform, Benutzer- und Rechteverwaltung sowie die Verbindung der einzelnen Systembausteine. Als Medieninformatiker und Fachinformatiker verbindet er Softwareentwicklung mit praktischer IT-Infrastruktur.',
    image: lucaPhoto,
    imagePosition: '50% 34%',
  },
  {
    name: 'Erik Frey',
    role: 'Geschäftsführung',
    focus: 'Elektronik, Embedded Systems und Gerätearchitektur',
    biography:
      'Erik entwickelt die Elektronik, Embedded Software und Funkkommunikation der Mardu-Geräte. Sein Hintergrund in Elektrotechnik und Informationstechnik verbindet Produktentwicklung mit dem zuverlässigen Betrieb vor Ort.',
    image: erikPhoto,
  },
  {
    name: 'Melvin Valerius',
    role: 'Kaufmännische Leitung',
    focus: 'Finanzplanung, Angebotslogik und Vertrieb',
    biography:
      'Melvin übersetzt die technische Lösung in belastbare Angebote und Geschäftsmodelle. Mit seiner kaufmännischen Ausbildung und seinem volkswirtschaftlichen Hintergrund verantwortet er Planung, Controlling und Marktansprache.',
    image: melvinPhoto,
    imagePosition: '50% 28%',
  },
];

const title = 'Über uns';
const description =
  'Lerne die Geschichte und das Team hinter Mardu kennen – von der ersten Lösung im Makerspace bis zum System für professionelle Werkstätten, Hochschulen und Labore.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Über uns | Mardu',
    description,
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/_A7_9072_quer.webp',
        width: 1200,
        height: 630,
        alt: 'Mardu-System an einer Bestandsmaschine',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über uns | Mardu',
    description,
    images: ['/_A7_9072_quer.webp'],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <EditorialPageHero
        eyebrow="[04 / ÜBER MARDU]"
        title={
          <>
            Aus der Werkstatt gedacht. <EditorialAccent>Für den Betrieb gebaut.</EditorialAccent>
          </>
        }
        description="Wir verbinden Software, Elektronik und Betreiberwissen zu einem System, das Menschen nur dort Zugang gibt, wo Berechtigungen und Qualifikationen stimmen."
      />

      <section className="border-y border-border py-16 md:py-24">
        <div className="mardu-container grid gap-10 lg:grid-cols-[minmax(10rem,0.3fr)_minmax(0,0.7fr)] lg:gap-20">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
              [01 / UNSERE GESCHICHTE]
            </p>
          </div>
          <div className="typeset typeset-docs max-w-3xl">
            <ReactMarkdown>{aboutContent}</ReactMarkdown>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="team-heading">
        <div className="mardu-container">
          <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[0.3fr_0.7fr] md:items-end md:gap-16">
            <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">[02 / TEAM]</p>
            <div>
              <h2
                id="team-heading"
                className="max-w-[15ch] text-[clamp(2.35rem,5vw,4.75rem)] font-light leading-[0.94] tracking-[-0.04em]"
              >
                Gemeinsam bauen wir <EditorialAccent>Mardu.</EditorialAccent>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3">
            {team.map((member, index) => (
              <article
                key={member.name}
                className="border-b border-border py-8 md:border-r md:px-6 md:py-10 md:last:border-r-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={`Porträt von ${member.name}`}
                    fill
                    sizes="(min-width: 768px) 33vw, calc(100vw - 40px)"
                    className="object-cover grayscale-[0.15]"
                    style={{ objectPosition: member.imagePosition ?? '50% 50%' }}
                  />
                </div>
                <div className="pt-6">
                  <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">
                    [{String(index + 1).padStart(2, '0')}]
                  </p>
                  <h3 className="mt-4 text-2xl font-normal tracking-[-0.025em]">{member.name}</h3>
                  <p className="mt-2 text-sm text-mardu-purple">{member.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {member.focus}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                    {member.biography}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mardu-container grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-primary-foreground/65">
              [GEMEINSAM WEITERDENKEN]
            </p>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2.2rem,4.5vw,4.25rem)] font-light leading-[0.96] tracking-[-0.04em]">
              Du möchtest wissen, wie Mardu zu deinem Standort passt?
            </h2>
          </div>
          <EditorialActionButton render={<Link href="/contact" />} tone="dark">
            Gespräch vereinbaren
          </EditorialActionButton>
        </div>
      </section>
    </main>
  );
}
