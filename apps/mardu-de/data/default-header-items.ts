import type { HeaderNavLinkDto } from '@mardu/layout/types';

/** Global page navigation. Homepage chapters remain local to the homepage index. */
export const defaultHeaderItems: ReadonlyArray<HeaderNavLinkDto> = [
  {
    type: 'link',
    index: '01',
    label: 'Produkte',
    href: '/products',
  },
  {
    type: 'link',
    index: '02',
    label: 'Lösungen',
    href: '/solutions',
  },
  {
    type: 'link',
    index: '03',
    label: 'Integrationen',
    href: '/integrations',
  },
  {
    type: 'link',
    index: '04',
    label: 'Über uns',
    href: '/about',
  },
  {
    type: 'link',
    index: '05',
    label: 'Blog',
    href: '/blog',
  },
];
