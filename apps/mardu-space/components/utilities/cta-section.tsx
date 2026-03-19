'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { MeetergoCTAButton } from './meetergo-cta-button';
import { useRecaptcha } from '@/lib/recaptcha';

export interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonHref,
  secondaryButtonHref,
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
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const company = String(formData.get('company') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    const nextErrors: typeof formErrors = {};

    if (!firstName) nextErrors.firstName = 'Bitte geben Sie Ihren Vornamen ein.';
    if (!lastName) nextErrors.lastName = 'Bitte geben Sie Ihren Nachnamen ein.';

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
          firstName,
          lastName,
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_100%,rgba(90,104,255,0.42),transparent_34%),radial-gradient(circle_at_0%_0%,rgba(181,92,112,0.35),transparent_38%),linear-gradient(95deg,rgba(88,74,80,0.74)_0%,rgba(35,37,45,0.94)_100%)]" />
          <div className="absolute inset-y-0 right-[8%] w-[22%] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_12px)] opacity-35" />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/60">
              Nächster Schritt
            </p>
            <h2 className="headline-balance text-[clamp(1.85rem,3.8vw,3.3rem)] leading-[1.05] tracking-[-0.02em] text-white">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-white/82 md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {primaryButtonHref ? (
                <Button asChild>
                  <Link href={primaryButtonHref}>{primaryButtonText}</Link>
                </Button>
              ) : (
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

                  <DialogContent className="max-h-[90vh] overflow-y-auto border border-black/10 bg-background sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Anmelden</DialogTitle>
                      <DialogDescription>
                        Unser Newsletter informiert Sie regelmäßig über Produktneuheiten und
                        Sonderaktionen.
                      </DialogDescription>
                    </DialogHeader>

                    {status === 'success' ? (
                      <Alert role="status" aria-live="polite">
                        <AlertDescription>
                          Vielen Dank. Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <form className="space-y-5 pt-2" onSubmit={handleNewsletterSubmit} noValidate>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="cta.firstName"
                              className="after:ml-0.5 after:text-destructive after:content-['*']"
                            >
                              Vorname
                            </Label>
                            <Input
                              type="text"
                              id="cta.firstName"
                              name="firstName"
                              autoComplete="given-name"
                              ref={firstNameInputRef}
                              aria-invalid={Boolean(formErrors.firstName)}
                            />
                            {formErrors.firstName ? (
                              <p className="text-xs text-destructive">{formErrors.firstName}</p>
                            ) : null}
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="cta.lastName"
                              className="after:ml-0.5 after:text-destructive after:content-['*']"
                            >
                              Nachname
                            </Label>
                            <Input
                              type="text"
                              id="cta.lastName"
                              name="lastName"
                              autoComplete="family-name"
                              ref={lastNameInputRef}
                              aria-invalid={Boolean(formErrors.lastName)}
                            />
                            {formErrors.lastName ? (
                              <p className="text-xs text-destructive">{formErrors.lastName}</p>
                            ) : null}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cta.company">Firma</Label>
                          <Input
                            type="text"
                            id="cta.company"
                            name="company"
                            autoComplete="organization"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="cta.email"
                            className="after:ml-0.5 after:text-destructive after:content-['*']"
                          >
                            E-Mail
                          </Label>
                          <Input
                            type="email"
                            id="cta.email"
                            name="email"
                            autoComplete="email"
                            inputMode="email"
                            ref={emailInputRef}
                            aria-invalid={Boolean(formErrors.email)}
                          />
                          {formErrors.email ? (
                            <p className="text-xs text-destructive">{formErrors.email}</p>
                          ) : null}
                        </div>

                        <div className="space-y-2 pt-1">
                          <Label className="flex cursor-pointer items-start gap-3 text-xs font-normal leading-relaxed text-muted-foreground">
                            <Checkbox
                              id="cta.consent"
                              checked={consentChecked}
                              onCheckedChange={(checked: boolean | 'indeterminate') => {
                                setConsentChecked(checked === true);
                                if (formErrors.consent) {
                                  setFormErrors((prev) => ({ ...prev, consent: undefined }));
                                }
                              }}
                              ref={consentRef}
                              className="mt-1"
                            />
                            Ihre hier eingegebenen Daten werden lediglich zur Personalisierung des
                            Newsletters verwendet. Durch das Absenden willigen Sie in die
                            Datenverarbeitung gemäß Datenschutzerklärung ein.
                          </Label>
                          {formErrors.consent ? (
                            <p className="text-xs text-destructive">{formErrors.consent}</p>
                          ) : null}
                        </div>

                        {status === 'error' ? (
                          <Alert variant="destructive" role="alert" aria-live="assertive">
                            <AlertDescription>{errorMessage}</AlertDescription>
                          </Alert>
                        ) : null}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          ) : null}
                          {isSubmitting ? 'Sende…' : 'Jetzt anmelden'}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              )}

              {secondaryButtonText ? (
                secondaryButtonHref ? (
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/45 bg-white/8 text-white hover:bg-white/14 hover:text-white"
                  >
                    <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                  </Button>
                ) : (
                  <MeetergoCTAButton
                    variant="outline"
                    className="border-white/45 bg-white/8 text-white hover:bg-white/14 hover:text-white sm:ml-0"
                  >
                    {secondaryButtonText}
                  </MeetergoCTAButton>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
