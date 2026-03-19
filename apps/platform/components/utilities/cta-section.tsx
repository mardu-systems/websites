'use client';

import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { MeetergoCTAButton } from './meetergo-cta-button';
import { useRecaptcha } from '@/lib/recaptcha';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  className = '',
}: CTASectionProps) {
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    consent?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);
  const executeRecaptcha = useRecaptcha();

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('global.vorname') ?? '').trim();
    const lastName = String(formData.get('global.nachname') ?? '').trim();
    const company = String(formData.get('global.firma') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    const nextErrors: { firstName?: string; lastName?: string; email?: string; consent?: string } =
      {};

    if (!firstName) {
      nextErrors.firstName = 'Bitte geben Sie Ihren Vornamen ein.';
    }

    if (!lastName) {
      nextErrors.lastName = 'Bitte geben Sie Ihren Nachnamen ein.';
    }

    if (!email) {
      nextErrors.email = 'Bitte geben Sie eine E-Mail-Adresse ein.';
    } else if (emailInputRef.current && !emailInputRef.current.validity.valid) {
      nextErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (!consentChecked) {
      nextErrors.consent = 'Bitte bestätigen Sie Ihre Einwilligung.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      if (nextErrors.firstName) firstNameInputRef.current?.focus();
      else if (nextErrors.lastName) lastNameInputRef.current?.focus();
      else if (nextErrors.email) emailInputRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }

    setFormErrors({});
    setStatus('idle');
    setErrorMessage('');

    try {
      setIsSubmitting(true);
      const token = await executeRecaptcha('newsletter_signup');

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role: 'newsletter',
          ...(token ? { token } : {}),
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(company ? { company } : {}),
        }),
      });
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        throw new Error(payload?.error || 'Newsletter-Anmeldung fehlgeschlagen');
      }
      setStatus('success');
      form.reset();
      setConsentChecked(false);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error: unknown) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Newsletter-Anmeldung fehlgeschlagen',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="relative overflow-hidden rounded-[28px] border border-black/20 p-8 md:p-12">
          <Image
            src="/landing/granieBackground.png"
            alt=""
            fill
            priority={false}
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(9,12,24,0.11)_0%,rgba(12,15,26,0.38)_40%,rgba(12,15,26,0.12)_100%)]" />
          <div className="absolute inset-y-0 right-[8%] w-[22%] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_12px)] opacity-35" />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/55">
              Nächster Schritt
            </p>
            <h2 className="headline-balance text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em] text-white">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-white/82 md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-center">
              <Dialog
                open={open}
                onOpenChange={(nextOpen: boolean) => {
                  setOpen(nextOpen);
                  if (!nextOpen) {
                    setFormErrors({});
                    setIsSubmitting(false);
                    setConsentChecked(false);
                    setStatus('idle');
                    setErrorMessage('');
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>{primaryButtonText}</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto border border-black/10 bg-background">
                  <DialogHeader>
                    <DialogTitle>Anmelden</DialogTitle>
                    <DialogDescription>
                      Unser Newsletter informiert Sie regelmäßig über Produktneuheiten und
                      Sonderaktionen.
                    </DialogDescription>
                  </DialogHeader>

                  <form className="space-y-5 pt-2" onSubmit={handleNewsletterSubmit} noValidate>
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      name="email_confirm"
                      aria-hidden
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="global.vorname"
                          className="after:ml-0.5 after:text-destructive after:content-['*']"
                        >
                          Vorname
                        </Label>
                        <Input
                          type="text"
                          id="global.vorname"
                          name="global.vorname"
                          autoComplete="given-name"
                          ref={firstNameInputRef}
                          onChange={() => {
                            if (formErrors.firstName)
                              setFormErrors((prev) => ({ ...prev, firstName: undefined }));
                          }}
                          aria-invalid={Boolean(formErrors.firstName)}
                          aria-describedby={
                            formErrors.firstName ? 'cta.first-name-error' : undefined
                          }
                        />
                        {formErrors.firstName ? (
                          <p
                            id="cta.first-name-error"
                            className="text-xs text-destructive"
                            aria-live="polite"
                          >
                            {formErrors.firstName}
                          </p>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="global.nachname"
                          className="after:ml-0.5 after:text-destructive after:content-['*']"
                        >
                          Nachname
                        </Label>
                        <Input
                          type="text"
                          id="global.nachname"
                          name="global.nachname"
                          autoComplete="family-name"
                          ref={lastNameInputRef}
                          onChange={() => {
                            if (formErrors.lastName)
                              setFormErrors((prev) => ({ ...prev, lastName: undefined }));
                          }}
                          aria-invalid={Boolean(formErrors.lastName)}
                          aria-describedby={formErrors.lastName ? 'cta.last-name-error' : undefined}
                        />
                        {formErrors.lastName ? (
                          <p
                            id="cta.last-name-error"
                            className="text-xs text-destructive"
                            aria-live="polite"
                          >
                            {formErrors.lastName}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="global.firma">Firma</Label>
                      <Input
                        type="text"
                        id="global.firma"
                        name="global.firma"
                        autoComplete="organization"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="after:ml-0.5 after:text-destructive after:content-['*']"
                      >
                        E-Mail
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        ref={emailInputRef}
                        onChange={() => {
                          if (formErrors.email)
                            setFormErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? 'cta.email-error' : undefined}
                      />
                      {formErrors.email ? (
                        <p
                          id="cta.email-error"
                          className="text-xs text-destructive"
                          aria-live="polite"
                        >
                          {formErrors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2 pt-1">
                      <Label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                        <Checkbox
                          id="tags"
                          name="tags[]"
                          value="accept"
                          ref={consentRef}
                          className="mt-1"
                          checked={consentChecked}
                          onCheckedChange={(checked: boolean | 'indeterminate') => {
                            setConsentChecked(checked === true);
                            if (formErrors.consent)
                              setFormErrors((prev) => ({ ...prev, consent: undefined }));
                          }}
                          aria-invalid={Boolean(formErrors.consent)}
                          aria-describedby={formErrors.consent ? 'cta.consent-error' : undefined}
                        />
                        Ihre Daten werden nur für den Newsletter genutzt. Mit dem Absenden
                        bestätigen Sie die Datenverarbeitung und unsere Datenschutzerklärung.
                      </Label>
                      {formErrors.consent ? (
                        <p
                          id="cta.consent-error"
                          className="text-xs text-destructive"
                          aria-live="polite"
                        >
                          {formErrors.consent}
                        </p>
                      ) : null}
                    </div>

                    <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : null}
                      Anmelden
                    </Button>
                    {status === 'success' ? (
                      <Alert role="status" aria-live="polite">
                        <AlertDescription>
                          Fast geschafft: Bitte bestätigen Sie die Anmeldung per E-Mail.
                        </AlertDescription>
                      </Alert>
                    ) : null}
                    {status === 'error' ? (
                      <Alert variant="destructive" role="alert" aria-live="assertive">
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    ) : null}
                  </form>
                </DialogContent>
              </Dialog>

              {secondaryButtonText ? (
                <MeetergoCTAButton className="mt-0 ml-0 h-11 rounded-none border border-white/35 bg-white/12 px-5 text-sm uppercase tracking-[0.08em] text-white hover:bg-white/18 sm:mt-0 sm:ml-0">
                  {secondaryButtonText}
                </MeetergoCTAButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
