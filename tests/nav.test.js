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

test("galerie ohne .html ergibt galerie", () => {
  assert.equal(getActiveNavId("/galerie"), "galerie");
});

test("biografie ohne .html ergibt biografie", () => {
  assert.equal(getActiveNavId("/biografie"), "biografie");
});

test("kontakt ohne .html mit Query-String ergibt kontakt", () => {
  assert.equal(getActiveNavId("/kontakt?ref=insta"), "kontakt");
});

test("galerie/ mit Trailing Slash ergibt galerie", () => {
  assert.equal(getActiveNavId("/galerie/"), "galerie");
});

test("galerie/ mit GitHub-Pages-Projektpfad ergibt galerie", () => {
  assert.equal(getActiveNavId("/aelke.de/galerie/"), "galerie");
});

test("unbekannter Pfad ergibt null", () => {
  assert.equal(getActiveNavId("/unbekannt.html"), null);
});

test("unbekannter Pfad ohne .html ergibt null", () => {
  assert.equal(getActiveNavId("/unbekannt"), null);
});
