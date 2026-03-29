'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { defineStepper } from '@stepperize/react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import { createSteps } from './steps';
import { ContactSchema } from './steps/contact';
import { useRecaptcha } from '@/lib/recaptcha';
import { Alert, AlertDescription } from '@mardu/ui/components/alert';
import { Loader2 } from 'lucide-react';
import StepIndicator from '@/components/stepper/step-indicator';
/* ===================== Typen & Defaults ===================== */
import { Overline } from '@mardu/ui/components/typography';

/* ===================== Typen & Defaults ===================== */

export type State = {
  triMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
  schukoMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
  doors: { count: number; cablePerDoorM: number; photoUrl?: string };
  gates: { count: number; cablePerGateM: number; photoUrl?: string };
  fridges: { count: number; photoUrl?: string };
  centralRooms: { count: number; photoUrl?: string };
  contact: {
    name: string;
    email: string;
    company?: string;
    message?: string;
    phone?: string;
    consent?: boolean;
    newsletterOptIn?: boolean;
  };
};

const defaultState: State = {
  triMachines: { count: 0, cablePerUnitM: 10 },
  schukoMachines: { count: 0, cablePerUnitM: 10 },
  doors: { count: 0, cablePerDoorM: 15 },
  gates: { count: 0, cablePerGateM: 20 },
  fridges: { count: 0 },
  centralRooms: { count: 0 },
  contact: {
    name: '',
    email: '',
    company: '',
    message: '',
    phone: '',
    consent: false,
    newsletterOptIn: false,
  },
};

const STORAGE_KEY = 'configurator-state';

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
  const [state, setState] = useState<State>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            return parsed as State;
          }
        } catch {}
      }
    }
    return defaultState;
  });
  useEffect(() => {
    if (typeof window !== 'undefined' && state) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);
  const steps = useMemo(() => createSteps(state, setState), [state]);
  const executeRecaptcha = useRecaptcha();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'min-h-screen bg-background',
        'flex items-start justify-center',
        'px-4 sm:px-6 lg:px-10',
        'pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-14 md:pb-18',
      )}
    >
      <Wizard.Scoped>
        <MainContent
          steps={steps}
          state={state}
          onSubmit={async () => {
            if (!state) return;
            const { contact, ...config } = state;
            const validation = ContactSchema.safeParse(contact);
            if (!validation.success) {
              const field = validation.error.issues[0]?.path[0];
              if (typeof field === 'string' && typeof document !== 'undefined') {
                const selector =
                  field === 'consent' ? '[data-contact-consent]' : `[name="${field}"]`;
                const el = document.querySelector(selector) as HTMLElement | null;
                el?.focus();
              }
              setStatus('idle');
              setErrorMessage(null);
              return;
            }

            try {
              setSubmitting(true);
              setStatus('idle');
              setErrorMessage(null);
              const token = await executeRecaptcha('contact');
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...validation.data,
                  config,
                  ...(token ? { token } : {}),
                  source: 'configurator',
                }),
              });
              if (!res.ok) throw new Error('Request failed');
              setStatus('success');
              setState(defaultState);
              if (typeof window !== 'undefined') {
                window.sessionStorage.removeItem(STORAGE_KEY);
              }
            } catch (e: unknown) {
              console.error(e);
              setStatus('error');
              setErrorMessage(e instanceof Error ? e.message : null);
            } finally {
              setSubmitting(false);
            }
          }}
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
        <Button asChild className="mt-6 h-11 px-4 touch-manipulation">
          <Link href="/">Zur Startseite</Link>
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
          In wenigen Schritten erfassen wir Tueren, Tore, Maschinen und die wichtigsten
          Kontaktdaten fuer ein erstes Angebot.
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
          <Overline>Schritt {Math.min(_stepIndex + 1, _stepCount)} von {_stepCount}</Overline>
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
