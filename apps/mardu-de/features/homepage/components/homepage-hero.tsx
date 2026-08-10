import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Fingerprint, MapPinned, ShieldCheck } from 'lucide-react';
import { homepageHero } from '../homepage-content';
import { CyclingAccessPoint } from './cycling-access-point';

const trustVisuals = [
  { Icon: Fingerprint, colorClassName: 'bg-muted text-muted-foreground' },
  { Icon: ShieldCheck, colorClassName: 'bg-secondary text-secondary-foreground' },
  { Icon: MapPinned, colorClassName: 'bg-accent text-accent-foreground' },
] as const;

export function HomepageHero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 border-b border-border bg-background pb-14 pt-12 md:pb-20 md:pt-12 xl:flex xl:min-h-[calc(100svh-10rem)] xl:items-center xl:py-28 2xl:min-h-[calc(100svh-11rem)]"
    >
      <div className="mardu-container grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-end xl:gap-14">
        <div className="max-w-[43rem]">
          <h1 className="max-w-[12ch] text-[clamp(2.85rem,7.4vw,3.75rem)] font-light leading-[0.98] tracking-[-0.04em] text-foreground">
            <span className="sr-only">
              Zugang zu Maschine, Tür, Schranke, Werkstatt und Zufahrt. Zentral geregelt.
            </span>
            <span aria-hidden="true">
              Zugang zur
              <CyclingAccessPoint items={homepageHero.rotatingAccessPoints} />
              zentral geregelt.
            </span>
          </h1>

          <nav className="mt-10 max-w-[30rem] border-t border-border" aria-label="Direkteinstiege">
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

          <ul className="mt-10 grid max-w-[42rem] border-y border-border sm:grid-cols-3">
            {homepageHero.trustSignals.map((signal, index) => {
              const visual = trustVisuals[index] ?? trustVisuals[0];
              const Icon = visual.Icon;

              return (
                <li
                  key={signal}
                  className="flex min-h-14 items-center gap-3 border-b border-border py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center ${visual.colorClassName}`}
                    aria-hidden="true"
                  >
                    <Icon className="size-[1.125rem] stroke-[1.7]" />
                  </span>
                  <p className="text-xs font-medium leading-snug text-muted-foreground">{signal}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="min-w-0">
          <figure className="relative min-h-80 overflow-hidden bg-muted sm:min-h-[32rem] xl:min-h-[clamp(34rem,calc(100svh-18rem),42rem)]">
            <Image
              src="/landing/mardu-modern-cnc.webp"
              alt="Mardu-Terminal an einer modernen CNC-Maschine bei der Identifikation mit einer Zugangskarte"
              fill
              priority
              loading="eager"
              sizes="(max-width: 1279px) 100vw, 60vw"
              className="object-cover object-center"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
