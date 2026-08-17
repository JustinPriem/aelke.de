import { test } from "node:test";
import assert from "node:assert/strict";
import { content } from "../assets/js/content.js";

test("band hat Pflichtfelder", () => {
  assert.equal(typeof content.band.name, "string");
  assert.ok(content.band.name.length > 0);
  assert.equal(typeof content.band.genre, "string");
  assert.equal(typeof content.band.claim, "string");
});

test("music.spotifyEmbedUrl zeigt auf ein Spotify-Embed", () => {
  assert.match(content.music.spotifyEmbedUrl, /^https:\/\/open\.spotify\.com\/embed\//);
});

test("music.streamAllUrl ist eine gültige URL", () => {
  assert.match(content.music.streamAllUrl, /^https:\/\//);
});

test("gallery hat mindestens 4 Einträge mit id und alt", () => {
  assert.ok(content.gallery.length >= 4);
  for (const item of content.gallery) {
    assert.equal(typeof item.id, "string");
    assert.equal(typeof item.alt, "string");
  }
});

test("instagram.posts verlinken auf echte aelke.music-Posts", () => {
  assert.ok(content.instagram.posts.length >= 4);
  for (const post of content.instagram.posts) {
    assert.match(post.postUrl, /^https:\/\/www\.instagram\.com\/aelke\.music\//);
    assert.equal(typeof post.alt, "string");
  }
});

test("bio.members ist ein Array mit name/role/text pro Eintrag", () => {
  assert.ok(Array.isArray(content.bio.members));
  for (const member of content.bio.members) {
    assert.equal(typeof member.name, "string");
    assert.equal(typeof member.role, "string");
    assert.equal(typeof member.text, "string");
  }
});

test("contact.email sieht wie eine E-Mail-Adresse aus", () => {
  assert.match(content.contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

test("social enthält instagram und spotify Links", () => {
  assert.match(content.social.instagram, /^https:\/\/www\.instagram\.com\//);
  assert.match(content.social.spotify, /^https:\/\/open\.spotify\.com\//);
});
