'use client';

import dynamic from 'next/dynamic';
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

const ClientContactForm = dynamic<ContactFormProps>(
  async () => {
    const mod = await import('@mardu/lead-core/contact-form');
    return mod.ContactForm;
  },
  { ssr: false },
);

export default function SiteContactForm(props: ContactFormProps) {
  const executeRecaptcha = useRecaptcha();
  return (
    <ClientContactForm
      {...props}
      normalizePhoneNumber={normalizePhoneNumber}
      executeRecaptcha={executeRecaptcha}
    />
  );
}
