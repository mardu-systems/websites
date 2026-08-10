'use client';

import Link from 'next/link';
import { Button } from '@mardu/ui/components/button';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mardu-container grid min-h-[60svh] place-items-center py-16 text-center">
      <div className="max-w-xl" role="alert">
        <p className="font-mono text-xs tracking-[0.16em] text-mardu-purple">
          [INHALT NICHT VERFÜGBAR]
        </p>
        <h1 className="mt-5 text-4xl font-light tracking-[-0.035em]">
          Die Inhalte konnten nicht geladen werden.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Bitte versuche es gleich noch einmal. Wenn das Problem bestehen bleibt, melde dich bei
          uns.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Erneut versuchen</Button>
          <Button variant="outline" render={<Link href="/contact" />}>
            Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </main>
  );
}
