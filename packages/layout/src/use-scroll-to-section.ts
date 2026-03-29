'use client';

import { useCallback } from 'react';

/**
 * Configures how anchor scrolling should behave in shared navigation helpers.
 */
export interface ScrollToSectionOptions {
  updateHash?: boolean;
  delayMs?: number;
}

/**
 * Shared anchor-scroll hook for hard-linked marketing navigation.
 */
export function useScrollToSection(options: ScrollToSectionOptions = {}) {
  const { updateHash = false, delayMs = 100 } = options;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
      const prefersReducedMotion =
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

      window.setTimeout(() => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        element.scrollIntoView({ behavior, block: 'start' });

        if (updateHash) {
          const hash = `#${id}`;
          if (window.location.hash !== hash) {
            window.history.pushState(null, '', hash);
          }
        }
      }, delayMs);
    },
    [delayMs, updateHash],
  );

  return { scrollToSection };
}
