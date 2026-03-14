'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ConsentPreferences } from '@/types/consent';
import { Button } from '@/components/ui/button';
import { useConsent } from '@/hooks/use-consent';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const CookieSettings = dynamic(() => import('@/components/cookie-consent/cookie-settings'), {
  loading: () => (
    <div className="p-4">
      <Skeleton className="h-32 w-full" />
    </div>
  ),
}) as unknown as typeof import('@/components/cookie-consent/cookie-settings').default;

declare global {
  interface Window {
    openCookieSettings?: () => void;
  }
}

export default function CookieConsentBanner() {
  const { prefs, setPrefs } = useConsent();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefs && !prefs.given && !visible) {
      setTimeout(() => setVisible(true), 0);
    }
  }, [prefs, visible]);

  useEffect(() => {
    window.openCookieSettings = () => {
      setVisible(true);
      setShowSettings(true);
    };
    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  // Focus-Trap nur im Banner (nicht in Settings)
  useEffect(() => {
    if (!visible || showSettings) return;
    const container = containerRef.current;
    if (!container) return;
    const selector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(selector));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    first?.focus();
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [visible, showSettings]);

  async function handleSave(newPrefs: ConsentPreferences) {
    await setPrefs(newPrefs);
    setVisible(false);
    setShowSettings(false);
  }

  if (!visible) return null;
  if (showSettings) return <CookieSettings onSave={handleSave} />;
  return (
    <div
      className={clsx('fixed inset-x-0 bottom-0 z-1000')}
      data-state="open"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-overlay/30 z-[-1]" aria-hidden="true" />

      <div
        ref={containerRef}
        className={clsx(
          'mx-auto w-full pb-[env(safe-area-inset-bottom)]',
          // Mobil: vollbreit, Desktop: automatische Größe
          'px-2 sm:px-4',
        )}
      >
        <div
          className={clsx(
            // Desktop: skaliert wie TE (Höhe ~30vw, fixes Seitenverhältnis 1:0.89)
            'relative w-full md:w-auto md:aspect-[1/.89] mb-5',
            // Maxbreite, damit es nicht zu groß wird
            'max-w-[min(92vw,580px)]',
            // Mobil: bottom sheet look
            'rounded-none md:rounded-none',
          )}
        >
          {/* SVG Hintergrund (skaliert 1:1 über die Box) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.27 248.13"
            className="block w-full h-auto pointer-events-none select-none"
            aria-hidden="true"
          >
            <path
              d="M132.44,5.31c4.09-7.08,14.3-7.08,18.39,0l131,226.9c4.09,7.08-1.02,15.92-9.19,15.92H10.63c-8.17,0-13.28-8.85-9.19-15.92L132.44,5.31Z"
              fill="#FDB92F"
            />
            <path
              d="M160.94,90.17c0,5.93-1.29,11.75-3.92,17.06-.17.39-.17.84.11,1.17l8.95,11.91c.39.56,0,1.34-.67,1.34h-20.86l-2.8-3.52c-2.96-4.36-7.94-5.03-10.12-5.09-.73,0-1.34-.34-1.85-.9l-9.9-11.52c-.28-.34-.67-.62-1.06-.84-1.68-.95-6.38-3.58-6.38-3.58-1.85-.84-3.69-2.68-2.63-4.92.62-1.34,2.18-2.07,3.97-1.68l6.32,1.51c.56.11,1.06.45,1.45.84l4.92,5.31c1.4-.62,2.4-1.68,2.4-3.75l-.11-5.31c0-.84-.28-1.62-.73-2.29-1.85-2.85-6.99-10.68-9.96-15.1-1.17-1.73-.73-4.08,1.01-5.26,1.73-1.17,4.14-.73,5.31,1.01l8.11,12.36c1.17,1.79,4.03.89,3.92-1.23l-.67-18.23c-.06-2.07,1.62-3.8,3.69-3.8s3.64,1.62,3.69,3.64l.28,18.07c0,2.8,4.36,3.3,4.98.5l4.31-16.67c.5-2.01,2.57-3.19,4.59-2.68,2.01.56,3.19,2.57,2.63,4.59l-4.64,16.89c-.67,2.46,2.41,4.19,4.14,2.29l7.21-8c1.17-1.34,3.3-1.34,4.53,0,1.01,1.12.95,2.85,0,4.03l-10.23,11.97v-.11Z"
              fill="#121114"
            />
          </svg>

          {/* Content-Layer (skaliert über % Padding wie TE) */}
          <div
            className={clsx(
              'absolute inset-0',
              'flex flex-col items-center justify-end',
              'pb-3 sm:pb-4 md:pb-6',
              'text-center font-light',
            )}
          >
            <p className="mb-3 text-md md:text-sm md:max-w-[350px] md:pb-8 md:px-0 px-[20vw]">
              Wir verwenden erforderliche, leistungsbezogene und Marketing-Cookies, um Ihre
              Erfahrung zu messen, zu analysieren und zu personalisieren. Mehr dazu in unserer{' '}
              <Link href="/privacy" className="underline underline-offset-2 after:content-['_↗']">
                Datenschutzerklärung
              </Link>
              .
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-6 md:mb-5">
              <Button
                variant="ghost"
                className="rounded-full h-9 px-5 text-sm md:h-10 md:px-6 md:text-lg"
                onClick={() => setShowSettings(true)}
              >
                Einstellungen
              </Button>
              <Button
                variant="default"
                className="rounded-full h-9 px-5 text-sm md:h-10 md:px-6 md:text-lg"
                onClick={() =>
                  handleSave({
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
          </div>
        </div>
      </div>

      {/* Reduced motion: Animationen abschalten */}
      <style>{`
        @media (prefers-reduced-motion: reduce){
          [data-state] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
