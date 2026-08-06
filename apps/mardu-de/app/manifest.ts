import type { MetadataRoute } from 'next';
import { MARDU_APPLE_TOUCH_ICON_PATH, MARDU_FAVICON_PATH } from '@/lib/brand-assets';

/**
 * Web App Manifest endpoint (`/manifest.webmanifest`) using Next.js MetadataRoute DTO.
 * Icons point to the official files from the Mardu branding submodule.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mardu',
    short_name: 'Mardu',
    description:
      'Plattform für physische Zugriffssteuerung mit Produktlinien für Werkstatt, Labor und Baustelle.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#351b5a',
    lang: 'de-DE',
    icons: [
      {
        src: MARDU_FAVICON_PATH,
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: MARDU_APPLE_TOUCH_ICON_PATH,
        sizes: '180x180',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
