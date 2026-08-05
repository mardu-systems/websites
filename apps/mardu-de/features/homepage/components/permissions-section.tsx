import Image from 'next/image';
import { ArrowRight, FileSpreadsheet, KeyRound, ScanLine } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { mediaBriefs, permissionSteps } from '../homepage-content';
import { HomepageMediaPlaceholder } from './homepage-media-placeholder';

export function PermissionsSection() {
  return (
    <section id="berechtigungen" className="scroll-mt-24 border-b border-border py-16 md:py-24">
      <div className="mardu-container">
        <SectionIntro
          eyebrow="[03] Identität und Berechtigung"
          title={
            <>
              Eine Identität.{' '}
              <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                Klare Berechtigungen.
              </em>{' '}
              Viele Zugänge.
            </>
          }
          intro={
            <p>
              Verantwortliche ordnen Personen, Rollen, Qualifikationen und Bereiche zentral zu.{' '}
              <strong className="font-medium text-foreground/82">
                Am Zugangspunkt wird daraus eine verständliche Entscheidung
              </strong>{' '}
              – passend zur jeweiligen Ressource und zum vereinbarten Betriebsmodell.
            </p>
          }
          layout="stacked"
          className="mb-12 lg:mb-14"
          titleClassName="mardu-homepage-section-title max-w-[17ch]"
          introClassName="text-base"
          eyebrowClassName="text-xs text-mardu-purple"
        />

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[0.58fr_0.42fr]">
          <figure className="relative min-h-80 overflow-hidden bg-neutral-950 sm:min-h-[30rem]">
            <Image
              src="/verwaltungssoftware/benutzerverwaltung.png"
              alt="Mardu-Verwaltungssoftware mit Benutzerkonten und zugeordneten Identmedien"
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-left-top"
            />
          </figure>
          <HomepageMediaPlaceholder
            brief={mediaBriefs.permissionDiagram}
            className="min-h-80 sm:min-h-[30rem]"
          />
        </div>

        <ol className="mt-4 grid border-y border-border md:grid-cols-2 xl:grid-cols-4">
          {permissionSteps.map((step, index) => (
            <li
              key={step.index}
              className="relative border-b border-border py-7 md:px-7 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0 xl:min-h-56 xl:border-b-0 xl:border-r xl:last:border-r-0 xl:odd:border-r"
            >
              <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>[{step.index}]</span>
                {index < permissionSteps.length - 1 ? (
                  <ArrowRight className="size-4" aria-hidden="true" />
                ) : null}
              </div>
              <h3 className="mt-10 text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-[25rem] text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid bg-foreground text-background lg:grid-cols-[0.38fr_0.62fr]">
          <div className="border-b border-background/15 p-7 lg:border-b-0 lg:border-r lg:p-9">
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground">
              [03.1] Die operative Lücke
            </p>
            <div className="flex items-center gap-4 text-primary-foreground">
              <div className="mt-8 w-full divide-y divide-background/15 border-y border-background/15">
                <div className="flex min-h-14 items-center gap-4">
                  <FileSpreadsheet className="size-5 shrink-0 stroke-[1.5]" aria-hidden="true" />
                  <span className="text-base text-background/80">Einweisung dokumentiert</span>
                </div>
                <div className="flex min-h-14 items-center gap-4">
                  <KeyRound className="size-5 shrink-0 stroke-[1.5]" aria-hidden="true" />
                  <span className="text-base text-background/80">Identmedium ausgegeben</span>
                </div>
                <div className="flex min-h-14 items-center gap-4">
                  <ScanLine className="size-5 shrink-0 stroke-[1.5]" aria-hidden="true" />
                  <span className="text-base text-background/80">Freigabe vor Ort?</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-7 lg:p-10 xl:p-12">
            <h3 className="max-w-[26ch] text-[clamp(2rem,3vw,2.75rem)] font-light leading-[1.05] tracking-[-0.03em]">
              Die Regel ist dokumentiert. Aber{' '}
              <em className="font-serif italic font-normal tracking-[-0.02em] text-background">
                kommt sie am Zugang an?
              </em>
            </h3>
            <p className="mt-6 max-w-[48rem] text-base leading-relaxed text-background/70">
              Wenn Liste, Identmedium und tatsächliche Freigabe getrennt bleiben, entstehen mehrere
              Wahrheiten für denselben Vorgang. Mardu führt sie am Zugangspunkt zu einer
              nachvollziehbaren Entscheidung zusammen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
