import type { HeaderNavItemDto } from '@mardu/layout/types';

export const defaultHeaderItems: HeaderNavItemDto[] = [
  { type: 'link', label: 'Home', href: '#home' },
  { type: 'link', label: 'Lösung', href: '#loesung' },
  { type: 'link', label: 'Angebote', href: '#produkte' },
  { type: 'link', label: 'Vorteile', href: '#argumente' },
  { type: 'link', label: 'Integrationen', href: '/integrations' },
  { type: 'link', label: 'Blog', href: '/blog' },
  { type: 'link', label: 'Kontakt', href: '/contact' },
];
