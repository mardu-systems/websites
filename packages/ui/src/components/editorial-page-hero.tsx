import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export interface EditorialPageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

/**
 * Shared top-level hero for Mardu's editorial marketing pages.
 * Keeps container width, heading hierarchy and vertical rhythm consistent.
 */
export function EditorialPageHero({
  eyebrow,
  title,
  description,
  actions,
  media,
  className,
  titleClassName,
  contentClassName,
}: EditorialPageHeroProps) {
  return (
    <section
      data-page-hero
      className={cn(
        "border-b border-border py-16 md:min-h-96 md:py-24",
        className,
      )}
    >
      <div className="mardu-container grid min-w-0 gap-12 xl:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)] xl:items-start xl:gap-20">
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
            {eyebrow}
          </p>
          <h1
            className={cn(
              "headline-balance mt-6 max-w-[18ch] text-[var(--font-size-h1-fluid)] font-light leading-[0.98] tracking-[-0.04em] text-foreground",
              titleClassName,
            )}
          >
            {title}
          </h1>
        </div>

        <div className={cn("min-w-0", contentClassName)}>
          {description ? (
            <div className="max-w-[38rem] text-base leading-relaxed text-muted-foreground">
              {typeof description === "string" ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </div>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          ) : null}
          {media ? <div className="mt-8 first:mt-0">{media}</div> : null}
        </div>
      </div>
    </section>
  );
}
