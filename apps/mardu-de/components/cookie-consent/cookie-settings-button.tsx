'use client';

import { Button } from '@/components/ui/button';

export function CookieSettingsButton() {
  const handleClick = () => {
    window.openCookieSettings?.();
  };

  return (
    <Button variant="ghost" onClick={handleClick} data-slot="button">
      Cookie-Einstellungen
    </Button>
  );
}
