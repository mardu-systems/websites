"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@mardu/ui/lib/utils";

export type EditorialPanelTheme = "dark" | "light";
export type EditorialPanelAccentTone = "emerald" | "amber" | "sky" | "stone";

export interface EditorialPanelItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  theme?: EditorialPanelTheme;
  imageObjectPosition?: string;
  accentTone?: EditorialPanelAccentTone;
}

export interface EditorialPanelsSectionProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: [EditorialPanelItem, EditorialPanelItem, EditorialPanelItem];
  className?: string;
}

const accentToneStyles: Record<EditorialPanelAccentTone, string> = {
  emerald:
    "bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_36%)] before:bg-emerald-500/10",
  amber:
    "bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.13),transparent_40%)] before:bg-amber-500/10",
  sky: "bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_38%)] before:bg-sky-500/10",
  stone:
    "bg-[radial-gradient(circle_at_top,rgba(120,113,108,0.12),transparent_40%)] before:bg-stone-500/10",
};

const themeStyles: Record<EditorialPanelTheme, string> = {
  dark: "border-black/12 bg-[#1A251A] text-white shadow-[0_20px_60px_rgba(17,24,16,0.18)] [&_.panel-badge]:border-white/14 [&_.panel-badge]:bg-white/10 [&_.panel-badge]:text-white/78 [&_.panel-copy]:text-white/78 [&_.panel-frame]:border-white/16 [&_.panel-frame]:bg-white/5",
  light:
    "border-black/10 bg-[#F7F1DF] text-foreground shadow-[0_18px_50px_rgba(15,23,42,0.06)] [&_.panel-badge]:border-black/10 [&_.panel-badge]:bg-white/78 [&_.panel-badge]:text-foreground/72 [&_.panel-copy]:text-foreground/72 [&_.panel-frame]:border-black/8 [&_.panel-frame]:bg-white/45",
};

export default function EditorialPanelsSection({
  eyebrow = "Produkt-Tour",
  title,
  intro,
  items,
  className,
}: EditorialPanelsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const maxScrollLeft = Math.max(0, node.scrollWidth - node.clientWidth);
    setCanScrollPrev(node.scrollLeft > 8);
    setCanScrollNext(node.scrollLeft < maxScrollLeft - 8);
  }, []);

  useEffect(() => {
    updateScrollState();

    const node = scrollRef.current;
    if (!node) return;

    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: "prev" | "next") => {
    const node = scrollRef.current;
    if (!node) return;

    const amount = Math.round(node.clientWidth * 0.88);
    node.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={cn("section-hairline py-20 md:py-24", className)}>
      <div className="mardu-container">
        <div className="mb-6 grid gap-3 md:mb-8 md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-start">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-foreground/46">
              {eyebrow}
            </p>
            <h2 className="max-w-[12ch] text-[clamp(2.1rem,10vw,3.4rem)] leading-[0.95] tracking-[-0.05em] text-foreground md:headline-balance md:max-w-none md:leading-[1.02] md:tracking-[-0.03em]">
              {title}
            </h2>
          </div>
          {intro ? (
            <p className="max-w-[34ch] text-sm leading-relaxed text-foreground/68 md:max-w-xl md:text-base">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mb-4 flex items-center justify-between gap-3 xl:hidden">
          <div />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              disabled={!canScrollPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-background text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Vorherige Karte anzeigen"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              disabled={!canScrollNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-background text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Nächste Karte anzeigen"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="-mx-4 overflow-x-auto pb-2 pl-4 pr-4 [scrollbar-width:none] md:mx-0 md:px-0 md:pb-0 xl:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex snap-x snap-mandatory gap-4 lg:gap-5 xl:grid xl:grid-cols-3">
            {items.map((item, index) => {
              const theme = item.theme ?? "light";
              const accentTone =
                item.accentTone ?? (theme === "dark" ? "emerald" : "amber");

              return (
                <article
                  key={item.id}
                  className={cn(
                    "group relative isolate flex min-h-[28rem] w-[84vw] max-w-[24rem] shrink-0 snap-start flex-col overflow-hidden border p-5 sm:w-[78vw] sm:max-w-[26rem] lg:min-h-[34rem] lg:w-[34rem] lg:max-w-none lg:p-6 xl:min-h-[42rem] xl:w-auto xl:shrink xl:p-8",
                    "before:pointer-events-none before:absolute before:inset-x-[14%] before:bottom-[16%] before:h-24 before:rounded-full before:blur-3xl",
                    themeStyles[theme],
                    accentToneStyles[accentTone],
                  )}
                >
                  <div className="relative z-10 max-w-[16rem] md:max-w-[20rem]">
                    <span className="panel-badge inline-flex rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] lg:text-[11px]">
                      {item.badge}
                    </span>
                    <h3 className="mt-5 max-w-[9ch] text-[clamp(1.7rem,7vw,2.4rem)] font-semibold leading-[0.95] tracking-[-0.05em] lg:mt-6 lg:max-w-[12ch] lg:text-[clamp(2rem,3vw,3rem)] lg:leading-[0.98] lg:tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <p className="panel-copy mt-4 max-w-[26ch] text-[15px] leading-relaxed lg:mt-5 lg:max-w-[28ch] lg:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "panel-frame relative mt-6 flex flex-1 items-end justify-center overflow-hidden rounded-[1.5rem] border px-3 pt-6 lg:mt-8 lg:rounded-[1.75rem] lg:px-4 lg:pt-10",
                      index === 0 ? "pb-0" : "pb-1 lg:pb-2",
                    )}
                  >
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/6 via-transparent to-transparent opacity-60" />
                    <div
                      className={cn(
                        "relative w-full",
                        index === 0 && "max-w-[18rem] lg:max-w-[28rem]",
                        index === 1 && "max-w-[9.5rem] lg:max-w-[14rem]",
                        index === 2 && "max-w-[13rem] lg:max-w-[19rem]",
                      )}
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={960}
                        height={1400}
                        priority={index === 0}
                        sizes="(max-width: 767px) 84vw, (max-width: 1279px) 44vw, 28vw"
                        className={cn(
                          "h-auto w-full select-none object-contain object-bottom transition-transform duration-500 ease-out group-hover:translate-y-[-4px] group-hover:scale-[1.015]",
                          index === 0 && "-mb-2",
                        )}
                        style={
                          item.imageObjectPosition
                            ? { objectPosition: item.imageObjectPosition }
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
