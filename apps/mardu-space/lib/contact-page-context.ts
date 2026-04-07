import type { ContactSource } from '@mardu/lead-core';
import type { CatalogInquiryContextDto } from '@mardu/content-core';

/**
 * URL contract for `/contact`.
 * `source` maps the request to a known lead source, `topic` selects optional contextual copy.
 */
export interface ContactPageSearchParamsDto {
  source?: string;
  topic?: string;
  product?: string;
  productName?: string;
  category?: string;
  variant?: string;
  priceFrom?: string;
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
  config?: CatalogInquiryContextDto;
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

function getCatalogContactContext(
  searchParams: ContactPageSearchParamsDto,
): ContactPageContextDto | undefined {
  if (!searchParams.product || !searchParams.productName || !searchParams.category) {
    return undefined;
  }

  const variantText = searchParams.variant ? ` in der Variante ${searchParams.variant}` : '';
  const priceText = searchParams.priceFrom ? ` Richtpreis ab ${searchParams.priceFrom}.` : '';

  return {
    overline: 'Produktanfrage',
    title: `Angebot für ${searchParams.productName} anfragen.`,
    description:
      'Dieser Kontaktweg ist auf produktbezogene Angebotsanfragen ausgerichtet. So startet die Rückmeldung direkt mit dem passenden Produktkontext.',
    intro:
      'Teilen Sie uns kurz Einsatzumgebung, Stückzahl oder gewünschte Kombination mit. Wir melden uns mit einem passenden nächsten Schritt.',
    source: 'contact-form',
    initialMessage: `Ich möchte ein Angebot für ${searchParams.productName}${variantText} anfragen. Einsatzbereich: ${searchParams.category}.${priceText}`,
    submitLabel: 'Angebot anfragen',
    successMessage: `Danke! Wir melden uns zu ${searchParams.productName}.`,
    config: {
      productId: searchParams.product,
      productSlug: searchParams.product,
      productName: searchParams.productName,
      category: searchParams.category,
      variantId: searchParams.variant,
      priceFrom: searchParams.priceFrom,
      sourcePage: `/products/${searchParams.product}`,
    },
  };
}

/**
 * Resolve contextual contact copy from the `/contact` URL parameters.
 * Unknown sources deliberately fall back to the default contact experience.
 */
export function getContactPageContext(
  searchParams?: ContactPageSearchParamsDto,
): ContactPageContextDto {
  const catalogContext = searchParams ? getCatalogContactContext(searchParams) : undefined;
  if (catalogContext) {
    return catalogContext;
  }

  if (
    searchParams?.source === 'admin-software' &&
    searchParams?.topic === 'verwaltungssoftware-demo'
  ) {
    return ADMIN_SOFTWARE_CONTACT_CONTEXT;
  }

  return DEFAULT_CONTACT_CONTEXT;
}
