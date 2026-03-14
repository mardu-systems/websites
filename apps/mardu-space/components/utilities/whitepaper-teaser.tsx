'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, Download, Loader2, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
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
import { useRecaptcha } from '@/lib/recaptcha';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Overline } from '@/components/ui/typography';

interface WhitepaperTeaserProps {
  className?: string;
}

export default function WhitepaperTeaser({ className }: WhitepaperTeaserProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; consent?: string }>({});
  const emailInputRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const executeRecaptcha = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const nextErrors: { email?: string; consent?: string } = {};

    if (!trimmedEmail) {
      nextErrors.email = 'Bitte geben Sie eine E-Mail-Adresse ein.';
    } else if (emailInputRef.current && !emailInputRef.current.validity.valid) {
      nextErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (!consent) {
      nextErrors.consent = 'Bitte stimmen Sie der Kontaktaufnahme zu.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      if (nextErrors.email) {
        emailInputRef.current?.focus();
      } else {
        consentRef.current?.focus();
      }
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setEmail(trimmedEmail);

    try {
      const token = await executeRecaptcha('whitepaper_signup');

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          role: 'whitepaper',
          ...(token ? { token } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
      setConsent(false);
      setFieldErrors({});

      // Close dialog after success (optional, or keep open to show message)
      // setTimeout(() => setOpen(false), 3000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        <ScrollReveal>
          <div className="relative overflow-hidden border border-black/10 bg-card text-foreground">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-75 h-75 bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-8 md:p-12 lg:p-20 items-center">
              {/* Content Side */}
              <div className="space-y-8">
                <Overline className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  Neuerscheinung
                </Overline>

                <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
                  Whitepaper für Betreiber, Werkstätten und Lernumgebungen
                </h2>

                <p className="max-w-xl text-lg leading-relaxed text-foreground/72">
                  Verdichtete Einordnung zu Betrieb, Qualifikation, Nachvollziehbarkeit und
                  Umsetzung. Für alle, die das Thema intern sauber bewerten und weitergeben müssen.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['Betrieb', 'typische Einsatzbilder und Verantwortlichkeiten'],
                    ['Sicherheit', 'Freigaben, Logs und organisatorische Anforderungen'],
                    ['Entscheidung', 'kompakte Grundlage für interne Abstimmung'],
                  ].map(([label, copy]) => (
                    <div key={label} className="border border-black/10 bg-background/70 p-4">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/48">
                        {label}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-foreground/76">{copy}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Dialog
                    open={open}
                    onOpenChange={(nextOpen) => {
                      setOpen(nextOpen);
                      if (!nextOpen) {
                        setStatus('idle');
                        setErrorMessage('');
                        setFieldErrors({});
                        setLoading(false);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="lg" className="touch-manipulation">
                        Jetzt kostenlos anfordern
                        <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card text-foreground">
                      <DialogHeader>
                        <DialogTitle>Whitepaper anfordern</DialogTitle>
                        <DialogDescription>
                          Melden Sie sich an, um das Whitepaper zu erhalten. Wir senden Ihnen einen
                          Bestätigungslink per E-Mail.
                        </DialogDescription>
                      </DialogHeader>

                      {status === 'success' ? (
                          <div className="py-6 text-center space-y-4">
                            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckSquare className="w-6 h-6 text-green-600" aria-hidden="true" />
                            </div>
                            <p className="text-lg font-medium">Vielen Dank!</p>
                          <p className="text-muted-foreground">
                            Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte klicken Sie auf
                            den Link darin, um Ihre Anmeldung abzuschließen.
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-11 px-6 touch-manipulation"
                            onClick={() => setOpen(false)}
                          >
                            Schließen
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4" noValidate>
                          <div className="space-y-2">
                            <Label htmlFor="wp.email">E-Mail-Adresse</Label>
                            <Input
                              type="email"
                              id="wp.email"
                              name="email"
                              placeholder="name@example.com…"
                              autoComplete="email"
                              inputMode="email"
                              autoCapitalize="none"
                              autoCorrect="off"
                              spellCheck={false}
                              className="touch-manipulation"
                              ref={emailInputRef}
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (fieldErrors.email) {
                                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                                }
                              }}
                              onBlur={(e) => setEmail(e.target.value.trim())}
                              aria-invalid={Boolean(fieldErrors.email)}
                              aria-describedby={fieldErrors.email ? 'wp.email-error' : undefined}
                            />
                            {fieldErrors.email ? (
                              <p
                                id="wp.email-error"
                                className="text-xs text-destructive"
                                aria-live="polite"
                              >
                                {fieldErrors.email}
                              </p>
                            ) : null}
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-start gap-3 text-xs font-normal leading-relaxed text-muted-foreground cursor-pointer">
                              <Checkbox
                                id="wp.terms"
                                name="consent"
                                checked={consent}
                                onCheckedChange={(c) => {
                                  setConsent(c === true);
                                  if (fieldErrors.consent) {
                                    setFieldErrors((prev) => ({ ...prev, consent: undefined }));
                                  }
                                }}
                                ref={consentRef}
                                className="mt-1 touch-manipulation"
                                aria-invalid={Boolean(fieldErrors.consent)}
                                aria-describedby={
                                  fieldErrors.consent ? 'wp.terms-error' : undefined
                                }
                              />
                              Ich stimme zu, dass ich per E-Mail kontaktiert werde. Diese
                              Einwilligung kann jederzeit widerrufen werden.
                            </Label>
                            {fieldErrors.consent ? (
                              <p
                                id="wp.terms-error"
                                className="text-xs text-destructive"
                                aria-live="polite"
                              >
                                {fieldErrors.consent}
                              </p>
                            ) : null}
                          </div>

                          {status === 'error' && (
                            <Alert variant="destructive" role="status" aria-live="polite">
                              <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                          )}

                          <Button
                            type="submit"
                            className="w-full touch-manipulation"
                            disabled={loading}
                            aria-busy={loading}
                          >
                            {loading && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                            )}
                            Jetzt anfordern
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex justify-center lg:justify-end relative">
                {/* Mockup of a document */}
                <motion.div
                  className={cn(
                    'antialiased relative flex aspect-[1/1.4] w-64 flex-col overflow-hidden border border-black/10 bg-white shadow-none rotate-3 md:w-80',
                    !shouldReduceMotion &&
                      'hover:rotate-0 transition-transform duration-500 ease-out motion-reduce:transition-none',
                  )}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                >
                  {/* Mock Header */}
                  <div className="flex h-24 items-center justify-center bg-foreground p-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Download className="text-white w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>
                  {/* Mock Content Lines */}
                  <div className="flex-1 p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                    <div className="space-y-2 pt-6">
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-5/6" />
                    </div>
                    <div className="space-y-2 pt-4">
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-4/6" />
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute bottom-6 right-6 bg-foreground px-3 py-1 text-xs font-bold text-white shadow-lg">
                    PDF
                  </div>
                </motion.div>

                {/* Decorative Elements behind */}
                <div className="absolute -z-10 top-10 right-10 w-64 h-80 border-2 border-white/20 rounded-xl rotate-6" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
