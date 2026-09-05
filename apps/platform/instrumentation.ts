export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    const { initGlitchTip } = await import('@mardu/observability/init');
    initGlitchTip({
      app: 'platform',
      dsn: process.env.GLITCHTIP_DSN?.trim() || process.env.NEXT_PUBLIC_GLITCHTIP_DSN,
      environment: process.env.NEXT_PUBLIC_GLITCHTIP_ENVIRONMENT,
      release: process.env.NEXT_PUBLIC_GLITCHTIP_RELEASE,
    });
  }
}

export { reportRequestError as onRequestError } from '@mardu/observability/server';
