import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { Halftone3DIllustration } from '@mardu/ui/components/halftone-3d-illustration';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { benefitItems, useCases } from '../homepage-content';

const benefitModelUrls = [
  '/models/benefits/qualification-check.glb',
  '/models/benefits/supervision-lock.glb',
  '/models/benefits/evidence-proof.glb',
] as const;

const benefitModelLabels = [
  'Interaktives 3D-Häkchen für eine bestätigte Qualifikation',
  'Interaktives 3D-Schloss für kontrollierte Freigaben',
  'Interaktives 3D-Diagramm für nachvollziehbare Nachweise',
] as const;

const benefitHalftoneSettings = {
  material: {
    color: '#f3eef9',
    metalness: 0,
    roughness: 0.72,
  },
  halftone: {
    dashColor: '#9c80c2',
    hoverDashColor: '#9c80c2',
    power: -0.1,
    scale: 17,
    width: 0.48,
  },
  background: {
    color: '#f4f4f4',
    transparent: true,
  },
  animation: {
    autoRotateEnabled: true,
    autoSpeed: 0.1,
    autoWobble: 0.16,
    cameraParallaxEnabled: true,
    dragFlowEnabled: true,
    followDragEnabled: true,
    followHoverEnabled: true,
    hoverHalftoneEnabled: true,
    hoverHalftonePowerShift: 0.24,
    lightSweepEnabled: true,
    hoverHalftoneRadius: 0.42,
    hoverHalftoneWidthShift: -0.12,
    hoverLightEnabled: true,
    hoverLightIntensity: 0.55,
    hoverLightRadius: 0.38,
    rotationConstraint: 'y',
  },
} as const;

const benefitHalftoneInitialPose = {
  autoElapsed: 0,
  rotateElapsed: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  targetRotationX: 0,
  targetRotationY: 0,
  timeElapsed: 0,
} as const;

export function BenefitsUseCasesSection() {
  return (
    <>
      <section id="nutzen" className="scroll-mt-24 border-b border-border bg-card py-16 md:py-20">
        <div className="mardu-container">
          <div className="max-w-[46rem]">
            <SectionIntro
              eyebrow="[04] Nutzen im Betrieb"
              title={
                <>
                  Infrastruktur zugänglich machen.{' '}
                  <EditorialAccent>Kontrolle behalten.</EditorialAccent>
                </>
              }
              intro={
                <p>
                  Mardu verbindet Unterweisungen und Qualifikationen mit Maschinen- und
                  Türfreigaben. Zugriffe und Nutzungszeiten werden nachvollziehbar dokumentiert.{' '}
                  <strong className="font-medium text-foreground/82">
                    Das vereinfacht die organisatorische Nachhaltung von Betreiberpflichten und
                    entlastet die Aufsicht, ohne Gefährdungsbeurteilung oder Schutzeinrichtungen zu
                    ersetzen.
                  </strong>
                </p>
              }
              layout="stacked"
              titleClassName="mardu-homepage-section-title max-w-[16ch]"
              introClassName="text-base"
              eyebrowClassName="text-xs text-mardu-purple"
            />
          </div>

          <div className="mt-14 grid border-y border-border lg:grid-cols-3">
            {benefitItems.map((item, index) => {
              return (
                <article
                  key={item.title}
                  className="relative border-b border-border py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:last:border-r-0"
                >
                  <div>
                    <div className="flex h-8 items-start justify-end gap-3">
                      <span className="text-xs text-muted-foreground">[0{index + 1}]</span>
                      {item.status ? (
                        <span className="border border-mardu-purple/25 px-2 py-1 text-xs text-mardu-purple">
                          {item.status}
                        </span>
                      ) : null}
                    </div>
                    <div
                      aria-label={benefitModelLabels[index]}
                      className="relative mx-auto size-60 overflow-visible sm:size-64"
                      role="img"
                    >
                      <div className="absolute inset-0">
                        <Halftone3DIllustration
                          initialPose={benefitHalftoneInitialPose}
                          modelUrl={benefitModelUrls[index]}
                          previewDistance={3.75}
                          settings={benefitHalftoneSettings}
                          shapeKey="box"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="mx-auto mt-7 max-w-[20rem] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[20rem] text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="einsatzbereiche" className="scroll-mt-24 border-b border-border py-16 md:py-20">
        <div className="mardu-container">
          <SectionIntro
            eyebrow="[05] Einsatzbereiche"
            title={
              <>
                Lösungen für deinen <EditorialAccent>Anwendungsfall.</EditorialAccent>
              </>
            }
            layout="stacked"
            className="mb-12 lg:mb-14"
            titleClassName="mardu-homepage-section-title max-w-[18ch]"
            eyebrowClassName="text-xs text-mardu-purple"
          />

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            <figure className="relative min-h-80 overflow-hidden bg-neutral-200 sm:min-h-[28rem]">
              <Image
                src="/landing/mardu-gebaeudezugang-tuere.webp"
                alt="Elektronischer Mardu-Schließzylinder an einem Gebäudeeingang"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </figure>
            <figure className="relative min-h-80 overflow-hidden bg-neutral-200 sm:min-h-[28rem]">
              <Image
                src="/landing/campus-architecture-berlin.webp"
                alt="Moderne Hochschularchitektur als beispielhafte Umgebung für gemeinsam genutzte Infrastruktur"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <figcaption className="absolute bottom-3 right-3 bg-black/55 px-2.5 py-1.5 text-xs leading-none text-white/78 backdrop-blur-sm">
                Foto: Marcus Lenk · Pexels
              </figcaption>
            </figure>
          </div>

          <div className="mt-4 grid border-t border-border md:grid-cols-2">
            {useCases.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-7 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple md:px-7 md:odd:border-r lg:px-9 lg:py-8"
              >
                <span className="text-xs text-muted-foreground">[{item.index}]</span>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[23rem] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <ArrowRight
                      className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/solutions"
            className="mt-9 inline-flex min-h-11 items-center gap-3 border-b border-border text-base transition-colors hover:border-mardu-purple hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mardu-purple"
          >
            Alle Lösungen ansehen
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
