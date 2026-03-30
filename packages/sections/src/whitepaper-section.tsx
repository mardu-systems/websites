'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, FileText, Lock, Mail } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { Checkbox } from '@mardu/ui/components/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@mardu/ui/components/dialog';
import { Input } from '@mardu/ui/components/input';
import { Label } from '@mardu/ui/components/label';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { Overline } from '@mardu/ui/components/typography';
import { cn } from '@mardu/ui/lib/utils';

/**
 * Render-ready request DTO for newsletter/whitepaper lead capture.
 * Mapping to API payloads stays in the consuming app if it needs a custom handler.
 */
export interface WhitepaperLeadRequestDto {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface WhitepaperSectionProps {
  title?: string;
  description?: string;
  benefits?: string[];
  coverImageSrc?: string;
  className?: string;
  eyebrow?: string;
  requestUrl?: string;
  submitLabel?: string;
  submitPendingLabel?: string;
  consentLabel?: string;
  successTitle?: string;
  successDescription?: string;
  onSubmitRequest?: (payload: WhitepaperLeadRequestDto) => Promise<void>;
}

export default function WhitepaperSection({
  title = 'Unser exklusives Whitepaper',
  description = 'Erhalten Sie tiefe Einblicke und wertvolle Strategien in unserem kostenlosen Whitepaper. Melden Sie sich zum Newsletter an, um den Download-Link direkt in Ihr Postfach zu erhalten.',
  benefits = [],
  coverImageSrc,
  className,
  eyebrow = 'Whitepaper',
  requestUrl = '/api/whitepaper/request',
  submitLabel = 'Kostenlos anfordern',
  submitPendingLabel = 'Wird verarbeitet...',
  consentLabel = 'Ich stimme zu, dass ich den Newsletter erhalten möchte. Ich kann mich jederzeit wieder abmelden. Das Whitepaper wird mir nach Bestätigung zugesendet.',
  successTitle = 'Fast geschafft!',
  successDescription = 'Vielen Dank für Ihr Interesse. Wir haben Ihnen eine E-Mail mit dem Download-Link gesendet.\n\nBitte prüfen Sie Ihr Postfach (und den Spam-Ordner). Der Link ist aus Sicherheitsgründen nur begrenzt gültig.',
  onSubmitRequest,
}: WhitepaperSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload: WhitepaperLeadRequestDto = {
      email: String(formData.get('email') ?? ''),
      firstName: String(formData.get('firstName') ?? '') || undefined,
      lastName: String(formData.get('lastName') ?? '') || undefined,
    };

    try {
      if (onSubmitRequest) {
        await onSubmitRequest(payload);
      } else {
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Whitepaper request failed');
        }
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn('w-full px-4 py-16 md:px-8', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="right" className="order-last flex justify-center lg:order-first">
            <div className="group relative">
              <div className="absolute -inset-4 rounded-2xl bg-linear-to-tr from-primary/20 to-accent/20 blur-xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

              <motion.div
                className="relative z-10 flex aspect-3/4 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-xl"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {coverImageSrc ? (
                  <Image
                    src={coverImageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 26rem"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <FileText className="mb-4 h-16 w-16 text-primary" />
                    <span className="text-lg font-semibold text-foreground">{title}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="space-y-4">
                <Overline>{eyebrow}</Overline>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
              </div>

              {benefits.length > 0 ? (
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/78 md:text-base">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Download anfordern</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tragen Sie Ihre Daten ein. Der Download-Link kommt direkt per E-Mail.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="wp-vorname">Vorname</Label>
                      <Input type="text" id="wp-vorname" name="firstName" placeholder="Max" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wp-nachname">Nachname</Label>
                      <Input
                        type="text"
                        id="wp-nachname"
                        name="lastName"
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="wp-email"
                      className="after:ml-0.5 after:text-destructive after:content-['*']"
                    >
                      E-Mail Adresse
                    </Label>
                    <Input
                      type="email"
                      id="wp-email"
                      name="email"
                      required
                      placeholder="max@beispiel.de"
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox id="wp-consent" name="consent" required className="mt-1" />
                    <Label
                      htmlFor="wp-consent"
                      className="text-xs font-normal leading-relaxed text-muted-foreground"
                    >
                      {consentLabel}
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>
                      Die Verarbeitung erfolgt nur für Whitepaper-Download und Newsletter.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? submitPendingLabel : submitLabel}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="h-6 w-6" />
              {successTitle}
            </DialogTitle>
            <DialogDescription className="pt-2 whitespace-pre-line text-base">
              {successDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
              Verstanden
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
