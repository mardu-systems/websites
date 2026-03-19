import * as React from 'react';
import SiteFooter from './site-footer';
import SiteHeader from './site-header';
import type { SiteShellProps } from './dto';

export default function SiteShell({
  children,
  header,
  footer,
  disabled = false,
  contentTheme = 'light',
}: SiteShellProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div>
      <SiteHeader {...header} />
      <div data-theme={contentTheme} style={{ colorScheme: contentTheme }}>
        {children}
      </div>
      <SiteFooter {...footer} />
    </div>
  );
}

export type { SiteShellProps };
