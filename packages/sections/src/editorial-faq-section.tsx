import type { ReactNode } from "react";
import { cn } from "@mardu/ui/lib/utils";
import { Overline } from "@mardu/ui/components/typography";
import Faq, { type FaqItem } from "./faq";

export type EditorialFaqSectionProps = {
  eyebrow: string;
  title: ReactNode;
  items: ReadonlyArray<FaqItem>;
  titleId: string;
  sectionId?: string;
  className?: string;
};

/**
 * Shared editorial FAQ section used by Mardu marketing pages.
 * Content stays page-specific while layout, typography and accordion behavior remain consistent.
 */
export default function EditorialFaqSection({
  eyebrow,
  title,
  items,
  titleId,
  sectionId,
  className,
}: EditorialFaqSectionProps) {
  return (
    <section
      id={sectionId}
      className={cn("border-b border-border bg-card py-16 md:py-24", className)}
      aria-labelledby={titleId}
    >
      <div className="mardu-container grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:gap-18">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Overline variant="editorial">{eyebrow}</Overline>
          <h2
            id={titleId}
            className="mardu-homepage-section-title mt-6 max-w-[17ch]"
          >
            {title}
          </h2>
        </div>
        <Faq
          items={[...items]}
          variant="lined"
          className="[&_button]:min-h-12 [&_button]:text-left [&_button]:!text-[1.375rem] [&_button]:font-light [&_button]:leading-tight [&_button]:tracking-[-0.015em]"
        />
      </div>
    </section>
  );
}
