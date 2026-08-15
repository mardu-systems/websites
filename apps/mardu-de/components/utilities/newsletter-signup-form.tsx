'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { useRecaptcha } from '@mardu/lead-core/recaptcha';
import { Alert, AlertDescription } from '@mardu/ui/components/alert';
import { Button } from '@mardu/ui/components/button';
import { Checkbox } from '@mardu/ui/components/checkbox';
import { EditorialActionButton } from '@mardu/ui/components/editorial-action-button';
import { Input } from '@mardu/ui/components/input';
import { Label } from '@mardu/ui/components/label';
import { cn } from '@mardu/ui/lib/utils';

/**
 * Public props for the reusable newsletter signup form.
 * This component is used both inline and inside dialogs, so success can optionally
 * notify the parent to close the surrounding UI.
 */
export interface NewsletterSignupFormProps {
  onSuccess?: () => void;
  variant?: 'compact' | 'default' | 'editorial-index';
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
  const compact = variant === 'compact';

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

    if (compact && !payload.firstName) {
      setError('Bitte gib deinen Vornamen ein.');
      setSuccess(null);
      return;
    }

    if (!payload.email) {
      setError('Bitte gib eine E-Mail-Adresse ein.');
      setSuccess(null);
      return;
    }

    if (!consentChecked) {
      setError('Bitte bestätige deine Einwilligung.');
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

      setSuccess('Fast geschafft: Bitte bestätige deine Anmeldung über den Link in der E-Mail.');
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

  const emailField = (
    <div
      className={cn(
        'space-y-2',
        editorial && 'border-b border-border py-5',
        compact && 'border-b border-border pb-3',
      )}
    >
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
        className={cn(
          editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none',
          compact && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none',
        )}
      />
    </div>
  );

  return (
    <form
      className={cn('space-y-6', editorial && 'space-y-0', compact && 'space-y-5')}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={cn('grid gap-4 md:grid-cols-2', editorial && 'gap-0', compact && 'gap-5')}>
        <div
          className={cn(
            'space-y-2',
            editorial && 'border-b border-border py-5 md:pr-5',
            compact && 'border-b border-border pb-3',
          )}
        >
          <Label
            htmlFor={`${idPrefix}-firstName`}
            className={cn(compact && "after:ml-0.5 after:text-destructive after:content-['*']")}
          >
            Vorname
          </Label>
          <Input
            type="text"
            id={`${idPrefix}-firstName`}
            name="firstName"
            required={compact}
            autoComplete="given-name"
            placeholder="Dein Vorname"
            className={cn(
              editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none',
              compact && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none',
            )}
          />
        </div>

        {compact ? (
          emailField
        ) : (
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
              placeholder="Dein Nachname"
              className={cn(
                editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none',
              )}
            />
          </div>
        )}
      </div>

      {!compact ? (
        <>
          <div className={cn('space-y-2', editorial && 'border-b border-border py-5')}>
            <Label htmlFor={`${idPrefix}-company`}>Firma</Label>
            <Input
              type="text"
              id={`${idPrefix}-company`}
              name="company"
              autoComplete="organization"
              placeholder="Deine Firma"
              className={cn(
                editorial && 'h-11 rounded-none border-0 bg-transparent px-0 shadow-none',
              )}
            />
          </div>

          {emailField}
        </>
      ) : null}

      <div
        className={cn('flex items-start gap-3 pt-1', editorial && 'border-b border-border py-6')}
      >
        <Checkbox
          id={`${idPrefix}-consent`}
          checked={consentChecked}
          required
          onCheckedChange={(checked: boolean | 'indeterminate') => {
            setConsentChecked(checked === true);
          }}
          className="mt-1"
        />
        <div className="flex-1">
          <Label
            htmlFor={`${idPrefix}-consent`}
            className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
          >
            Ich möchte den Mardu Newsletter erhalten und stimme der Verarbeitung meiner Daten dafür
            zu.
          </Label>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Die{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              Datenschutzerklärung
            </Link>{' '}
            habe ich gelesen. Die Anmeldung erfolgt per Double-Opt-in.
          </p>
        </div>
      </div>

      {compact ? (
        <Button
          type="submit"
          size="xl"
          disabled={pending}
          aria-busy={pending}
          className="w-full rounded-none sm:w-auto"
        >
          {pending ? 'Wird gesendet...' : 'Updates per E-Mail erhalten'}
        </Button>
      ) : editorial ? (
        <EditorialActionButton
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="w-full justify-start"
        >
          {pending ? 'Wird gesendet...' : 'Newsletter abonnieren'}
        </EditorialActionButton>
      ) : (
        <Button type="submit" size="xl" disabled={pending} aria-busy={pending}>
          {pending ? 'Wird gesendet...' : 'Newsletter abonnieren'}
        </Button>
      )}

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
