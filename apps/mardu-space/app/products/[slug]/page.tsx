import type { Metadata } from 'next';
import type { CatalogProductDetailDto } from '@mardu/content-core';
import { notFound } from 'next/navigation';
import {
  CatalogBreadcrumbs,
  CatalogProductDetailHero,
  CatalogStickyInquiryBar,
} from '@mardu/catalog-ui';
import { DetailMarkdown } from '@/components/content/detail-markdown';
import { buildCatalogInquiryHref, getCatalogProductBySlug, getCatalogProductSlugs } from '@/lib/catalog';

function buildProductDetailMarkdown(product: CatalogProductDetailDto) {
  if (product.detailMarkdown) {
    return product.detailMarkdown;
  }

  const parts: string[] = [product.overview];

  if (product.technologiesIntro) {
    parts.push(product.technologiesIntro);
  }

  if (product.carriersIntro) {
    parts.push(product.carriersIntro);
  }

  if (product.featureGroups.length > 0) {
    parts.push(
      ...product.featureGroups.map(
        (group) => `## ${group.title}\n\n${group.items.map((item) => `- ${item}`).join('\n')}`,
      ),
    );
  }

  if (product.specGroups.length > 0) {
    parts.push(
      ...product.specGroups.map(
        (group) =>
          `## ${group.title}\n\n${group.specs
            .map((spec) => `- **${spec.label}:** ${spec.value}`)
            .join('\n')}`,
      ),
    );
  }

  return parts.join('\n\n');
}

export async function generateStaticParams() {
  return (await getCatalogProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.summary,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle || `${product.name} | mardu.space`,
      description: product.seoDescription || product.summary,
      url: `/products/${product.slug}`,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const inquiryHref = buildCatalogInquiryHref(product);
  const detailMarkdown = buildProductDetailMarkdown(product);

  return (
    <main className="min-h-screen bg-background">
      <div className="mardu-container pt-24 pb-2 md:pt-28 md:pb-3">
        <CatalogBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Produkte', href: '/products' },
            { label: product.categoryName, href: `/products#category-${product.categoryId}` },
            { label: product.breadcrumbLabel || product.name },
          ]}
        />
      </div>

      <CatalogProductDetailHero
        product={product}
        inquiryHref={inquiryHref}
        configuratorHref="/configurator"
      />

      <section className="section-hairline py-16 md:py-20">
        <div className="mardu-container">
          <DetailMarkdown
            eyebrow="Produktkontext"
            title="Technik ist erst dann stark, wenn sie im Alltag sauber einzuordnen ist."
            markdown={detailMarkdown}
          />
        </div>
      </section>

      <CatalogStickyInquiryBar
        title={product.name}
        priceFromLabel={product.priceFromLabel}
        inquiryHref={inquiryHref}
        configuratorHref="/configurator"
      />
    </main>
  );
}
