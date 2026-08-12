import type { Metadata } from 'next';
import type { SolutionDetailDto } from '@mardu/content-core';
import { notFound } from 'next/navigation';
import { SolutionDetailHero } from '@mardu/solutions-ui';
import { DetailMarkdown } from '@/components/content/detail-markdown';
import { getSolutionBySlug } from '@/lib/solutions';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { createBreadcrumbJsonLd, createSolutionJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

function buildSolutionDetailMarkdown(solution: SolutionDetailDto) {
  if (solution.detailMarkdown) {
    return solution.detailMarkdown;
  }

  return [
    solution.problemBody,
    ...solution.contentBlocks.map(
      (block) =>
        `${block.eyebrow ? `## ${block.eyebrow}\n\n` : ''}### ${block.title}\n\n${block.body}`,
    ),
  ].join('\n\n');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: 'Lösung nicht gefunden',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = solution.canonicalUrl || `/solutions/${solution.slug}`;
  const socialImageUrl = solution.ogImageUrl || solution.heroImageUrl;
  const socialImageAlt = solution.ogImageAlt || solution.heroImageAlt;

  return {
    title: solution.seoTitle || solution.title,
    description: solution.seoDescription || solution.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: solution.seoTitle || `${solution.title} | Mardu`,
      description: solution.seoDescription || solution.summary,
      url: canonical,
      type: 'website',
      images: [{ url: socialImageUrl, alt: socialImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.seoTitle || `${solution.title} | Mardu`,
      description: solution.seoDescription || solution.summary,
      images: [socialImageUrl],
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }
  const detailMarkdown = buildSolutionDetailMarkdown(solution);

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={createSolutionJsonLd(solution)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Lösungen', path: '/solutions' },
          { name: solution.title, path: `/solutions/${solution.slug}` },
        ])}
      />
      <nav
        aria-label="Breadcrumb"
        className="mardu-container flex flex-wrap items-center gap-2 pt-8 text-sm text-foreground/65 md:pt-10"
      >
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/solutions">Lösungen</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page" className="text-foreground/90">
          {solution.title}
        </span>
      </nav>
      {solution.updatedAt ? (
        <p className="mardu-container mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/55">
          Aktualisiert am{' '}
          {new Date(solution.updatedAt).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      ) : null}

      <SolutionDetailHero solution={solution} />

      <section className="section-hairline py-16 md:py-20">
        <div className="mardu-container">
          <DetailMarkdown
            eyebrow="Anforderungen"
            title={solution.problemTitle}
            markdown={detailMarkdown}
          />
        </div>
      </section>
    </main>
  );
}
