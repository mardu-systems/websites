import type { ContactSource } from '@/types/api/contact';

/**
 * URL contract for `/contact`.
 * `source` maps the request to a known lead source, `topic` selects optional contextual copy.
 */
export interface ContactPageSearchParamsDto {
  source?: string;
  topic?: string;
}

/**
 * DTO that drives the contextual copy and prefilled content on `/contact`.
 */
export interface ContactPageContextDto {
  overline: string;
  title: string;
  description: string;
  intro: string;
  source: ContactSource;
  initialMessage?: string;
  submitLabel?: string;
  successMessage?: string;
}

const DEFAULT_CONTACT_CONTEXT: ContactPageContextDto = {
  overline: 'Kontakt',
  title: 'Lass uns über dein Projekt sprechen.',
  description: 'Melde dich bei uns, wir antworten so schnell wie möglich.',
  intro: 'Du hast Fragen oder möchtest uns besuchen? Melde dich gerne bei uns.',
  source: 'contact-form',
};

const ADMIN_SOFTWARE_CONTACT_CONTEXT: ContactPageContextDto = {
  overline: 'Verwaltungssoftware',
  title: 'Demo und Beratung zur Verwaltungssoftware anfragen.',
  description:
    'Teilen Sie uns kurz mit, welche Abläufe, Standorte oder Nutzerstrukturen Sie vereinfachen möchten. Wir melden uns mit einem passenden nächsten Schritt.',
  intro:
    'Dieser Kontaktweg ist auf Anfragen zur Verwaltungssoftware ausgerichtet, damit Demo- und Projektgespräche schneller im richtigen Kontext starten.',
  source: 'admin-software',
  initialMessage:
    'Ich möchte eine Demo der Verwaltungssoftware anfragen und mehr darüber erfahren, wie Nutzer, Zutrittspunkte, Gruppen und Tags zentral verwaltet werden können.',
  submitLabel: 'Demo anfragen',
  successMessage: 'Danke! Wir melden uns zur Verwaltungssoftware bei Ihnen.',
};

/**
 * Resolve contextual contact copy from the `/contact` URL parameters.
 * Unknown sources deliberately fall back to the default contact experience.
 */
export function getContactPageContext(
  searchParams?: ContactPageSearchParamsDto,
): ContactPageContextDto {
  if (
    searchParams?.source === 'admin-software' &&
    searchParams?.topic === 'verwaltungssoftware-demo'
  ) {
    return ADMIN_SOFTWARE_CONTACT_CONTEXT;
  }

  return DEFAULT_CONTACT_CONTEXT;
}
