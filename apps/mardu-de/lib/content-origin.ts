import { getSiteConfig } from '@mardu/site-config';

/**
 * Origin der eigenen Payload-Content-API (`/api/*` läuft seit dem Merge
 * in derselben Next.js-Instanz, kein separates Platform-Projekt mehr).
 * In allen Umgebungen über `APP_URL` steuerbar, Fallback ist die
 * öffentliche mardu.de-Origin.
 */
export function getContentOrigin(): string {
  const appUrl = process.env.APP_URL?.trim();

  if (appUrl) {
    try {
      return new URL(appUrl).origin;
    } catch {
      // fällt unten auf die Site-Konfiguration zurück
    }
  }

  return getSiteConfig('mardu-de').origin;
}
