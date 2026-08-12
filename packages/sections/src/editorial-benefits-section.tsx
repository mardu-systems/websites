"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@mardu/ui/lib/utils";
import { SectionIntro } from "./section-intro";
import type {
  EditorialPatternDensity,
  EditorialPatternGlyph,
  EditorialPatternTone,
} from "./editorial-link-panels-section";
import { EditorialShapePattern } from "./editorial-shape-pattern";

export type EditorialShapeAnchor = "top-left" | "top-center" | "top-right";
export type EditorialShapeFade =
  "diagonal" | "vertical" | "horizontal" | "none";
export type EditorialShapeSilhouette =
  "shield" | "flow" | "stack" | "check" | "grid-cutout" | "sliders" | "bridge";

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
  align?: "left" | "center";
  cta?: EditorialBenefitCta;
}

export interface EditorialBenefitsSectionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  items: [EditorialBenefitItem, EditorialBenefitItem, EditorialBenefitItem];
  className?: string;
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
  const align = item.align ?? "left";

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, transform: "translateY(24px)" }
      }
      whileInView={
        shouldReduceMotion ? undefined : { opacity: 1, transform: "none" }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className={cn(
        "group relative isolate flex min-h-[24.5rem] snap-start overflow-hidden rounded-[1.35rem] border border-black/12 bg-[#182418] p-5 text-white shadow-[0_20px_60px_rgba(10,18,12,0.18)] sm:min-h-[32rem] sm:p-6 md:p-7 xl:min-h-[36.5rem] xl:p-9",
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.08),transparent_40%)] before:content-[""]',
        'after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%,rgba(0,0,0,0.08))] after:content-[""]',
      )}
    >
      <EditorialShapePattern shape={item.shape} />

      <div
        className={cn(
          "relative z-10 mt-auto flex max-w-[19rem] flex-col gap-3.5 sm:max-w-104 sm:gap-4",
          align === "center"
            ? "mx-auto items-center text-center"
            : "items-start text-left",
        )}
      >
        {item.badge ? (
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">
            {item.badge}
          </p>
        ) : null}
        <h3 className="max-w-[9.5ch] text-[clamp(1.6rem,6vw,3rem)] leading-[0.98] tracking-[-0.045em] text-white sm:max-w-[10.5ch] sm:text-[clamp(1.9rem,2.8vw,3rem)]">
          {item.title}
        </h3>
        <div className="max-w-[30ch] text-[14px] leading-relaxed text-white/74 sm:max-w-[34ch] sm:text-[15px] md:text-base">
          {typeof item.description === "string" ? (
            <p>{item.description}</p>
          ) : (
            item.description
          )}
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
    <section className={cn("section-hairline py-18 md:py-24", className)}>
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
            <div
              key={item.id}
              className="min-w-[78vw] shrink-0 snap-center sm:min-w-[84vw] md:min-w-0"
            >
              <EditorialBenefitPanel item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
