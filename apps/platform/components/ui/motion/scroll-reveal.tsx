'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';

const directionOffsets = {
  up: { axis: 'y', sign: 1 },
  down: { axis: 'y', sign: -1 },
  left: { axis: 'x', sign: 1 },
  right: { axis: 'x', sign: -1 },
} as const satisfies Record<string, { axis: 'x' | 'y'; sign: 1 | -1 }>;

type Direction = keyof typeof directionOffsets;

export type ScrollRevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  duration?: number;
  viewportAmount?: number;
  direction?: Direction;
  distance?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  viewportAmount = 0.25,
  direction = 'up',
  distance,
  ...props
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const { axis, sign } = directionOffsets[direction];
  const baseDistance = distance ?? 32;
  const initialOffset = axis === 'x' ? { x: sign * baseDistance } : { y: sign * baseDistance };

  if (shouldReduceMotion) {
    return (
      <motion.div className={cn(className)} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: viewportAmount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
