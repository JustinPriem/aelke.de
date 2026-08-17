import { test } from "node:test";
import assert from "node:assert/strict";
import { computeNextIndex, computePrevIndex, mapKeyToAction } from "../assets/js/lightbox.js";

test("computeNextIndex springt am Ende zurück auf 0", () => {
  assert.equal(computeNextIndex(2, 3), 0);
});

test("computeNextIndex zählt um eins hoch", () => {
  assert.equal(computeNextIndex(0, 3), 1);
});

test("computePrevIndex springt am Anfang zum letzten Index", () => {
  assert.equal(computePrevIndex(0, 3), 2);
});

test("computePrevIndex zählt um eins runter", () => {
  assert.equal(computePrevIndex(1, 3), 0);
});

test("computeNextIndex gibt -1 bei leerer Liste zurück", () => {
  assert.equal(computeNextIndex(0, 0), -1);
});

test("mapKeyToAction erkennt Pfeiltasten und Escape", () => {
  assert.equal(mapKeyToAction("ArrowRight"), "next");
  assert.equal(mapKeyToAction("ArrowLeft"), "prev");
  assert.equal(mapKeyToAction("Escape"), "close");
  assert.equal(mapKeyToAction("a"), null);
});
