'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { cn } from '@/lib/utils';

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
    <section
      className={cn(
        'flex flex-col items-center px-4 md:px-8 py-12 md:py-24 bg-background text-foreground',
        className,
      )}
    >
      <div className="w-full max-w-7xl">
        {/* Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title ?? index} className="flex flex-col" delay={index * 0.1}>
              <motion.article
                layout
                className="flex flex-col h-full rounded-3xl"
                transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              >
                {/* Image */}
                <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-6 shadow-sm bg-muted">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 px-2 pb-6 md:px-0">
                  {/* Title */}
                  <h3 className="text-[24px] md:text-[28px] font-bold leading-[1.2] text-primary">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <div className="text-[16px] md:text-[18px] leading-[1.4] text-muted-foreground space-y-3">
                    {typeof card.description === 'string' ? (
                      <p>{card.description}</p>
                    ) : (
                      card.description
                    )}
                  </div>

                  {/* CTA Button */}
                  {card.buttonText && card.buttonHref && (
                    <div className="mt-2">
                      <Link
                        href={card.buttonHref}
                        className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {card.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
