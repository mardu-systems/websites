import Image from 'next/image';
import { Faq, SectionIntro } from '@mardu/sections';
import { faqItems, rolloutSteps } from '../homepage-content';

export function RolloutFaqSection() {
  const renderedFaqItems = faqItems.map((item) => ({
    question: item.question,
    answer: <p>{item.answer}</p>,
  }));

  return (
    <>
      <section id="einfuehrung" className="scroll-mt-24 border-b border-border py-16 md:py-24">
        <div className="mardu-container">
          <SectionIntro
            eyebrow="[07] Schrittweise einführen"
            title={
              <>
                Klein beginnen.{' '}
                <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                  Im Betrieb prüfen.
                </em>{' '}
                Bewusst erweitern.
              </>
            }
            intro={
              <p>
                Der erste Schritt ist kein anonymer Rollout über den ganzen Standort.{' '}
                <strong className="font-medium text-foreground/82">
                  Gemeinsam grenzen wir einen repräsentativen Zugangspunkt, die beteiligten Rollen
                  und ein überprüfbares Pilotziel ein.
                </strong>
              </p>
            }
            layout="stacked"
            className="mb-12 lg:mb-14"
            titleClassName="mardu-homepage-section-title max-w-[18ch]"
            introClassName="text-base"
            eyebrowClassName="text-xs text-mardu-purple"
          />

          <div className="grid gap-4 lg:grid-cols-[0.56fr_0.44fr]">
            <ol className="grid border-y border-border sm:grid-cols-2">
              {rolloutSteps.map((step) => (
                <li
                  key={step.index}
                  className="flex min-h-60 flex-col border-b border-border py-7 sm:px-7 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span className="text-xs text-mardu-purple">[{step.index}]</span>
                  <h3 className="mt-8 text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-auto pt-8 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <figure className="relative min-h-[30rem] overflow-hidden bg-neutral-200">
              <Image
                src="/landing/industrial-site-aerial.webp"
                alt="Luftaufnahme eines Industriestandorts mit vielen technischen Bereichen und Zugangspunkten"
                fill
                sizes="(max-width: 1023px) 100vw, 44vw"
                className="object-cover object-center"
              />
              <figcaption className="absolute bottom-3 right-3 bg-black/55 px-2.5 py-1.5 text-xs leading-none text-white/78 backdrop-blur-sm">
                Foto: CHUTTERSNAP · Unsplash
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section
        className="border-b border-border bg-card py-16 md:py-24"
        aria-labelledby="faq-title"
      >
        <div className="mardu-container grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:gap-18">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs tracking-[0.08em] text-mardu-purple">FAQ</p>
            <h2 id="faq-title" className="mardu-homepage-section-title mt-6 max-w-[17ch]">
              Fragen vor dem{' '}
              <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                ersten Standortgespräch.
              </em>
            </h2>
          </div>
          <Faq
            items={renderedFaqItems}
            variant="lined"
            className="[&_button]:min-h-12 [&_button]:text-left [&_button]:!text-[1.375rem] [&_button]:font-light [&_button]:leading-tight [&_button]:tracking-[-0.015em]"
          />
        </div>
      </section>
    </>
  );
}
