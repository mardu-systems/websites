import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SolutionDetailHero } from '@mardu/solutions-ui';
import { DetailMarkdown } from '@/components/content/detail-markdown';
import { getSolutionBySlug, getSolutionSlugs } from '@/data/solutions';

function buildSolutionDetailMarkdown(solution: NonNullable<ReturnType<typeof getSolutionBySlug>>) {
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

export async function generateStaticParams() {
  return getSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {};
  }

  return {
    title: solution.title,
    description: solution.summary,
    alternates: {
      canonical: `/solutions/${solution.slug}`,
    },
    openGraph: {
      title: `${solution.title} | mardu.space`,
      description: solution.summary,
      url: `/solutions/${solution.slug}`,
      type: 'website',
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }
  const detailMarkdown = buildSolutionDetailMarkdown(solution);

  return (
    <main className="min-h-screen bg-background">
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
