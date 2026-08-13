import privacyContent from "../data/legal/privacy.md";
import publisherContent from "../data/legal/publisher.md";
import type { LegalPageDto, LegalPageSlug } from "./index";

const bundledLegalPages: Record<LegalPageSlug, LegalPageDto> = {
  privacy: {
    slug: "privacy",
    title: "Datenschutzerklärung",
    pageKind: "privacy",
    summary:
      "Wie die Mardu GmbH personenbezogene Daten auf mardu.de verarbeitet.",
    updatedLabel: "10.08.2026",
    contentMarkdown: privacyContent,
  },
  publisher: {
    slug: "publisher",
    title: "Impressum",
    pageKind: "publisher",
    summary: "Unternehmens- und Kontaktangaben der Mardu GmbH.",
    updatedLabel: "10.08.2026",
    contentMarkdown: publisherContent,
  },
};

/** Returns the versioned legal-page fallback bundled with the applications. */
export function getBundledLegalPage(slug: LegalPageSlug): LegalPageDto {
  return bundledLegalPages[slug];
}
