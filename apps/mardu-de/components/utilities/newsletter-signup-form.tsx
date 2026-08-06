'use client';

import { useId, useState } from 'react';
import { useRecaptcha } from '@mardu/lead-core/recaptcha';
import { Alert, AlertDescription } from '@mardu/ui/components/alert';
import { Button } from '@mardu/ui/components/button';
import { Checkbox } from '@mardu/ui/components/checkbox';
import { Input } from '@mardu/ui/components/input';
import { Label } from '@mardu/ui/components/label';
import { cn } from '@mardu/ui/lib/utils';
import { ArrowUpRight } from 'lucide-react';

/**
 * Public props for the reusable newsletter signup form.
 * This component is used both inline and inside dialogs, so success can optionally
 * notify the parent to close the surrounding UI.
 */
export interface NewsletterSignupFormProps {
  onSuccess?: () => void;
  variant?: 'default' | 'editorial-index';
}

export default function NewsletterSignupForm({
  onSuccess,
  variant = 'default',
}: NewsletterSignupFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const idPrefix = useId();
  const executeRecaptcha = useRecaptcha();
  const editorial = variant === 'editorial-index';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get('firstName') ?? '').trim() || undefined,
      lastName: String(formData.get('lastName') ?? '').trim() || undefined,
      company: String(formData.get('company') ?? '').trim() || undefined,
      email: String(formData.get('email') ?? '').trim(),
      role: 'newsletter',
    };

    if (!payload.email) {
      setError('Bitte geben Sie eine E-Mail-Adresse ein.');
      setSuccess(null);
      return;
    }

    if (!consentChecked) {
      setError('Bitte bestätigen Sie Ihre Einwilligung.');
      setSuccess(null);
      return;
    }

    try {
      setPending(true);
      setError(null);
      setSuccess(null);
      const token = await executeRecaptcha('newsletter_signup');

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          ...(token ? { token } : {}),
        }),
      });

      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(body?.error ?? 'Newsletter-Anmeldung fehlgeschlagen');
      }

      setSuccess('Fast geschafft: Bitte bestätigen Sie Ihre Anmeldung über den Link in der E-Mail.');
      form.reset();
      setConsentChecked(false);
      onSuccess?.();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Newsletter-Anmeldung fehlgeschlagen',
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={cn('space-y-6', editorial && 'space-y-0')} onSubmit={handleSubmit} noValidate>
      <div className={cn('grid gap-4 md:grid-cols-2', editorial && 'gap-0')}>
        <div className={cn('space-y-2', editorial && 'border-b border-border py-5 md:pr-5')}>
          <Label htmlFor={`${idPrefix}-firstName`}>Vorname</Label>
          <Input
            type="text"
            id={`${idPrefix}-firstName`}
            name="firstName"
            autoComplete="given-name"
            placeholder="Ihr Vorname"
            className={cn(editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none')}
          />
        </div>

        <div
          className={cn(
            'space-y-2',
            editorial && 'border-b border-border py-5 md:border-l md:pl-5',
          )}
        >
          <Label htmlFor={`${idPrefix}-lastName`}>Nachname</Label>
          <Input
            type="text"
            id={`${idPrefix}-lastName`}
            name="lastName"
            autoComplete="family-name"
            placeholder="Ihr Nachname"
            className={cn(editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none')}
          />
        </div>
      </div>

      <div className={cn('space-y-2', editorial && 'border-b border-border py-5')}>
        <Label htmlFor={`${idPrefix}-company`}>Firma</Label>
        <Input
          type="text"
          id={`${idPrefix}-company`}
          name="company"
          autoComplete="organization"
          placeholder="Ihre Firma"
          className={cn(editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none')}
        />
      </div>

      <div className={cn('space-y-2', editorial && 'border-b border-border py-5')}>
        <Label
          htmlFor={`${idPrefix}-email`}
          className="after:ml-0.5 after:text-destructive after:content-['*']"
        >
          E-Mail
        </Label>
        <Input
          type="email"
          id={`${idPrefix}-email`}
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="name@unternehmen.de"
          className={cn(editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none')}
        />
      </div>

      <div className={cn('space-y-2 pt-1', editorial && 'border-b border-border py-6')}>
        <Label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <Checkbox
            id={`${idPrefix}-consent`}
            checked={consentChecked}
            onCheckedChange={(checked: boolean | 'indeterminate') => {
              setConsentChecked(checked === true);
            }}
            className="mt-1"
          />
          Ihre hier eingegebenen Daten werden ausschließlich für den Newsletter verwendet. Mit dem
          Absenden bestätigen Sie die Datenverarbeitung und unsere Datenschutzerklärung.
        </Label>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className={cn(
          editorial &&
            'group h-12 w-full justify-between rounded-none border-y border-border bg-transparent px-0 text-base font-normal text-foreground shadow-none hover:border-primary hover:bg-transparent hover:text-primary',
        )}
      >
        {pending ? 'Wird gesendet...' : 'Newsletter abonnieren'}
        {editorial ? (
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </span>
        ) : null}
      </Button>

      {success ? (
        <Alert role="status" aria-live="polite">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      ) : null}

      {error ? (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
