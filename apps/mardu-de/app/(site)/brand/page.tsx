import type { Metadata } from 'next';
import { BrandAssetsPage, marduBrandAssetsPageContent } from '@mardu/sections';
import { getSiteConfig } from '@mardu/site-config';
import { MARDU_LOGO_DARK_PATH, MARDU_LOGO_LIGHT_PATH } from '@/lib/brand-assets';
import { createPageMetadata } from '@/lib/seo';

const siteConfig = getSiteConfig('mardu-de');
const brandAssetsPageContent = {
  ...marduBrandAssetsPageContent,
  description:
    'Freigegebene Logos und kompakte Anwendungsregeln für Presse, Partnerkommunikation und Marketingmaterialien.',
  downloadsDescription:
    'Beide Logo-Varianten liegen als skalierbare SVG-Datei vor. Wähle die Version passend zum Kontrast der vorgesehenen Fläche.',
  downloads: marduBrandAssetsPageContent.downloads.map((asset) =>
    asset.id === 'logo-light'
      ? {
          ...asset,
          fileName: 'mardu_logo_side_for_white_bg.svg',
          href: MARDU_LOGO_LIGHT_PATH,
          previewSrc: MARDU_LOGO_LIGHT_PATH,
        }
      : {
          ...asset,
          fileName: 'mardu_logo_side_for_black_bg.svg',
          href: MARDU_LOGO_DARK_PATH,
          previewSrc: MARDU_LOGO_DARK_PATH,
        },
  ),
  usageDescription: '',
  contactDescription: `Du benötigst ein Sonderformat oder möchtest eine Anwendung abstimmen? Du erreichst uns unter ${siteConfig.supportEmail} oder telefonisch unter ${siteConfig.contactPhone}.`,
  contactHref: `mailto:${siteConfig.supportEmail}?subject=Anfrage%20zu%20Brand%20Assets`,
};

export const metadata: Metadata = createPageMetadata({
  title: 'Markenressourcen',
  description: 'Brand-Assets und Verwendungsinfos für die Marke Mardu.',
  path: '/brand',
});

export default function BrandPage() {
  return <BrandAssetsPage content={brandAssetsPageContent} variant="editorial-index" />;
}
