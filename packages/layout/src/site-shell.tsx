import * as React from "react";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import type { SiteShellProps } from "./dto";

export default function SiteShell({
  children,
  header,
  footer,
  disabled = false,
  contentTheme = "light",
}: SiteShellProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 bg-background px-4 py-3 text-sm text-foreground shadow-sm transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring motion-reduce:transition-none"
      >
        Zum Inhalt springen
      </a>
      <SiteHeader {...header} />
      <div
        id="main-content"
        tabIndex={-1}
        className="pt-16 md:pt-20"
        data-theme={contentTheme}
        style={{ colorScheme: contentTheme }}
      >
        {children}
      </div>
      <SiteFooter {...footer} />
    </div>
  );
}

export type { SiteShellProps };
