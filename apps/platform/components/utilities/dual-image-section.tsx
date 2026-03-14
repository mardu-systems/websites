'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ImageCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
}

export interface DualImageSectionProps {
  cards: [ImageCardProps, ImageCardProps];
  className?: string;
}

export default function DualImageSection({ cards, className = '' }: DualImageSectionProps) {
  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {cards.map((card, index) => (
            <article key={card.title ?? index} className="border border-black/10 bg-white/50 p-4 md:p-5">
              <div className="relative mb-5 aspect-16/10 overflow-hidden border border-black/10">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-[clamp(1.3rem,2vw,2rem)] leading-tight tracking-[-0.015em]">
                  {card.title}
                </h3>
                <div className="space-y-3 text-[15px] leading-relaxed text-foreground/75 md:text-base">
                  {typeof card.description === 'string' ? <p>{card.description}</p> : card.description}
                </div>
                {card.buttonText && card.buttonHref ? (
                  <Button asChild variant="outline">
                    <Link href={card.buttonHref}>{card.buttonText}</Link>
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
