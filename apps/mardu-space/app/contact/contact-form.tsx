'use client';

import ContactForm from '@/components/forms/contact';
import type { ContactSource } from '@mardu/lead-core';

type ContactFormPageVariantProps = {
  source?: ContactSource;
  initialMessage?: string;
  submitLabel?: string;
  successMessage?: string;
};

export default function ContactFormPageVariant({
  source = 'contact-form',
  initialMessage,
  submitLabel,
  successMessage,
}: ContactFormPageVariantProps) {
  return (
    <ContactForm
      submit
      action="/api/contact"
      extra={{ source }}
      initialValues={initialMessage ? { message: initialMessage } : undefined}
      submitLabel={submitLabel}
      successMessage={successMessage}
      layout="card"
    />
  );
}
