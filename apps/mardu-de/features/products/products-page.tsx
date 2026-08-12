import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { ProductsExplorer } from './products-explorer';
import { productsPageIntro, type ProductExplorerCategoryViewModel } from './products-page-content';

export function ProductsPage({
  categories,
}: {
  categories: readonly ProductExplorerCategoryViewModel[];
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <EditorialPageHero
        eyebrow="[01 / PRODUKTE]"
        title={
          <>
            Hardware, die <EditorialAccent>Freigaben umsetzt.</EditorialAccent>
          </>
        }
        description={
          <p>
            {productsPageIntro.descriptionPrefix}{' '}
            <strong className="font-medium text-foreground">
              {productsPageIntro.descriptionEmphasis}
            </strong>
          </p>
        }
      />

      <section className="py-16 md:py-24" aria-label="Produkte nach Systemrolle">
        <div className="mardu-container">
          {categories.length > 0 ? (
            <ProductsExplorer categories={categories} />
          ) : (
            <p className="border-y border-border py-12 text-base text-muted-foreground">
              Derzeit sind keine Produkte veröffentlicht.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
