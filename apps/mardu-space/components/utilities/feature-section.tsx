'use client';

import Image from 'next/image';
import * as React from 'react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { motion, useReducedMotion } from 'framer-motion';
import { MeetergoCTAButton } from './meetergo-cta-button';

export type FeatureSectionProps = {
  title: string | ReactNode;

  description: string | ReactNode;

  imageSrc: string;

  imageAlt: string;

  buttonText?: string;

  buttonHref?: string;

  backgroundColor?: string;

  className?: string;
};

export default function FeatureSection({
  className,
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  backgroundColor,
}: React.ComponentProps<'div'> & FeatureSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        'w-full py-12 md:py-16 lg:py-20 my-10 px-4 md:px-8 bg-primary text-primary-foreground',
        className,
      )}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <ScrollReveal className="space-y-6" direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold">{title}</h2>

            <div className="text-base md:text-lg leading-relaxed opacity-95 space-y-4">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>

            {buttonText && buttonHref && (
              <div className="pt-4">
                <MeetergoCTAButton>Jetzt Newsletter abonnieren</MeetergoCTAButton>
              </div>
            )}
          </ScrollReveal>

          {/* Right Column */}
          <ScrollReveal
            className="relative flex items-center justify-center"
            delay={0.1}
            direction="right"
          >
            <motion.div
              className="md:pl-10 lg:pl-12 md:pt-10 lg:pt-12 w-full max-w-150 rounded-2xl"
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.02, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              }
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={500}
                className="w-full h-auto object-contain rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
