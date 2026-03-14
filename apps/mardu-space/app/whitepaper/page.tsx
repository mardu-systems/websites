import WhitepaperSection from '@/components/utilities/whitepaper-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whitepaper Download | Mardu',
  description: 'Laden Sie unser exklusives Whitepaper herunter und erhalten Sie wertvolle Einblicke in die Zukunft des Marktes.',
};

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="min-h-screen pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Digitale Zutritts- und Maschinenfreigabe
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Das Whitepaper für Unternehmenswerkstätten, Hochschulen, Makerspaces und private
            Werkstätten.
          </p>
        </div>

        <WhitepaperSection
          title="Whitepaper: Sicherheit & Organisation"
          description="Wie Werkstattleitungen und Sicherheitsverantwortliche Zutritt, Maschinenfreigaben und Unterweisungen zuverlässig organisieren. Erfahren Sie, wie mardu.space Schlüssel und Listen durch ein konsistentes Berechtigungsmodell ersetzt."
          benefits={[
            'Sicherheit & Nachvollziehbarkeit: Personenbezogene, zeitlich definierte Berechtigungen und Ereignisprotokolle',
            'Reduzierter Verwaltungsaufwand: Digitale Vergabe, Anpassung und Entzug von Rechten ohne Schlüsselmanagement',
            'Flexibler Betrieb: Lokal oder zentral administrierbar, passend zu Ihrer Infrastruktur',
            'Compliance: Technische Durchsetzung von Unterweisungen (DGUV/TRBS) und lückenlose Dokumentation',
            'Skalierbarkeit: Vom einzelnen Makerspace bis zum Produktionsstandort',
          ]}
        />

        <div className="max-w-3xl mx-auto mt-16 text-center px-4">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Bereits für den Newsletter angemeldet?
          </h3>
          <p className="text-muted-foreground">
            Kein Problem! Geben Sie einfach erneut Ihre E-Mail-Adresse im Formular oben ein. Unser
            System erkennt Sie und sendet Ihnen den aktuellen Download-Link direkt zu, ohne dass Sie
            sich erneut bestätigen müssen.
          </p>
        </div>
      </div>
    </main>
  );
}
