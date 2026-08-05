import { SolutionsExplorer } from './solutions-explorer';
import { solutionExplorerItems, solutionsPageIntro } from './solutions-page-content';

export function SolutionsPage() {
  return (
    <section className="border-t border-border bg-background pb-20 pt-32 md:pb-24 md:pt-36 xl:min-h-[calc(100svh-6rem)] xl:pb-28">
      <div className="w-full px-5 md:px-8 xl:px-6">
        <header>
          <h1 className="max-w-[18ch] pb-[0.08em] text-[clamp(2.35rem,4vw,3.75rem)] font-light leading-none tracking-[-0.035em] text-foreground">
            Lösungen für Ihren{' '}
            <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
              Anwendungsfall.
            </em>
          </h1>
          <p className="mt-10 max-w-[49rem] text-base leading-relaxed text-muted-foreground md:mt-12">
            {solutionsPageIntro.descriptionPrefix}{' '}
            <strong className="font-medium text-foreground">
              {solutionsPageIntro.descriptionEmphasis}
            </strong>
          </p>
        </header>

        <div className="mt-14 md:mt-18 xl:mt-16">
          <SolutionsExplorer items={solutionExplorerItems} />
        </div>
      </div>
    </section>
  );
}
