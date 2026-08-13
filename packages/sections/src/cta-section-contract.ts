import type { ReactNode } from "react";

/**
 * Public newsletter dialog contract for CTA sections.
 * Apps own the endpoint and optional request-token provider; the section owns
 * validation, status feedback and dialog presentation.
 */
export interface CTASectionNewsletterDialogProps {
  requestUrl?: string;
  requestRole?: "newsletter";
  dialogTitle?: string;
  dialogDescription?: string;
  submitLabel?: string;
  submitPendingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  consentLabel?: ReactNode;
  getRequestToken?: (action: string) => Promise<string | null>;
}

export interface CTASectionProps {
  title: string;
  description: ReactNode;
  primaryButtonText: string;
  primaryActionSlot?: ReactNode;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  eyebrow?: string;
  backgroundImageSrc?: string;
  secondaryActionSlot?: ReactNode;
  newsletterDialog?: CTASectionNewsletterDialogProps;
  className?: string;
}
