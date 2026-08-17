import { test } from "node:test";
import assert from "node:assert/strict";
import { getActiveNavId } from "../assets/js/nav.js";

test("Wurzelpfad ergibt home", () => {
  assert.equal(getActiveNavId("/"), "home");
});

test("index.html ergibt home", () => {
  assert.equal(getActiveNavId("/index.html"), "home");
});

test("galerie.html ergibt galerie", () => {
  assert.equal(getActiveNavId("/galerie.html"), "galerie");
});

test("biografie.html ergibt biografie", () => {
  assert.equal(getActiveNavId("/biografie.html"), "biografie");
});

test("kontakt.html mit Query-String ergibt kontakt", () => {
  assert.equal(getActiveNavId("/kontakt.html?ref=insta"), "kontakt");
});

test("unbekannter Pfad ergibt null", () => {
  assert.equal(getActiveNavId("/unbekannt.html"), null);
});
