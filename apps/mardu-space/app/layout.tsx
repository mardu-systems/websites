import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'photoswipe/style.css';
import React from 'react';
import { RecaptchaProvider } from '@mardu/lead-core/recaptcha';
import SiteShell from '@/components/layout/site-shell';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getSiteConfig } from '@mardu/site-config';

const siteConfig = getSiteConfig('mardu-space');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: 'Digitale Zutritts- und Maschinenfreigabe für Werkstätten | mardu.space',
    template: `%s | ${siteConfig.label}`,
  },
  description:
    'mardu.space verbindet Zutritt, Maschinenfreigabe und Qualifikation für Werkstätten, Labore, Hochschulen und Makerspaces. So werden Regeln nicht nur dokumentiert, sondern an Tür und Maschine tatsächlich wirksam.',
  keywords: [
    'Maschinenfreigabe',
    'Zutrittskontrolle',
    'Unternehmenswerkstatt',
    'Hochschule',
    'Makerspace',
    'FabLab',
    'Arbeitsschutz',
    'DGUV',
    'Compliance',
    'RBAC',
    'NFC Zugang',
    'Open Education Badges',
    'Maschinensicherheit',
    'Werkstattmanagement',
  ],
  alternates: {
    canonical: siteConfig.origin,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Digitale Zutritts- und Maschinenfreigabe für Werkstätten',
    description:
      'mardu.space verknüpft Zutritt, Qualifikation und Maschinenfreigabe für Werkstätten, Labore, Hochschulen und Makerspaces.',
    url: siteConfig.origin,
    siteName: siteConfig.appName,
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/_A7_9094_quer.jpg',
        width: 1200,
        height: 630,
        alt: 'mardu.space Maschinenfreigabe in der Werkstatt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitale Zutritts- und Maschinenfreigabe für Werkstätten',
    description:
      'mardu.space verknüpft Zutritt, Qualifikation und Maschinenfreigabe für Werkstätten, Labore, Hochschulen und Makerspaces.',
    images: ['/_A7_9094_quer.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.appName,
  url: siteConfig.origin,
  description:
    'Digitale Zutritts- und Maschinenfreigabe für Werkstätten, Labore, Hochschulen und Makerspaces.',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.appName,
    url: siteConfig.origin,
    logo: `${siteConfig.origin}/marduspace_logo_bg_white.svg`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased overflow-x-hidden">
        <RecaptchaProvider>
          <SiteShell>{children}</SiteShell>
          <Analytics />
          <SpeedInsights />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
