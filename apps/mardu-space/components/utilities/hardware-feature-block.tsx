'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@mardu/ui/lib/utils';
import MediaPlaceholder from '@/components/utilities/media-placeholder';
import type { HardwareFeatureBlockDto } from '@/data/hardware-page';
import { Button } from '@mardu/ui/components/button';

export interface HardwareFeatureBlockProps {
  block: HardwareFeatureBlockDto;
  reverse?: boolean;
  className?: string;
}

export default function HardwareFeatureBlock({
  block,
  reverse = false,
  className,
}: HardwareFeatureBlockProps) {
  return (
    <section
      className={cn(
        'grid gap-8 border border-black/10 bg-card p-6 md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center',
        reverse && 'lg:grid-cols-[1.08fr_0.92fr]',
        className,
      )}
    >
      <div className={cn('space-y-5', reverse && 'lg:order-2')}>
        <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
          {block.eyebrow}
        </p>
        <div className="space-y-3">
          <h3 className="headline-balance text-[clamp(1.45rem,3vw,2.3rem)] leading-[1.04] tracking-[-0.03em] text-foreground">
            {block.title}
          </h3>
          <p className="max-w-[60ch] text-sm leading-relaxed text-foreground/72 md:text-base">
            {block.description}
          </p>
        </div>
        <ul className="space-y-3 border-t border-black/8 pt-5">
          {block.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {block.ctaLabel && block.ctaHref ? (
          <div className="pt-2">
            <Button asChild variant="outline">
              <Link href={block.ctaHref}>{block.ctaLabel}</Link>
            </Button>
          </div>
        ) : null}
      </div>

      <div className={cn(reverse && 'lg:order-1')}>
        {block.imageSrc && block.imageAlt ? (
          <div className="relative aspect-[16/10] overflow-hidden border border-black/10 bg-background">
            <Image
              src={block.imageSrc}
              alt={block.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ) : block.placeholder ? (
          <MediaPlaceholder
            badge={block.placeholder.badge}
            title={block.placeholder.title}
            description={block.placeholder.description}
            icon={block.placeholder.icon}
            aspectRatioClassName="aspect-[16/10]"
          />
        ) : null}
      </div>
    </section>
  );
}
