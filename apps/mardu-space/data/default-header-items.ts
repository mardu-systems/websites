import type { HeaderNavItemDto } from '@mardu/layout/types';

export const defaultHeaderItems: HeaderNavItemDto[] = [
  { type: 'link', label: 'Lösungen', href: '/solutions' },
  { type: 'link', label: 'Plattform', href: '/platform' },
  { type: 'link', label: 'Software', href: '/verwaltungssoftware' },
  { type: 'link', label: 'Hardware', href: '/system' },
  { type: 'link', label: 'Produkte', href: '/products' },
  { type: 'link', label: 'Whitepaper', href: '/whitepaper' },
  { type: 'link', label: 'Kontakt', href: '/contact' },
];
