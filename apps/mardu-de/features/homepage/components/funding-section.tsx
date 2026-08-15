import Image from 'next/image';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import NewsletterSignupForm from '@/components/utilities/newsletter-signup-form';
import { fundingProof } from '../homepage-content';

export function FundingSection() {
  return (
    <section
      id="foerderung"
      aria-labelledby="funding-title"
      className="scroll-mt-24 border-t border-border bg-background py-16 md:py-20 xl:py-24"
    >
      <div className="mardu-container">
        <ScrollReveal
          className="grid gap-12 xl:grid-cols-[0.17fr_0.42fr_0.41fr] xl:items-center xl:gap-10"
          distance={28}
        >
          <h2
            id="funding-title"
            className="text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground"
          >
            [{fundingProof.label}]
          </h2>

          <ul
            className="grid grid-cols-3 items-center gap-6 sm:gap-10"
            aria-label="Förderprogramme"
          >
            {fundingProof.logos.map((logo) => (
              <li key={logo.src} className="flex min-w-0 items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(max-width: 639px) 28vw, 180px"
                  className="h-auto max-h-20 w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>

          <p className="max-w-[46rem] text-base leading-relaxed text-muted-foreground">
            {fundingProof.description}
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-18"
          distance={28}
        >
          <div>
            <p className="text-xs font-normal uppercase tracking-[0.18em] text-mardu-purple">
              [Newsletter]
            </p>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,4vw,3.75rem)] font-light leading-[1] tracking-[-0.035em] text-foreground">
              Nichts von Mardu verpassen.
            </h2>
            <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-muted-foreground">
              Erhalte ausgewählte Einblicke in Pilotprojekte, Produktneuheiten und sichere
              Zugangsprozesse. Vorname und E-Mail genügen.
            </p>
          </div>

          <div className="min-w-0 lg:pt-1">
            <NewsletterSignupForm variant="compact" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
