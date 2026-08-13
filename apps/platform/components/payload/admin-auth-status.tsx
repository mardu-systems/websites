import React from 'react';
import './admin-auth.css';

type AdminAuthStatusProps = {
  user?: {
    _strategy?: string;
  } | null;
};

export function AdminAuthStatus({ user }: AdminAuthStatusProps) {
  const oidcEnabled = Boolean(
    process.env.OIDC_ISSUER && process.env.OIDC_CLIENT_ID && process.env.OIDC_CLIENT_SECRET,
  );
  const activeStrategy = user?._strategy || 'unknown';
  const isSsoSession = activeStrategy === 'oidc-session';

  return (
    <span className="mardu-admin-auth-status">
      {isSsoSession
        ? 'Angemeldet über Mardu SSO'
        : oidcEnabled
          ? 'Lokal angemeldet · SSO verfügbar'
          : 'Lokal angemeldet'}
    </span>
  );
}
