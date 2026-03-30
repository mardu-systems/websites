'use client';

import {
  ContactForm,
  createContactSchema,
  type ContactFormProps,
  type ContactValues,
} from '@mardu/lead-core/contact-form';
import { useRecaptcha } from '@/lib/recaptcha';
import { normalizePhoneNumber } from '@/lib/phone';

export const contactSchema = createContactSchema(normalizePhoneNumber);

export type { ContactFormProps, ContactValues };

export { ContactForm };

export default function SiteContactForm(props: ContactFormProps) {
  const executeRecaptcha = useRecaptcha();
  return (
    <ContactForm
      {...props}
      normalizePhoneNumber={normalizePhoneNumber}
      executeRecaptcha={executeRecaptcha}
    />
  );
}
