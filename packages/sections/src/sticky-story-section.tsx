"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import {
  domAnimation,
  LazyMotion,
  m,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
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

/** Animation model used by the desktop sticky story. */
export type StickyStoryMotionMode = "step" | "continuous";

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
  /** Discrete crossfades or scroll-progress-driven transitions on desktop. */
  motionMode?: StickyStoryMotionMode;
  className?: string;
}

type MotionRange = {
  input: number[];
  opacity: number[];
  y: number[];
};

type OpacityRange = Pick<MotionRange, "input" | "opacity">;

const ACTIVATION_POINT = 0.35;
const INACTIVE_OPACITY = 0.05;

function getStoryMotionRange(index: number, itemCount: number): MotionRange {
  if (itemCount <= 1 || index === 0) {
    return {
      input: [0, 1],
      opacity: [1, 1],
      y: [0, 0],
    };
  }

  const fadeWidth = Math.min(0.075, 1 / (itemCount * 5));
  const enterCenter = index / itemCount;

  return {
    input: [0, enterCenter - fadeWidth, enterCenter + fadeWidth, 1],
    opacity: [INACTIVE_OPACITY, INACTIVE_OPACITY, 1, 1],
    y: [64, 64, 0, 0],
  };
}

function getStoryMediaOpacityRange(
  index: number,
  itemCount: number,
): OpacityRange {
  if (itemCount <= 1) {
    return { input: [0, 1], opacity: [1, 1] };
  }

  const fadeWidth = Math.min(0.075, 1 / (itemCount * 5));
  const enterCenter = index / itemCount;
  const exitCenter = (index + 1) / itemCount;

  if (index === 0) {
    return {
      input: [0, exitCenter - fadeWidth, exitCenter + fadeWidth, 1],
      opacity: [1, 1, 0, 0],
    };
  }

  if (index === itemCount - 1) {
    return {
      input: [0, enterCenter - fadeWidth, enterCenter + fadeWidth, 1],
      opacity: [0, 0, 1, 1],
    };
  }

  return {
    input: [
      0,
      enterCenter - fadeWidth,
      enterCenter + fadeWidth,
      exitCenter - fadeWidth,
      exitCenter + fadeWidth,
      1,
    ],
    opacity: [0, 0, 1, 1, 0, 0],
  };
}

function useDesktopMediaQuery() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

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

function StoryStep({
  compact,
  continuous,
  index,
  item,
  itemCount,
  nextLabel,
  nextSectionId,
  onContinue,
  progress,
  setReference,
  staticLayout,
}: {
  compact: boolean;
  continuous: boolean;
  index: number;
  item: StickyStoryItem;
  itemCount: number;
  nextLabel?: string;
  nextSectionId?: string;
  onContinue: () => void;
  progress: MotionValue<number>;
  setReference: (node: HTMLElement | null) => void;
  staticLayout: boolean;
}) {
  const range = React.useMemo(
    () => getStoryMotionRange(index, itemCount),
    [index, itemCount],
  );
  const opacity = useTransform(progress, range.input, range.opacity);
  const y = useTransform(progress, range.input, range.y);

  return (
    <m.article
      id={item.id}
      ref={setReference}
      style={continuous ? { opacity, y } : undefined}
      className={cn(
        "sticky-story-step border-t border-border py-12 first:border-t-0 first:pt-0",
        !staticLayout && "lg:flex lg:items-center lg:border-t-0",
        staticLayout
          ? "lg:border-t lg:py-12 lg:first:border-t-0 lg:first:pt-0"
          : compact
            ? "lg:min-h-[58svh] lg:py-14 lg:first:pt-14"
            : "lg:min-h-[72svh] lg:py-20 lg:first:pt-20",
      )}
    >
      <StoryCopy
        item={item}
        nextLabel={nextLabel}
        canContinue={index < itemCount - 1 || Boolean(nextSectionId)}
        onContinue={onContinue}
      />

      <figure
        className={cn(
          "relative mt-10 aspect-[16/10] overflow-hidden border border-border bg-[#171820]",
          !staticLayout && "lg:hidden",
        )}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes={
            staticLayout
              ? "(min-width: 1024px) 70vw, calc(100vw - 2rem)"
              : "(max-width: 1023px) calc(100vw - 2rem), 1px"
          }
          priority={index === 0}
          className="object-contain object-center"
        />
      </figure>
    </m.article>
  );
}

