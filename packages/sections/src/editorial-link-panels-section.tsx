'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@mardu/ui/lib/utils';
import { SectionIntro } from './section-intro';

export type EditorialPatternGlyph = 'chevron' | 'v' | 'bar';
export type EditorialPatternDensity = 'compact' | 'default' | 'airy';
export type EditorialPatternAnchor =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type EditorialPatternFade = 'diagonal' | 'vertical' | 'horizontal';
export type EditorialPatternTone = 'emerald' | 'sky' | 'violet' | 'mixed';

export interface EditorialPatternConfig {
  glyph?: EditorialPatternGlyph;
  density?: EditorialPatternDensity;
  anchor?: EditorialPatternAnchor;
  fade?: EditorialPatternFade;
  tone?: EditorialPatternTone;
}

export interface EditorialLinkPanelItem {
  id: string;
  title: string;
  description: ReactNode;
  href: string;
  ctaLabel: string;
  ariaLabel?: string;
  pattern?: EditorialPatternConfig;
  align?: 'left' | 'right';
  badge?: string;
}

export interface EditorialLinkPanelsSectionProps {
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  items: [EditorialLinkPanelItem, EditorialLinkPanelItem];
  className?: string;
}

const densityConfig: Record<EditorialPatternDensity, { rows: number; cols: number; gap: string }> = {
  compact: { rows: 10, cols: 11, gap: 'gap-2.5 md:gap-3 xl:gap-2.5' },
  default: { rows: 12, cols: 15, gap: 'gap-2.5 md:gap-3 xl:gap-2' },
  airy: { rows: 8, cols: 8, gap: 'gap-3.5' },
};

const glyphMap: Record<EditorialPatternGlyph, string> = {
  chevron: '>',
  v: 'v',
  bar: '|',
};

const toneClasses: Record<EditorialPatternTone, string[]> = {
  emerald: ['text-emerald-300/90'],
  sky: ['text-sky-300/90'],
  violet: ['text-violet-300/90'],
  mixed: [
    'text-emerald-300/90',
    'text-sky-300/90',
    'text-cyan-300/90',
    'text-violet-300/90',
  ],
};

const anchorClasses: Record<EditorialPatternAnchor, string> = {
  'top-left': 'left-5 top-5 items-start justify-start md:left-7 md:top-7',
  'top-right':
    'right-5 top-5 items-end justify-start md:right-12 md:top-1/2 md:-translate-y-1/2 xl:right-7 xl:top-7 xl:translate-y-0',
  'bottom-left':
    'bottom-5 left-5 items-start justify-end md:bottom-1/2 md:left-12 md:translate-y-1/2 xl:bottom-7 xl:left-7 xl:translate-y-0',
  'bottom-right': 'bottom-8 right-6 items-end justify-end md:bottom-10 md:right-9',
};

const frameClasses: Record<EditorialPatternAnchor, string> = {
  'top-left': 'h-[42%] w-[52%]',
  'top-right': 'h-[44%] w-[56%] md:h-[62%] md:w-[52%] xl:h-[42%] xl:w-[52%]',
  'bottom-left': 'h-[38%] w-[46%] md:h-[58%] md:w-[48%] xl:h-[34%] xl:w-[38%]',
  'bottom-right': 'h-[34%] w-[34%] md:h-[36%] md:w-[32%]',
};

const contentAlignmentClasses: Record<NonNullable<EditorialLinkPanelItem['align']>, string> = {
  left: 'items-start text-left',
  right: 'ml-auto items-end text-right',
};

function getRowCellCount(
  fade: EditorialPatternFade,
  rowIndex: number,
  rows: number,
  cols: number,
) {
  if (fade === 'vertical') {
    return cols;
  }

  const progress = rows === 1 ? 0 : rowIndex / (rows - 1);
  const reduction = fade === 'diagonal' ? 0.68 : 0.42;
  return Math.max(3, Math.round(cols - cols * reduction * progress));
}

function getCellOpacity(
  fade: EditorialPatternFade,
  rowIndex: number,
  colIndex: number,
  rowCells: number,
  rows: number,
) {
  if (fade === 'horizontal') {
    const progress = rowCells <= 1 ? 0 : colIndex / (rowCells - 1);
    return Math.max(0.32, 1 - progress * 0.62);
  }

  if (fade === 'vertical') {
    const progress = rows <= 1 ? 0 : rowIndex / (rows - 1);
    return Math.max(0.34, 1 - progress * 0.6);
  }

  return 1;
}

