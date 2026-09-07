'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { defineStepper } from '@stepperize/react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import { Alert, AlertDescription } from '@mardu/ui/components/alert';
import { Loader2 } from 'lucide-react';
import StepIndicator from '@/components/stepper/step-indicator';
import { Overline } from '@mardu/ui/components/typography';
import { useConfigurator, type State } from './use-configurator';

export type { State } from './use-configurator';

/* ===================== Stepper-Definition ===================== */

const Wizard = defineStepper(
  { id: 'tri', title: 'Drehstrommaschinen' },
  { id: 'schuko', title: 'Schuko-Maschinen' },
  { id: 'doors', title: 'Eingangstüren' },
  { id: 'gates', title: 'Elektrische Tore' },
  { id: 'fridges', title: 'Getränkekühlschränke' },
  { id: 'central', title: 'Zentrales Freigabesystem' },
  { id: 'summary', title: 'Zusammenfassung' },
  { id: 'contact', title: 'Kontakt' },
);

/* ===================== Seite ===================== */

export default function ConfiguratorPageClient() {
  const { state, steps, status, submitting, errorMessage, submit } = useConfigurator();

  return (
    <div
      className={cn(
        'min-h-screen bg-background',
        'flex items-start justify-center',
        'px-4 sm:px-6 lg:px-10',
        'pb-14 md:pb-18',
      )}
    >
      <Wizard.Scoped>
        <MainContent
          steps={steps}
          state={state}
          onSubmit={submit}
          status={status}
          submitting={submitting}
          errorMessage={errorMessage}
        />
      </Wizard.Scoped>
    </div>
  );
}

/* ===================== Inhalt ===================== */

function MainContent({
  steps,
  state,
  onSubmit,
  status,
  submitting,
  errorMessage,
}: {
  steps: {
    id: string;
    title: React.ReactNode;
    tip: string;
    view: React.ReactNode;
    valid: (s: State) => boolean;
    hoverImg?: string;
  }[];
  state: State;
  onSubmit: () => Promise<void>;
  status: 'idle' | 'success' | 'error';
  submitting: boolean;
  errorMessage: string | null;
}) {
  const stepper = Wizard.useStepper({ initialStep: 'tri' });
  const idx = stepper.all.findIndex((s) => s.id === stepper.current.id);
  const isValid = steps[idx]?.valid?.(state);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  // Scroll to top on step changes (both directions, all layouts)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, [idx, prefersReducedMotion]);

  // Stepper indicator replaces custom mobile/desktop steppers

  if (status === 'success') {
    return (
      <main className="w-full max-w-5xl mx-auto py-10 md:py-14 text-center">
        <Alert className="mt-4 animate-fade-in" variant="default" role="status" aria-live="polite">
          <AlertDescription>Danke! Anfrage versendet.</AlertDescription>
        </Alert>
        <Button render={<Link href="/" />} className="mt-6 h-11 px-4 touch-manipulation">
          Zur Startseite
        </Button>
      </main>
    );
  }

  return (
    <main className="w-full max-w-6xl mx-auto py-8 md:py-12">
      <div className="max-w-3xl space-y-3">
        <Overline>Konfigurator</Overline>
        <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
          System grob konfigurieren
        </h1>
        <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
          In wenigen Schritten erfassen wir Türen, Tore, Maschinen und die wichtigsten Kontaktdaten
          für ein erstes Angebot.
        </p>
      </div>

      <div className="relative mt-8 md:mt-10">
        <StepIndicator
          current={idx + 1}
          total={stepper.all.length}
          labels={steps.map((s) => (typeof s.title === 'string' ? s.title : ''))}
          showLabels={false}
          onStepClick={(i) => stepper.goTo(stepper.all[i - 1]?.id)}
          size="lg"
        />
      </div>

      <section className="mt-8 overflow-hidden border border-black/10 bg-card md:mt-10">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div className="p-6 md:p-8">
            <ResponsiveHelp
              title={steps[idx]?.title}
              tip={steps[idx]?.tip ?? ''}
              stepIndex={idx}
              stepCount={steps.length}
            />
          </div>

          {steps[idx]?.hoverImg ? (
            <div className="border-t border-black/10 bg-muted/30 lg:border-l lg:border-t-0">
              <div className="relative aspect-[4/3] h-full min-h-64 w-full">
                <Image
                  src={steps[idx].hoverImg as string}
                  alt=""
                  fill
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="hidden border-l border-black/10 bg-muted/20 lg:block" />
          )}
        </div>

        <div className="border-t border-black/10 p-6 md:p-8">
          <div className="mx-auto max-w-4xl">{steps[idx]?.view}</div>
        </div>

        <div className="border-t border-black/10 bg-muted/20 px-6 py-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => stepper.prev()}
              disabled={stepper.isFirst}
              className="h-11 px-4 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation"
            >
              Zurück
            </Button>

            <Button
              onClick={async () => {
                if (!isValid) return;
                if (!stepper.isLast) stepper.next();
                else await onSubmit();
              }}
              disabled={submitting}
              aria-disabled={submitting}
              aria-busy={submitting && stepper.isLast}
              className="h-11 px-4 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 touch-manipulation"
            >
              {submitting && stepper.isLast && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {stepper.isLast ? 'Angebot anfordern' : 'Weiter'}
            </Button>
          </div>
        </div>
      </section>
      {status === 'error' && (
        <Alert
          className="mt-4 animate-fade-in"
          variant="destructive"
          role="alert"
          aria-live="assertive"
        >
          <AlertDescription>
            {errorMessage ?? 'Etwas ist schiefgelaufen. Versuch es erneut.'}
          </AlertDescription>
        </Alert>
      )}
    </main>
  );
}

/* ===================== Responsive Help ===================== */
function ResponsiveHelp({
  title,
  tip,
  stepIndex: _stepIndex,
  stepCount: _stepCount,
}: {
  title: React.ReactNode;
  tip: string;
  stepIndex: number;
  stepCount: number;
}) {
  return (
    <div className="mx-auto block min-h-[44px] text-left">
      {title ? (
        <>
          <Overline>
            Schritt {Math.min(_stepIndex + 1, _stepCount)} von {_stepCount}
          </Overline>
          <div className="mt-3">
            <h2 className="headline-balance text-[clamp(1.6rem,4vw,3rem)] leading-[0.98] tracking-[-0.03em] text-foreground">
              {title}
            </h2>
          </div>
          {tip ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/68">{tip}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
