import Image from 'next/image';
import type { SolutionDetailDto, SolutionThemeTone } from '@mardu/content-core';
import { Badge } from '@mardu/ui/components/badge';
import { cn } from '@mardu/ui/lib/utils';

export interface SolutionDetailHeroProps {
  solution: SolutionDetailDto;
  className?: string;
}

const heroToneClasses: Record<SolutionThemeTone, string> = {
  forest:
    'bg-[radial-gradient(circle_at_18%_20%,rgba(40,99,68,0.18),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(250,214,121,0.16),transparent_30%)]',
  sand:
    'bg-[radial-gradient(circle_at_18%_20%,rgba(214,171,84,0.18),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(124,91,57,0.08),transparent_30%)]',
  mist:
    'bg-[radial-gradient(circle_at_18%_20%,rgba(75,136,168,0.16),transparent_34%),radial-gradient(circle_at_82%_26%,rgba(214,171,84,0.12),transparent_30%)]',
  clay:
    'bg-[radial-gradient(circle_at_18%_20%,rgba(168,102,69,0.16),transparent_34%),radial-gradient(circle_at_82%_26%,rgba(214,171,84,0.12),transparent_30%)]',
  ink:
    'bg-[radial-gradient(circle_at_18%_20%,rgba(62,74,122,0.22),transparent_34%),radial-gradient(circle_at_82%_26%,rgba(126,205,255,0.12),transparent_30%)]',
};

export function SolutionDetailHero({ solution, className }: SolutionDetailHeroProps) {
  const tone = solution.themeTone ?? 'sand';

  return (
    <section className={cn('section-hairline overflow-hidden py-14 md:py-18', className)}>
      <div className="mardu-container">
        <div
          className={cn(
            'relative overflow-hidden border border-black/8 bg-[#f8f5ea]',
            heroToneClasses[tone],
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[5%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,24,39,0.12),transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[10%] left-[8%] h-16 w-24 bg-[repeating-linear-gradient(135deg,rgba(17,24,39,0.06)_0,rgba(17,24,39,0.06)_1px,transparent_1px,transparent_11px)]"
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,0.88fr)] lg:items-stretch">
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-14">
              {solution.badge ? (
                <Badge
                  variant="outline"
                  className="mb-5 rounded-full border-black/10 bg-white/72 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground/66"
                >
                  {solution.badge}
                </Badge>
              ) : null}
              <h1 className="max-w-[11ch] text-[clamp(2.8rem,9vw,5.4rem)] leading-[0.92] tracking-[-0.06em] text-foreground">
                {solution.heroTitle}
              </h1>
              <p className="mt-5 max-w-[22ch] text-[clamp(1.05rem,2vw,1.55rem)] leading-[1.35] text-foreground/78">
                {solution.heroIntro}
              </p>
              <p className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-foreground/68 md:text-base">
                {solution.summary}
              </p>
            </div>

            <div className="relative min-h-[20rem] border-t border-black/8 lg:min-h-[34rem] lg:border-l lg:border-t-0">
              <Image
                src={solution.heroImageUrl}
                alt={solution.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
