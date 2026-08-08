import type { Metadata } from 'next';
import { getPlatformRoadmapItems } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';
import { RoadmapPage } from '@/features/roadmap/roadmap-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Aktuelle Entwicklungsfelder von Mardu – von Hardware und Software bis zu Plattformfunktionen und Integrationen.',
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title: 'Roadmap | Mardu',
    description:
      'Welche Funktionen bereits verfügbar sind, woran Mardu arbeitet und welche Themen als Nächstes vorgesehen sind.',
    url: '/roadmap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Roadmap | Mardu',
    description:
      'Welche Funktionen bereits verfügbar sind, woran Mardu arbeitet und welche Themen als Nächstes vorgesehen sind.',
  },
};

export default async function RoadmapRoute() {
  const items = await getPlatformRoadmapItems(getPlatformOrigin(), 'mardu-de');

  return <RoadmapPage items={items} />;
}
