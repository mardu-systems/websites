'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { useScrollToSection } from './use-scroll-to-section';

/**
 * Render-ready DTO for a hard-linked navigation item.
 */
export interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  updateHashOnAnchorScroll?: boolean;
}

export default function NavLink({
  href,
  label,
  className,
  onNavigate,
  updateHashOnAnchorScroll = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const { scrollToSection } = useScrollToSection({ updateHash: updateHashOnAnchorScroll });

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
