import type { MetadataRoute } from 'next';

/**
 * Web App Manifest endpoint (`/manifest.webmanifest`) using Next.js MetadataRoute DTO.
 * Icons point to the existing files in `/public/favicon`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mardu',
    short_name: 'Mardu',
    description: 'Plattform für physische Zugriffssteuerung mit Produktlinien für Werkstatt, Labor und Baustelle.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#351b5a',
    lang: 'de-DE',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
