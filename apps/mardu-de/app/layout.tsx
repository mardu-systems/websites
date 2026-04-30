import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';
import { RecaptchaProvider } from '@mardu/lead-core/recaptcha';
import SiteShell from '@/components/layout/site-shell';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getSiteConfig } from '@mardu/site-config';
import localFont from 'next/font/local';

const siteConfig = getSiteConfig('mardu-de');
const SITE_URL = siteConfig.origin;

const geist = localFont({
  src: [
    { path: '../public/fonts/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Inter-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Inter-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/Inter-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-geist-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.appName,
  title: {
    default: 'Mardu – Plattform für physische Zugriffssteuerung',
    template: '%s | Mardu',
  },
  description:
    'Mardu ist die Plattformmarke für digitale Zutrittssteuerung und Maschinenfreigabe. Entdecken Sie mardu.space für Werkstatt und Labor sowie mardu.construction für Baustellen.',
  keywords: [
    'Zugriffskontrollsysteme',
    'Makerspace',
    'FabLab',
    'Schülerlabor',
    'Open Education Badges',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
    },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Mardu – Plattform für physische Zugriffssteuerung',
    description:
      'Mardu verbindet Identität, Regeln, Hardware und Protokollierung in klaren Produktlinien für Werkstatt, Labor und Baustelle.',
    url: SITE_URL,
    siteName: siteConfig.appName,
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/_A7_9072_quer.webp',
        width: 1200,
        height: 630,
        alt: 'Mardu Zutrittskontrolle und Maschinenfreigabe',
        type: 'image/webp',
      },
      {
        url: '/_A7_9072_quer.jpg',
        width: 1200,
        height: 630,
        alt: 'Mardu Zutrittskontrolle und Maschinenfreigabe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mardu – Plattform für physische Zugriffssteuerung',
    description:
      'Mardu führt in die passende Produktlinie für digitale Zutrittssteuerung und Maschinenfreigabe.',
    images: ['/_A7_9072_quer.webp', '/_A7_9072_quer.jpg'],
  },
  verification: {
    google: 'a9afa5f97adbb711',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: siteConfig.appName,
      url: SITE_URL,
      logo: `${SITE_URL}/logos/Logo.svg`,
      email: siteConfig.supportEmail,
      telephone: siteConfig.contactPhone,
      vatID: siteConfig.vatId,
      sameAs: ['https://www.linkedin.com/company/marduofficial'],
    },
    {
      '@type': 'WebSite',
      name: siteConfig.appName,
      url: SITE_URL,
      publisher: {
        '@type': 'Organization',
        name: 'Mardu',
        url: SITE_URL,
        logo: `${SITE_URL}/logos/Logo.svg`,
        telephone: siteConfig.contactPhone,
        vatID: siteConfig.vatId,
      },
    },
  ],
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
      <body className={`${geist.variable} bg-background text-foreground overflow-x-hidden`}>
        <RecaptchaProvider>
          <SiteShell>{children}</SiteShell>
          <Analytics />
          <SpeedInsights />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
