'use client';

import { startTransition, useState } from 'react';
import { Button } from '@mardu/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@mardu/ui/components/dialog';
import { Input } from '@mardu/ui/components/input';
import { Label } from '@mardu/ui/components/label';
import { Checkbox } from '@mardu/ui/components/checkbox';

export default function NewsletterButton({ primaryButtonText }: { primaryButtonText: string }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    setSuccess(null);

    const payload = {
      firstName: String(formData.get('firstName') ?? '').trim() || undefined,
      lastName: String(formData.get('lastName') ?? '').trim() || undefined,
      company: String(formData.get('company') ?? '').trim() || undefined,
      email: String(formData.get('email') ?? '').trim(),
      role: 'newsletter',
    };

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(body?.error ?? 'Newsletter-Anmeldung fehlgeschlagen');
      }

      setSuccess('Bitte bestätige deine Anmeldung über den Link in der E-Mail.');
      startTransition(() => {
        window.setTimeout(() => setOpen(false), 1600);
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unbekannter Fehler');
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">{primaryButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Anmelden</DialogTitle>
          <DialogDescription>
            Unser kostenloser Newsletter informiert Sie regelmäßig über Produktneuheiten und
            Sonderaktionen.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-6 pt-4"
          action={async (formData) => {
            await handleSubmit(formData);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="firstName">Vorname</Label>
            <Input type="text" id="firstName" name="firstName" placeholder="Ihr Vorname" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nachname</Label>
            <Input type="text" id="lastName" name="lastName" placeholder="Ihr Nachname" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Firma</Label>
            <Input type="text" id="company" name="company" placeholder="Ihre Firma" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              E-Mail
            </Label>
            <Input type="email" id="email" name="email" required placeholder="name@example.com" />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox id="privacyConsent" name="privacyConsent" value="accept" required className="mt-1" />
            <Label htmlFor="privacyConsent" className="text-xs font-normal leading-relaxed">
              Ihre hier eingegebenen Daten werden lediglich zur Personalisierung des Newsletters
              verwendet und nicht an Dritte weitergegeben. Durch Absenden der von Ihnen
              eingegebenen Daten willigen Sie in die Datenverarbeitung ein und bestätigen unsere
              Datenschutzerklärung.
            </Label>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-green-700">{success}</p> : null}

          <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? 'Wird gesendet...' : 'Anmelden'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
