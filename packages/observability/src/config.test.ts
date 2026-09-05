import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  resolveGlitchTipDsn,
  getGlitchTipOrigin,
  sanitizeErrorEvent,
} from "./config";

describe("GlitchTip configuration", () => {
  test("disables reporting without a DSN", () => {
    assert.equal(resolveGlitchTipDsn(undefined), undefined);
    assert.equal(resolveGlitchTipDsn("  "), undefined);
    assert.equal(getGlitchTipOrigin(undefined), "");
  });

  test("accepts GlitchTip URLs with a path prefix and local HTTP", () => {
    assert.equal(
      resolveGlitchTipDsn(" https://key@errors.example.com/glitchtip/12 "),
      "https://key@errors.example.com/glitchtip/12",
    );
    assert.equal(
      getGlitchTipOrigin("http://key@localhost:8000/1"),
      "http://localhost:8000",
    );
  });

  test("rejects malformed DSNs without leaking credentials in the error", () => {
    for (const dsn of [
      "invalid-secret",
      "ftp://key@host/1",
      "https://host/1",
      "https://key:secret@host/1",
      "https://key@host/project",
      "https://key@host/1?token=secret",
    ]) {
      assert.throws(() => resolveGlitchTipDsn(dsn), {
        message:
          "Invalid GlitchTip DSN. Expected http(s)://public-key@host/project-id.",
      });
    }
  });
});

describe("error event privacy", () => {
  test("removes request payloads, credentials, user data, console arguments and breadcrumbs", () => {
    const event = sanitizeErrorEvent({
      type: undefined,
      request: {
        url: "https://user:password@example.com/api/newsletter/confirm?token=secret#fragment",
        method: "GET",
        headers: { authorization: "Bearer secret" },
        cookies: { session: "secret" },
        data: { email: "person@example.com" },
        query_string: "token=secret",
        env: { REMOTE_ADDR: "192.0.2.1" },
      },
      user: { email: "person@example.com" },
      extra: { arguments: [{ password: "secret" }] },
      breadcrumbs: [{ message: "sensitive form input" }],
      tags: { app: "platform" },
      contexts: {
        nextjs: {
          request_path: "/api/newsletter/confirm?token=secret",
          route_type: "route",
        },
        arbitrary: { password: "secret" },
      },
      exception: {
        values: [
          {
            type: "Error",
            value:
              "Failed for person@example.com at https://example.com?token=secret",
          },
        ],
      },
    });
    assert.deepEqual(event.request, {
      url: "https://example.com/api/newsletter/confirm",
      method: "GET",
    });
    assert.equal(event.user, undefined);
    assert.equal(event.extra, undefined);
    assert.equal(event.breadcrumbs, undefined);
    assert.deepEqual(event.tags, { app: "platform" });
    assert.equal(
      event.contexts?.nextjs?.request_path,
      "/api/newsletter/confirm",
    );
    assert.equal(event.contexts?.arbitrary, undefined);
    assert.equal(
      event.exception?.values?.[0]?.value,
      "Failed for [email] at https://example.com/",
    );
  });

  test("preserves exception stack traces and strips local variables", () => {
    const event = sanitizeErrorEvent({
      type: undefined,
      exception: {
        values: [
          {
            type: "TypeError",
            value: "Cannot read property",
            stacktrace: {
              frames: [
                {
                  filename: "https://app.example.com/app.js?token=secret",
                  function: "submit",
                  lineno: 42,
                  vars: { password: "secret" },
                },
              ],
            },
          },
        ],
      },
    });
    assert.deepEqual(event.exception?.values?.[0]?.stacktrace?.frames?.[0], {
      filename: "https://app.example.com/app.js",
      function: "submit",
      lineno: 42,
    });
  });
});
