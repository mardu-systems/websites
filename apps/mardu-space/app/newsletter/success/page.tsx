import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Anmeldung bestätigt',
};

export default function NewsletterSuccessPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center bg-background">
      <div className="bg-card p-8 md:p-12 rounded-3xl shadow-sm max-w-lg w-full flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-primary">Anmeldung erfolgreich!</h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          Vielen Dank. Sie wurden erfolgreich zum Newsletter angemeldet.
        </p>

        <Button asChild className="mt-4" size="lg">
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </main>
  );
}
