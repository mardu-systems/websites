'use client';

import { useId, useState } from 'react';
import { useRecaptcha } from '@mardu/lead-core/recaptcha';
import { Alert, AlertDescription } from '@mardu/ui/components/alert';
import { Button } from '@mardu/ui/components/button';
import { Checkbox } from '@mardu/ui/components/checkbox';
import { Input } from '@mardu/ui/components/input';
import { Label } from '@mardu/ui/components/label';

/**
 * Public props for the reusable newsletter signup form.
 * This component is used both inline and inside dialogs, so success can optionally
 * notify the parent to close the surrounding UI.
 */
export interface NewsletterSignupFormProps {
  onSuccess?: () => void;
}

export default function NewsletterSignupForm({ onSuccess }: NewsletterSignupFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const idPrefix = useId();
  const executeRecaptcha = useRecaptcha();

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
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-firstName`}>Vorname</Label>
          <Input
            type="text"
            id={`${idPrefix}-firstName`}
            name="firstName"
            autoComplete="given-name"
            placeholder="Ihr Vorname"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-lastName`}>Nachname</Label>
          <Input
            type="text"
            id={`${idPrefix}-lastName`}
            name="lastName"
            autoComplete="family-name"
            placeholder="Ihr Nachname"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-company`}>Firma</Label>
        <Input
          type="text"
          id={`${idPrefix}-company`}
          name="company"
          autoComplete="organization"
          placeholder="Ihre Firma"
        />
      </div>

      <div className="space-y-2">
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
        />
      </div>

      <div className="space-y-2 pt-1">
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

      <Button type="submit" disabled={pending}>
        {pending ? 'Wird gesendet...' : 'Newsletter abonnieren'}
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
