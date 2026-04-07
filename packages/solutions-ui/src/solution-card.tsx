import Image from 'next/image';
import Link from 'next/link';
import type { SolutionListItemDto, SolutionThemeTone } from '@mardu/content-core';
import { Badge } from '@mardu/ui/components/badge';
import { cn } from '@mardu/ui/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export interface SolutionCardProps {
  solution: SolutionListItemDto;
  href: string;
  className?: string;
}

const toneClasses: Record<SolutionThemeTone, string> = {
  forest:
    'bg-[radial-gradient(circle_at_top_left,rgba(40,99,68,0.13),transparent_30%),linear-gradient(180deg,#fbf8ef_0%,#f7f1df_100%)]',
  sand:
    'bg-[radial-gradient(circle_at_top_left,rgba(214,171,84,0.14),transparent_30%),linear-gradient(180deg,#fbf8ef_0%,#f7f1df_100%)]',
  mist:
    'bg-[radial-gradient(circle_at_top_left,rgba(75,136,168,0.12),transparent_30%),linear-gradient(180deg,#fbf8ef_0%,#f6f3ea_100%)]',
  clay:
    'bg-[radial-gradient(circle_at_top_left,rgba(168,102,69,0.13),transparent_30%),linear-gradient(180deg,#fbf8ef_0%,#f6efe7_100%)]',
  ink: 'bg-[radial-gradient(circle_at_top_left,rgba(62,74,122,0.13),transparent_30%),linear-gradient(180deg,#fbf8ef_0%,#f3f1ea_100%)]',
};

export function SolutionCard({ solution, href, className }: SolutionCardProps) {
  const tone = solution.themeTone ?? 'sand';

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden border border-black/10 shadow-[0_24px_60px_rgba(15,23,42,0.06)] transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-safe:hover:-translate-y-1',
        toneClasses[tone],
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-22 border-b border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />

      <div className="relative aspect-[6/5] overflow-hidden border-b border-black/8 bg-white/25">
        <Image
          src={solution.imageUrl}
          alt={solution.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, (max-width: 1919px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_72%,rgba(255,248,228,0.08)_100%)]" />
      </div>

      <div className="relative flex flex-1 flex-col gap-3 px-4 py-4 md:px-5 md:py-5">
        <div className="flex items-start justify-between gap-3">
          {solution.badge ? (
            <Badge
              variant="outline"
              className="rounded-full border-black/10 bg-white/72 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground/66"
            >
              {solution.badge}
            </Badge>
          ) : (
            <span />
          )}
          <ArrowUpRight
            className="mt-1 h-4 w-4 text-foreground/42 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 space-y-2.5">
          <h2 className="max-w-full overflow-hidden text-[clamp(1.7rem,2.5vw,2.7rem)] leading-[0.96] tracking-[-0.045em] text-foreground [overflow-wrap:anywhere]">
            {solution.title}
          </h2>
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-foreground/72">
            {solution.tagline}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/48">
            Mehr erfahren
          </span>
        </div>
      </div>
    </Link>
  );
}
