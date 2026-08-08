import Link from 'next/link';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';

export const metadata = {
  title: 'Whitepaper Download',
};

export default async function WhitepaperSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  const downloadUrl = `/api/whitepaper/download?token=${token}`;

  return (
    <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center bg-background">
      <div className="bg-card p-8 md:p-16 rounded-[2.5rem] shadow-lg max-w-2xl w-full flex flex-col items-center gap-8 border border-border/50">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-2 animate-in zoom-in duration-500">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Vielen Dank!</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            Deine E-Mail-Adresse wurde bestätigt. Du kannst das Whitepaper nun herunterladen.
          </p>
        </div>

        <div className="w-full max-w-sm bg-muted/30 p-6 rounded-2xl border border-border/50 flex flex-col gap-4 items-center">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-2">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-foreground">Whitepaper 2026</h3>
            <p className="text-sm text-muted-foreground">
              Digitale Zutritts- und Maschinenfreigabe
            </p>
          </div>

          <Button
            render={<a href={downloadUrl} download />}
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base shadow-md mt-2"
          >
            <Download className="mr-2 w-5 h-5" />
            Jetzt herunterladen
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Wir haben dir den Download-Link zusätzlich <br className="hidden md:block" />
          für deine Unterlagen per E-Mail zugesendet.
        </p>

        <Button render={<Link href="/" />} variant="ghost" className="mt-2">
          Zurück zur Startseite
        </Button>
      </div>
    </main>
  );
}
