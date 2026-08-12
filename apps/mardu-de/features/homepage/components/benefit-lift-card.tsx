'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  domAnimation,
  LazyMotion,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { cn } from '@mardu/ui/lib/utils';

const DESKTOP_ENTRY_START = [0, 0.22, 0.58] as const;
const DESKTOP_ENTRY_END = [0.62, 0.84, 1] as const;
const COMPACT_ENTRY_START = [0, 0.08, 0.16] as const;
const COMPACT_ENTRY_END = [0.74, 0.86, 0.98] as const;
const DESKTOP_ENTRY_DISTANCE = [132, 164, 212] as const;
const COMPACT_ENTRY_DISTANCE = [72, 84, 96] as const;
const WILL_CHANGE_PROGRESS_EPSILON = 0.005;

interface BenefitLiftCardProps {
  children: ReactNode;
  className?: string;
  index: number;
}

function useDesktopMediaQuery() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return isDesktop;
}

/**
 * Scroll-linked card entrance inspired by Twenty's staggered rising panels.
 * The transform never changes document flow and reduced-motion users receive
 * the final card position immediately.
 */
export function BenefitLiftCard({ children, className, index }: BenefitLiftCardProps) {
  const cardReference = useRef<HTMLElement>(null);
  const transformActiveReference = useRef(false);
  const isDesktop = useDesktopMediaQuery();
  const prefersReducedMotion = useReducedMotion();
  const [isTransformActive, setIsTransformActive] = useState(false);
  const safeIndex = Math.min(Math.max(index, 0), DESKTOP_ENTRY_START.length - 1);
  const { scrollYProgress } = useScroll({
    target: cardReference,
    offset: ['start 94%', 'start 42%'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.22,
    restDelta: 0.001,
  });
  const inputRange = isDesktop
    ? [DESKTOP_ENTRY_START[safeIndex], DESKTOP_ENTRY_END[safeIndex]]
    : [COMPACT_ENTRY_START[safeIndex], COMPACT_ENTRY_END[safeIndex]];
  const entryDistance = isDesktop
    ? DESKTOP_ENTRY_DISTANCE[safeIndex]
    : COMPACT_ENTRY_DISTANCE[safeIndex];
  const y = useTransform(smoothProgress, inputRange, [entryDistance, 0]);

  useMotionValueEvent(smoothProgress, 'change', (latestProgress) => {
    const nextTransformActive =
      latestProgress > inputRange[0] + WILL_CHANGE_PROGRESS_EPSILON &&
      latestProgress < inputRange[inputRange.length - 1] - WILL_CHANGE_PROGRESS_EPSILON;

    if (transformActiveReference.current === nextTransformActive) {
      return;
    }

    transformActiveReference.current = nextTransformActive;
    setIsTransformActive(nextTransformActive);
  });

  if (prefersReducedMotion) {
    return (
      <article data-benefit-lift-card={safeIndex} className={cn(className)}>
        {children}
      </article>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        ref={cardReference}
        data-benefit-lift-card={safeIndex}
        style={{
          willChange: isTransformActive ? 'transform' : undefined,
          y,
        }}
        className={cn(className)}
      >
        {children}
      </m.article>
    </LazyMotion>
  );
}
