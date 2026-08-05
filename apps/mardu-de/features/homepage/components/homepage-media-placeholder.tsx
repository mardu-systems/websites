import { ImageIcon, Maximize2 } from 'lucide-react';
import { cn } from '@mardu/ui/lib/utils';
import type { HomepageMediaBrief } from '../homepage-content';

interface HomepageMediaPlaceholderProps {
  brief: HomepageMediaBrief;
  className?: string;
  compact?: boolean;
  dark?: boolean;
}

/**
 * Visible production placeholder for homepage media that still needs to be photographed,
 * rendered or animated. The complete brief stays next to the intended layout position.
 */
export function HomepageMediaPlaceholder({
  brief,
  className,
  compact = false,
  dark = false,
}: HomepageMediaPlaceholderProps) {
  return (
    <figure
      role="img"
      aria-label={`Geplanter Medieninhalt: ${brief.title}. ${brief.brief}`}
      className={cn(
        'relative isolate flex min-h-72 overflow-hidden border p-6 sm:p-8',
        dark
          ? 'border-background/20 bg-foreground text-background'
          : 'border-border bg-muted text-foreground',
        compact && 'min-h-56',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-55',
          dark
            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,rgba(16,24,40,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,0.055)_1px,transparent_1px)]',
          'bg-size-[32px_32px]',
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          'pointer-events-none absolute -right-18 -top-18 size-56 rounded-full border',
          dark ? 'border-background/10' : 'border-border',
        )}
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full flex-col justify-between gap-12">
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              'inline-flex items-center gap-2 text-xs tracking-[0.08em]',
              dark ? 'text-background/60' : 'text-muted-foreground',
            )}
          >
            <ImageIcon className="size-4" aria-hidden="true" />[{brief.index}] Medienproduktion
          </span>
          <span
            className={cn(
              'border px-2 py-1 text-xs tracking-[0.06em]',
              dark
                ? 'border-background/20 text-background/60'
                : 'border-border text-muted-foreground',
            )}
          >
            {brief.type}
          </span>
        </div>

        <figcaption className="max-w-2xl">
          <h3
            className={cn(
              'max-w-[24ch] text-[1.375rem] font-light leading-tight tracking-[-0.02em]',
              dark ? 'text-background' : 'text-foreground',
            )}
          >
            {brief.title}
          </h3>
          <p
            className={cn(
              'mt-4 max-w-[46rem] text-base leading-relaxed',
              dark ? 'text-background/65' : 'text-muted-foreground',
            )}
          >
            {brief.brief}
          </p>
          <span
            className={cn(
              'mt-6 flex items-center gap-2 text-xs tracking-[0.06em]',
              dark ? 'text-background/50' : 'text-muted-foreground',
            )}
          >
            <Maximize2 className="size-3.5" aria-hidden="true" />
            {brief.format}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
