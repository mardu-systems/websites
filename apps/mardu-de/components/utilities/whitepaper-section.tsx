'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, FileText, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface WhitepaperSectionProps {
  title?: string;
  description?: string;
  benefits?: string[];
  coverImageSrc?: string;
  className?: string;
}

export default function WhitepaperSection({
  title = 'Unser exklusives Whitepaper',
  description = 'Erhalten Sie tiefe Einblicke und wertvolle Strategien in unserem kostenlosen Whitepaper. Melden Sie sich zum Newsletter an, um den Download-Link direkt in Ihr Postfach zu erhalten.',
  benefits = [],
  coverImageSrc,
  className,
}: WhitepaperSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle submit via internal API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    };

    try {
      const response = await fetch('/api/whitepaper/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
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
    <section className={cn('py-16 px-4 md:px-8 w-full', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Visual / Cover */}
          <ScrollReveal direction="right" className="order-last lg:order-first flex justify-center">
            <div className="relative group">
              {/* Abstract decorative background */}
              <div className="z-50 absolute -inset-4 bg-linear-to-tr from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div 
                className="z-60 relative bg-card border border-border rounded-xl shadow-xl overflow-hidden w-full max-w-sm aspect-3/4 flex items-center justify-center"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {coverImageSrc ? (
                  <Image 
                    src={coverImageSrc} 
                    alt="Whitepaper Cover" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground p-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Whitepaper 2026</h3>
                    <p className="text-sm">Strategien & Analysen</p>
                    <div className="mt-8 flex items-center gap-2 text-xs font-medium bg-secondary px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3" />
                      Nur für Abonnenten
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Column: Content & Form */}
          <ScrollReveal direction="left" className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                Kostenloser Download
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Jetzt anmelden & herunterladen
              </h3>

              {/* Internal API Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="wp-vorname">Vorname</Label>
                    <Input
                      type="text"
                      id="wp-vorname"
                      name="firstName"
                      placeholder="Max"
                    />
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
                  <Label htmlFor="wp-email" className="after:content-['*'] after:ml-0.5 after:text-destructive">
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
                  <Checkbox
                    id="wp-consent"
                    name="consent"
                    required
                    className="mt-1"
                  />
                  <Label htmlFor="wp-consent" className="text-xs text-muted-foreground leading-relaxed font-normal">
                    Ich stimme zu, dass ich den Newsletter erhalten möchte. Ich kann mich jederzeit wieder abmelden.
                    Das Whitepaper wird mir nach Bestätigung zugesendet.
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Wird verarbeitet...' : 'Kostenlos anfordern'}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Success Feedback Dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="w-6 h-6" />
              Fast geschafft!
            </DialogTitle>
            <DialogDescription className="pt-2 text-base">
              Vielen Dank für Ihr Interesse. Wir haben Ihnen eine <strong>E-Mail mit dem Download-Link</strong> gesendet.
              <br /><br />
              Bitte prüfen Sie Ihr Postfach (und den Spam-Ordner). Der Link ist aus Sicherheitsgründen nur begrenzt gültig.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>Verstanden</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