function EditorialPatternField({
  pattern,
}: {
  pattern?: EditorialPatternConfig;
}) {
  const {
    glyph = 'chevron',
    density = 'default',
    anchor = 'top-left',
    fade = 'diagonal',
    tone = 'mixed',
  } = pattern ?? {};

  const config = densityConfig[density];
  const glyphCharacter = glyphMap[glyph];
  const tones = toneClasses[tone];

  return (
    <div
      className={cn(
        'pointer-events-none absolute flex overflow-hidden',
        frameClasses[anchor],
        anchorClasses[anchor],
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'flex flex-col font-mono text-[clamp(0.82rem,1vw,1.02rem)] font-semibold uppercase leading-none tracking-[0.28em]',
          config.gap,
        )}
      >
        {Array.from({ length: config.rows }, (_, rowIndex) => {
          const rowCells = getRowCellCount(fade, rowIndex, config.rows, config.cols);

          return (
            <div
              key={`row-${rowIndex}`}
              className={cn(
                'flex',
                config.gap,
                anchor.endsWith('right') ? 'justify-end' : 'justify-start',
              )}
            >
              {Array.from({ length: rowCells }, (_, colIndex) => {
                const opacity = getCellOpacity(
                  fade,
                  rowIndex,
                  colIndex,
                  rowCells,
                  config.rows,
                );
                const toneClass = tones[(rowIndex + colIndex) % tones.length] ?? tones[0];

                return (
                  <span
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(
                      'select-none transition-transform duration-500 ease-out group-hover:translate-y-[-1px] group-hover:scale-[1.03]',
                      toneClass,
                    )}
                    style={{ opacity }}
                  >
                    {glyphCharacter}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EditorialPanelAction({
  href,
  label,
  ariaLabel,
}: {
  href: string;
  label: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 rounded-md border border-cyan-300/18 bg-cyan-400/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#051512] transition-all duration-300 hover:bg-cyan-300 hover:pr-5"
    >
      <span>{label}</span>
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

function EditorialLinkPanel({
  item,
  index,
}: {
  item: EditorialLinkPanelItem;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const align = item.align ?? 'left';
  const arrangedPattern: EditorialPatternConfig = {
    ...item.pattern,
    anchor: align === 'right' ? 'bottom-left' : 'top-right',
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={cn(
        'group relative isolate flex min-h-[30rem] overflow-hidden rounded-[1.35rem] border border-black/12 bg-[#182418] p-6 text-white shadow-[0_20px_60px_rgba(10,18,12,0.18)] sm:min-h-[34rem] md:p-7 xl:min-h-[40rem] xl:p-10',
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.08),transparent_38%)] before:content-[""]',
        'after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%,rgba(0,0,0,0.08))] after:content-[""]',
      )}
    >
      <EditorialPatternField pattern={arrangedPattern} />

      <div
        className={cn(
          'relative z-10 mt-auto flex max-w-[28rem] flex-col gap-4 md:my-auto md:max-w-[24rem] xl:mt-auto xl:mb-0 xl:max-w-[28rem]',
          contentAlignmentClasses[align],
        )}
      >
        {item.badge ? (
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">{item.badge}</p>
        ) : null}
        <h3 className="max-w-[11ch] text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] tracking-[-0.045em] text-white">
          {item.title}
        </h3>
        <div className="max-w-[34ch] text-[15px] leading-relaxed text-white/74 md:max-w-[30ch] md:text-base xl:max-w-[34ch]">
          {typeof item.description === 'string' ? <p>{item.description}</p> : item.description}
        </div>
        <EditorialPanelAction href={item.href} label={item.ctaLabel} ariaLabel={item.ariaLabel} />
      </div>
    </motion.article>
  );
}

export default function EditorialLinkPanelsSection({
  eyebrow = 'Vertiefung',
  title,
  intro,
  items,
  className,
}: EditorialLinkPanelsSectionProps) {
  return (
    <section className={cn('section-hairline py-20 md:py-24', className)}>
      <div className="mardu-container">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          titleClassName="text-[clamp(1.95rem,4vw,3.35rem)]"
        />

        <div className="grid gap-5 xl:grid-cols-2">
          {items.map((item, index) => (
            <EditorialLinkPanel key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
