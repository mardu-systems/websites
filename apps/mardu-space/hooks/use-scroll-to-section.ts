'use client';

import { useCallback } from 'react';

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    // Entferne das '#' wenn vorhanden
    const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    // Verzögere die Ausführung kurz, um sicherzustellen, dass das DOM bereit ist
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior, block: 'start' });
        const hash = `#${id}`;
        if (window.location.hash !== hash) {
          window.history.pushState(null, '', hash);
        }
      }
    }, 100);
  }, []);

  return { scrollToSection };
}
