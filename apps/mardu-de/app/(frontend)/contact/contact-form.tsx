'use client';

import ContactForm from '@/components/forms/contact';

export default function ContactFormPageVariant() {
  return <ContactForm submit action="/api/contact" extra={{ source: 'contact-form' }} layout="card" />;
}
