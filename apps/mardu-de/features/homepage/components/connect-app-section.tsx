import Image from 'next/image';
import Link from 'next/link';
import { SectionIntro } from '@mardu/sections';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { EditorialAccent } from '@mardu/ui/components/typography';

const appLinks = [
  {
    href: 'https://apps.apple.com/de/app/mardu-connect/id6771269028',
    badgeSrc: '/connect-app/download-on-the-app-store-de.svg',
    badgeAlt: 'Mardu Connect im App Store laden',
    badgeWidth: 120,
  },
  {
    href: 'https://play.google.com/store/apps/details?id=de.mardu.connect&hl=de',
    badgeSrc: '/connect-app/get-it-on-google-play-de.svg',
    badgeAlt: 'Mardu Connect bei Google Play laden',
    badgeWidth: 135,
  },
] as const;

const appScreens = [
  {
    src: '/connect-app/scan-qr.webp',
    alt: 'Mardu Connect mit QR-Code-Scan für einen vorbereiteten Auftrag',
  },
  {
    src: '/connect-app/nfc-ready.webp',
    alt: 'Mardu Connect bereit zum Beschreiben eines Zugangs-Tags',
  },
  {
    src: '/connect-app/tag-programming.webp',
    alt: 'Mardu Connect beim Programmieren eines Zugangs-Tags',
  },
] as const;

export function ConnectAppSection() {
  return (
    <section
      id="connect-app"
      aria-label="Mardu Connect App"
      className="scroll-mt-20 border-b border-border bg-card py-16 md:py-20"
    >
      <div className="mardu-container">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:gap-16">
          <div>
            <ScrollReveal distance={30}>
              <div className="mb-7 flex items-center gap-4">
                <Image
                  src="/connect-app/app-icon.webp"
                  alt="App-Symbol von Mardu Connect"
                  width={64}
                  height={64}
                  className="size-14 rounded-[30%] object-cover"
                />
                <div>
                  <p className="text-sm font-medium">Mardu Connect</p>
                  <p className="mt-1 text-xs text-muted-foreground">Für iOS und Android</p>
                </div>
              </div>

              <SectionIntro
                eyebrow="Mardu Connect App"
                title={
                  <>
                    Ohne extra Hardware. <EditorialAccent>Zugangs-Tag beschreiben.</EditorialAccent>
                  </>
                }
                intro={<p>Person auswählen, QR-Code scannen, Zugangs-Tag beschreiben. Fertig.</p>}
                layout="stacked"
                titleClassName="mardu-homepage-section-title max-w-[15ch]"
                introClassName="text-base"
                eyebrowClassName="text-xs text-mardu-purple"
              />
            </ScrollReveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {appLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-sm transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mardu-purple focus-visible:ring-offset-2"
                >
                  <Image
                    src={link.badgeSrc}
                    alt={link.badgeAlt}
                    width={link.badgeWidth}
                    height={40}
                    className="h-10"
                  />
                </Link>
              ))}
            </div>
          </div>

          <ScrollReveal distance={34} delay={0.08}>
            <div className="overflow-hidden bg-foreground p-5 text-background sm:p-7 lg:p-8">
              <div className="flex items-center justify-between border-b border-background/15 pb-5">
                <span className="text-xs tracking-[0.08em] text-background/55">APP-ABLAUF</span>
                <span className="text-xs text-background/55">QR → NFC → Prüfen</span>
              </div>
              <div className="mt-7 grid grid-cols-3 items-end gap-3 sm:gap-5">
                {appScreens.map((screen, index) => (
                  <figure key={screen.src} className={index === 1 ? 'translate-y-4' : undefined}>
                    <div className="overflow-hidden rounded-[1.4rem] border border-background/15 bg-white p-1.5 shadow-2xl sm:rounded-[2rem] sm:p-2">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={136}
                        height={296}
                        sizes="(max-width: 1023px) 28vw, 12vw"
                        className="h-auto w-full rounded-[1.1rem] sm:rounded-[1.6rem]"
                      />
                    </div>
                    <figcaption className="mt-4 text-center text-xs text-background/50">
                      [0{index + 1}]
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
