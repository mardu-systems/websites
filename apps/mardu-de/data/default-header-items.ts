import type { HeaderNavItemDto } from '@mardu/layout/types';

export const defaultHeaderItems: HeaderNavItemDto[] = [
  { type: 'link', label: 'Home', href: '#home' },
  { type: 'link', label: 'Lösungen', href: '#produkte' },
  { type: 'link', label: 'Nutzen', href: '#loesung' },
  { type: 'link', label: 'Vorteile', href: '#argumente' },
  { type: 'link', label: 'Vorgehen', href: '#vorgehen' },
  { type: 'link', label: 'Team', href: '/#team' },
  { type: 'link', label: 'Integrationen', href: '/integrations' },
  { type: 'link', label: 'Blog', href: '/blog' },
  { type: 'link', label: 'Kontakt', href: '/contact' },
];
