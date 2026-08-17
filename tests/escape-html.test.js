import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml } from "../assets/js/escape-html.js";

test("escaped HTML-Sonderzeichen", () => {
  assert.equal(
    escapeHtml(`<script>&"'</script>`),
    "&lt;script&gt;&amp;&quot;&#39;&lt;/script&gt;"
  );
});

test("wandelt Nicht-Strings in Strings um", () => {
  assert.equal(escapeHtml(42), "42");
});
