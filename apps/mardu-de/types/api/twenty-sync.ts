import type { ContactSource } from '@mardu/lead-core';

export interface TwentyContactLeadDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: ContactSource;
  consent?: boolean;
  newsletterOptIn?: boolean;
}
