"use client";

import { cn } from "../../lib/utils";
import {
  domAnimation,
  type HTMLMotionProps,
  LazyMotion,
  m,
  useReducedMotion,
} from "motion/react";

const DEFAULT_REVEAL_DISTANCE = 32;
const DEFAULT_REVEAL_DURATION = 0.75;
const DEFAULT_VIEWPORT_AMOUNT = 0.35;
const DEFAULT_VIEWPORT_MARGIN = "0px 0px -14% 0px" as const;
const REVEAL_EASING = [0.22, 1, 0.36, 1] as const;

const directionOffsets = {
  up: { axis: "y", sign: 1 },
  down: { axis: "y", sign: -1 },
  left: { axis: "x", sign: 1 },
  right: { axis: "x", sign: -1 },
} as const satisfies Record<string, { axis: "x" | "y"; sign: 1 | -1 }>;

export type ScrollRevealDirection = keyof typeof directionOffsets;

/**
 * Props for a one-time, viewport-triggered content reveal.
 *
 * Reduced-motion users receive the final layout immediately without an
 * offset, delay, or transition.
 */
export type ScrollRevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Reveal duration in seconds. */
  duration?: number;
  /** Visible share of the element required to start the reveal. */
  viewportAmount?: number;
  /** Intersection margin used to delay or advance the viewport trigger. */
  viewportMargin?: NonNullable<HTMLMotionProps<"div">["viewport"]>["margin"];
  /** Direction from which the content enters. */
  direction?: ScrollRevealDirection;
  /** Initial transform offset in pixels. */
  distance?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = DEFAULT_REVEAL_DURATION,
  viewportAmount = DEFAULT_VIEWPORT_AMOUNT,
  viewportMargin = DEFAULT_VIEWPORT_MARGIN,
  direction = "up",
  distance,
  ...props
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const { axis, sign } = directionOffsets[direction];
  const baseDistance = distance ?? DEFAULT_REVEAL_DISTANCE;
  const initialTransform =
    axis === "x"
      ? `translateX(${sign * baseDistance}px)`
      : `translateY(${sign * baseDistance}px)`;

  if (shouldReduceMotion) {
    return (
      <LazyMotion features={domAnimation}>
        <m.div className={cn(className)} {...props}>
          {children}
        </m.div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={cn(className)}
        initial={{ opacity: 0, transform: initialTransform }}
        whileInView={{ opacity: 1, transform: "none" }}
        transition={{ duration, delay, ease: REVEAL_EASING }}
        viewport={{
          once: true,
          amount: viewportAmount,
          margin: viewportMargin,
        }}
        {...props}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
