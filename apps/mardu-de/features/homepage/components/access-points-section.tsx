import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { accessAreas } from '../homepage-content';

export function AccessPointsSection() {
  return (
    <section id="zugaenge" className="scroll-mt-24 border-b border-border bg-card py-16 md:py-20">
      <div className="mardu-container">
        <SectionIntro
          eyebrow="[02] Physische Zugänge"
          title={
            <>
              Jeder Zugangspunkt. <EditorialAccent>Dieselbe Berechtigungslogik.</EditorialAccent>
            </>
          }
          intro={
            <p>
              Maschine, Tür, Tor oder Schließfach unterscheiden sich technisch. Für den Betrieb
              zählt dieselbe Frage:{' '}
              <strong className="font-medium text-foreground/82">
                Wer darf was – und unter welchen Bedingungen?
              </strong>{' '}
              Mardu bringt die Antwort an den passenden Zugangspunkt.
            </p>
          }
          layout="stacked"
          className="mb-12 lg:mb-14"
          titleClassName="mardu-homepage-section-title max-w-[19ch]"
          introClassName="text-base"
          eyebrowClassName="text-xs text-mardu-purple"
        />

        <div className="grid border-y border-border md:grid-cols-2 xl:grid-cols-4">
          {accessAreas.map((item) => {
            return (
              <article
                key={item.index}
                className="group border-b border-border p-6 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0 xl:p-7"
              >
                <figure className="relative min-h-48 overflow-hidden bg-neutral-200">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <span className="absolute left-3 top-3 bg-black/58 px-2 py-1 text-xs text-white/88 backdrop-blur-sm">
                    [{item.index}]
                  </span>
                  {item.imageCredit ? (
                    <figcaption className="absolute bottom-2 right-2 bg-black/58 px-2 py-1 text-xs leading-none text-white/76 backdrop-blur-sm">
                      <a
                        href={item.imageCredit.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                      >
                        {item.imageCredit.label}
                      </a>
                    </figcaption>
                  ) : null}
                </figure>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <p className="text-xs tracking-[0.06em] text-mardu-purple">{item.label}</p>
                  {item.status ? (
                    <span className="border border-mardu-purple/25 px-2 py-1 text-xs text-mardu-purple">
                      {item.status}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="mt-9 inline-flex min-h-11 items-center gap-3 border-b border-border text-base transition-colors hover:border-mardu-purple hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mardu-purple"
        >
          Zugangspunkt besprechen
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
