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
    ".instagram-card",
    ".site-footer__social-link",
    ".split-section",
    ".split-section__col",
    ".press-list",
    ".press-card",
    ".gallery-teaser__cta",
  ];

  for (const selector of requiredSelectors) {
    const pattern = new RegExp(`(^|[\\s,}])${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*[,{]`);
    assert.ok(pattern.test(css), `erwarte, dass style.css ${selector} definiert`);
  }
});
