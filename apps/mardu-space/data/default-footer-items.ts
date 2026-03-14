import { FooterLink } from '@/components/nav/footer/footer';

export const defaultFooterNavLinks: FooterLink[] = [
  { href: '/', label: 'Startseite' },
  { href: '/configurator', label: 'Konfigurator' },
  { href: '/system', label: 'System' },
  { href: '/faq', label: 'FAQ' },
  { href: '/brand', label: 'Brand Assets' },
  { href: '/fotos', label: 'Fotos' },
  { href: '/contact', label: 'Kontakt' },
];

export const defaultFooterMetaLinks: FooterLink[] = [
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/privacy', label: 'Datenschutz' },
  { href: '/publisher', label: 'Impressum' },
];
