import { close, getClient } from "@sentry/nextjs";
import { initGlitchTip } from "../init";
import { reportError } from "../index";
import { reportRequestError, reportServerError } from "../server";

initGlitchTip({
  app: "platform",
  dsn: process.env.TEST_GLITCHTIP_DSN,
  environment: "test",
  release: "glitchtip-test",
});

if (!process.env.TEST_GLITCHTIP_DSN) {
  if (getClient() || reportError(new Error("disabled")) !== undefined) {
    throw new Error("Reporting must be a no-op without a DSN");
  }
} else {
  reportError(new Error("manual-test-error"), "manual-test");
  console.error("caught-error", new Error("console-test-error"));
  await reportServerError(new Error("server-catch-test-error"), "server-catch");
  await reportRequestError(
    new Error("request-test-error"),
    {
      path: "/api/newsletter?token=never-send-this",
      method: "GET",
      headers: {
        authorization: "Bearer never-send-this",
        cookie: "session=never-send-this",
      },
    },
    {
      routerKind: "App Router",
      routePath: "/api/newsletter",
      routeType: "route",
      revalidateReason: undefined,
    },
  );
  await close(2000);
}
