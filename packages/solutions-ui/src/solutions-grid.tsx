import type { SolutionListItemDto } from '@mardu/content-core';
import { SectionIntro } from '@mardu/sections';
import { cn } from '@mardu/ui/lib/utils';
import { SolutionCard } from './solution-card';

export interface SolutionsGridProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: SolutionListItemDto[];
  buildHref: (solution: SolutionListItemDto) => string;
  className?: string;
}

export function SolutionsGrid({
  eyebrow = 'Branchen',
  title,
  intro,
  items,
  buildHref,
  className,
}: SolutionsGridProps) {
  return (
    <section className={cn('section-hairline py-18 md:py-22', className)}>
      <div className="mardu-container">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          className="mb-8 md:mb-10"
          titleClassName="max-w-[11ch] text-[clamp(2.2rem,7vw,4.8rem)]"
          introClassName="max-w-[42rem]"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              href={buildHref(solution)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
