import type { Metadata } from 'next';
import { CTASection } from '@mardu/sections';
import { CatalogCarrierGrid, CatalogTechnologyGrid } from '@mardu/catalog-ui';
import { getPlatformOrigin } from '@mardu/site-config';
import { ProductsPage as ProductsPageContent } from '@/features/products/products-page';
import { createProductExplorerCategories } from '@/features/products/products-page-content';
import {
  getCatalogCarriers,
  getCatalogCategories,
  getCatalogProducts,
  getCatalogTechnologies,
} from '@/lib/catalog';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Produkte',
  description:
    'Hardware, Identmedien und Zubehör für Mardu-Installationen – von der Maschine bis zum weiteren Zugangspunkt.',
  path: '/products',
});

export default async function ProductsPage() {
  const [categories, technologies, carriers, products] = await Promise.all([
    getCatalogCategories(),
    getCatalogTechnologies(),
    getCatalogCarriers(),
    getCatalogProducts(),
  ]);
  const explorerCategories = createProductExplorerCategories(
    categories,
    products,
    getPlatformOrigin(),
  );

  return (
    <main className="min-h-screen bg-background">
      <ProductsPageContent categories={explorerCategories} />

      <CatalogTechnologyGrid
        eyebrow="Technologien"
        title="Technologien, die Produkte und Freigabelogik im Hintergrund tragen"
        description="NFC, RFID, mobile Keys und Funkstandards sind hier keine Bühne für sich. Sie helfen zu verstehen, welche Produkte und Träger in einem Projekt zusammenwirken."
        items={technologies}
      />

      <CatalogCarrierGrid
        eyebrow="Credentials"
        title="Träger und Credentials für unterschiedliche Ausgabe- und Nutzungsszenarien"
        description="Von günstigen NFC-Tags bis zu robusten Key Fobs oder mobilen Keys. Diese Ebene erklärt die Identitätsseite des Systems und ihre Verbindung zur Software und den Zugriffspunkten."
        items={carriers}
      />

      <CTASection
        title="Noch nicht sicher, welche Kombination passt?"
        description="Dann starte nicht mit einer Einzelposition. Gemeinsam klären wir den Zugangspunkt, die vorhandene Infrastruktur und die passende Produktkombination."
        primaryButtonText="Projekt besprechen"
        primaryButtonHref="/contact"
        secondaryButtonText="Integrationen ansehen"
        secondaryButtonHref="/integrations"
      />
    </main>
  );
}
