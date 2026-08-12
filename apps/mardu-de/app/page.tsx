import type { Metadata } from 'next';
import { Homepage } from '@/features/homepage/homepage';

const title = 'Maschine, Tür und Schranke. Zentral geregelt.';
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

export default function HomePage() {
  return <Homepage />;
}
