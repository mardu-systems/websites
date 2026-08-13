import Link from 'next/link';
import type { CollectionSlug, ServerProps, Where } from 'payload';
import React from 'react';
import './admin-dashboard.css';

type DashboardMetric = {
  description: string;
  href: string;
  label: string;
  tone: 'attention' | 'neutral';
  value: number | null;
};

const countDocuments = async (
  payload: ServerProps['payload'],
  collection: CollectionSlug,
  where: Where,
): Promise<number | null> => {
  try {
    const result = await payload.count({ collection, where });
    return result.totalDocs;
  } catch (error) {
    payload.logger.error(
      { collection, error },
      'Admin-Dashboard-Kennzahl konnte nicht geladen werden.',
    );
    return null;
  }
};

export async function AdminDashboardOverview({ payload }: ServerProps) {
  const [failedCrmSyncs, failedEmails, pendingSubscriptions, draftCounts] = await Promise.all([
    countDocuments(payload, 'contact-leads', {
      twentySyncStatus: { equals: 'failed' },
    }),
    countDocuments(payload, 'contact-leads', {
      emailDeliveryStatus: { equals: 'failed' },
    }),
    countDocuments(payload, 'newsletter-subscribers', {
      status: { equals: 'pending' },
    }),
    Promise.all(
      (
        [
          'blog-posts',
          'integrations',
          'solutions',
          'products',
          'legal-pages',
          'roadmap-items',
        ] satisfies CollectionSlug[]
      ).map((collection) => countDocuments(payload, collection, { _status: { equals: 'draft' } })),
    ),
  ]);

  const drafts = draftCounts.every((count) => count !== null)
    ? draftCounts.reduce<number>((total, count) => total + (count ?? 0), 0)
    : null;
  const metrics: DashboardMetric[] = [
    {
      description: 'Datensätze, die erneut mit Twenty synchronisiert werden müssen.',
      href: '/admin/collections/contact-leads?where[twentySyncStatus][equals]=failed',
      label: 'CRM-Synchronisierung fehlgeschlagen',
      tone: failedCrmSyncs !== null && failedCrmSyncs > 0 ? 'attention' : 'neutral',
      value: failedCrmSyncs,
    },
    {
      description: 'Kontaktanfragen, deren Benachrichtigung nicht zugestellt wurde.',
      href: '/admin/collections/contact-leads?where[emailDeliveryStatus][equals]=failed',
      label: 'E-Mail-Zustellung fehlgeschlagen',
      tone: failedEmails !== null && failedEmails > 0 ? 'attention' : 'neutral',
      value: failedEmails,
    },
    {
      description: 'Newsletter-Anmeldungen warten auf ihre Double-Opt-in-Bestätigung.',
      href: '/admin/collections/newsletter-subscribers?where[status][equals]=pending',
      label: 'Bestätigung ausstehend',
      tone: 'neutral',
      value: pendingSubscriptions,
    },
    {
      description: 'Noch nicht veröffentlichte Inhalte aus Redaktion und Katalog.',
      href: '/admin/collections/blog-posts?where[_status][equals]=draft',
      label: 'Offene Entwürfe',
      tone: 'neutral',
      value: drafts,
    },
  ];

  return (
    <section className="mardu-admin-dashboard" aria-labelledby="mardu-dashboard-title">
      <div className="mardu-admin-dashboard__heading">
        <div>
          <p className="mardu-admin-dashboard__eyebrow">Arbeitsübersicht</p>
          <h1 id="mardu-dashboard-title">Willkommen in der Mardu Admin-Plattform</h1>
          <p>Offene Aufgaben erkennen und häufige Inhalte direkt bearbeiten.</p>
        </div>
        <div className="mardu-admin-dashboard__actions" aria-label="Schnellaktionen">
          <Link className="btn" href="/admin/collections/blog-posts/create">
            Blogbeitrag erstellen
          </Link>
          <Link className="btn btn--style-secondary" href="/admin/collections/products/create">
            Produkt anlegen
          </Link>
        </div>
      </div>

      <div className="mardu-admin-dashboard__metrics">
        {metrics.map((metric) => (
          <Link
            className={`mardu-admin-dashboard__metric mardu-admin-dashboard__metric--${metric.tone}`}
            href={metric.href}
            key={metric.label}
          >
            <span className="mardu-admin-dashboard__metric-value">
              {metric.value === null ? '–' : metric.value}
            </span>
            <strong>{metric.label}</strong>
            <span>{metric.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
