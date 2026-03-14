'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { ConsentPreferences } from '@/types/consent';
import Link from 'next/link';
import { toast } from 'sonner';

interface CookieSettingsProps {
  onSave: (prefs: ConsentPreferences) => Promise<void> | void;
}

export default function CookieSettings({ onSave }: CookieSettingsProps) {
  const [prefs, setPrefs] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    given: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/consent');
        const data = (await res.json()) as ConsentPreferences;
        setPrefs(data);
      } catch (err) {
        console.error('Failed to load consent preferences', err);
        setPrefs({ necessary: true, analytics: false, marketing: false, given: false });
        toast.error('Fehler beim Laden der Cookie-Einstellungen. Standardwerte werden verwendet.');
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  if (!loaded) return null;

  function updatePrefs(key: keyof ConsentPreferences, value: boolean) {
    setPrefs({ ...prefs, [key]: value });
  }

  async function savePrefs(newPrefs: ConsentPreferences) {
    await fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPrefs),
    });
    await onSave(newPrefs);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9998]"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-overlay/50 backdrop-blur-sm z-[-1]" aria-hidden="true" />

      <div className="mx-auto w-full px-2 sm:px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto w-full max-w-[min(92vw,720px)] rounded-t-2xl border border-border bg-card shadow-lg p-4 sm:p-6">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="text-lg md:text-2xl font-bold leading-none">COOKIE</h2>
            <p className="text-sm md:text-base font-semibold">Settings</p>
          </div>

          <p className="text-sm md:text-base leading-relaxed">
            Wir verwenden notwendige, statistische und Marketing-Cookies, um unsere Website zu
            betreiben, die Nutzung zu analysieren und Ihre Erfahrung zu verbessern. Details in der{' '}
            <Link href="/privacy" className="underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            .
          </p>

          <div className="mt-4 grid grid-cols-2 text-xs md:text-sm">
            <span>Cookies</span>
            <span className="justify-self-end">Auswahl</span>
          </div>

          <div className="mt-2 space-y-3 text-sm md:text-base">
            <div className="flex items-center justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>Statistik-Cookies</span>
                </TooltipTrigger>
                <TooltipContent className="z-[10000]">
                  Helfen uns zu verstehen, wie unsere Website genutzt wird.
                </TooltipContent>
              </Tooltip>
              <Switch
                className="h-7 w-12 [&>span]:h-6 [&>span]:w-6"
                checked={prefs.analytics}
                onCheckedChange={(v) => updatePrefs('analytics', v)}
                aria-label="Statistik-Cookies aktivieren"
              />
            </div>
            <div className="flex items-center justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>Marketing-Cookies</span>
                </TooltipTrigger>
                <TooltipContent className="z-[10000]">
                  Ermöglichen personalisierte Werbung und Tracking.
                </TooltipContent>
              </Tooltip>
              <Switch
                className="h-7 w-12 [&>span]:h-6 [&>span]:w-6"
                checked={prefs.marketing}
                onCheckedChange={(v) => updatePrefs('marketing', v)}
                aria-label="Marketing-Cookies aktivieren"
              />
            </div>
            <div className="flex items-center justify-between opacity-70">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>Notwendige Cookies</span>
                </TooltipTrigger>
                <TooltipContent className="z-[10000]">
                  Erforderlich für grundlegende Funktionen der Website.
                </TooltipContent>
              </Tooltip>
              <Switch
                className="h-7 w-12 [&>span]:h-6 [&>span]:w-6"
                checked
                disabled
                aria-label="Notwendige Cookies (immer aktiv)"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() =>
                  savePrefs({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    given: true,
                  })
                }
              >
                Ablehnen
              </Button>
              <Button
                className="flex-1"
                onClick={() =>
                  savePrefs({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    given: true,
                  })
                }
              >
                Alle akzeptieren
              </Button>
            </div>
            <Button onClick={() => savePrefs({ ...prefs, necessary: true, given: true })}>
              Auswahl speichern
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
