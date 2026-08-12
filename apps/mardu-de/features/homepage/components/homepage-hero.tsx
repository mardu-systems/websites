import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ClipboardCheck,
  HardHat,
  LockKeyhole,
  MapPinned,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { homepageHero } from '../homepage-content';
import { CyclingAccessPoint } from './cycling-access-point';

const trustSignalIcons = [
  ShieldCheck,
  ClipboardCheck,
  HardHat,
  LockKeyhole,
  Wrench,
  MapPinned,
] as const;

export function HomepageHero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 border-b border-border bg-background pb-14 pt-12 md:pb-20 md:pt-12 xl:flex xl:min-h-[calc(100svh-10rem)] xl:items-center xl:py-28 2xl:min-h-[calc(100svh-11rem)]"
    >
      <div className="mardu-container grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-center xl:gap-14">
        <div className="homepage-hero-panel relative max-w-[43rem] overflow-hidden border-y border-border px-5 py-8 sm:px-7 xl:-ml-7 xl:px-7 xl:py-10">
          <h1 className="homepage-hero-heading relative max-w-[12ch] text-[clamp(2.85rem,7.4vw,3.75rem)] font-light leading-[0.98] tracking-[-0.04em] text-foreground">
            <span className="sr-only">
              Zugang zu Maschine, Tür, Schranke, Werkstatt und Zufahrt. Zentral geregelt.
            </span>
            <span aria-hidden="true">
              Zugang zur
              <CyclingAccessPoint items={homepageHero.rotatingAccessPoints} />
              zentral geregelt.
            </span>
          </h1>

          <nav
            className="homepage-hero-entry homepage-hero-entry--actions relative mt-10 max-w-[30rem] border-t border-border"
            aria-label="Direkteinstiege"
          >
            {[homepageHero.primaryAction, homepageHero.secondaryAction].map((action, index) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex min-h-12 items-center gap-3 border-b border-border text-base text-foreground transition-colors duration-200 hover:border-mardu-purple hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mardu-purple"
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                    index === 0
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-foreground text-background group-hover:bg-primary group-hover:text-primary-foreground'
                  }`}
                  aria-hidden="true"
                >
                  <ArrowUpRight className="size-3.5 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
                </span>
                {action.label}
              </Link>
            ))}
          </nav>

          <ul className="homepage-hero-entry homepage-hero-entry--trust relative mt-10 flex max-w-[42rem] flex-wrap gap-x-6 gap-y-4">
            {homepageHero.trustSignals.map((signal, index) => {
              const Icon = trustSignalIcons[index] ?? ShieldCheck;

              return (
                <li key={signal.label} className="inline-flex items-center gap-2">
                  <Icon
                    className="size-4 shrink-0 stroke-[1.7] text-mardu-purple"
                    aria-hidden="true"
                  />
                  <abbr
                    title={signal.title}
                    className="text-xs leading-none font-medium text-foreground/72 no-underline"
                  >
                    {signal.label}
                  </abbr>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="min-w-0">
          <div
            className="grid grid-cols-2 gap-1"
            role="group"
            aria-label="Mardu an Maschine und Tür"
          >
            <figure className="relative min-h-80 overflow-hidden bg-muted sm:min-h-[32rem] xl:min-h-[clamp(34rem,calc(100svh-18rem),42rem)]">
              <Image
                src="/landing/mardu-maschine-hero.webp"
                alt="Mardu-Terminal an einer Werkstattmaschine bei der Identifikation mit einer Zugangskarte"
                fill
                priority
                loading="eager"
                unoptimized
                sizes="(max-width: 1279px) 50vw, 30vw"
                className="object-cover object-[38%_center]"
              />
            </figure>
            <figure className="relative min-h-80 overflow-hidden bg-muted sm:min-h-[32rem] xl:min-h-[clamp(34rem,calc(100svh-18rem),42rem)]">
              <Image
                src="/landing/mardu-tuerschloss-transponder.webp"
                alt="Mardu-Schließzylinder an einer Gebäudetür bei der Identifikation mit einem Transponder"
                fill
                priority
                loading="eager"
                unoptimized
                sizes="(max-width: 1279px) 50vw, 30vw"
                className="object-cover object-[60%_center]"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
