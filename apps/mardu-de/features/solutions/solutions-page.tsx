import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { SolutionsExplorer } from './solutions-explorer';
import { solutionsPageIntro, type SolutionExplorerViewModel } from './solutions-page-content';

export function SolutionsPage({ items }: { items: readonly SolutionExplorerViewModel[] }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <EditorialPageHero
        eyebrow="[02 / LÖSUNGEN]"
        title={
          <>
            Lösungen für deinen <EditorialAccent>Anwendungsfall.</EditorialAccent>
          </>
        }
        description={
          <p>
            {solutionsPageIntro.descriptionPrefix}{' '}
            <strong className="font-medium text-foreground">
              {solutionsPageIntro.descriptionEmphasis}
            </strong>
          </p>
        }
      />

      <section className="py-16 md:py-24" aria-label="Lösungen nach Einsatzbereich">
        <div className="mardu-container">
          {items.length > 0 ? (
            <SolutionsExplorer items={items} />
          ) : (
            <p className="border-y border-border py-12 text-base text-muted-foreground">
              Derzeit sind keine Lösungen veröffentlicht.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