function ContinuousStoryMedia({
  active,
  index,
  item,
  itemCount,
  progress,
}: {
  active: boolean;
  index: number;
  item: StickyStoryItem;
  itemCount: number;
  progress: MotionValue<number>;
}) {
  const range = React.useMemo(
    () => getStoryMediaOpacityRange(index, itemCount),
    [index, itemCount],
  );
  const opacity = useTransform(progress, range.input, range.opacity);

  return (
    <m.figure
      style={{ opacity }}
      aria-hidden={!active}
      className={cn("absolute inset-0", !active && "pointer-events-none")}
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
}

/**
 * Editorial scrollytelling section with normal document scrolling and a sticky
 * desktop media stage. Mobile and reduced-motion layouts keep each image next
 * to its own copy.
 */
export default function StickyStorySection({
  id,
  eyebrow,
  title,
  intro,
  items,
  nextSectionId,
  compact = false,
  motionMode = "step",
  className,
}: StickyStorySectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useDesktopMediaQuery();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const stepReferences = React.useRef<Array<HTMLElement | null>>([]);
  const storyTrackReference = React.useRef<HTMLDivElement>(null);
  const staticLayout = prefersReducedMotion === true;
  const continuous = motionMode === "continuous" && isDesktop && !staticLayout;
  const { scrollYProgress } = useScroll({
    target: storyTrackReference,
    offset: ["start 35%", "end 35%"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.25,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    if (motionMode !== "step" || staticLayout || items.length < 2) {
      return;
    }

    let frame = 0;

    const updateActiveStep = () => {
      frame = 0;
      if (!isDesktop) return;
      const marker = window.innerHeight * ACTIVATION_POINT;
      let nextIndex = 0;

      for (let index = 0; index < stepReferences.current.length; index += 1) {
        const step = stepReferences.current[index];
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
  }, [isDesktop, items.length, motionMode, staticLayout]);

  useMotionValueEvent(smoothScrollProgress, "change", (latestProgress) => {
    if (!continuous || items.length < 2) {
      return;
    }

    const nextIndex = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(latestProgress * items.length)),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const scrollToStep = React.useCallback(
    (index: number) => {
      const nextStep = stepReferences.current[index + 1];
      const fallback = nextSectionId
        ? document.getElementById(nextSectionId)
        : null;
      const target = nextStep ?? fallback;
      if (!target) return;

      target.scrollIntoView({
        behavior: staticLayout ? "auto" : "smooth",
        block: nextStep ? "center" : "start",
      });
    },
    [nextSectionId, staticLayout],
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

        <div
          ref={storyTrackReference}
          className={cn(
            !staticLayout &&
              "lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(32rem,1.22fr)] lg:gap-12 xl:gap-20",
          )}
        >
          <div>
            <LazyMotion features={domAnimation}>
              {items.map((item, index) => (
                <StoryStep
                  key={item.id}
                  compact={compact}
                  continuous={continuous}
                  index={index}
                  item={{ ...item, id: `${id ?? "story"}-${item.id}` }}
                  itemCount={items.length}
                  nextLabel={items[index + 1]?.title}
                  nextSectionId={nextSectionId}
                  onContinue={() => scrollToStep(index)}
                  progress={continuous ? smoothScrollProgress : scrollYProgress}
                  setReference={(node) => {
                    stepReferences.current[index] = node;
                  }}
                  staticLayout={staticLayout}
                />
              ))}
            </LazyMotion>
          </div>

          {!staticLayout ? (
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
                    {items.map((item, index) =>
                      motionMode === "continuous" ? (
                        <ContinuousStoryMedia
                          key={item.id}
                          active={index === activeIndex}
                          index={index}
                          item={item}
                          itemCount={items.length}
                          progress={smoothScrollProgress}
                        />
                      ) : (
                        <m.figure
                          key={item.id}
                          initial={false}
                          animate={{
                            opacity: index === activeIndex ? 1 : 0,
                          }}
                          transition={{ duration: 0.38, ease: "easeOut" }}
                          aria-hidden={index !== activeIndex}
                          className={cn(
                            "absolute inset-0",
                            index !== activeIndex && "pointer-events-none",
                          )}
                        >
                          <Image
                            src={item.imageSrc}
                            alt={index === activeIndex ? item.imageAlt : ""}
                            fill
                            sizes="(min-width: 1280px) 58vw, 52vw"
                            priority={index === 0}
                            className="object-contain object-center"
                          />
                        </m.figure>
                      ),
                    )}
                  </LazyMotion>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
