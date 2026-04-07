import type { Metadata } from 'next';
import { getPlatformOrigin } from '@mardu/site-config';
import { getPlatformRoadmapPhases } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';
import { RoadmapTimeline, type RoadmapMilestone } from '@mardu/sections';
import Markdown from 'react-markdown';

export const metadata: Metadata = {
  title: 'Roadmap & Ausblick',
  description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title: 'Roadmap & Ausblick | mardu.space',
    description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
    url: '/roadmap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Roadmap & Ausblick | mardu.space',
    description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
  },
};

export default async function RoadmapPage() {
  const phases = await getPlatformRoadmapPhases(getPlatformOrigin(), 'mardu-space');
  const items: RoadmapMilestone[] = phases.map((phase) => ({
    title: phase.title,
    time: phase.time,
    cards: phase.items.map((item) => ({
      title: item.title,
      description: (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-foreground/72 md:text-base">{item.summary}</p>
          <div className="prose prose-sm max-w-none prose-p:my-0 prose-p:text-foreground/85 prose-li:text-foreground/85 prose-strong:text-foreground prose-ul:my-0 prose-ul:pl-5 prose-a:text-foreground prose-a:underline prose-a:underline-offset-3 md:prose-base">
            <Markdown>{item.bodyMarkdown}</Markdown>
          </div>
        </div>
      ),
    })),
  }));

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Produkt</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Roadmap & Ausblick
          </h1>
          <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
            Unsere geplanten Features und Entwicklungsziele für mardu.space.
          </p>
        </div>

        {items.length > 0 ? (
          <RoadmapTimeline className="pt-8 md:pt-10" variant="plain" items={items} />
        ) : (
          <div className="pt-8 md:pt-10">
            <div className="border border-black/10 bg-card px-6 py-8 text-sm leading-relaxed text-foreground/72 md:px-8 md:py-10 md:text-base">
              Die öffentliche Roadmap wird gerade redaktionell in den neuen Payload-Workflow
              überführt. Inhalte folgen in Kürze.
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
