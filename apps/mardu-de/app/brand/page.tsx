import type { Metadata } from 'next';
import { BrandAssetsPage, marduBrandAssetsPageContent } from '@mardu/sections';
import { getSiteConfig } from '@mardu/site-config';

const siteConfig = getSiteConfig('mardu-de');
const brandAssetsPageContent = {
  ...marduBrandAssetsPageContent,
  description:
    'Freigegebene Logos und kompakte Anwendungsregeln für Presse, Partnerkommunikation und Marketingmaterialien.',
  downloadsDescription:
    'Beide Logo-Varianten liegen als skalierbare SVG-Datei vor. Wählen Sie die Version passend zum Kontrast der vorgesehenen Fläche.',
  usageDescription: '',
  contactDescription: `Sie benötigen ein Sonderformat oder möchten eine Anwendung abstimmen? Sie erreichen uns unter ${siteConfig.supportEmail} oder telefonisch unter ${siteConfig.contactPhone}.`,
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
  return <BrandAssetsPage content={brandAssetsPageContent} variant="editorial-index" />;
}
