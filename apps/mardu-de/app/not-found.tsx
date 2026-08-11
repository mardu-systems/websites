import Link from 'next/link';
import { ArrowRight, House } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { EditorialAccent } from '@mardu/ui/components/typography';

export default function NotFound() {
  return (
    <section className="border-b border-border bg-background" aria-labelledby="not-found-title">
      <div className="mardu-container grid min-h-[calc(100svh-5rem)] gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(24rem,1.18fr)] lg:items-center lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mardu-purple">
            [404] Zugang nicht gefunden
          </p>

          <h1
            id="not-found-title"
            className="mt-6 text-[clamp(2.8rem,7vw,5.75rem)] leading-[0.92] font-light tracking-[-0.045em] text-foreground"
          >
            Diese Tür führt gerade <EditorialAccent>nirgendwohin.</EditorialAccent>
          </h1>

          <p className="mt-7 max-w-[38rem] text-lg leading-relaxed text-muted-foreground">
            Entweder ist der Link veraltet, oder diese Seite hat noch keine Freigabe. Zum Glück
            kommst du von hier schnell wieder ins System.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              render={<Link href="/" />}
              className="h-12 rounded-none px-6 text-base font-normal"
            >
              <House aria-hidden="true" />
              Zur Startseite
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/solutions" />}
              className="h-12 rounded-none px-6 text-base font-normal"
            >
              Lösungen ansehen
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/42">
            Kein Schlüsselbund nötig.
          </p>
        </div>

        <div
          className="relative isolate min-h-[22rem] overflow-hidden border border-border bg-card sm:min-h-[28rem] lg:min-h-[34rem]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-45" />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-4 border-b border-border pb-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/52 md:inset-x-7 md:top-7">
            <span>Status: keine Freigabe</span>
            <span>Fehler 404</span>
          </div>

          <p className="absolute -right-[0.06em] bottom-[-0.16em] select-none text-[clamp(12rem,35vw,30rem)] leading-none font-light tracking-[-0.1em] text-mardu-purple/10">
            404
          </p>

          <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/52 md:right-7 md:bottom-7 md:left-7">
            <span>[ZUGANGSPUNKT]</span>
            <span className="text-right">Bitte andere Route wählen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
