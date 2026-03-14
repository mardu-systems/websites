'use client';

import { useCallback } from 'react';

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    // Entferne das '#' wenn vorhanden
    const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    
    // Verzögere die Ausführung kurz, um sicherzustellen, dass das DOM bereit ist
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  return { scrollToSection };
}
