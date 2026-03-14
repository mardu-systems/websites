import React from 'react';
import './admin-auth.css';

type LogoutButtonProps = {
  tabIndex?: number;
};

export function AdminSSOLogoutButton({ tabIndex }: LogoutButtonProps) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      className="btn mardu-admin-auth-cta"
      href="/api/sso/logout?redirect=/admin/login"
      tabIndex={tabIndex}
    >
      Abmelden (OIDC Session)
    </a>
  );
}
