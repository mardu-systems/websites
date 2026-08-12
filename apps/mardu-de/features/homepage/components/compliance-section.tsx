import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { complianceProofs } from '../homepage-content';

export function ComplianceSection() {
  return (
    <section
      id="nachweise"
      aria-labelledby="compliance-title"
      className="scroll-mt-20 border-b border-background/15 bg-foreground py-16 text-background md:py-20"
    >
      <div className="mardu-container">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:gap-16">
          <ScrollReveal distance={30}>
            <span className="inline-flex size-12 items-center justify-center border border-background/18 bg-background/5">
              <ShieldCheck className="size-6 text-mardu-lilac" aria-hidden="true" />
            </span>
            <p className="mt-8 text-xs tracking-[0.12em] text-mardu-lilac">
              BETREIBERPFLICHTEN & NACHWEISE
            </p>
            <h2 id="compliance-title" className="mardu-homepage-section-title mt-5 max-w-[14ch]">
              Haftung absichern. Entscheidungen belegbar machen.
            </h2>
            <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-background/65">
              Im Ernstfall muss klar sein, warum eine Freigabe erteilt oder abgelehnt wurde. Mardu
              hält die entscheidenden Nachweise am Zugangspunkt nachvollziehbar zusammen.
            </p>
            <p className="mt-5 max-w-[42rem] text-sm leading-relaxed text-background/48">
              Mardu unterstützt die organisatorische Dokumentation. Für Gefährdungsbeurteilung und
              vorgeschriebene Schutzmaßnahmen bleiben die Verantwortlichen zuständig.
            </p>
          </ScrollReveal>

          <ScrollReveal distance={34} delay={0.08}>
            <figure className="overflow-hidden border border-background/15 bg-[#10131a] p-3 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-background/10 pb-4">
                <span className="text-xs tracking-[0.08em] text-background/50">
                  NACHWEISBARE ENTSCHEIDUNGEN
                </span>
                <span className="text-xs text-background/40">Mardu Plattform</span>
              </div>
              <Image
                src="/verwaltungssoftware/zugriffsprotokolle.png"
                alt="Mardu-Zugriffsprotokolle mit dokumentierten Freigaben und Ablehnungen"
                width={2048}
                height={1200}
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="h-auto w-full"
              />
            </figure>
          </ScrollReveal>
        </div>

        <ol className="mt-12 grid border-y border-background/15 sm:grid-cols-3">
          {complianceProofs.map((item) => (
            <li
              key={item.index}
              className="border-b border-background/15 py-6 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 lg:py-7"
            >
              <span className="text-xs text-mardu-lilac">[{item.index}]</span>
              <h3 className="mt-5 text-xl font-light tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/55">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
