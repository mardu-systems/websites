import type { HeaderNavLinkDto } from '@mardu/layout/types';

/** Global page navigation. Homepage chapters remain local to the homepage index. */
export const defaultHeaderItems: ReadonlyArray<HeaderNavLinkDto> = [
  {
    type: 'link',
    index: '01',
    label: 'Produkte',
    description: '01.1 Door Access\n01.2 Machine Access',
    href: '/products',
  },
  {
    type: 'link',
    index: '02',
    label: 'System',
    description: '02.1 Identitäten\n02.2 Berechtigungen',
    href: '/platform',
  },
  {
    type: 'link',
    index: '03',
    label: 'Lösungen',
    description: '03.1 Hochschulen\n03.2 Werkstätten',
    href: '/solutions',
  },
  {
    type: 'link',
    index: '04',
    label: 'Integrationen',
    description: '04.1 Bestandssysteme\n04.2 Schnittstellen',
    href: '/integrations',
  },
  {
    type: 'link',
    index: '05',
    label: 'Konfigurator',
    description: '05.1 Projekt planen\n05.2 Anfrage senden',
    href: '/configurator',
  },
];
