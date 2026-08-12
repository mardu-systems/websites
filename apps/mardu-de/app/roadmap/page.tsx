import type { Metadata } from 'next';
import { getPlatformRoadmapItems } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';
import { RoadmapPage } from '@/features/roadmap/roadmap-page';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Roadmap',
  description:
    'Aktuelle Entwicklungsfelder von Mardu – von Hardware und Software bis zu Plattformfunktionen und Integrationen.',
  path: '/roadmap',
});

export default async function RoadmapRoute() {
  const items = await getPlatformRoadmapItems(getPlatformOrigin(), 'mardu-de');

  return <RoadmapPage items={items} />;
}
