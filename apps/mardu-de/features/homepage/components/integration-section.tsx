import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { mediaBriefs, retrofitPoints } from '../homepage-content';
import { HomepageMediaPlaceholder } from './homepage-media-placeholder';

export function IntegrationSection() {
  return (
    <section
      id="integration"
      className="scroll-mt-24 border-b border-border bg-card py-16 md:py-20"
    >
      <div className="mardu-container">
        <SectionIntro
          eyebrow="[06] Integration und Nachrüstung"
          title={
            <>
              Aus vorhandener Infrastruktur wird{' '}
              <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                steuerbarer Zugang.
              </em>
            </>
          }
          intro={
            <p>
              Mardu ist für reale Standorte mit unterschiedlichen Baujahren, Herstellern und
              Betriebsmodellen gedacht.{' '}
              <strong className="font-medium text-foreground/82">
                Deshalb beginnt jede Anbindung mit einer fachlichen und technischen Prüfung
              </strong>{' '}
              – nicht mit einem Universalversprechen.
            </p>
          }
          layout="stacked"
          className="mb-12 lg:mb-14"
          titleClassName="mardu-homepage-section-title max-w-[18ch]"
          introClassName="text-base"
          eyebrowClassName="text-xs text-mardu-purple"
        />

        <div className="grid border-y border-border lg:grid-cols-[0.58fr_0.42fr]">
          <figure className="relative min-h-80 overflow-hidden bg-muted lg:min-h-[34rem] lg:border-r lg:border-border">
            <Image
              src="/landing/mardu-modern-cnc.webp"
              alt="Mardu-Terminal an einer modernen CNC-Maschine bei der Identifikation mit einer Zugangskarte"
              fill
              loading="eager"
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </figure>

          <div className="flex flex-col justify-between px-0 py-8 lg:px-10 lg:py-10 xl:px-12">
            <div>
              <p className="text-xs tracking-[0.08em] text-mardu-purple">Technische Passung</p>
              <h3 className="mt-5 max-w-[18ch] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                Prüfen, wie Mardu sinnvoll Teil des bestehenden Betriebs wird.
              </h3>
            </div>

            <ul className="mt-9 divide-y divide-border border-y border-border">
              {retrofitPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 py-4 text-base leading-relaxed text-muted-foreground"
                >
                  <Check className="mt-1 size-4 shrink-0 text-mardu-purple" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 w-fit items-center gap-3 border-b border-border text-base transition-colors hover:border-mardu-purple hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mardu-purple"
            >
              Standort prüfen lassen
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-4 grid lg:grid-cols-[0.52fr_0.48fr]">
          <HomepageMediaPlaceholder
            brief={mediaBriefs.retrofitExplodedView}
            className="min-h-[29rem] lg:border-r-0"
          />
          <div className="flex min-h-[29rem] flex-col justify-between bg-foreground p-7 text-background lg:p-10 xl:p-12">
            <ShieldCheck className="size-8 text-primary-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs tracking-[0.08em] text-background/50">
                Klare Verantwortungsgrenze
              </p>
              <h3 className="mt-6 max-w-[26ch] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                Organisatorische Freigabe ist nicht dasselbe wie Maschinensicherheit.
              </h3>
              <p className="mt-5 max-w-[42rem] text-base leading-relaxed text-background/70">
                Mardu ersetzt weder Gefährdungsbeurteilung, praktische Unterweisung, technische
                Schutzeinrichtungen, sichere Energietrennung noch erforderliche Aufsicht.
                Installation und Ausfallverhalten werden für den jeweiligen Zugangspunkt geprüft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
