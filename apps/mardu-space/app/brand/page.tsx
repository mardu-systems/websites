import type { Metadata } from 'next';
import { BrandAssetsPage, marduSpaceBrandAssetsPageContent } from '@mardu/sections';
import { getSiteConfig } from '@mardu/site-config';

const siteConfig = getSiteConfig('mardu-space');
const brandAssetsPageContent = {
  ...marduSpaceBrandAssetsPageContent,
  contactDescription: `${marduSpaceBrandAssetsPageContent.contactDescription} Du erreichst uns per E-Mail unter ${siteConfig.supportEmail} oder telefonisch unter ${siteConfig.contactPhone}.`,
  contactHref: `mailto:${siteConfig.supportEmail}?subject=Anfrage%20zu%20Brand%20Assets`,
};

export const metadata: Metadata = {
  title: 'Markenressourcen',
  description: brandAssetsPageContent.description,
  alternates: {
    canonical: '/brand',
  },
  openGraph: {
    title: 'Markenressourcen | mardu.space',
    description: brandAssetsPageContent.description,
    url: '/brand',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Markenressourcen | mardu.space',
    description: brandAssetsPageContent.description,
  },
};

export default function BrandPage() {
  return <BrandAssetsPage content={brandAssetsPageContent} />;
}
