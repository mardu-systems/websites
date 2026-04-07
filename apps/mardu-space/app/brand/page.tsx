import type { Metadata } from 'next';
import { BrandAssetsPage, marduSpaceBrandAssetsPageContent } from '@mardu/sections';

export const metadata: Metadata = {
  title: 'Markenressourcen',
  description: marduSpaceBrandAssetsPageContent.description,
  alternates: {
    canonical: '/brand',
  },
  openGraph: {
    title: 'Markenressourcen | mardu.space',
    description: marduSpaceBrandAssetsPageContent.description,
    url: '/brand',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Markenressourcen | mardu.space',
    description: marduSpaceBrandAssetsPageContent.description,
  },
};

export default function BrandPage() {
  return <BrandAssetsPage content={marduSpaceBrandAssetsPageContent} />;
}
