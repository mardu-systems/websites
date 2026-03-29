'use client';

import * as React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Use native input elements instead of the shadcn `Input` component
import { Button } from '@mardu/ui/components/button';
import { Card, CardContent } from '@mardu/ui/components/card';
import { Checkbox } from '@mardu/ui/components/checkbox';
import { Textarea } from '@mardu/ui/components/textarea';
import { Alert, AlertDescription } from '@mardu/ui/components/alert';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@mardu/ui/components/form';
import { Loader2 } from 'lucide-react';
import { normalizePhoneNumber } from '@/lib/phone';
import type { ContactErrorResponseDto } from '@mardu/lead-core';

export const contactSchema = z.object({
  name: z.string().min(1, 'Bitte Name angeben'),
  email: z.email('Bitte eine gültige E-Mail angeben'),
  company: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => value == null || value.trim().length === 0 || Boolean(normalizePhoneNumber(value)),
      'Bitte eine gültige Telefonnummer angeben',
    ),
  message: z.string().max(500, 'Bitte maximal 500 Zeichen eingeben').optional(),
  consent: z.boolean().refine((value) => value === true, 'Bitte Zustimmung erteilen'),
  newsletterOptIn: z.boolean().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

type Props = {
  initialValues?: Partial<ContactValues>;
  onChange?: (values: Partial<ContactValues>) => void;
  submit?: boolean;
  action?: string;
  extra?: Record<string, unknown>;
  submitLabel?: string;
  successMessage?: string;
  layout?: 'plain' | 'card';
};

export function ContactForm({
  initialValues,
  onChange,
  submit = false,
  action = '/api/contact',
  extra,
  submitLabel = 'Senden',
  successMessage = 'Danke! Nachricht gesendet',
  layout = 'plain',
}: Props) {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      email: initialValues?.email ?? '',
      company: initialValues?.company ?? '',
      phone: initialValues?.phone ?? '',
      message: initialValues?.message ?? '',
      consent: initialValues?.consent ?? false,
      newsletterOptIn: initialValues?.newsletterOptIn ?? false,
    },
    mode: submit ? 'onBlur' : 'onChange',
    reValidateMode: 'onChange',
  });

  React.useEffect(() => {
    if (!initialValues) return;
    form.reset({
      name: initialValues.name ?? form.getValues('name'),
      email: initialValues.email ?? form.getValues('email'),
      company: initialValues.company ?? form.getValues('company'),
      phone: initialValues.phone ?? form.getValues('phone'),
      message: initialValues.message ?? form.getValues('message'),
      consent: initialValues.consent ?? form.getValues('consent'),
      newsletterOptIn: initialValues.newsletterOptIn ?? form.getValues('newsletterOptIn'),
    });
  }, [initialValues, form]);

  React.useEffect(() => {
    if (submit || !onChange) return;
    const sub = form.watch((values) => onChange(values));
    return () => sub.unsubscribe();
  }, [form, onChange, submit]);

  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(values: ContactValues) {
    if (!submit) return;
    try {
      setSubmitting(true);
      setStatus('idle');
      setErrorMessage(null);
      const normalizedPhone = normalizePhoneNumber(values.phone);
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: normalizedPhone,
          ...(extra || {}),
        }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as ContactErrorResponseDto | null;
        if (payload?.details) {
          for (const [field, messages] of Object.entries(payload.details)) {
            const message = messages?.[0];
            if (!message) continue;
            if (field in form.getValues()) {
              form.setError(field as keyof ContactValues, { type: 'server', message });
            }
          }
        }
        throw new Error(payload?.error || 'Request failed');
      }
      setStatus('success');
      form.reset({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        consent: false,
        newsletterOptIn: false,
      });
    } catch (e: unknown) {
      console.error(e);
      setStatus('error');
      setErrorMessage(e instanceof Error ? e.message : null);
    } finally {
      setSubmitting(false);
    }
  }

  const gap = 'gap-4';
  const content = (
    <div className="w-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={submit ? form.handleSubmit(handleSubmit) : undefined}
          className={`grid sm:grid-cols-2 ${gap}`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <input
                    placeholder="Max Mustermann"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:border-b focus-visible:border-neutral-800/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail*</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    placeholder="name@beispiel.de"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Firma (optional)</FormLabel>
                <FormControl>
                  <input
                    placeholder="Ihr Unternehmen"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    placeholder="+49 123 456789"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="^\\+?[0-9\\s().\\-/]{7,}$"
                    title="Bitte eine gültige Telefonnummer eingeben, z. B. +4915202189213"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                    onBlur={(event) => {
                      field.onBlur();
                      const normalized = normalizePhoneNumber(event.target.value);
                      if (normalized) {
                        form.setValue('phone', normalized, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Optional. Bitte im internationalen Format, z. B. `+4915202189213`.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nachricht</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Ihre Nachricht..."
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Beschreiben Sie kurz Ihr Anliegen (optional, max. 500 Zeichen)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newsletterOptIn"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean | 'indeterminate') =>
                        field.onChange(checked === true)
                      }
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel className="text-sm leading-5 cursor-pointer">
                      Ich möchte zusätzlich den Newsletter erhalten (optional).
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground mt-1">
                      Ihre Daten werden für den Newsletter genutzt. Anmeldung per Double-Opt-in mit
                      Bestätigungs-E-Mail. Details in der{' '}
                      <Link href="/privacy" className="underline underline-offset-2">
                        Datenschutzerklärung
                      </Link>
                      .
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean | 'indeterminate') =>
                        field.onChange(checked === true)
                      }
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel className="text-sm leading-5 cursor-pointer after:ml-0.5 after:text-destructive after:content-['*']">
                      Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage verarbeitet
                      werden.
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground mt-1">
                      Ihre Daten werden gemäß DSGVO verarbeitet und nicht an Dritte weitergegeben.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {submit && (
            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="default"
                disabled={submitting}
                aria-disabled={submitting}
                aria-busy={submitting}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? 'Sende…' : submitLabel}
              </Button>
            </div>
          )}
        </form>
        {submit && status === 'success' && (
          <Alert
            className="mt-4 animate-fade-in"
            variant="default"
            role="status"
            aria-live="polite"
          >
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {submit && status === 'error' && (
          <Alert
            className="mt-4 animate-fade-in"
            variant="destructive"
            role="alert"
            aria-live="assertive"
          >
            <AlertDescription>
              {errorMessage ?? 'Etwas ist schiefgelaufen. Versuch es erneut.'}
            </AlertDescription>
          </Alert>
        )}
      </Form>
    </div>
  );

  if (layout === 'card') {
    return (
      <Card className="rounded-2xl border-0 shadow-none bg-transparent">
        <CardContent>{content}</CardContent>
      </Card>
    );
  }
  return content;
}

export default ContactForm;
