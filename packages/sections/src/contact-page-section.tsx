import type { ReactNode } from 'react';
import { Overline } from '@mardu/ui/components/typography';
import { cn } from '@mardu/ui/lib/utils';

/**
 * Render-ready DTO for the static contact details column.
 * Copy, addresses and labels stay app-owned.
 */
export interface ContactPageDetailsDto {
  intro: ReactNode;
  companyBlock: ReactNode;
  travelTitle?: ReactNode;
  travelContent?: ReactNode;
  contactTitle?: ReactNode;
  contactContent?: ReactNode;
}

/**
 * Shared contact page shell.
 * Apps pass page copy plus an app-owned form renderer to keep submit routes and
 * lead-source attribution outside of the package.
 */
export interface ContactPageSectionProps {
  overline: ReactNode;
  title: ReactNode;
  description: ReactNode;
  details: ContactPageDetailsDto;
  form: ReactNode;
  className?: string;
}

export default function ContactPageSection({
  overline,
  title,
  description,
  details,
  form,
  className,
}: ContactPageSectionProps) {
  return (
    <main
      className={cn(
        'min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]',
        className,
      )}
    >
      <section className="mardu-content-container w-full py-12 md:py-16">
        <header className="max-w-3xl space-y-4 pb-8">
          <Overline>{overline}</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            {title}
          </h1>
          <div className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {description}
          </div>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6 pt-2 text-base leading-relaxed text-foreground/85">
            <div>{details.intro}</div>
            <div className="space-y-1">{details.companyBlock}</div>

            {details.travelTitle || details.travelContent ? (
              <div className="space-y-2">
                {details.travelTitle ? (
                  <h2 className="text-lg font-semibold tracking-[-0.01em]">{details.travelTitle}</h2>
                ) : null}
                {details.travelContent ? <div>{details.travelContent}</div> : null}
              </div>
            ) : null}

            {details.contactTitle || details.contactContent ? (
              <div className="space-y-2">
                {details.contactTitle ? (
                  <h2 className="text-lg font-semibold tracking-[-0.01em]">{details.contactTitle}</h2>
                ) : null}
                {details.contactContent ? <div>{details.contactContent}</div> : null}
              </div>
            ) : null}
          </div>

          <div className="mx-auto w-full max-w-2xl">{form}</div>
        </div>
      </section>
    </main>
  );
}
