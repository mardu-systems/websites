import type { Metadata } from 'next';
import { BrandAssetsPage, marduBrandAssetsPageContent } from '@mardu/sections';

export const metadata: Metadata = {
  title: 'Brand Assets | Mardu',
  description:
    'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
  alternates: {
    canonical: '/brand',
  },
  openGraph: {
    title: 'Brand Assets | Mardu',
    description:
      'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
    url: '/brand',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Brand Assets | Mardu',
    description:
      'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
  },
};

export default function BrandPage() {
  return <BrandAssetsPage content={marduBrandAssetsPageContent} />;
}
