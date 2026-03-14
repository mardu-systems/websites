import { describe, expect, it } from 'vitest';

import { getContactPageContext } from '@/lib/contact-page-context';

describe('getContactPageContext', () => {
  it('returns the default contact context without known query parameters', () => {
    expect(getContactPageContext()).toMatchObject({
      source: 'contact-form',
      overline: 'Kontakt',
    });
  });

  it('returns the admin software context for the documented URL contract', () => {
    expect(
      getContactPageContext({
        source: 'admin-software',
        topic: 'verwaltungssoftware-demo',
      }),
    ).toMatchObject({
      source: 'admin-software',
      overline: 'Verwaltungssoftware',
    });
  });

  it('falls back to the default context for unsupported sources', () => {
    expect(
      getContactPageContext({
        source: 'unsupported',
        topic: 'verwaltungssoftware-demo',
      }),
    ).toMatchObject({
      source: 'contact-form',
      overline: 'Kontakt',
    });
  });
});
