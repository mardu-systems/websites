import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/utils";

export type EditorialAccentProps = ComponentPropsWithoutRef<"em">;

/**
 * Shared editorial emphasis for marketing headlines.
 * Centralizes the serif, italic and brand-color treatment across public pages.
 */
export function EditorialAccent({ className, ...props }: EditorialAccentProps) {
  return (
    <em
      className={cn(
        "font-serif font-normal italic tracking-[-0.025em] text-mardu-purple",
        className,
      )}
      {...props}
    />
  );
}

type HeroHeadlineProps = {
  prefix: string;
  emphasis: string;
  suffix?: string;
  className?: string;
};

export function HeroHeadline({
  prefix,
  emphasis,
  suffix,
  className,
}: HeroHeadlineProps) {
  return (
    <h1
      className={cn(
        "headline-balance text-[clamp(2.25rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] text-foreground",
        className,
      )}
    >
      {prefix} <EditorialAccent>{emphasis}</EditorialAccent>
      {suffix ? ` ${suffix}` : ""}
    </h1>
  );
}

type OverlineProps = {
  children: ReactNode;
  className?: string;
};

export function Overline({ children, className }: OverlineProps) {
  return (
    <p
      className={cn(
        "text-xs uppercase tracking-[0.2em] text-foreground/55",
        className,
      )}
    >
      {children}
    </p>
  );
}
