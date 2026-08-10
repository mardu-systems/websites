import { EditorialAccent } from '@mardu/ui/components/typography';
import { SolutionsExplorer } from './solutions-explorer';
import { solutionsPageIntro, type SolutionExplorerViewModel } from './solutions-page-content';

export function SolutionsPage({ items }: { items: readonly SolutionExplorerViewModel[] }) {
  return (
    <section className="border-t border-border bg-background pb-20 pt-12 md:pb-24 md:pt-16 xl:min-h-[calc(100svh-6rem)] xl:pb-28">
      <div className="w-full px-5 md:px-8 xl:px-6">
        <header>
          <h1 className="max-w-[18ch] pb-[0.08em] text-[clamp(2.35rem,4vw,3.75rem)] font-light leading-none tracking-[-0.035em] text-foreground">
            Lösungen für deinen <EditorialAccent>Anwendungsfall.</EditorialAccent>
          </h1>
          <p className="mt-10 max-w-[49rem] text-base leading-relaxed text-muted-foreground md:mt-12">
            {solutionsPageIntro.descriptionPrefix}{' '}
            <strong className="font-medium text-foreground">
              {solutionsPageIntro.descriptionEmphasis}
            </strong>
          </p>
        </header>

        <div className="mt-14 md:mt-18 xl:mt-16">
          {items.length > 0 ? (
            <SolutionsExplorer items={items} />
          ) : (
            <p className="border-y border-border py-12 text-base text-muted-foreground">
              Derzeit sind keine Lösungen veröffentlicht.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
