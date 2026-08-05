import type { ReactNode } from 'react';
import { Overline } from '@mardu/ui/components/typography';
import { cn } from '@mardu/ui/lib/utils';

/**
 * Render-ready DTO for the static contact details column.
 * Copy, addresses and labels stay app-owned.
 */
export interface ContactPageDetailsDto {
  intro: ReactNode;
  addressTitle?: ReactNode;
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
  formTitle?: ReactNode;
  form: ReactNode;
  className?: string;
}

export default function ContactPageSection({
  overline,
  title,
  description,
  details,
  formTitle,
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
      <section className="mardu-container w-full py-12 md:py-16">
        <header className="max-w-3xl space-y-5 pb-10">
          <Overline className="text-mardu-purple">{overline}</Overline>
          <h1 className="headline-balance max-w-[15ch] text-[clamp(2.85rem,7.4vw,3.75rem)] font-light leading-[0.98] tracking-[-0.04em] text-foreground">
            {title}
          </h1>
          <div className="max-w-2xl text-base leading-relaxed text-foreground/68">
            {description}
          </div>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-base leading-relaxed text-foreground/72 [&_strong]:font-medium [&_strong]:text-foreground/90">
            {details.intro ? <div className="border-b border-black/15 pb-10">{details.intro}</div> : null}

            <section className="border-b border-black/15 py-10 first:pt-2">
              {details.addressTitle ? (
                <h2 className="mb-8 text-xs font-normal uppercase tracking-[0.08em] text-mardu-purple">
                  <span className="mr-1 text-[0.625rem] text-mardu-purple/70">[02]</span>
                  {details.addressTitle}
                </h2>
              ) : null}
              <div className="space-y-4">{details.companyBlock}</div>
            </section>

            {details.travelTitle || details.travelContent ? (
              <section className="border-b border-black/15 py-10">
                {details.travelTitle ? (
                  <h2 className="mb-8 text-xs font-normal uppercase tracking-[0.08em] text-mardu-purple">
                    <span className="mr-1 text-[0.625rem] text-mardu-purple/70">[03]</span>
                    {details.travelTitle}
                  </h2>
                ) : null}
                {details.travelContent ? (
                  <div className="space-y-5">{details.travelContent}</div>
                ) : null}
              </section>
            ) : null}

            {details.contactTitle || details.contactContent ? (
              <section className="py-10">
                {details.contactTitle ? (
                  <h2 className="mb-8 text-xs font-normal uppercase tracking-[0.08em] text-mardu-purple">
                    <span className="mr-1 text-[0.625rem] text-mardu-purple/70">[04]</span>
                    {details.contactTitle}
                  </h2>
                ) : null}
                {details.contactContent ? <div>{details.contactContent}</div> : null}
              </section>
            ) : null}
          </div>

          <section className="mx-auto w-full max-w-2xl lg:pt-2" aria-labelledby="contact-form-title">
            {formTitle ? (
              <h2
                id="contact-form-title"
                className="mb-8 text-xs font-normal uppercase tracking-[0.08em] text-mardu-purple"
              >
                <span className="mr-1 text-[0.625rem] text-mardu-purple/70">[01]</span>
                {formTitle}
              </h2>
            ) : null}
            {form}
          </section>
        </div>
      </section>
    </main>
  );
}
