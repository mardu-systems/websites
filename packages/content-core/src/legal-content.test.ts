import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { getBundledLegalPage } from "./legal-content";

describe("bundled legal pages", () => {
  test("provides a complete publisher fallback", () => {
    const page = getBundledLegalPage("publisher");

    assert.equal(page.title, "Impressum");
    assert.match(page.contentMarkdown, /Mardu GmbH/);
    assert.match(page.contentMarkdown, /HRB 757158/);
  });

  test("provides a complete privacy fallback", () => {
    const page = getBundledLegalPage("privacy");

    assert.equal(page.title, "Datenschutzerklärung");
    assert.match(page.contentMarkdown, /Art\. 6 Abs\. 1/);
    assert.match(page.contentMarkdown, /Ihre Rechte/);
  });
});
