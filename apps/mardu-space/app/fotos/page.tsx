import type { Metadata } from 'next';
import path from 'path';
import sharp from 'sharp';
import { Overline } from '@/components/ui/typography';
import PhotoSwipeGallery, {
  type PhotoSwipeGalleryItem,
} from '@/components/utilities/photoswipe-gallery';
import { sitePhotoAssets } from '@/data/site-photos';

export const metadata: Metadata = {
  title: 'Fotos',
  description:
    'Kuratiertes Fotoarchiv mit allen fotografischen Motiven, die aktuell auf mardu.space erscheinen.',
  alternates: {
    canonical: '/fotos',
  },
  openGraph: {
    title: 'Fotos | mardu.space',
    description:
      'Kuratiertes Fotoarchiv mit allen fotografischen Motiven, die aktuell auf mardu.space erscheinen.',
    url: '/fotos',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fotos | mardu.space',
    description:
      'Kuratiertes Fotoarchiv mit allen fotografischen Motiven, die aktuell auf mardu.space erscheinen.',
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
    <main className="min-h-screen bg-background pb-10 pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] text-foreground">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Medien</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Fotos
          </h1>
          <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
            Presse- und Bildmaterial von mardu.space.
          </p>
        </div>

        <div className="mt-8 border border-black/10 bg-muted/35 p-5 text-sm text-foreground/72 md:mt-10">
          <p className="max-w-2xl leading-relaxed">
            Bei Verwendung der Fotos bitte als Quelle{' '}
            <strong className="font-semibold text-foreground">Mardu GmbH</strong> angeben.
          </p>
        </div>

        <PhotoSwipeGallery items={items} className="pt-8 md:pt-10" />
      </section>
    </main>
  );
}
