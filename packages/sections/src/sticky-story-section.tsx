"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import { Button } from "@mardu/ui/components/button";
import { cn } from "@mardu/ui/lib/utils";
import { SectionIntro } from "./section-intro";

/** A single text and media state in {@link StickyStorySection}. */
export interface StickyStoryItem {
  /** Stable DOM and React identifier. */
  id: string;
  /** Short visible sequence number, for example `01`. */
  index: string;
  /** Small contextual label above the heading. */
  label: string;
  /** Main statement for the story step. */
  title: string;
  /** Supporting explanation shown below the heading. */
  description: string;
  /** Optional emphasized closing statement. */
  emphasis?: string;
  /** Public Next.js image path. */
  imageSrc: string;
  /** Meaningful alternative text for the image. */
  imageAlt: string;
}

export interface StickyStorySectionProps {
  /** Section anchor used by page navigation. */
  id?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  items: ReadonlyArray<StickyStoryItem>;
  /** Optional page section reached by the final step button. */
  nextSectionId?: string;
  /** Reduces vertical travel when the story is part of a long editorial page. */
  compact?: boolean;
  className?: string;
}

const ACTIVATION_POINT = 0.42;

function StoryCopy({
  item,
  nextLabel,
  canContinue,
  onContinue,
}: {
  item: StickyStoryItem;
  nextLabel?: string;
  canContinue: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="max-w-[36rem]">
      <div className="flex items-center gap-3 text-xs tracking-[0.08em] text-mardu-purple">
        <span aria-hidden="true" className="size-1.5 bg-mardu-purple" />
        <span>[{item.index}]</span>
        <span>{item.label}</span>
      </div>
      <h3 className="mt-6 max-w-[14ch] text-[clamp(2rem,4.1vw,3.75rem)] font-light leading-[0.98] tracking-[-0.04em]">
        {item.title}
      </h3>
      <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-muted-foreground">
        {item.description}{" "}
        {item.emphasis ? (
          <strong className="font-medium text-foreground/82">
            {item.emphasis}
          </strong>
        ) : null}
      </p>
      {canContinue ? (
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={onContinue}
          className="mt-8 rounded-full border-foreground/20 bg-transparent shadow-none hover:border-mardu-purple hover:bg-transparent hover:text-mardu-purple"
          aria-label={
            nextLabel
              ? `Weiter zu ${nextLabel}`
              : "Zum nächsten Seitenabschnitt"
          }
        >
          <ArrowDown className="size-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}

/**
 * Editorial scrollytelling section with normal document scrolling and a sticky
 * desktop media stage. Mobile layouts keep each image next to its own copy.
 */
export default function StickyStorySection({
  id,
  eyebrow,
  title,
  intro,
  items,
  nextSectionId,
  compact = false,
  className,
}: StickyStorySectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const stepRefs = React.useRef<Array<HTMLElement | null>>([]);

  React.useEffect(() => {
    if (items.length < 2) return;

    let frame = 0;

    const updateActiveStep = () => {
      frame = 0;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const marker = window.innerHeight * ACTIVATION_POINT;
      let nextIndex = 0;

      for (let index = 0; index < stepRefs.current.length; index += 1) {
        const step = stepRefs.current[index];
        if (step && step.getBoundingClientRect().top <= marker) {
          nextIndex = index;
        }
      }

      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items.length]);

  const scrollToStep = React.useCallback(
    (index: number) => {
      const nextStep = stepRefs.current[index + 1];
      const fallback = nextSectionId
        ? document.getElementById(nextSectionId)
        : null;
      const target = nextStep ?? fallback;
      if (!target) return;

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: nextStep ? "center" : "start",
      });
    },
    [nextSectionId, prefersReducedMotion],
  );

  if (items.length === 0) return null;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-b border-border py-16",
        compact ? "md:py-20" : "md:py-24",
        className,
      )}
    >
      <div className="mardu-container">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          layout="stacked"
          className="mb-12 lg:mb-16"
          titleClassName="mardu-homepage-section-title max-w-[18ch]"
          introClassName="text-base"
          eyebrowClassName="text-xs text-mardu-purple"
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(32rem,1.22fr)] lg:gap-12 xl:gap-20">
          <div>
            {items.map((item, index) => (
              <article
                key={item.id}
                id={`${id ?? "story"}-${item.id}`}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className={cn(
                  "border-t border-border py-12 first:border-t-0 first:pt-0 lg:flex lg:items-center lg:border-t-0",
                  compact
                    ? "lg:min-h-[58svh] lg:py-14 lg:first:pt-14"
                    : "lg:min-h-[72svh] lg:py-20 lg:first:pt-20",
                )}
              >
                <StoryCopy
                  item={item}
                  nextLabel={items[index + 1]?.title}
                  canContinue={
                    index < items.length - 1 || Boolean(nextSectionId)
                  }
                  onContinue={() => scrollToStep(index)}
                />

                <figure className="relative mt-10 aspect-[16/10] overflow-hidden border border-border bg-[#171820] lg:hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 2rem), 1px"
                    priority={index === 0}
                    className="object-contain object-center"
                  />
                </figure>
              </article>
            ))}
          </div>

          <div className="hidden lg:block [container-type:inline-size]">
            <div
              className="h-full"
              style={{
                paddingTop: compact
                  ? "max(0px, calc((58svh - min(62.5cqw, 100svh - 10rem)) / 2))"
                  : "max(0px, calc((72svh - min(62.5cqw, 100svh - 10rem)) / 2))",
              }}
            >
              <div
                className="sticky aspect-[16/10] max-h-[calc(100svh-10rem)] overflow-hidden border border-border bg-[#171820]"
                style={{
                  top: "calc(50svh - min(31.25cqw, (100svh - 10rem) / 2))",
                }}
              >
                <LazyMotion features={domAnimation}>
                  {items.map((item, index) => {
                    const active = index === activeIndex;

                    return (
                      <m.figure
                        key={item.id}
                        initial={false}
                        animate={{
                          opacity: active ? 1 : 0,
                          scale: prefersReducedMotion ? 1 : active ? 1 : 0.985,
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.38,
                          ease: "easeOut",
                        }}
                        aria-hidden={!active}
                        className={cn(
                          "absolute inset-0",
                          !active && "pointer-events-none",
                        )}
                      >
                        <Image
                          src={item.imageSrc}
                          alt={active ? item.imageAlt : ""}
                          fill
                          sizes="(min-width: 1280px) 58vw, 52vw"
                          priority={index === 0}
                          className="object-contain object-center"
                        />
                      </m.figure>
                    );
                  })}
                </LazyMotion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
