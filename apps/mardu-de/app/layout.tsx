import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';
import { RecaptchaProvider } from '@mardu/lead-core/recaptcha';
import SiteShell from '@/components/layout/site-shell';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getSiteConfig } from '@mardu/site-config';
import localFont from 'next/font/local';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import {
  MARDU_APPLE_TOUCH_ICON_PATH,
  MARDU_FAVICON_PATH,
  MARDU_LOGO_LIGHT_PATH,
} from '@/lib/brand-assets';
import { JsonLd } from '@/components/seo/json-ld';

const siteConfig = getSiteConfig('mardu-de');
const SITE_URL = siteConfig.origin;

export const dynamic = 'force-dynamic';

const aktivGrotesk = localFont({
  src: [
    { path: '../public/fonts/AktivGrotesk-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/AktivGrotesk-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/AktivGrotesk-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/AktivGrotesk-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-aktiv-grotesk',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f4f4f4',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.appName,
  title: {
    default: 'Mardu – Maschinenfreigabe, Zutritt und Zufahrt',
    template: '%s | Mardu',
  },
  description:
    'Mardu verbindet Maschinenfreigabe, Gebäudezutritt und Zufahrtssteuerung mit zentraler Verwaltung für Identitäten, Berechtigungen und Ereignisse.',
  keywords: [
    'Maschinenfreigabe',
    'Zutrittssteuerung',
    'Zufahrtssteuerung',
    'Schrankensteuerung',
    'Lehrwerkstatt',
    'Unternehmenswerkstatt',
    'Makerspace',
    'FabLab',
    'Labor',
  ],
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: MARDU_FAVICON_PATH, type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: MARDU_APPLE_TOUCH_ICON_PATH, sizes: '180x180', type: 'image/svg+xml' }],
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
    title: 'Mardu – Maschinenfreigabe, Zutritt und Zufahrt',
    description:
      'Von der Maschine bis zur Schranke: Mardu verbindet Identität, Berechtigung und physische Zugänge in einem System.',
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
    title: 'Mardu – Maschinenfreigabe, Zutritt und Zufahrt',
    description:
      'Von der Maschine bis zur Schranke: digitale Berechtigungen für physische Infrastruktur.',
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
      '@id': `${SITE_URL}/#organization`,
      name: siteConfig.appName,
      legalName: 'Mardu GmbH',
      url: SITE_URL,
      logo: `${SITE_URL}${MARDU_LOGO_LIGHT_PATH}`,
      email: siteConfig.supportEmail,
      telephone: siteConfig.contactPhone,
      vatID: siteConfig.vatId,
      foundingDate: '2026-02-13',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alter Schlachthof 39 A1',
        postalCode: '76131',
        addressLocality: 'Karlsruhe',
        addressCountry: 'DE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.supportEmail,
        telephone: siteConfig.contactPhone,
        availableLanguage: ['de'],
      },
      sameAs: ['https://www.linkedin.com/company/marduofficial'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: siteConfig.appName,
      url: SITE_URL,
      inLanguage: 'de-DE',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body
        className={`${aktivGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable} bg-background text-foreground overflow-x-hidden`}
      >
        <RecaptchaProvider>
          <SiteShell>{children}</SiteShell>
          <Analytics />
          <SpeedInsights />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
