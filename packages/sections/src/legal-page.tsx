// @ts-nocheck
import type { LegalPageDto } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';
import { cn } from '@mardu/ui/lib/utils';
import Markdown from 'react-markdown';

export type LegalPageProps = {
  page: LegalPageDto;
  className?: string;
  eyebrow?: string;
};

export function LegalPage({
  page,
  className,
  eyebrow = 'Rechtliches',
}: LegalPageProps) {
  return (
    <main
      className={cn(
        'pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]',
        className,
      )}
    >
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>{eyebrow}</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            {page.title}
          </h1>
          {page.summary ? (
            <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/72">{page.summary}</p>
          ) : null}
          {page.updatedLabel ? (
            <p className="text-sm text-foreground/60">Geändert: {page.updatedLabel}</p>
          ) : null}
        </div>

        <div className="space-y-6 pt-8 md:pt-10">
          <article className="prose max-w-none prose-headings:font-sans prose-headings:tracking-[-0.02em] prose-p:text-foreground/85 prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-3">
            <Markdown>{page.contentMarkdown}</Markdown>
          </article>
        </div>
      </section>
    </main>
  );
}
