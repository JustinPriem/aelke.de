import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../assets/css/style.css", import.meta.url), "utf8");

test("style.css hat ausgeglichene geschweifte Klammern", () => {
  const opens = (css.match(/{/g) || []).length;
  const closes = (css.match(/}/g) || []).length;
  assert.equal(opens, closes);
});

test("style.css definiert die Kern-Layout-Klassen", () => {
  const requiredSelectors = [
    ".container",
    ".site-header",
    ".site-nav",
    ".nav-toggle",
    ".section",
    ".btn",
    ".grain-overlay",
    ".tile-grid",
    ".tile-placeholder",
    ".site-footer",
    ".hero",
    ".hero__title",
    ".music__embed",
    ".member-list",
    ".member-card",
    ".lightbox",
    ".contact-page__email",
  ];

  for (const selector of requiredSelectors) {
    assert.ok(css.includes(selector), `erwarte, dass style.css ${selector} definiert`);
  }
});
