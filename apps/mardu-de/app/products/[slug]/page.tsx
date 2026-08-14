import type { Metadata } from 'next';
import { getPlatformOrigin } from '@mardu/site-config';
import { isProductsEnabled } from '@mardu/site-config/feature-flags.server';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { ProductDetailPage as ProductDetailPageContent } from '@/features/products/product-detail-page';
import { createProductCatalogItems } from '@/features/products/products-page-content';
import { getCatalogProductBySlug } from '@/lib/catalog';
import { createBreadcrumbJsonLd, createProductJsonLd } from '@/lib/seo';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ variant?: string | string[] }>;

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!(await isProductsEnabled('mardu-de'))) {
    return { title: 'Produkt nicht gefunden', robots: { index: false, follow: false } };
  }

  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    return { title: 'Produkt nicht gefunden', robots: { index: false, follow: false } };
  }

  const title = product.seoTitle ?? product.name;
  const description = product.seoDescription ?? product.summary;
  const canonical = product.canonicalUrl ?? `/products/${product.slug}`;
  const imageUrl = product.ogImageUrl ?? product.imageUrl;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, alt: product.ogImageAlt ?? product.imageAlt }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  if (!(await isProductsEnabled('mardu-de'))) {
    notFound();
  }

  const [{ slug }, variantParams] = await Promise.all([params, searchParams]);
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const catalogProduct = createProductCatalogItems([], [product], getPlatformOrigin())[0];
  const selectedVariantId =
    typeof variantParams.variant === 'string' ? variantParams.variant : undefined;

  if (!catalogProduct) {
    notFound();
  }

  return (
    <main>
      <JsonLd data={createProductJsonLd(product)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Produkte', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <ProductDetailPageContent
        product={catalogProduct}
        selectedVariantId={selectedVariantId}
      />
    </main>
  );
}
