import type React from 'react';

export type CodeBlip = {
  label: string;
  feature: React.ReactNode;
  enableLink?: boolean;
  link?: {
    href: string;
    label: string;
    target?: string;
  };
};
