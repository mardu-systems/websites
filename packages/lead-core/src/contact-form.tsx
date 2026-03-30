'use client';

import * as React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import type { ContactErrorResponseDto } from './index';

export type NormalizePhoneNumber = (value?: string) => string | undefined;
export type ExecuteRecaptcha = (action: string) => Promise<string | null | undefined>;

/**
 * Public schema factory for the shared contact form.
 * Apps can inject their own phone normalization strategy while keeping the form
 * contract stable.
 */
export function createContactSchema(normalizePhoneNumber?: NormalizePhoneNumber) {
  return z.object({
    name: z.string().trim().min(1, 'Bitte Name angeben'),
    email: z.string().trim().email('Bitte eine gültige E-Mail angeben'),
    company: z.string().trim().optional(),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) =>
          value == null ||
          value.length === 0 ||
          (normalizePhoneNumber ? Boolean(normalizePhoneNumber(value)) : true),
        'Bitte eine gültige Telefonnummer im internationalen Format angeben',
      ),
    message: z.string().trim().max(500, 'Bitte maximal 500 Zeichen eingeben').optional(),
    consent: z.boolean().optional(),
    newsletterOptIn: z.boolean().optional(),
  });
}

export type ContactValues = z.infer<ReturnType<typeof createContactSchema>>;

export interface ContactFormProps {
  initialValues?: Partial<ContactValues>;
  onChange?: (values: Partial<ContactValues>) => void;
  submit?: boolean;
  action?: string;
  extra?: Record<string, unknown>;
  submitLabel?: string;
  successMessage?: string;
  layout?: 'plain' | 'card';
  normalizePhoneNumber?: NormalizePhoneNumber;
  executeRecaptcha?: ExecuteRecaptcha;
}

export function ContactForm({
  initialValues,
  onChange,
  submit = false,
  action = '/api/contact',
  extra,
  submitLabel = 'Senden',
  successMessage = 'Danke! Nachricht gesendet',
  layout = 'plain',
  normalizePhoneNumber,
  executeRecaptcha,
}: ContactFormProps) {
  const schema = React.useMemo(() => createContactSchema(normalizePhoneNumber), [normalizePhoneNumber]);

  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name ?? '',
      email: initialValues?.email ?? '',
      company: initialValues?.company ?? '',
      phone: initialValues?.phone ?? '',
      message: initialValues?.message ?? '',
      consent: initialValues?.consent ?? false,
      newsletterOptIn: initialValues?.newsletterOptIn ?? false,
    },
    mode: submit ? 'onSubmit' : 'onChange',
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
  const consentId = React.useId();
  const newsletterId = React.useId();

  async function handleSubmit(values: ContactValues) {
    if (!submit) return;

    if (values.consent !== true) {
      form.setError('consent', { type: 'required', message: 'Bitte Zustimmung erteilen' });
      setStatus('idle');
      setErrorMessage(null);
      return;
    }

    try {
      setSubmitting(true);
      setStatus('idle');
      setErrorMessage(null);

      const token = executeRecaptcha ? await executeRecaptcha('contact') : undefined;
      const normalizedPhone = normalizePhoneNumber ? normalizePhoneNumber(values.phone) : values.phone;
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: normalizedPhone,
          ...(token ? { token } : {}),
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

  const inputClasses =
    'w-full min-h-11 text-base rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:border-primary/80 touch-manipulation';
  const textareaClasses =
    'w-full min-h-28 text-base rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:border-primary/80 touch-manipulation';
  const submitHandler = submit ? form.handleSubmit(handleSubmit) : undefined;

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!submit) return;
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      submitHandler?.();
    }
  };

  const content = (
    <div className="w-full">
      <Form {...form}>
        <form noValidate onSubmit={submitHandler} className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="Max Mustermann"
                    autoComplete="name"
                    autoCapitalize="words"
                    className={inputClasses}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                      const trimmed = event.target.value.trim();
                      field.onChange(trimmed);
                      field.onBlur();
                    }}
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
                    {...field}
                    placeholder="name@beispiel.de"
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className={inputClasses}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                      const trimmed = event.target.value.trim();
                      field.onChange(trimmed);
                      field.onBlur();
                    }}
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
                    {...field}
                    placeholder="Ihr Unternehmen"
                    autoComplete="organization"
                    className={inputClasses}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                      const trimmed = event.target.value.trim();
                      field.onChange(trimmed);
                      field.onBlur();
                    }}
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
                    {...field}
                    placeholder="+49 1520 2189213"
                    autoComplete="tel"
                    inputMode="tel"
                    autoCorrect="off"
                    spellCheck={false}
                    className={inputClasses}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                      const trimmed = event.target.value.trim();
                      field.onChange(trimmed);
                      field.onBlur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Optional. Bitte im internationalen Format, z. B. <code>+4915202189213</code>.
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
                    {...field}
                    placeholder="Ihre Nachricht..."
                    className={textareaClasses}
                    onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                      const trimmed = event.target.value.trim();
                      field.onChange(trimmed);
                      field.onBlur();
                    }}
                    onKeyDown={handleTextareaKeyDown}
                  />
                </FormControl>
                <FormDescription>
                  Optional. Beschreiben Sie kurz Ihr Vorhaben oder Ihre Frage.
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
                      id={newsletterId}
                      checked={field.value}
                      onCheckedChange={(checked: boolean | 'indeterminate') =>
                        field.onChange(checked === true)
                      }
                      name={field.name}
                      className="mt-0.5 touch-manipulation"
                    />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel htmlFor={newsletterId} className="text-sm leading-relaxed">
                      Ich möchte zusätzlich Produkt- und Update-Informationen per E-Mail erhalten.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </div>
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
                      id={consentId}
                      checked={field.value}
                      onCheckedChange={(checked: boolean | 'indeterminate') =>
                        field.onChange(checked === true)
                      }
                      name={field.name}
                      className="mt-0.5 touch-manipulation"
                    />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel htmlFor={consentId} className="text-sm leading-relaxed">
                      Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden.
                      Weitere Informationen stehen in der{' '}
                      <Link href="/privacy" className="underline underline-offset-3">
                        Datenschutzerklärung
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />

          {status === 'success' ? (
            <Alert className="sm:col-span-2 border-green-600/30 bg-green-50 text-green-900">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          ) : null}

          {status === 'error' ? (
            <Alert variant="destructive" className="sm:col-span-2">
              <AlertDescription>
                {errorMessage || 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'}
              </AlertDescription>
            </Alert>
          ) : null}

          {submit ? (
            <div className="sm:col-span-2 pt-2">
              <Button type="submit" disabled={submitting} className="min-w-40">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </div>
  );

  if (layout === 'card') {
    return (
      <Card className="border border-black/10 bg-card/95 shadow-none">
        <CardContent className="p-6 md:p-8">{content}</CardContent>
      </Card>
    );
  }

  return content;
}

export default ContactForm;
