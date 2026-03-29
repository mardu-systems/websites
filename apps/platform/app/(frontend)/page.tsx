import { Button } from '@mardu/ui/components/button';
import { ArrowRight, Globe, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const adminActions = [
  {
    title: 'Admin Login',
    description: 'Payload Admin für Content, Media, Nutzerverwaltung und Lead-Datensätze.',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'mardu.de',
    description: 'Öffentliche Hauptseite für Kunden, Inhalte und Produktkommunikation.',
    href: 'https://www.mardu.de',
    icon: Globe,
  },
  {
    title: 'mardu.space',
    description: 'Öffentliche Produktsite für Werkstätten, Labs und Whitepaper-Flows.',
    href: 'https://mardu.space',
    icon: Globe,
  },
  {
    title: 'API Entry',
    description: 'Zentraler Einstieg für Lead- und Payload-Endpunkte dieser Plattform.',
    href: '/api/contact',
    icon: ShieldCheck,
  },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(28,97,255,0.08),transparent_35%),linear-gradient(180deg,#f7f8fb_0%,#ffffff_100%)] pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-14 md:py-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">Mardu Platform</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] tracking-[-0.05em] text-foreground">
            Admin- und Betriebsoberfläche.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg">
            Diese App ist nur für interne Nutzung vorgesehen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin">
                Admin Login
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://www.mardu.de">Zu mardu.de</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://mardu.space">Zu mardu.space</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {adminActions.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-3xl border border-black/8 bg-white/85 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-transform duration-150 hover:-translate-y-0.5 hover:border-black/14"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="inline-flex rounded-2xl bg-foreground/6 p-3 text-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl tracking-[-0.03em] text-foreground">
                        {section.title}
                      </h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/70">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
