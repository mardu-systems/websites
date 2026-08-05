import Image from 'next/image';
import { fundingProof } from '../homepage-content';

export function FundingSection() {
  return (
    <section
      id="foerderung"
      aria-labelledby="funding-title"
      className="scroll-mt-24 border-t border-border bg-background py-16 md:py-20 xl:py-24"
    >
      <div className="mardu-container grid gap-12 xl:grid-cols-[0.17fr_0.42fr_0.41fr] xl:items-center xl:gap-10">
        <h2
          id="funding-title"
          className="text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground"
        >
          [{fundingProof.label}]
        </h2>

        <ul className="grid grid-cols-3 items-center gap-6 sm:gap-10" aria-label="Förderprogramme">
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
      </div>
    </section>
  );
}
