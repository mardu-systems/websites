import { EditorialFaqSection, SectionIntro } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { faqItems, rolloutSteps } from '../homepage-content';

export function RolloutFaqSection() {
  const renderedFaqItems = faqItems.map((item) => ({
    question: item.question,
    answer: <p>{item.answer}</p>,
  }));

  return (
    <>
      <section id="einfuehrung" className="scroll-mt-24 border-b border-border py-16 md:py-20">
        <div className="mardu-container">
          <ScrollReveal distance={32}>
            <SectionIntro
              eyebrow="[06] Schrittweise einführen"
              title={
                <>
                  Klein starten. <EditorialAccent>Im Betrieb lernen.</EditorialAccent> Gezielt
                  skalieren.
                </>
              }
              intro={
                <p>
                  Wir starten mit einem klar abgegrenzten Pilot: ein Zugangspunkt, die richtigen
                  Rollen und ein überprüfbares Ziel.
                </p>
              }
              layout="stacked"
              className="mb-12 lg:mb-14"
              titleClassName="mardu-homepage-section-title max-w-[18ch]"
              introClassName="text-base"
              eyebrowClassName="text-xs text-mardu-purple"
            />
          </ScrollReveal>

          <ScrollReveal distance={30}>
            <ol className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
              {rolloutSteps.map((step) => (
                <li
                  key={step.index}
                  className="border-b border-border py-7 last:border-b-0 sm:px-7 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <span className="text-xs text-mardu-purple">[{step.index}]</span>
                  <h3 className="mt-6 text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <EditorialFaqSection
        className="md:py-20"
        eyebrow="FAQ"
        titleId="faq-title"
        title={
          <>
            Die wichtigsten Fragen. <EditorialAccent>Kurz beantwortet.</EditorialAccent>
          </>
        }
        items={renderedFaqItems}
      />
    </>
  );
}
