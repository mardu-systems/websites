"use client";

import type { SiteFooterProps } from "./dto";
import { DefaultSiteFooter } from "./site-footer-default";
import { EditorialSiteFooter } from "./site-footer-editorial";

export default function SiteFooter(props: SiteFooterProps) {
  return props.variant === "editorial-index" ? (
    <EditorialSiteFooter {...props} />
  ) : (
    <DefaultSiteFooter {...props} />
  );
}

export type { SiteFooterProps };
