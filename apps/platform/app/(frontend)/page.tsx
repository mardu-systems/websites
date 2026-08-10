import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mardu Platform',
  description: 'Interne Admin- und Betriebsoberfläche der zentralen Mardu Plattform.',
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Mardu Platform</h1>
      <p className="mt-2">Interne Website.</p>

      <nav aria-label="Platform-Links" className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
        <Link className="underline" href="/admin">
          Payload Login
        </Link>
        <Link className="underline" href="/publisher">
          Impressum
        </Link>
        <Link className="underline" href="/privacy">
          Datenschutz
        </Link>
      </nav>
    </main>
  );
}
