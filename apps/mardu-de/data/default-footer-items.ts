import type { LayoutLinkDto } from '@mardu/layout/types';
import { defaultHeaderItems } from '@/data/default-header-items';

/** Reuses the main destinations and adds lower-priority editorial content. */
export const defaultFooterNavLinks: ReadonlyArray<LayoutLinkDto> = [
  ...defaultHeaderItems.map((item) => ({
    label: item.label,
    href: item.href,
    index: item.index,
    description: item.description,
    external: item.external,
  })),
];

export const defaultFooterMetaLinks: ReadonlyArray<LayoutLinkDto> = [
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Markenressourcen', href: '/brand' },
];
