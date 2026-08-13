import Image from 'next/image';
import React from 'react';
import './admin-auth.css';

export function AdminLoginLogo() {
  const oidcEnabled = Boolean(
    process.env.OIDC_ISSUER && process.env.OIDC_CLIENT_ID && process.env.OIDC_CLIENT_SECRET,
  );

  return (
    <div className={`mardu-admin-auth-card${oidcEnabled ? ' mardu-admin-auth-card--sso' : ''}`}>
      <Image
        priority
        alt="Mardu"
        className="mardu-admin-auth-logo"
        height={37}
        src="/logos/Logo.svg"
        width={204}
      />
      <h1 className="mardu-admin-auth-title">Admin-Plattform</h1>
      <p className="mardu-admin-auth-subtitle">
        {oidcEnabled
          ? 'Sicher mit deinem Mardu-Konto anmelden'
          : 'Mit E-Mail und Passwort anmelden'}
      </p>
      {oidcEnabled ? (
        <>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="btn mardu-admin-auth-cta" href="/api/sso/login?returnTo=/admin">
            Mit Mardu SSO anmelden
          </a>
          <div className="mardu-admin-auth-separator">
            <p className="mardu-admin-auth-fallback">Alternative Anmeldung für Notfälle</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
