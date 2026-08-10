import { cn } from "@mardu/ui/lib/utils";

export interface CatalogSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function CatalogSectionHeader({
  eyebrow,
  title,
  description,
  className,
}: CatalogSectionHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-8 xl:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)] xl:items-start xl:gap-20",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
            [{eyebrow.toUpperCase()}]
          </p>
        ) : null}
        <h2 className="headline-balance mt-6 max-w-[18ch] text-[clamp(2.35rem,4vw,3.75rem)] font-light leading-none tracking-[-0.035em] text-foreground">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-[38rem] text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
