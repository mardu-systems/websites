'use client';

import SiteHeader from '@/components/nav/header/site-header';
import { defaultHeaderItems } from '@/data/default-header-items';
import SiteFooter from '@/components/nav/footer/footer';
import React from 'react';
import { defaultFooterMetaLinks, defaultFooterNavLinks } from '@/data/default-footer-items';
import { usePathname } from 'next/navigation';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPayloadAdminRoute = pathname?.startsWith('/admin');

  if (isPayloadAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div>
      <SiteHeader items={defaultHeaderItems} />
      <div data-theme="light" style={{ colorScheme: 'light' }}>
        {children}
      </div>
      <SiteFooter
        description="Interne Plattform für Payload Admin, zentrale APIs, Media-Uploads und Betriebsaufgaben im Mardu-Monorepo."
        navLinks={defaultFooterNavLinks}
        metaLinks={defaultFooterMetaLinks}
      />
    </div>
  );
}
