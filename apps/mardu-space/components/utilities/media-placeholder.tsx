import { Boxes, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Placeholder DTO for media that is planned but not yet available as a final asset.
 * This keeps layout and storytelling stable until real product visuals are added.
 */
export type MediaPlaceholderProps = {
  title: string;
  description: string;
  badge?: string;
  icon?: LucideIcon;
  aspectRatioClassName?: string;
  className?: string;
};

export default function MediaPlaceholder({
  title,
  description,
  badge = 'Placeholder',
  icon: Icon = Boxes,
  aspectRatioClassName = 'aspect-[4/3]',
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border border-black/10 bg-card',
        aspectRatioClassName,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-background via-card to-muted/35" />
      <div className="pointer-events-none absolute -right-8 top-6 h-24 w-24 rounded-full bg-foreground/[0.04] blur-2xl" />
      <div className="pointer-events-none absolute -left-6 bottom-4 h-20 w-20 rounded-full bg-primary/8 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex border border-black/10 bg-background px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground/50">
            {badge}
          </span>
          <div className="flex h-10 w-10 items-center justify-center border border-black/10 bg-background">
            <Icon className="h-4.5 w-4.5 text-foreground/68" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
            {title}
          </h3>
          <p className="max-w-[34ch] text-sm leading-relaxed text-foreground/70 md:text-base">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4">
          <div className="h-2 border border-black/8 bg-background/70" />
          <div className="h-2 border border-black/8 bg-background/70" />
          <div className="h-2 border border-black/8 bg-background/70" />
        </div>
      </div>
    </div>
  );
}
