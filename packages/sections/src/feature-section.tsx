'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Button } from '@mardu/ui/components/button';

export type FeatureSectionProps = {
  eyebrow?: ReactNode;
  title: string | ReactNode;
  description: string | ReactNode;
  imageSrc: string;
  imageAlt: string;
  buttonText?: string;
  buttonHref?: string;
  ctaSlot?: ReactNode;
  backgroundColor?: string;
  className?: string;
};

export default function FeatureSection({
  className,
  eyebrow = 'Die Mardu-Lösung',
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  ctaSlot,
  backgroundColor,
}: React.ComponentProps<'section'> & FeatureSectionProps) {
  return (
    <section
      className={cn('section-hairline relative overflow-hidden py-18 md:py-24', className)}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="mardu-container relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">{eyebrow}</p>
          ) : null}
          <div className="relative isolate inline-block">
            <h2 className="headline-balance relative z-10 text-[clamp(1.95rem,4vw,3.25rem)] leading-[1.04] tracking-[-0.02em]">
              {title}
            </h2>
          </div>
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-foreground/76 md:text-base">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
          {ctaSlot ? (
            ctaSlot
          ) : buttonText && buttonHref ? (
            <Button asChild>
              <Link href={buttonHref}>{buttonText}</Link>
            </Button>
          ) : null}
        </div>

        <div className="relative border border-black/10 bg-white/55 p-4 md:p-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:26px_26px]" />
          <div className="relative overflow-hidden border border-black/15 bg-white/70">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
