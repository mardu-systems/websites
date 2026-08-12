import type { Metadata } from 'next';
import path from 'path';
import sharp from 'sharp';
import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import PhotoSwipeGallery, {
  type PhotoSwipeGalleryItem,
} from '@/components/utilities/photoswipe-gallery';
import { sitePhotoAssets } from '@/data/site-photos';

export const metadata: Metadata = {
  title: 'Fotos',
  description: 'Kuratiertes Fotoarchiv mit freigegebenem Presse- und Bildmaterial der Mardu GmbH.',
  alternates: {
    canonical: '/fotos',
  },
  openGraph: {
    title: 'Fotos | Mardu',
    description:
      'Kuratiertes Fotoarchiv mit freigegebenem Presse- und Bildmaterial der Mardu GmbH.',
    url: '/fotos',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fotos | Mardu',
    description:
      'Kuratiertes Fotoarchiv mit freigegebenem Presse- und Bildmaterial der Mardu GmbH.',
  },
};

async function getPhotoGalleryItems(): Promise<PhotoSwipeGalleryItem[]> {
  return Promise.all(
    sitePhotoAssets.map(async (photo) => {
      const filePath = path.join(process.cwd(), 'public', photo.src.replace(/^\//, ''));
      const metadata = await sharp(filePath).metadata();

      return {
        ...photo,
        width: metadata.width ?? 1600,
        height: metadata.height ?? 1200,
      };
    }),
  );
}

export default async function FotosPage() {
  const items = await getPhotoGalleryItems();

  return (
    <main className="min-h-screen bg-background pb-10 text-foreground">
      <EditorialPageHero
        eyebrow="[MEDIEN]"
        title="Fotos"
        description="Kuratiertes Presse- und Bildmaterial der Mardu GmbH."
      />

      <section className="mardu-container py-12 md:py-16" aria-label="Fotoarchiv">
        <div className="border-y border-border py-5 text-sm text-muted-foreground">
          <p className="max-w-2xl leading-relaxed">
            Bei Verwendung der Fotos bitte als Quelle{' '}
            <strong className="font-semibold text-foreground">Mardu GmbH</strong> angeben.
          </p>
        </div>

        <PhotoSwipeGallery items={items} className="pt-10 md:pt-12" />
      </section>
    </main>
  );
}
