import type { Metadata } from 'next';
import { CTASection } from '@mardu/sections';
import { getPlatformOrigin } from '@mardu/site-config';
import { isIntegrationsEnabled, isProductsEnabled } from '@mardu/site-config/feature-flags.server';
import { notFound } from 'next/navigation';
import { ProductsPage as ProductsPageContent } from '@/features/products/products-page';
import { createProductCatalogItems } from '@/features/products/products-page-content';
import { getCatalogCategories, getCatalogProductDetails } from '@/lib/catalog';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const productsMetadata: Metadata = createPageMetadata({
  title: 'Produkte',
  description:
    'Hardware, Identmedien und Zubehör für Mardu-Installationen – von der Maschine bis zum weiteren Zugangspunkt.',
  path: '/products',
});

export async function generateMetadata(): Promise<Metadata> {
  if (!(await isProductsEnabled('mardu-de'))) {
    return { title: 'Produkte nicht gefunden', robots: { index: false, follow: false } };
  }

  return productsMetadata;
}

export default async function ProductsPage() {
  if (!(await isProductsEnabled('mardu-de'))) {
    notFound();
  }

  const [categories, products, integrationsEnabled] = await Promise.all([
    getCatalogCategories(),
    getCatalogProductDetails(),
    isIntegrationsEnabled('mardu-de'),
  ]);
  const catalogProducts = createProductCatalogItems(categories, products, getPlatformOrigin());

  return (
    <main className="min-h-screen bg-background">
      <ProductsPageContent products={catalogProducts} />

      <CTASection
        title="Noch nicht sicher, welche Kombination passt?"
        description="Dann starte nicht mit einer Einzelposition. Gemeinsam klären wir den Zugangspunkt, die vorhandene Infrastruktur und die passende Produktkombination."
        primaryButtonText="Projekt besprechen"
        primaryButtonHref="/contact"
        secondaryButtonText={integrationsEnabled ? 'Integrationen ansehen' : undefined}
        secondaryButtonHref={integrationsEnabled ? '/integrations' : undefined}
      />
    </main>
  );
}
