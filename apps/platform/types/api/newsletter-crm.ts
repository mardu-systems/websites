import type { SiteKey } from '@mardu/lead-core';

export type NewsletterCrmEventType = 'newsletter_confirmed' | 'newsletter_unsubscribed';

export type NewsletterSignupSource = 'newsletter' | 'whitepaper';

export interface NewsletterCrmEventDto {
  type: NewsletterCrmEventType;
  email: string;
  site: SiteKey;
  role: string;
  source: NewsletterSignupSource;
  firstName?: string;
  lastName?: string;
  company?: string;
  occurredAt: string;
  consentModel: 'double-opt-in';
}
