import { SectionIntro } from '@mardu/sections';
import { cn } from '@mardu/ui/lib/utils';

export interface SolutionsHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  highlights?: string[];
  className?: string;
}

export function SolutionsHero({
  eyebrow = 'Lösungen',
  title,
  intro,
  highlights,
  className,
}: SolutionsHeroProps) {
  return (
    <section className={cn('section-hairline overflow-hidden py-18 md:py-22', className)}>
      <div className="mardu-container relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[24rem] bg-[radial-gradient(circle_at_12%_18%,rgba(31,94,64,0.14),transparent_24%),radial-gradient(circle_at_56%_24%,rgba(214,171,84,0.10),transparent_26%),radial-gradient(circle_at_86%_22%,rgba(44,108,153,0.08),transparent_24%)]"
        />
        <div className="relative overflow-hidden border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(249,248,244,0.96))] px-6 py-8 md:px-9 md:py-10 lg:px-12 lg:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[4%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,24,39,0.10),transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 right-8 h-16 w-24 bg-[repeating-linear-gradient(135deg,rgba(17,24,39,0.05)_0,rgba(17,24,39,0.05)_1px,transparent_1px,transparent_11px)]"
          />
          <SectionIntro
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            className="mb-0"
            titleClassName="max-w-[10ch] text-[clamp(2.6rem,8vw,5rem)] leading-[0.92] tracking-[-0.06em]"
            introClassName="max-w-[26rem] text-[15px] leading-relaxed text-foreground/68 md:text-[1rem]"
          />

          {highlights?.length ? (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-black/8 pt-5">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex rounded-full border border-black/10 bg-white/72 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-foreground/60"
                >
                  {highlight}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
