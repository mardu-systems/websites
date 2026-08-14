import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { SolutionDetailDto } from '@mardu/content-core';
import { createSolutionExplorerItems } from './solutions-page-content';

const solution: SolutionDetailDto = {
  id: 'labore',
  slug: 'labore',
  title: 'Labore',
  badge: 'Lösung',
  tagline: 'Sicher forschen',
  summary: 'Zutritt und Freigaben für moderne Laborumgebungen.',
  imageUrl: 'https://cdn.example.com/labore.jpg',
  imageAlt: 'Laborarbeitsplatz',
  updatedAt: '2026-08-14T10:00:00.000Z',
  heroTitle: 'Sichere Prozesse im Labor',
  heroIntro: 'Qualifikationen und Berechtigungen greifen nahtlos ineinander.',
  problemTitle: 'Verlässliche Freigaben im Betrieb',
  problemBody: 'Mardu prüft Berechtigungen direkt am Zugangspunkt.',
  detailMarkdown: 'Zusätzliche **Details** aus dem CMS.',
  heroImageUrl: 'https://cdn.example.com/labore-hero.jpg',
  heroImageAlt: 'Labor mit vernetzten Geräten',
  contentBlocks: [
    {
      id: 'geraetefreigabe',
      eyebrow: 'Anwendungsfall',
      title: 'Gerätefreigabe',
      body: 'Nur geschulte Personen können Geräte starten.',
      imageUrl: 'https://cdn.example.com/geraetefreigabe.jpg',
      imageAlt: 'Freigegebenes Laborgerät',
      imageSide: 'right',
    },
  ],
  features: [
    {
      title: 'Weniger Aufwand',
      description: 'Berechtigungen werden zentral gepflegt.',
    },
  ],
  ctaLabel: 'Laborprojekt besprechen',
  ctaHref: '/contact',
};

describe('solution explorer content', () => {
  test('uses the CMS title instead of the generic badge and keeps all editorial content', () => {
    const [result] = createSolutionExplorerItems([solution]);

    assert.equal(result?.title, 'Labore');
    assert.equal(result?.tagline, solution.tagline);
    assert.equal(result?.heroTitle, solution.heroTitle);
    assert.equal(result?.heroIntro, solution.heroIntro);
    assert.equal(result?.heroImageUrl, solution.heroImageUrl);
    assert.equal(result?.updatedAt, solution.updatedAt);
    assert.deepEqual(result?.applications, solution.contentBlocks);
    assert.deepEqual(result?.benefits, solution.features);
    assert.equal(result?.detailMarkdown, solution.detailMarkdown);
    assert.equal(result?.ctaLabel, solution.ctaLabel);
    assert.equal(result?.ctaHref, solution.ctaHref);
  });
});
