'use client';

import ContactForm, { contactSchema, type ContactValues } from '@/components/forms/contact';
import type { State } from '../page';

export const ContactSchema = contactSchema;

export default function ContactStep({
  name,
  email,
  company,
  message,
  phone,
  consent,
  onChange,
}: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  phone?: string;
  consent?: boolean;
  onChange: (patch: Partial<State['contact']>) => void;
}) {
  const initial: Partial<ContactValues> = { name, email, company, message, phone, consent };
  return <ContactForm layout="card" initialValues={initial} onChange={onChange} submit={false} />;
}
