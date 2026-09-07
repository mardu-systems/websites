import type { ContactSource, SiteKey } from '@mardu/lead-core';

export interface TwentyContactLeadDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: ContactSource;
  site: SiteKey;
  consent?: boolean;
  newsletterOptIn?: boolean;
  config?: unknown;
}
