import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldInjectEmbed } from "../assets/js/spotify-lazy.js";

test("gibt true zurück, wenn der Entry sichtbar ist", () => {
  assert.equal(shouldInjectEmbed({ isIntersecting: true }), true);
});

test("gibt false zurück, wenn der Entry nicht sichtbar ist", () => {
  assert.equal(shouldInjectEmbed({ isIntersecting: false }), false);
});

test("gibt false zurück bei fehlendem Entry", () => {
  assert.equal(shouldInjectEmbed(undefined), false);
});
