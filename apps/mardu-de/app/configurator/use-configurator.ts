import { useEffect, useMemo, useState } from 'react';
import { useRecaptcha } from '@mardu/lead-core/recaptcha';
import { createSteps } from './steps';
import { ContactSchema } from './steps/contact';

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

function loadStoredState() {
  if (typeof window === 'undefined') return defaultState;

  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultState;

  try {
    const parsed: unknown = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? (parsed as State) : defaultState;
  } catch {
    return defaultState;
  }
}

export function useConfigurator() {
  const [state, setState] = useState<State>(loadStoredState);
  const steps = useMemo(() => createSteps(state, setState), [state]);
  const executeRecaptcha = useRecaptcha();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  async function submit() {
    const { contact, ...config } = state;
    const validation = ContactSchema.safeParse(contact);

    if (!validation.success) {
      const field = validation.error.issues[0]?.path[0];
      if (typeof field === 'string') {
        const selector = field === 'consent' ? '[data-contact-consent]' : `[name="${field}"]`;
        document.querySelector<HTMLElement>(selector)?.focus();
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validation.data,
          config,
          ...(token ? { token } : {}),
          source: 'configurator',
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setState(defaultState);
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch (error: unknown) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : null);
    } finally {
      setSubmitting(false);
    }
  }

  return { state, steps, status, submitting, errorMessage, submit };
}
