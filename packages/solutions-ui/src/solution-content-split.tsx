import Image from 'next/image';
import type { SolutionContentBlockDto } from '@mardu/content-core';
import { cn } from '@mardu/ui/lib/utils';

export interface SolutionContentSplitProps {
  block: SolutionContentBlockDto;
  className?: string;
}

export function SolutionContentSplit({ block, className }: SolutionContentSplitProps) {
  const mediaFirst = block.imageSide === 'left';

  return (
    <section className={cn('section-hairline py-16 md:py-20', className)}>
      <div className="mardu-container">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:items-start">
          <div className={cn('relative', mediaFirst ? 'lg:order-1' : 'lg:order-2')}>
            <div className="relative aspect-[5/4] overflow-hidden border border-black/10 bg-[#f4f1e8] shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <Image
                src={block.imageUrl}
                alt={block.imageAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col justify-center',
              mediaFirst ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4',
            )}
          >
            {block.eyebrow ? (
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-foreground/46">
                {block.eyebrow}
              </p>
            ) : null}
            <h2 className="max-w-[14ch] text-[clamp(2rem,6vw,3.5rem)] leading-[0.96] tracking-[-0.05em] text-foreground">
              {block.title}
            </h2>
            <div className="mt-5 max-w-[38rem] text-[15px] leading-relaxed text-foreground/70 md:text-base">
              {block.body.split('\n\n').map((paragraph) => (
                <p key={paragraph} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
