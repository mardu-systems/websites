'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@mardu/ui/lib/utils';
import { SectionIntro } from './section-intro';
import type {
  EditorialPatternDensity,
  EditorialPatternGlyph,
  EditorialPatternTone,
} from './editorial-link-panels-section';

export type EditorialShapeAnchor = 'top-left' | 'top-center' | 'top-right';
export type EditorialShapeFade = 'diagonal' | 'vertical' | 'horizontal' | 'none';
export type EditorialShapeSilhouette =
  | 'shield'
  | 'flow'
  | 'stack'
  | 'check'
  | 'grid-cutout'
  | 'sliders'
  | 'bridge';

export interface EditorialBenefitCta {
  href: string;
  label: string;
  ariaLabel?: string;
}

export interface EditorialShapeConfig {
  glyph?: EditorialPatternGlyph;
  tone?: EditorialPatternTone;
  density?: EditorialPatternDensity;
  silhouette: EditorialShapeSilhouette;
  anchor?: EditorialShapeAnchor;
  fade?: EditorialShapeFade;
}

export interface EditorialBenefitItem {
  id: string;
  title: ReactNode;
  description: ReactNode;
  badge?: string;
  shape: EditorialShapeConfig;
  align?: 'left' | 'center';
  cta?: EditorialBenefitCta;
}

export interface EditorialBenefitsSectionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  items: [EditorialBenefitItem, EditorialBenefitItem, EditorialBenefitItem];
  className?: string;
}

