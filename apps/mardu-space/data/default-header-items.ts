import { NavEntry } from '@/types/header';

export const defaultHeaderItems: NavEntry[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'Konfigurator', href: '/configurator' },
  { type: 'link', label: 'Hardware', href: '/system' },
  { type: 'link', label: 'Software', href: '/verwaltungssoftware' },
  { type: 'link', label: 'Kontakt', href: '/contact' },
];
