import type { Metadata } from 'next';
import { BrandAssetsPage, marduBrandAssetsPageContent } from '@mardu/sections';
import { getSiteConfig } from '@mardu/site-config';

const siteConfig = getSiteConfig('mardu-de');
const brandAssetsPageContent = {
  ...marduBrandAssetsPageContent,
  contactDescription: `${marduBrandAssetsPageContent.contactDescription} Du erreichst uns per E-Mail unter ${siteConfig.supportEmail} oder telefonisch unter ${siteConfig.contactPhone}.`,
  contactHref: `mailto:${siteConfig.supportEmail}?subject=Anfrage%20zu%20Brand%20Assets`,
};

export const metadata: Metadata = {
  title: 'Markenressourcen | Mardu',
  description: 'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
  alternates: {
    canonical: '/brand',
  },
  openGraph: {
    title: 'Markenressourcen | Mardu',
    description: 'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
    url: '/brand',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Markenressourcen | Mardu',
    description: 'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
  },
};

export default function BrandPage() {
  return <BrandAssetsPage content={brandAssetsPageContent} />;
}
