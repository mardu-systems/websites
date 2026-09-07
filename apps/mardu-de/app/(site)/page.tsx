import type { Metadata } from 'next';
import { Homepage } from '@/features/homepage/homepage';
import { faqItems } from '@/features/homepage/homepage-content';
import { JsonLd } from '@/components/seo/json-ld';
import { createFaqJsonLd } from '@/lib/seo';
import { getSiteFeatureFlags } from '@mardu/site-config/feature-flags.server';

const title = 'Mardu: Maschinenfreigabe, Zutritt und Zufahrt';
const description =
  'Mardu verbindet Maschinenfreigaben, Gebäudezutritt und Zufahrten mit einer zentralen Verwaltung für Identitäten und Berechtigungen.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    type: 'website',
    images: [
      {
        url: '/_A7_9072_quer.webp',
        width: 1200,
        height: 630,
        alt: 'Mardu-Maschinenfreigabe an einer Bestandsmaschine',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/_A7_9072_quer.webp'],
  },
};

export default async function HomePage() {
  const features = await getSiteFeatureFlags('mardu-de');

  return (
    <>
      <JsonLd data={createFaqJsonLd(faqItems)} />
      <Homepage features={features} />
    </>
  );
}
