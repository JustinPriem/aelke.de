import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPlaceholderTileHTML, buildGridHTML } from "../assets/js/gallery-render.js";

test("rendert einen Link, wenn linkUrl gesetzt ist", () => {
  const html = buildPlaceholderTileHTML(
    { id: "insta-1", alt: "Testfoto" },
    { linkUrl: "https://instagram.com/p/123", label: "Instagram" }
  );
  assert.match(html, /^<a /);
  assert.match(html, /href="https:\/\/instagram\.com\/p\/123"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener"/);
});

test("rendert einen Button, wenn keine linkUrl gesetzt ist", () => {
  const html = buildPlaceholderTileHTML({ id: "gallery-1", alt: "Testfoto" });
  assert.match(html, /^<button /);
  assert.match(html, /data-gallery-id="gallery-1"/);
});

test("escaped HTML im Alt-Text", () => {
  const html = buildPlaceholderTileHTML({ id: "x", alt: "<script>alert(1)</script>" });
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("buildGridHTML kombiniert mehrere Items mit Item-spezifischen Optionen", () => {
  const items = [
    { id: "a", alt: "A" },
    { id: "b", alt: "B", postUrl: "https://instagram.com/p/b" },
  ];
  const html = buildGridHTML(items, (item) =>
    item.postUrl ? { linkUrl: item.postUrl, label: "Instagram" } : {}
  );
  const buttonMatches = html.match(/<button /g) || [];
  const linkMatches = html.match(/<a /g) || [];
  assert.equal(buttonMatches.length, 1);
  assert.equal(linkMatches.length, 1);
});
