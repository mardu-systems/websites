'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export default function NavLink({ href, label, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const { scrollToSection } = useScrollToSection();

  const isAnchor = href.startsWith('#');
  const resolvedHref = isAnchor && pathname !== '/' ? `/${href}` : href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (isAnchor && pathname === '/') {
      event.preventDefault();
      scrollToSection(href);
    }

    onNavigate?.();
  };

  return (
    <Link
      href={resolvedHref}
      onClick={handleClick}
      className={cn(
        'text-sm uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-foreground',
        className,
      )}
    >
      {label}
    </Link>
  );
}