const densityConfig: Record<EditorialPatternDensity, { rows: number; cols: number; gap: string }> = {
  compact: { rows: 10, cols: 11, gap: 'gap-2.5' },
  default: { rows: 12, cols: 13, gap: 'gap-2' },
  airy: { rows: 9, cols: 9, gap: 'gap-3' },
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

const shapeAnchorClasses: Record<EditorialShapeAnchor, string> = {
  'top-left': 'left-5 top-5 items-start justify-start md:left-7 md:top-7',
  'top-center': 'left-1/2 top-5 -translate-x-1/2 items-center justify-start md:top-7',
  'top-right': 'right-5 top-5 items-end justify-start md:right-7 md:top-7',
};

const shapeFrameClasses: Record<EditorialShapeAnchor, string> = {
  'top-left': 'h-[28%] w-[42%] md:h-[29%] md:w-[40%]',
  'top-center': 'h-[27%] w-[38%] md:h-[28%] md:w-[36%]',
  'top-right': 'h-[28%] w-[42%] md:h-[29%] md:w-[40%]',
};

function getFadeOpacity(
  fade: EditorialShapeFade,
  rowIndex: number,
  colIndex: number,
  rows: number,
  cols: number,
) {
  if (fade === 'none') {
    return 1;
  }

  if (fade === 'vertical') {
    const progress = rows <= 1 ? 0 : rowIndex / (rows - 1);
    return Math.max(0.34, 1 - progress * 0.58);
  }

  if (fade === 'horizontal') {
    const progress = cols <= 1 ? 0 : colIndex / (cols - 1);
    return Math.max(0.34, 1 - progress * 0.58);
  }

  const rowProgress = rows <= 1 ? 0 : rowIndex / (rows - 1);
  const colProgress = cols <= 1 ? 0 : colIndex / (cols - 1);
  return Math.max(0.36, 1 - (rowProgress + colProgress) * 0.34);
}

function isShapeCellVisible(
  silhouette: EditorialShapeSilhouette,
  rowIndex: number,
  colIndex: number,
  rows: number,
  cols: number,
) {
  const center = (cols - 1) / 2;
  const distanceFromCenter = Math.abs(colIndex - center);

  switch (silhouette) {
    case 'shield': {
      if (rowIndex <= rows * 0.14) {
        return distanceFromCenter <= cols * 0.28;
      }

      if (rowIndex <= rows * 0.58) {
        const progress = (rowIndex - rows * 0.14) / Math.max(1, rows * 0.44);
        const halfWidth = cols * (0.34 - progress * 0.08);
        return distanceFromCenter <= halfWidth;
      }

      const taperProgress = (rowIndex - rows * 0.58) / Math.max(1, rows * 0.42);
      const halfWidth = cols * (0.24 - taperProgress * 0.17);
      return distanceFromCenter <= Math.max(0.9, halfWidth);
    }

    case 'flow': {
      const shaft =
        rowIndex >= rows * 0.38 &&
        rowIndex <= rows * 0.62 &&
        colIndex >= 1 &&
        colIndex <= cols * 0.66;
      const arrowHead =
        colIndex >= cols * 0.56 &&
        Math.abs(rowIndex - rows * 0.5) <= Math.max(0.9, (cols - colIndex) * 0.38);
      const inletBars =
        colIndex <= cols * 0.14 &&
        rowIndex >= rows * 0.22 &&
        rowIndex <= rows * 0.78 &&
        rowIndex % 2 === 0;

      return shaft || arrowHead || inletBars;
    }

    case 'stack': {
      const topBand =
        rowIndex >= rows * 0.14 &&
        rowIndex <= rows * 0.26 &&
        colIndex >= 2 &&
        colIndex <= cols - 2;
      const middleBand =
        rowIndex >= rows * 0.42 &&
        rowIndex <= rows * 0.54 &&
        colIndex >= 3 &&
        colIndex <= cols - 2;
      const bottomBand =
        rowIndex >= rows * 0.7 &&
        rowIndex <= rows * 0.82 &&
        colIndex >= 4 &&
        colIndex <= cols - 3;

      return topBand || middleBand || bottomBand;
    }

    case 'sliders': {
      const sliderColumns = [2, 6, 10];
      const sliderRows = [
        { row: Math.round(rows * 0.28), knobStart: 1, knobEnd: 4 },
        { row: Math.round(rows * 0.5), knobStart: 5, knobEnd: 8 },
        { row: Math.round(rows * 0.72), knobStart: 8, knobEnd: 11 },
      ];

      const rails = sliderRows.some(
        ({ row }) =>
          Math.abs(rowIndex - row) <= 0.6 && colIndex >= 1 && colIndex <= cols - 2,
      );
      const knobs = sliderRows.some(
        ({ row, knobStart, knobEnd }) =>
          rowIndex >= row - 1 &&
          rowIndex <= row + 1 &&
          colIndex >= knobStart &&
          colIndex <= knobEnd,
      );
      const stems = sliderColumns.some(
        (stemCol) =>
          Math.abs(colIndex - stemCol) <= 0.45 &&
          rowIndex >= rows * 0.2 &&
          rowIndex <= rows * 0.8,
      );

      return rails || knobs || stems;
    }

    case 'bridge': {
      const leftBlock =
        rowIndex >= rows * 0.24 &&
        rowIndex <= rows * 0.72 &&
        colIndex >= 1 &&
        colIndex <= cols * 0.24;
      const rightBlock =
        rowIndex >= rows * 0.24 &&
        rowIndex <= rows * 0.72 &&
        colIndex >= cols * 0.76 &&
        colIndex <= cols - 2;
      const centerBridge =
        rowIndex >= rows * 0.44 &&
        rowIndex <= rows * 0.56 &&
        colIndex >= cols * 0.24 &&
        colIndex <= cols * 0.76;
      const bridgeStem =
        Math.abs(colIndex - center) <= 0.6 &&
        rowIndex >= rows * 0.3 &&
        rowIndex <= rows * 0.7;

      return leftBlock || rightBlock || centerBridge || bridgeStem;
    }

    case 'check': {
      const leftLeg = Math.abs(rowIndex - (rows * 0.56 + colIndex * 0.9)) <= 1.15;
      const rightLeg =
        Math.abs(rowIndex - (rows * 0.9 - colIndex * 0.72)) <= 1.15 && colIndex >= cols * 0.34;
      return leftLeg || rightLeg;
    }

    case 'grid-cutout': {
      const withinFrame =
        rowIndex >= 1 &&
        rowIndex <= rows - 2 &&
        colIndex >= 1 &&
        colIndex <= cols - 2;
      const cutout =
        rowIndex >= rows * 0.3 &&
        rowIndex <= rows * 0.68 &&
        colIndex >= cols * 0.36 &&
        colIndex <= cols * 0.7;
      return withinFrame && !cutout;
    }
  }
}

function EditorialShapePattern({
  shape,
}: {
  shape: EditorialShapeConfig;
}) {
  const {
    glyph = 'chevron',
    tone = 'mixed',
    density = 'default',
    silhouette,
    anchor = 'top-left',
    fade = 'diagonal',
  } = shape;

  const config = densityConfig[density];
  const glyphCharacter = glyphMap[glyph];
  const tones = toneClasses[tone];

  return (
    <div
      className={cn(
        'pointer-events-none absolute flex overflow-hidden',
        shapeFrameClasses[anchor],
        shapeAnchorClasses[anchor],
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'grid font-mono text-[clamp(0.78rem,0.96vw,0.98rem)] font-semibold uppercase leading-none tracking-[0.24em]',
          config.gap,
        )}
        style={{
          gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: config.rows * config.cols }, (_, index) => {
          const rowIndex = Math.floor(index / config.cols);
          const colIndex = index % config.cols;
          const visible = isShapeCellVisible(
            silhouette,
            rowIndex,
            colIndex,
            config.rows,
            config.cols,
          );

          if (!visible) {
            return <span key={`empty-${index}`} className="opacity-0" />;
          }

          const opacity = getFadeOpacity(fade, rowIndex, colIndex, config.rows, config.cols);
          const toneClass = tones[(rowIndex + colIndex) % tones.length] ?? tones[0];

          return (
            <span
              key={`cell-${index}`}
              className={cn(
                'select-none justify-self-center transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:scale-[1.03]',
                toneClass,
              )}
              style={{ opacity }}
            >
              {glyphCharacter}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function EditorialBenefitAction({ cta }: { cta: EditorialBenefitCta }) {
  return (
    <Link
      href={cta.href}
      aria-label={cta.ariaLabel}
      className="inline-flex items-center gap-2 border border-cyan-300/18 bg-cyan-400/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#051512] transition-all duration-300 hover:bg-cyan-300 hover:pr-5"
    >
      <span>{cta.label}</span>
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

function EditorialBenefitPanel({
  item,
  index,
}: {
  item: EditorialBenefitItem;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const align = item.align ?? 'left';

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={cn(
        'group relative isolate flex min-h-[24.5rem] snap-start overflow-hidden rounded-[1.35rem] border border-black/12 bg-[#182418] p-5 text-white shadow-[0_20px_60px_rgba(10,18,12,0.18)] sm:min-h-[32rem] sm:p-6 md:p-7 xl:min-h-[36.5rem] xl:p-9',
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.08),transparent_40%)] before:content-[""]',
        'after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%,rgba(0,0,0,0.08))] after:content-[""]',
      )}
    >
      <EditorialShapePattern shape={item.shape} />

      <div
        className={cn(
          'relative z-10 mt-auto flex max-w-[19rem] flex-col gap-3.5 sm:max-w-104 sm:gap-4',
          align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        )}
      >
        {item.badge ? (
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">{item.badge}</p>
        ) : null}
        <h3 className="max-w-[9.5ch] text-[clamp(1.6rem,6vw,3rem)] leading-[0.98] tracking-[-0.045em] text-white sm:max-w-[10.5ch] sm:text-[clamp(1.9rem,2.8vw,3rem)]">
          {item.title}
        </h3>
        <div className="max-w-[30ch] text-[14px] leading-relaxed text-white/74 sm:max-w-[34ch] sm:text-[15px] md:text-base">
          {typeof item.description === 'string' ? <p>{item.description}</p> : item.description}
        </div>
        {item.cta ? <EditorialBenefitAction cta={item.cta} /> : null}
      </div>
    </motion.article>
  );
}

export default function EditorialBenefitsSection({
  eyebrow,
  title,
  intro,
  items,
  className,
}: EditorialBenefitsSectionProps) {
  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          className="md:items-center md:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)]"
          introClassName="md:justify-self-start md:self-center"
        />

        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 xl:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.id} className="min-w-[78vw] shrink-0 snap-center sm:min-w-[84vw] md:min-w-0">
              <EditorialBenefitPanel item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
