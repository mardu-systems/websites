import type { Metadata } from 'next';
import { CTASection } from '@mardu/sections';
import {
  CatalogCarrierGrid,
  CatalogCategoryGrid,
  CatalogHero,
  CatalogProductGrid,
  CatalogTechnologyGrid,
} from '@mardu/catalog-ui';
import {
  getCatalogCarriers,
  getCatalogCategories,
  getCatalogProducts,
  getCatalogTechnologies,
  getFeaturedCatalogProducts,
} from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Produkte',
  description:
    'Hardware, Identmedien und Zubehör für Mardu-Installationen – von der Maschine bis zum weiteren Zugangspunkt.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Produkte | Mardu',
    description:
      'Hardware, Identmedien und Zubehör für Mardu-Installationen – von der Maschine bis zum weiteren Zugangspunkt.',
    url: '/products',
    type: 'website',
  },
};

export default async function ProductsPage() {
  const [categories, technologies, carriers, featuredProducts, allProducts] = await Promise.all([
    getCatalogCategories(),
    getCatalogTechnologies(),
    getCatalogCarriers(),
    getFeaturedCatalogProducts(3),
    getCatalogProducts(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <CatalogHero
        eyebrow="Produktkatalog"
        title="Hardware, Credentials und Zubehör für reale Mardu-Installationen"
        description="Dieser Bereich ist für konkrete Projektbausteine gedacht: Produkte verstehen, typische Kombinationen prüfen, Richtpreise sehen und anschließend gezielt anfragen. Nicht als Einstieg in die Lösung, sondern als vertiefender Schritt."
        primaryCta={{ label: 'Angebot anfragen', href: '/contact?source=contact-form' }}
        secondaryCta={{ label: 'Integrationen ansehen', href: '/integrations' }}
      />

      <CatalogCategoryGrid
        eyebrow="Familien"
        title="Produkte nach Rolle im System statt nach Einzelteilen aufrufen"
        description="Der Einstieg erfolgt über Produktfamilien, damit Türen, Maschinen, Credentials und Zubehör nicht als lose SKU-Liste erscheinen, sondern als zusammenhängender Systemaufbau."
        categories={categories}
        buildHref={(category) => `/products#category-${category.slug}`}
      />

      <CatalogTechnologyGrid
        eyebrow="Technologien"
        title="Technologien, die Produkte und Freigabelogik im Hintergrund tragen"
        description="NFC, RFID, mobile Keys und Funkstandards sind hier keine Bühne für sich. Sie helfen zu verstehen, welche Produkte und Träger in einem Projekt zusammenwirken."
        items={technologies}
      />

      <CatalogCarrierGrid
        eyebrow="Credentials"
        title="Träger und Credentials für unterschiedliche Ausgabe- und Nutzungsszenarien"
        description="Von günstigen NFC-Tags bis zu robusten Key Fobs oder mobilen Keys. Diese Ebene erklärt die Identitätsseite des Systems und ihre Verbindung zur Software und den Zugriffspunkten."
        items={carriers}
      />

      <CatalogProductGrid
        eyebrow="Highlights"
        title="Kuratiert für typische Mardu-Projekte"
        description="Diese Produkte sind für den Einstieg, für erste Angebote oder für wiederkehrende Hardware-Anfragen besonders relevant."
        products={featuredProducts}
        buildHref={(product) => `/products/${product.slug}`}
      />

      {categories.map((category) => {
        const products = allProducts.filter((product) => product.categoryId === category.id);
        if (products.length === 0) {
          return null;
        }

        return (
          <div key={category.id} id={`category-${category.slug}`}>
            <CatalogProductGrid
              eyebrow={category.name}
              title={category.description}
              description={`Katalogbereich für ${category.name.toLowerCase()}. Jeder Eintrag führt in eine Detailseite mit Varianten, technischen Daten und Angebotsanfrage.`}
              products={products}
              buildHref={(product) => `/products/${product.slug}`}
            />
          </div>
        );
      })}

      <CTASection
        title="Noch nicht sicher, welche Kombination passt?"
        description="Dann starten Sie nicht mit einer Einzelposition. Gemeinsam klären wir den Zugangspunkt, die vorhandene Infrastruktur und die passende Produktkombination."
        primaryButtonText="Projekt besprechen"
        primaryButtonHref="/contact"
        secondaryButtonText="Integrationen ansehen"
        secondaryButtonHref="/integrations"
      />
    </main>
  );
}
