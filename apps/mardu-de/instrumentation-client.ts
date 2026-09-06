import { initGlitchTip } from '@mardu/observability/init';

export { reportRouterTransitionStart as onRouterTransitionStart } from '@mardu/observability/client';

initGlitchTip({
  app: 'mardu-de',
  dsn: process.env.NEXT_PUBLIC_GLITCHTIP_DSN,
  environment: process.env.NEXT_PUBLIC_GLITCHTIP_ENVIRONMENT,
  release: process.env.NEXT_PUBLIC_GLITCHTIP_RELEASE,
});
