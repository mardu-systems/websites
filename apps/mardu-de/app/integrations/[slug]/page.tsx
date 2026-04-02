import { BlogRichText } from '@mardu/blog-ui';
import {
  IntegrationCard,
  IntegrationDetailHero,
  IntegrationDetailSidebar,
} from '@mardu/integrations-ui';
import { isIntegrationsEnabled } from '@mardu/site-config';
import { getIntegrationBySlug, getRelatedIntegrations } from '@/lib/integrations';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = Promise<{ slug: string }>;

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!(await isIntegrationsEnabled('mardu-de'))) {
    return {
      title: 'Integration nicht gefunden',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { slug } = await params;
  const integration = await getIntegrationBySlug(slug);

  if (!integration) {
    return {
      title: 'Integration nicht gefunden',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = integration.seoTitle || `${integration.title} Integration | Mardu`;
  const description = integration.seoDescription || integration.shortDescription;
  const canonical = integration.canonicalUrl || `/integrations/${integration.slug}`;
  const socialImageUrl = integration.ogImageUrl || integration.heroImageUrl || integration.logoUrl;
  const socialImageAlt = integration.ogImageAlt || integration.heroImageAlt || integration.logoAlt;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: socialImageUrl
        ? [
            {
              url: socialImageUrl,
              alt: socialImageAlt || integration.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: socialImageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: socialImageUrl ? [socialImageUrl] : undefined,
    },
  };
}

export default async function IntegrationDetailPage({ params }: { params: Params }) {
  if (!(await isIntegrationsEnabled('mardu-de'))) {
    notFound();
  }

  const { slug } = await params;
  const integration = await getIntegrationBySlug(slug);

  if (!integration) {
    notFound();
  }

  const related = await getRelatedIntegrations(integration, 3);

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 md:pb-24">
      <section className="section-hairline py-8 md:py-12">
        <div className="mardu-container">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-foreground/65">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/integrations">Integrationen</Link>
            <span>›</span>
            <span className="text-foreground/90">{integration.title}</span>
          </div>

          <IntegrationDetailHero integration={integration} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
            <IntegrationDetailSidebar integration={integration} />

            <article>
              <div className="border-t border-black/10 pt-8">
                <BlogRichText content={integration.content} />
              </div>

              {integration.supportedActions.length > 0 ? (
                <section className="mt-8 border-t border-black/10 pt-6">
                  <h2 className="text-2xl leading-tight tracking-[-0.02em]">Was ist möglich?</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/75">
                    {integration.supportedActions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {integration.useCases.length > 0 ? (
                <section className="mt-8 border-t border-black/10 pt-6">
                  <h2 className="text-2xl leading-tight tracking-[-0.02em]">Typische Use Cases</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/75">
                    {integration.useCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="mt-8 border-t border-black/10 pt-6">
                <h2 className="text-2xl leading-tight tracking-[-0.02em]">Nächster Schritt</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {integration.docsUrl ? (
                    <a
                      href={integration.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-black/20 bg-foreground px-4 py-2 text-sm text-background"
                    >
                      Technische Details
                    </a>
                  ) : null}
                  {integration.requestUrl ? (
                    <a
                      href={integration.requestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-black/20 px-4 py-2 text-sm"
                    >
                      {integration.status === 'planned'
                        ? 'Interesse melden'
                        : 'Integration anfragen'}
                    </a>
                  ) : (
                    <Link href="/contact" className="border border-black/20 px-4 py-2 text-sm">
                      {integration.status === 'planned' ? 'Interesse melden' : 'Mehr erfahren'}
                    </Link>
                  )}
                </div>
              </section>

              {related.length > 0 ? (
                <section className="mt-10 border-t border-black/10 pt-6">
                  <h2 className="text-2xl leading-tight tracking-[-0.02em]">
                    Ähnliche Integrationen
                  </h2>
                  <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {related.map((item) => (
                      <IntegrationCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              ) : null}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
