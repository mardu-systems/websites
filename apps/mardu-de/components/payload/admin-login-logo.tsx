import React from 'react';
import './admin-auth.css';

export function AdminLoginLogo() {
  const oidcEnabled = Boolean(
    process.env.OIDC_ISSUER && process.env.OIDC_CLIENT_ID && process.env.OIDC_CLIENT_SECRET,
  );

  return (
    <div className="mardu-admin-auth-card" role="status" aria-live="polite">
      <h1 className="mardu-admin-auth-title">Mardu Admin</h1>
      <p className="mardu-admin-auth-subtitle">
        {oidcEnabled ? 'Anmeldung über OIDC moeglich' : 'Anmeldung mit E-Mail und Passwort'}
      </p>
      {oidcEnabled ? (
        <>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="btn mardu-admin-auth-cta" href="/api/sso/login?returnTo=/admin">
            Mit OIDC anmelden
          </a>
          <div className="mardu-admin-auth-separator">
            <p className="mardu-admin-auth-fallback">Oder mit E-Mail und Passwort</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
