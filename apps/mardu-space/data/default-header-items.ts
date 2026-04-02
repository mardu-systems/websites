import type { HeaderNavItemDto } from '@mardu/layout/types';

export const defaultHeaderItems: HeaderNavItemDto[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'Konfigurator', href: '/configurator' },
  { type: 'link', label: 'Hardware', href: '/system' },
  { type: 'link', label: 'Software', href: '/verwaltungssoftware' },
  { type: 'link', label: 'Whitepaper', href: '/whitepaper' },
  { type: 'link', label: 'Kontakt', href: '/contact' },
];
