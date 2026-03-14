export type PayloadSsoLoginQueryDto = {
  returnTo?: string;
};

export type PayloadSsoLogoutQueryDto = {
  redirect?: string;
};

export type PayloadSsoCallbackQueryDto = {
  code?: string;
  error?: string;
  state?: string;
};

export type PayloadSsoErrorCode =
  | 'oidc_not_configured'
  | 'oidc_login_init_failed'
  | 'oidc_missing_callback_params'
  | 'oidc_state_missing'
  | 'oidc_state_invalid'
  | 'oidc_state_mismatch'
  | 'oidc_email_not_allowed'
  | 'oidc_user_not_found'
  | 'oidc_callback_failed'
  | `oidc_${string}`;

export type PayloadSsoErrorDto = {
  error: PayloadSsoErrorCode | string;
};

export type PayloadSsoDebugDto = {
  authStrategies: string[];
  foundUser: null | {
    id: number | string;
  };
  hasCookieHeader: boolean;
  hasSessionCookie: boolean;
  hasStateCookie: boolean;
  isOidcEnabled: boolean;
  sessionClaims: null | {
    hasName: boolean;
    subPrefix: string;
  };
  sessionError: null | string;
  strategyProbe: null | {
    collection?: string;
    strategy?: string;
    userId?: number | string;
  };
  strategyProbeError: null | string;
};
