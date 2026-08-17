# ÆLKE Band-Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine statische, mehrsprachig-freie (Deutsch), mobile-first Band-Website für ÆLKE bauen:
eine große Main-Page (Hero, Musik, Instagram, Bio-Teaser, Galerie-Teaser, Kontakt/Footer) plus
drei Unterseiten (Biografie, Galerie mit Lightbox, Kontakt).

**Architecture:** Reines HTML/CSS/JavaScript ohne Build-Prozess. Alle austauschbaren Inhalte
liegen zentral in `assets/js/content.js` (ES-Modul), getrennt vom Layout-Code. Pure
Logik-Funktionen (Navigation, Lightbox-Index-Mathematik, Grid-Rendering, Spotify-Lazy-Load-
Entscheidung, HTML-Escaping) sind in eigene ES-Module ausgelagert und mit Node.js' eingebautem
Test-Runner (`node:test`) abgedeckt. DOM-Verdrahtung (Event-Listener, tatsächliches Rendering)
wird manuell im Browser verifiziert.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Grid, Flexbox), Vanilla JavaScript (ES-Module),
Node.js `node:test` + `node:assert/strict` für Unit-Tests, Google Fonts (Playfair Display +
Inter) via `<link>`, offizielles Spotify-`iframe`-Embed. Kein Framework, kein Bundler, keine
Datenbank, kein Server-Backend.

## Global Constraints

- Kein Build-Prozess, kein Framework, keine Datenbank, kein Server-Backend (statische Website).
- Sprache: ausschließlich Deutsch, kein Sprachumschalter.
- Kein Newsletter, kein Kontaktformular (nur `mailto:`-Link), keine Tourdaten-/Kalender-Sektion,
  kein Live-Instagram-API-Feed, kein CMS/Login-Bereich, kein Merch-Shop.
- Mobile-first responsive Design, Desktop vollwertig mitgedacht.
- Farben: Hintergrund `#0a0a0a`, Text `#f2f0eb`, Sekundärtext `#9a9a94`, Rahmen `#2a2a27`, Akzent
  `#b5502e` (Hover `#d3673f`) — ausreichender Kontrast für WCAG AA auf Dark-Theme.
- Typografie: Serifen-Display-Schrift für Überschriften/Logo-Schriftzug, schlichte Grotesk für
  Fließtext.
- Alle austauschbaren Inhalte (Texte, Bildbeschreibungen, Links, E-Mail) liegen zentral in
  `assets/js/content.js`; noch fehlende echte Inhalte sind wörtlich mit `TODO:` markiert — keine
  erfundenen Fakten (z. B. keine erfundenen Mitgliedernamen).
- Es werden keine echten Fotos aus Instagram heruntergeladen oder redistribuiert. Bis echte
  Pressefotos vorliegen, werden generierte Platzhalter-Kacheln (Verlauf + CSS-Grain-Textur +
  Label) verwendet; Instagram-Grid-Kacheln verlinken auf die echten Insta-Posts, ohne deren
  Bilder zu hosten.
- Bilder lazy-loaded, Spotify-Embed erst laden wenn sichtbar (IntersectionObserver).
- Galerie-Lightbox vollständig tastaturbedienbar (Tab-Fokus, Escape, Pfeiltasten).
- Alt-Texte für alle Bild-/Platzhalter-Elemente.

---

### Task 1: Projekt-Grundgerüst & Design-Tokens

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `assets/css/tokens.css`
- Modify: `README.md`

**Interfaces:**
- Produces: CSS Custom Properties in `:root` (`--color-bg`, `--color-bg-elevated`, `--color-text`,
  `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-hover`,
  `--font-display`, `--font-body`, `--space-1` … `--space-6`, `--max-width`, `--radius-sm`,
  `--radius-md`, `--transition-base`) — werden von `assets/css/style.css` (Task 2+) konsumiert.
- Produces: `npm test` Skript, das `node --test tests/` ausführt — wird ab Task 3 verwendet.

- [ ] **Schritt 1: `package.json` anlegen**

```json
{
  "name": "aelke-de",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Website für die Band ÆLKE",
  "scripts": {
    "test": "node --test tests/"
  }
}
```

- [ ] **Schritt 2: `.gitignore` anlegen**

```
node_modules/
.DS_Store
```

- [ ] **Schritt 3: `assets/css/tokens.css` anlegen**

```css
:root {
  /* Farben */
  --color-bg: #0a0a0a;
  --color-bg-elevated: #141412;
  --color-text: #f2f0eb;
  --color-text-muted: #9a9a94;
  --color-border: #2a2a27;
  --color-accent: #b5502e;
  --color-accent-hover: #d3673f;

  /* Typografie */
  --font-display: "Playfair Display", Georgia, "Times New Roman", serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Abstände */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;

  /* Layout */
  --max-width: 1100px;
  --radius-sm: 4px;
  --radius-md: 10px;

  /* Bewegung */
  --transition-base: 200ms ease;
}
```

- [ ] **Schritt 4: `README.md` aktualisieren**

```md
# aelke.de

Website für die Band **ÆLKE** (Indie-Rock).

## Entwicklung

Reine statische Website – kein Build-Prozess nötig. Einfach `index.html` (bzw. eine der anderen
`.html`-Dateien) im Browser öffnen oder lokal servieren, z. B. mit:

    npx serve .

## Inhalte pflegen

Alle austauschbaren Inhalte (Bandtext, Bandmitglieder, Bildbeschreibungen, Kontakt-E-Mail,
Social-Links, Spotify-Embed-URL) liegen zentral in [`assets/js/content.js`](assets/js/content.js).
Mit `TODO:` markierte Werte sind Platzhalter und sollten vor dem Live-Gang durch echte Inhalte
ersetzt werden.

## Tests

Die testbare Logik (Content-Struktur, Navigation, Lightbox, Grid-Rendering, Spotify-Lazy-Load,
HTML-Escaping) ist mit Node.js' eingebautem Test-Runner abgedeckt:

    npm test
```

- [ ] **Schritt 5: Commit**

```bash
git add package.json .gitignore assets/css/tokens.css README.md
git commit -m "chore: project scaffolding and design tokens

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Basis-Layout & globale Styles

**Files:**
- Create: `assets/css/style.css`
- Create: `tests/style.test.js`

**Interfaces:**
- Consumes: CSS Custom Properties aus `assets/css/tokens.css` (Task 1).
- Produces: CSS-Klassen `.container`, `.site-header`, `.site-header__inner`, `.site-logo`,
  `.nav-toggle`, `.nav-toggle__bar`, `.site-nav`, `.section`, `.section__heading`, `.btn`,
  `.btn--accent`, `.grain-overlay`, `.tile-grid`, `.tile-placeholder`, `.tile-placeholder__grain`,
  `.tile-placeholder__label`, `.site-footer`, `.site-footer__inner`, `.site-footer__email`,
  `.site-footer__social`, `.site-footer__copyright`, `.sr-only` — werden ab Task 5 im HTML-Markup
  verwendet.

- [ ] **Schritt 1: Test schreiben, der die Kern-Layout-Klassen einfordert**

`tests/style.test.js`:

```js
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
  ];

  for (const selector of requiredSelectors) {
    assert.ok(css.includes(selector), `erwarte, dass style.css ${selector} definiert`);
  }
});
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG mit `ENOENT` (Datei `assets/css/style.css` existiert noch nicht).

- [ ] **Schritt 3: `assets/css/style.css` anlegen**

```css
@import url("tokens.css");

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  line-height: 1.15;
  margin: 0 0 var(--space-2);
}

p {
  margin: 0 0 var(--space-2);
  color: var(--color-text-muted);
}

a {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-base);
}

a:hover,
a:focus-visible {
  color: var(--color-accent-hover);
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

img {
  max-width: 100%;
  display: block;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-3);
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
  position: relative;
}

.site-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.04em;
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: 0;
  padding: var(--space-1);
  cursor: pointer;
}

.nav-toggle__bar {
  width: 22px;
  height: 2px;
  background: var(--color-text);
}

.site-nav {
  display: flex;
  gap: var(--space-3);
}

.site-nav a[aria-current="page"] {
  color: var(--color-accent);
}

@media (max-width: 720px) {
  .nav-toggle {
    display: flex;
  }

  .site-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--color-bg-elevated);
    border-bottom: 1px solid var(--color-border);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .site-nav[data-open="true"] {
    max-height: 300px;
  }

  .site-nav a {
    display: block;
    padding: var(--space-2) var(--space-3);
    border-top: 1px solid var(--color-border);
  }
}

@media (min-width: 721px) {
  .nav-toggle {
    display: none;
  }

  .site-nav {
    max-height: none;
  }
}

/* Sections */
.section {
  padding: var(--space-6) 0;
}

.section__heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: var(--space-3);
}

/* Buttons */
.btn {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-weight: 600;
}

.btn--accent {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
}

.btn--accent:hover,
.btn--accent:focus-visible {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  color: var(--color-bg);
}

/* Grain-Overlay */
.grain-overlay {
  position: relative;
}

.grain-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Platzhalter-Kacheln */
.tile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-2);
}

.tile-placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  background: linear-gradient(160deg, var(--color-bg-elevated), #000);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-size: 0.85rem;
  text-align: center;
  padding: var(--space-2);
  cursor: pointer;
  overflow: hidden;
  width: 100%;
}

.tile-placeholder__grain {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.tile-placeholder__label {
  position: relative;
  z-index: 1;
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-4) 0;
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.site-footer__email {
  font-family: var(--font-display);
  font-size: 1.1rem;
}

.site-footer__social {
  display: flex;
  gap: var(--space-2);
}

.site-footer__copyright {
  width: 100%;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0;
}
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (beide Tests in `tests/style.test.js` grün)

- [ ] **Schritt 5: Commit**

```bash
git add assets/css/style.css tests/style.test.js
git commit -m "feat: base layout and global styles

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Content-Datenmodul

**Files:**
- Create: `assets/js/content.js`
- Create: `tests/content.test.js`

**Interfaces:**
- Produces: `export const content` mit der Form:
  `{ band: { name, genre, claim }, music: { spotifyEmbedUrl, spotifyProfileUrl, streamAllUrl },
  bio: { teaser, full, members: [{ name, role, text }] },
  gallery: [{ id, alt }], instagram: { handle, profileUrl, posts: [{ id, postUrl, alt }] },
  contact: { email }, social: { instagram, spotify } }` — wird von allen folgenden JS-Modulen
  konsumiert (Task 4–11).

- [ ] **Schritt 1: Test schreiben**

`tests/content.test.js`:

```js
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
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG (Modul `assets/js/content.js` existiert noch nicht)

- [ ] **Schritt 3: `assets/js/content.js` anlegen**

```js
export const content = {
  band: {
    name: "ÆLKE",
    genre: "Indie-Rock",
    claim: "TODO: ersetzen – kurzer, prägnanter Bandclaim.",
  },
  music: {
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/album/3dFbFwhxMO2Jz8H1jkwtIf?utm_source=generator&theme=0",
    spotifyProfileUrl: "https://open.spotify.com/artist/3IlA8kzJF90Rms19G35Ycv",
    streamAllUrl: "https://distrokid.com/hyperfollow/lke81/cold-smoke",
  },
  bio: {
    teaser:
      "TODO: ersetzen – kurzer Absatz über ÆLKE: wie die Band entstanden ist und wofür sie steht.",
    full:
      "TODO: ersetzen – ausführlicher Bandtext über Entstehung, Sound und Ziele von ÆLKE.",
    members: [
      { name: "TODO: Name", role: "TODO: Instrument", text: "TODO: kurzer Steckbrief." },
      { name: "TODO: Name", role: "TODO: Instrument", text: "TODO: kurzer Steckbrief." },
      { name: "TODO: Name", role: "TODO: Instrument", text: "TODO: kurzer Steckbrief." },
    ],
  },
  gallery: [
    { id: "gallery-1", alt: "TODO: Bildbeschreibung ergänzen" },
    { id: "gallery-2", alt: "TODO: Bildbeschreibung ergänzen" },
    { id: "gallery-3", alt: "TODO: Bildbeschreibung ergänzen" },
    { id: "gallery-4", alt: "TODO: Bildbeschreibung ergänzen" },
    { id: "gallery-5", alt: "TODO: Bildbeschreibung ergänzen" },
    { id: "gallery-6", alt: "TODO: Bildbeschreibung ergänzen" },
  ],
  instagram: {
    handle: "@aelke.music",
    profileUrl: "https://www.instagram.com/aelke.music/",
    posts: [
      {
        id: "insta-1",
        postUrl: "https://www.instagram.com/aelke.music/p/DZ8BViKl2EZ/",
        alt: "TODO: Bildbeschreibung ergänzen",
      },
      {
        id: "insta-2",
        postUrl: "https://www.instagram.com/aelke.music/p/DZz7-GSCtOv/",
        alt: "TODO: Bildbeschreibung ergänzen",
      },
      {
        id: "insta-3",
        postUrl: "https://www.instagram.com/aelke.music/p/DZkgivHFwoD/",
        alt: "TODO: Bildbeschreibung ergänzen",
      },
      {
        id: "insta-4",
        postUrl: "https://www.instagram.com/aelke.music/p/DZfnVMMF3G1/",
        alt: "TODO: Bildbeschreibung ergänzen",
      },
      {
        id: "insta-5",
        postUrl: "https://www.instagram.com/aelke.music/p/DZU8PayirAV/",
        alt: "TODO: Bildbeschreibung ergänzen",
      },
      {
        id: "insta-6",
        postUrl: "https://www.instagram.com/aelke.music/reel/DZLW6cuCsFo/",
        alt: "TODO: Bildbeschreibung ergänzen",
      },
    ],
  },
  contact: {
    email: "booking@aelke.de", // TODO: durch echte Booking-Adresse ersetzen
  },
  social: {
    instagram: "https://www.instagram.com/aelke.music/",
    spotify: "https://open.spotify.com/artist/3IlA8kzJF90Rms19G35Ycv",
  },
};
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests in `tests/content.test.js` grün)

- [ ] **Schritt 5: Commit**

```bash
git add assets/js/content.js tests/content.test.js
git commit -m "feat: central content data module

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Navigations-Logik-Modul

**Files:**
- Create: `assets/js/nav.js`
- Create: `tests/nav.test.js`

**Interfaces:**
- Produces: `getActiveNavId(pathname: string): "home" | "biografie" | "galerie" | "kontakt" | null`
  — pure Funktion, testbar ohne DOM.
- Produces: `initNav(): void` — DOM-Verdrahtung (Mobile-Menü-Toggle + aktive Nav-Markierung),
  konsumiert `getActiveNavId`. Wird ab Task 5 in `assets/js/site.js` aufgerufen.

- [ ] **Schritt 1: Test für `getActiveNavId` schreiben**

`tests/nav.test.js`:

```js
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
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG (Modul `assets/js/nav.js` existiert noch nicht)

- [ ] **Schritt 3: `assets/js/nav.js` anlegen**

```js
const PAGE_TO_NAV_ID = {
  "/": "home",
  "/index.html": "home",
  "/biografie.html": "biografie",
  "/galerie.html": "galerie",
  "/kontakt.html": "kontakt",
};

export function getActiveNavId(pathname) {
  const normalized = pathname.split("?")[0].split("#")[0];
  const fileName = normalized.substring(normalized.lastIndexOf("/") + 1);
  const key = fileName === "" ? "/" : `/${fileName}`;
  return PAGE_TO_NAV_ID[key] ?? null;
}

export function initNav() {
  if (typeof document === "undefined") return;

  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  const activeId = getActiveNavId(window.location.pathname);
  if (!activeId) return;

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.getAttribute("data-nav-link") === activeId) {
      link.setAttribute("aria-current", "page");
    }
  });
}
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests in `tests/nav.test.js` grün)

- [ ] **Schritt 5: Commit**

```bash
git add assets/js/nav.js tests/nav.test.js
git commit -m "feat: navigation logic module

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Gemeinsames Header/Footer-Grundgerüst über alle 4 Seiten + site.js

**Files:**
- Create: `index.html`
- Create: `biografie.html`
- Create: `galerie.html`
- Create: `kontakt.html`
- Create: `assets/js/site.js`

**Interfaces:**
- Consumes: `content` aus `assets/js/content.js` (Task 3), `initNav` aus `assets/js/nav.js`
  (Task 4), CSS-Klassen aus `assets/css/style.css` (Task 2).
- Produces: HTML-Hooks `[data-nav-toggle]`, `[data-nav-menu]`, `[data-nav-link]`,
  `[data-contact-email]`, `[data-social-instagram]`, `[data-social-spotify]` — werden von
  `site.js` und in Task 11 (Kontakt-Unterseite) wiederverwendet.
- Produces: `<main>` mit HTML-Kommentaren als Platzhalter (`<!-- TODO: … -->`), die in Task 6–11
  durch echte Sections ersetzt werden.

- [ ] **Schritt 1: `assets/js/site.js` anlegen**

```js
import { content } from "./content.js";
import { initNav } from "./nav.js";

function hydrateContactLinks() {
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.href = `mailto:${content.contact.email}`;
    el.textContent = content.contact.email;
  });

  document.querySelectorAll("[data-social-instagram]").forEach((el) => {
    el.href = content.social.instagram;
  });

  document.querySelectorAll("[data-social-spotify]").forEach((el) => {
    el.href = content.social.spotify;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  hydrateContactLinks();
});
```

- [ ] **Schritt 2: `index.html` anlegen**

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ÆLKE – Indie-Rock aus der Region</title>
    <meta
      name="description"
      content="ÆLKE ist eine Indie-Rock-Band aus der Region. Hört die Debütsingle „Cold Smoke“, seht Fotos und nehmt Kontakt auf."
    />
    <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/css/tokens.css" />
    <link rel="stylesheet" href="/assets/css/style.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="site-logo" href="/index.html">ÆLKE</a>
        <button
          class="nav-toggle"
          type="button"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="primary-nav"
        >
          <span class="sr-only">Menü öffnen</span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
        <nav id="primary-nav" class="site-nav" data-nav-menu data-open="false">
          <a href="/index.html" data-nav-link="home">Start</a>
          <a href="/galerie.html" data-nav-link="galerie">Galerie</a>
          <a href="/biografie.html" data-nav-link="biografie">Biografie</a>
          <a href="/kontakt.html" data-nav-link="kontakt">Kontakt</a>
        </nav>
      </div>
    </header>

    <main>
      <!-- TODO: hero section -->
      <!-- TODO: music section -->
      <!-- TODO: instagram section -->
      <!-- TODO: bio teaser section -->
      <!-- TODO: gallery teaser section -->
    </main>

    <footer class="site-footer">
      <div class="container site-footer__inner">
        <a class="site-footer__email" data-contact-email href="#"></a>
        <div class="site-footer__social">
          <a data-social-instagram href="#" target="_blank" rel="noopener">Instagram</a>
          <a data-social-spotify href="#" target="_blank" rel="noopener">Spotify</a>
        </div>
        <p class="site-footer__copyright">&copy; 2026 ÆLKE</p>
      </div>
    </footer>

    <script type="module" src="/assets/js/site.js"></script>
  </body>
</html>
```

- [ ] **Schritt 3: `biografie.html`, `galerie.html`, `kontakt.html` anlegen**

Gleiches `<head>`, Header und Footer wie `index.html` (Titel/Description je Seite anpassen),
`<main>` mit seiten-eigenem TODO-Kommentar:

`biografie.html` — Titel `"Biografie – ÆLKE"`, `<main><!-- TODO: biografie content --></main>`

`galerie.html` — Titel `"Galerie – ÆLKE"`, `<main><!-- TODO: galerie content --></main>`

`kontakt.html` — Titel `"Kontakt – ÆLKE"`, `<main><!-- TODO: kontakt content --></main>`

(Kopiere Header/Footer/Script-Block 1:1 aus `index.html`; nur `<title>`, `<meta description>` und
der `<main>`-Inhalt unterscheiden sich.)

- [ ] **Schritt 4: Manuell im Browser verifizieren**

Öffne `index.html`, `biografie.html`, `galerie.html`, `kontakt.html` per lokalem Server (z. B.
`npx serve .` oder die Vorschau-Funktion) und prüfe:
- Header mit Logo und Navigation erscheint auf allen 4 Seiten
- Die Nav-Verlinkung der aktuellen Seite ist optisch hervorgehoben (Akzentfarbe)
- Footer zeigt die E-Mail-Adresse aus `content.js` als klickbaren `mailto:`-Link
- Auf schmalem Viewport (< 720px) erscheint das Hamburger-Menü, Klick öffnet/schließt die Nav

- [ ] **Schritt 5: Commit**

```bash
git add index.html biografie.html galerie.html kontakt.html assets/js/site.js
git commit -m "feat: shared header/footer skeleton across all pages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Hero- & Musik-Section (Spotify-Lazy-Load)

**Files:**
- Create: `assets/js/spotify-lazy.js`
- Create: `tests/spotify-lazy.test.js`
- Create: `assets/js/home.js`
- Modify: `assets/css/style.css` (Hero- und Musik-Styles ergänzen)
- Modify: `tests/style.test.js` (neue Selektoren einfordern)
- Modify: `index.html` (Hero- und Musik-TODO-Kommentare ersetzen)

**Interfaces:**
- Consumes: `content.band.claim`, `content.music.spotifyEmbedUrl`, `content.music.streamAllUrl`
  aus `assets/js/content.js` (Task 3).
- Produces: `shouldInjectEmbed(entry): boolean` — pure Funktion, testbar.
- Produces: `initSpotifyLazyLoad(container: Element, embedUrl: string): void` — DOM-Verdrahtung,
  konsumiert `shouldInjectEmbed`. Wird von `assets/js/home.js` aufgerufen.

- [ ] **Schritt 1: Test für `shouldInjectEmbed` schreiben**

`tests/spotify-lazy.test.js`:

```js
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
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG (Modul `assets/js/spotify-lazy.js` existiert noch nicht)

- [ ] **Schritt 3: `assets/js/spotify-lazy.js` anlegen**

```js
export function shouldInjectEmbed(entry) {
  return Boolean(entry && entry.isIntersecting);
}

export function initSpotifyLazyLoad(container, embedUrl) {
  if (!container) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (shouldInjectEmbed(entry)) {
          const iframe = document.createElement("iframe");
          iframe.src = embedUrl;
          iframe.width = "100%";
          iframe.height = "352";
          iframe.frameBorder = "0";
          iframe.allow =
            "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
          iframe.loading = "lazy";
          iframe.title = "Spotify Player";
          container.replaceChildren(iframe);
          observer.disconnect();
        }
      }
    },
    { rootMargin: "200px" }
  );

  observer.observe(container);
}
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests in `tests/spotify-lazy.test.js` grün)

- [ ] **Schritt 5: `assets/js/home.js` anlegen**

```js
import { content } from "./content.js";
import { initSpotifyLazyLoad } from "./spotify-lazy.js";

function hydrateHero() {
  const claimEl = document.querySelector("[data-band-claim]");
  if (claimEl) claimEl.textContent = content.band.claim;
}

function hydrateMusicLink() {
  const streamAllEl = document.querySelector("[data-stream-all-link]");
  if (streamAllEl) streamAllEl.href = content.music.streamAllUrl;
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateHero();
  hydrateMusicLink();

  const embedContainer = document.querySelector("[data-spotify-embed]");
  if (embedContainer) {
    initSpotifyLazyLoad(embedContainer, content.music.spotifyEmbedUrl);
  }
});
```

- [ ] **Schritt 6: `tests/style.test.js` um Hero-/Musik-Selektoren erweitern**

In `tests/style.test.js`, `requiredSelectors`-Array erweitern um `".hero"`, `".hero__title"`,
`".music__embed"`:

```js
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
  ];
```

- [ ] **Schritt 7: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG bei `"style.css definiert die Kern-Layout-Klassen"` (`.hero` etc. fehlen noch
in `style.css`)

- [ ] **Schritt 8: Hero-/Musik-Styles an `assets/css/style.css` anhängen**

```css
/* Hero */
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.hero__inner {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
}

.hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.hero__title {
  font-size: clamp(3rem, 12vw, 7rem);
  margin: var(--space-2) 0;
}

.hero__claim {
  max-width: 40ch;
  font-size: 1.1rem;
}

/* Musik */
.music__embed {
  min-height: 352px;
  margin: var(--space-3) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-elevated);
}
```

- [ ] **Schritt 9: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests grün, inkl. `tests/style.test.js`)

- [ ] **Schritt 10: `index.html` — Hero- und Musik-TODO-Kommentare ersetzen**

Ersetze `<!-- TODO: hero section -->` durch:

```html
<section id="hero" class="hero grain-overlay">
  <div class="container hero__inner">
    <p class="hero__eyebrow">Indie-Rock aus der Region</p>
    <h1 class="hero__title">ÆLKE</h1>
    <p class="hero__claim" data-band-claim></p>
    <a class="btn btn--accent" href="#musik">Musik hören</a>
  </div>
</section>
```

Ersetze `<!-- TODO: music section -->` durch:

```html
<section id="musik" class="section music">
  <div class="container">
    <h2 class="section__heading">Musik</h2>
    <p>Die Debütsingle <strong>„Cold Smoke“</strong> ist auf allen Streamingdiensten verfügbar.</p>
    <div class="music__embed" data-spotify-embed></div>
    <a class="btn" data-stream-all-link href="#" target="_blank" rel="noopener">Überall hören</a>
  </div>
</section>
```

Füge vor dem schließenden `</body>`, nach dem `site.js`-Script-Tag, ein:

```html
<script type="module" src="/assets/js/home.js"></script>
```

- [ ] **Schritt 11: Manuell im Browser verifizieren**

Öffne `index.html`, prüfe: Hero zeigt Bandname und Claim-Platzhaltertext, Klick auf „Musik hören“
scrollt zur Musik-Section. Scrolle zur Musik-Section und prüfe im Netzwerk-Tab, dass das
Spotify-`iframe` erst lädt, wenn die Section in den Viewport kommt.

- [ ] **Schritt 12: Commit**

```bash
git add assets/js/spotify-lazy.js tests/spotify-lazy.test.js assets/js/home.js \
  assets/css/style.css tests/style.test.js index.html
git commit -m "feat: hero and music section with lazy-loaded spotify embed

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: HTML-Escaping & Gallery-Render-Modul

**Files:**
- Create: `assets/js/escape-html.js`
- Create: `tests/escape-html.test.js`
- Create: `assets/js/gallery-render.js`
- Create: `tests/gallery-render.test.js`

**Interfaces:**
- Produces: `escapeHtml(value: unknown): string` — pure Funktion, wird von `gallery-render.js`
  (dieser Task) und `site.js` (Task 9) konsumiert.
- Produces: `buildPlaceholderTileHTML(item: {id, alt}, options?: {linkUrl?, label?}): string` und
  `buildGridHTML(items: Array<{id, alt}>, getOptions?: (item) => {linkUrl?, label?}): string` —
  pure Funktionen, werden von `assets/js/home.js` (Task 8) und `assets/js/galerie-page.js`
  (Task 10) konsumiert.

- [ ] **Schritt 1: Test für `escapeHtml` schreiben**

`tests/escape-html.test.js`:

```js
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
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG (Modul `assets/js/escape-html.js` existiert noch nicht)

- [ ] **Schritt 3: `assets/js/escape-html.js` anlegen**

```js
export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS

- [ ] **Schritt 5: Test für `buildPlaceholderTileHTML`/`buildGridHTML` schreiben**

`tests/gallery-render.test.js`:

```js
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
```

- [ ] **Schritt 6: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG (Modul `assets/js/gallery-render.js` existiert noch nicht)

- [ ] **Schritt 7: `assets/js/gallery-render.js` anlegen**

```js
import { escapeHtml } from "./escape-html.js";

export function buildPlaceholderTileHTML(item, { linkUrl, label } = {}) {
  const alt = escapeHtml(item.alt ?? label ?? "Foto folgt");
  const tileLabel = escapeHtml(label ?? "Foto folgt");
  const inner = `<span class="tile-placeholder__grain" aria-hidden="true"></span><span class="tile-placeholder__label">${tileLabel}</span>`;

  if (linkUrl) {
    return `<a class="tile-placeholder" href="${escapeHtml(
      linkUrl
    )}" target="_blank" rel="noopener" aria-label="${alt}">${inner}</a>`;
  }

  return `<button type="button" class="tile-placeholder" data-gallery-id="${escapeHtml(
    item.id
  )}" aria-label="${alt}">${inner}</button>`;
}

export function buildGridHTML(items, getOptions = () => ({})) {
  return items.map((item) => buildPlaceholderTileHTML(item, getOptions(item))).join("");
}
```

- [ ] **Schritt 8: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests grün)

- [ ] **Schritt 9: Commit**

```bash
git add assets/js/escape-html.js tests/escape-html.test.js \
  assets/js/gallery-render.js tests/gallery-render.test.js
git commit -m "feat: html escaping and gallery grid render module

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 8: Instagram-Teaser & Galerie-Teaser auf der Main-Page

**Files:**
- Modify: `assets/js/home.js` (Instagram- und Galerie-Teaser-Hydration ergänzen)
- Modify: `index.html` (Instagram- und Galerie-Teaser-TODO-Kommentare ersetzen)

**Interfaces:**
- Consumes: `content.instagram`, `content.gallery` aus `assets/js/content.js` (Task 3),
  `buildGridHTML` aus `assets/js/gallery-render.js` (Task 7).

- [ ] **Schritt 1: `assets/js/home.js` um Instagram- und Galerie-Teaser-Hydration erweitern**

Import-Zeile am Dateianfang ergänzen:

```js
import { buildGridHTML } from "./gallery-render.js";
```

Neue Funktionen ergänzen und im `DOMContentLoaded`-Listener aufrufen:

```js
function hydrateInstagram() {
  const handleEl = document.querySelector("[data-instagram-handle]");
  if (handleEl) handleEl.textContent = content.instagram.handle;

  const profileLinkEl = document.querySelector("[data-instagram-profile-link]");
  if (profileLinkEl) profileLinkEl.href = content.instagram.profileUrl;

  const gridEl = document.querySelector("[data-instagram-grid]");
  if (gridEl) {
    gridEl.innerHTML = buildGridHTML(content.instagram.posts, (post) => ({
      linkUrl: post.postUrl,
      label: "Instagram",
    }));
  }
}

function hydrateGalleryTeaser() {
  const gridEl = document.querySelector("[data-gallery-teaser-grid]");
  if (!gridEl) return;
  const teaserItems = content.gallery.slice(0, 3);
  gridEl.innerHTML = buildGridHTML(teaserItems, () => ({ label: "Foto folgt" }));
}
```

`document.addEventListener("DOMContentLoaded", () => { ... })`-Body erweitern:

```js
document.addEventListener("DOMContentLoaded", () => {
  hydrateHero();
  hydrateMusicLink();
  hydrateInstagram();
  hydrateGalleryTeaser();

  const embedContainer = document.querySelector("[data-spotify-embed]");
  if (embedContainer) {
    initSpotifyLazyLoad(embedContainer, content.music.spotifyEmbedUrl);
  }
});
```

- [ ] **Schritt 2: `index.html` — Instagram- und Galerie-Teaser-TODO-Kommentare ersetzen**

Ersetze `<!-- TODO: instagram section -->` durch:

```html
<section id="instagram" class="section grain-overlay">
  <div class="container">
    <h2 class="section__heading">Instagram</h2>
    <p>Folgt <span data-instagram-handle></span> für aktuelle Einblicke.</p>
    <div class="tile-grid" data-instagram-grid></div>
    <a class="btn" data-instagram-profile-link href="#" target="_blank" rel="noopener">
      Auf Instagram folgen
    </a>
  </div>
</section>
```

Ersetze `<!-- TODO: gallery teaser section -->` durch:

```html
<section id="galerie-teaser" class="section">
  <div class="container">
    <h2 class="section__heading">Galerie</h2>
    <div class="tile-grid" data-gallery-teaser-grid></div>
    <a class="btn" href="/galerie.html">Ganze Galerie ansehen</a>
  </div>
</section>
```

- [ ] **Schritt 3: Test-Suite ausführen (Regressionscheck)**

Ausführen: `npm test`
Erwartet: PASS (keine Logikänderung an getesteten Modulen, nur neue Aufrufe)

- [ ] **Schritt 4: Manuell im Browser verifizieren**

Öffne `index.html`, prüfe: Instagram-Section zeigt 6 Platzhalter-Kacheln, jede verlinkt (neuer
Tab) auf den echten Insta-Post. Galerie-Teaser zeigt 3 Platzhalter-Kacheln (als Buttons, kein
Link). „Ganze Galerie ansehen“ führt zu `galerie.html`.

- [ ] **Schritt 5: Commit**

```bash
git add assets/js/home.js index.html
git commit -m "feat: instagram teaser and gallery teaser sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 9: Bio-Teaser (Main-Page) & Biografie-Unterseite

**Files:**
- Modify: `assets/js/home.js` (Bio-Teaser-Hydration ergänzen)
- Modify: `assets/js/site.js` (Bio-Seiten-Hydration ergänzen, seitenübergreifend)
- Modify: `assets/css/style.css` (Mitgliederkarten-Styles ergänzen)
- Modify: `tests/style.test.js` (neue Selektoren einfordern)
- Modify: `index.html` (Bio-Teaser-TODO-Kommentar ersetzen)
- Modify: `biografie.html` (Biografie-TODO-Kommentar ersetzen)

**Interfaces:**
- Consumes: `content.bio.teaser`, `content.bio.full`, `content.bio.members` aus
  `assets/js/content.js` (Task 3), `escapeHtml` aus `assets/js/escape-html.js` (Task 7).

- [ ] **Schritt 1: `assets/js/home.js` um Bio-Teaser-Hydration erweitern**

Neue Funktion ergänzen:

```js
function hydrateBioTeaser() {
  const el = document.querySelector("[data-bio-teaser]");
  if (el) el.textContent = content.bio.teaser;
}
```

Im `DOMContentLoaded`-Listener aufrufen (zu den bestehenden Aufrufen hinzufügen):

```js
  hydrateBioTeaser();
```

- [ ] **Schritt 2: `assets/js/site.js` um Biografie-Seiten-Hydration erweitern**

Import-Zeile am Dateianfang ergänzen:

```js
import { escapeHtml } from "./escape-html.js";
```

Neue Funktion ergänzen:

```js
function hydrateBioPage() {
  const fullEl = document.querySelector("[data-bio-full]");
  if (fullEl) fullEl.textContent = content.bio.full;

  const listEl = document.querySelector("[data-member-list]");
  if (listEl) {
    listEl.innerHTML = content.bio.members
      .map(
        (member) => `
        <li class="member-card">
          <p class="member-card__role">${escapeHtml(member.role)}</p>
          <p class="member-card__name">${escapeHtml(member.name)}</p>
          <p>${escapeHtml(member.text)}</p>
        </li>`
      )
      .join("");
  }
}
```

`DOMContentLoaded`-Listener erweitern:

```js
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  hydrateContactLinks();
  hydrateBioPage();
});
```

- [ ] **Schritt 3: `tests/style.test.js` um Mitgliederkarten-Selektoren erweitern**

`requiredSelectors`-Array erweitern um `".member-list"`, `".member-card"`:

```js
    ".hero",
    ".hero__title",
    ".music__embed",
    ".member-list",
    ".member-card",
```

- [ ] **Schritt 4: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG bei `"style.css definiert die Kern-Layout-Klassen"`

- [ ] **Schritt 5: Mitgliederkarten-Styles an `assets/css/style.css` anhängen**

```css
/* Mitgliederkarten */
.member-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.member-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
}

.member-card__name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin: 0 0 var(--space-1);
}

.member-card__role {
  color: var(--color-accent);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 var(--space-1);
}
```

- [ ] **Schritt 6: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests grün)

- [ ] **Schritt 7: `index.html` — Bio-Teaser-TODO-Kommentar ersetzen**

Ersetze `<!-- TODO: bio teaser section -->` durch:

```html
<section id="bio-teaser" class="section">
  <div class="container">
    <h2 class="section__heading">Über ÆLKE</h2>
    <p data-bio-teaser></p>
    <a class="btn" href="/biografie.html">Mehr erfahren</a>
  </div>
</section>
```

- [ ] **Schritt 8: `biografie.html` — TODO-Kommentar ersetzen**

Ersetze `<!-- TODO: biografie content --></main>` durch:

```html
<section class="section">
  <div class="container">
    <h1 class="section__heading">Biografie</h1>
    <p data-bio-full></p>
    <h2>Bandmitglieder</h2>
    <ul class="member-list" data-member-list></ul>
  </div>
</section>
```

- [ ] **Schritt 9: Manuell im Browser verifizieren**

Öffne `index.html`: Bio-Teaser zeigt Platzhaltertext, „Mehr erfahren“ führt zu `biografie.html`.
Öffne `biografie.html`: voller Bio-Platzhaltertext + 3 Mitgliederkarten mit Platzhalterdaten
erscheinen.

- [ ] **Schritt 10: Commit**

```bash
git add assets/js/home.js assets/js/site.js assets/css/style.css tests/style.test.js \
  index.html biografie.html
git commit -m "feat: bio teaser section and biografie subpage

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 10: Galerie-Unterseite mit Lightbox

**Files:**
- Create: `assets/js/lightbox.js`
- Create: `tests/lightbox.test.js`
- Create: `assets/js/galerie-page.js`
- Modify: `assets/css/style.css` (Lightbox-Styles ergänzen)
- Modify: `tests/style.test.js` (neue Selektoren einfordern)
- Modify: `galerie.html` (Galerie-TODO-Kommentar ersetzen)

**Interfaces:**
- Consumes: `content.gallery` aus `assets/js/content.js` (Task 3), `buildGridHTML` aus
  `assets/js/gallery-render.js` (Task 7).
- Produces: `computeNextIndex(current: number, length: number): number`,
  `computePrevIndex(current: number, length: number): number`,
  `mapKeyToAction(key: string): "next" | "prev" | "close" | null` — pure Funktionen, testbar.
- Produces: `class Lightbox` mit `open(index)`, `show(index)`, `close()` — DOM-Verdrahtung,
  konsumiert die drei pure Funktionen. Wird von `assets/js/galerie-page.js` instanziiert.

- [ ] **Schritt 1: Test für die pure Lightbox-Funktionen schreiben**

`tests/lightbox.test.js`:

```js
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
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG (Modul `assets/js/lightbox.js` existiert noch nicht)

- [ ] **Schritt 3: `assets/js/lightbox.js` anlegen**

```js
export function computeNextIndex(current, length) {
  if (length <= 0) return -1;
  return (current + 1) % length;
}

export function computePrevIndex(current, length) {
  if (length <= 0) return -1;
  return (current - 1 + length) % length;
}

export function mapKeyToAction(key) {
  switch (key) {
    case "ArrowRight":
      return "next";
    case "ArrowLeft":
      return "prev";
    case "Escape":
      return "close";
    default:
      return null;
  }
}

export class Lightbox {
  constructor({ items, rootEl, imgEl, captionEl, closeEl, nextEl, prevEl }) {
    this.items = items;
    this.rootEl = rootEl;
    this.imgEl = imgEl;
    this.captionEl = captionEl;
    this.currentIndex = -1;

    closeEl?.addEventListener("click", () => this.close());
    nextEl?.addEventListener("click", () =>
      this.show(computeNextIndex(this.currentIndex, this.items.length))
    );
    prevEl?.addEventListener("click", () =>
      this.show(computePrevIndex(this.currentIndex, this.items.length))
    );
    document.addEventListener("keydown", (event) => {
      if (this.currentIndex === -1) return;
      const action = mapKeyToAction(event.key);
      if (action === "close") this.close();
      if (action === "next") this.show(computeNextIndex(this.currentIndex, this.items.length));
      if (action === "prev") this.show(computePrevIndex(this.currentIndex, this.items.length));
    });
  }

  open(index) {
    this.show(index);
    this.rootEl.setAttribute("data-open", "true");
    this.rootEl.focus();
  }

  show(index) {
    this.currentIndex = index;
    const item = this.items[index];
    if (!item) return;

    if (item.src) {
      this.imgEl.src = item.src;
      this.imgEl.alt = item.alt;
      this.imgEl.hidden = false;
    } else {
      this.imgEl.hidden = true;
    }

    this.rootEl.classList.toggle("lightbox--placeholder", !item.src);
    this.captionEl.textContent = item.alt;
  }

  close() {
    this.rootEl.setAttribute("data-open", "false");
    this.currentIndex = -1;
  }
}
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests in `tests/lightbox.test.js` grün)

- [ ] **Schritt 5: `assets/js/galerie-page.js` anlegen**

```js
import { content } from "./content.js";
import { buildGridHTML } from "./gallery-render.js";
import { Lightbox } from "./lightbox.js";

document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.querySelector("[data-full-gallery-grid]");
  if (!gridEl) return;

  gridEl.innerHTML = buildGridHTML(content.gallery, () => ({ label: "Foto folgt" }));

  const lightbox = new Lightbox({
    items: content.gallery,
    rootEl: document.querySelector("[data-lightbox]"),
    imgEl: document.querySelector("[data-lightbox-image]"),
    captionEl: document.querySelector("[data-lightbox-caption]"),
    closeEl: document.querySelector("[data-lightbox-close]"),
    nextEl: document.querySelector("[data-lightbox-next]"),
    prevEl: document.querySelector("[data-lightbox-prev]"),
  });

  gridEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-id]");
    if (!button) return;
    const index = content.gallery.findIndex((item) => item.id === button.dataset.galleryId);
    if (index !== -1) lightbox.open(index);
  });
});
```

- [ ] **Schritt 6: `tests/style.test.js` um Lightbox-Selektor erweitern**

`requiredSelectors`-Array erweitern um `".lightbox"`:

```js
    ".member-list",
    ".member-card",
    ".lightbox",
```

- [ ] **Schritt 7: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG bei `"style.css definiert die Kern-Layout-Klassen"`

- [ ] **Schritt 8: Lightbox-Styles an `assets/css/style.css` anhängen**

```css
/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.92);
  z-index: 100;
}

.lightbox[data-open="true"] {
  display: flex;
}

.lightbox__content {
  max-width: min(90vw, 700px);
  text-align: center;
}

.lightbox__content img {
  max-height: 70vh;
  margin: 0 auto;
  border-radius: var(--radius-sm);
}

.lightbox--placeholder .lightbox__content {
  background: linear-gradient(160deg, var(--color-bg-elevated), #000);
  padding: var(--space-6) var(--space-4);
  border-radius: var(--radius-md);
}

.lightbox__caption {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
}

.lightbox__close,
.lightbox__prev,
.lightbox__next {
  position: absolute;
  background: none;
  border: 0;
  color: var(--color-text);
  font-size: 2rem;
  cursor: pointer;
  padding: var(--space-2);
}

.lightbox__close {
  top: var(--space-2);
  right: var(--space-2);
}

.lightbox__prev {
  left: var(--space-2);
  top: 50%;
  transform: translateY(-50%);
}

.lightbox__next {
  right: var(--space-2);
  top: 50%;
  transform: translateY(-50%);
}
```

- [ ] **Schritt 9: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests grün)

- [ ] **Schritt 10: `galerie.html` — TODO-Kommentar ersetzen**

Ersetze `<!-- TODO: galerie content --></main>` durch:

```html
<section class="section">
  <div class="container">
    <h1 class="section__heading">Galerie</h1>
    <div class="tile-grid" data-full-gallery-grid></div>
  </div>
</section>

<div
  class="lightbox"
  data-lightbox
  data-open="false"
  role="dialog"
  aria-modal="true"
  aria-label="Bildansicht"
  tabindex="-1"
>
  <button type="button" class="lightbox__close" data-lightbox-close aria-label="Schließen">
    &times;
  </button>
  <button type="button" class="lightbox__prev" data-lightbox-prev aria-label="Vorheriges Bild">
    &larr;
  </button>
  <div class="lightbox__content">
    <img data-lightbox-image alt="" />
    <p class="lightbox__caption" data-lightbox-caption></p>
  </div>
  <button type="button" class="lightbox__next" data-lightbox-next aria-label="Nächstes Bild">
    &rarr;
  </button>
</div>
```

Füge vor `</body>`, nach dem `site.js`-Script-Tag, ein:

```html
<script type="module" src="/assets/js/galerie-page.js"></script>
```

- [ ] **Schritt 11: Manuell im Browser verifizieren**

Öffne `galerie.html`: 6 Platzhalter-Kacheln erscheinen im Grid. Klick auf eine Kachel öffnet die
Lightbox mit Bildunterschrift. Pfeiltasten ←/→ wechseln zum vorherigen/nächsten Bild, Escape
schließt die Lightbox. Fokus liegt nach dem Öffnen sichtbar auf der Lightbox (Tab-Reihenfolge
funktioniert).

- [ ] **Schritt 12: Commit**

```bash
git add assets/js/lightbox.js tests/lightbox.test.js assets/js/galerie-page.js \
  assets/css/style.css tests/style.test.js galerie.html
git commit -m "feat: galerie subpage with keyboard-accessible lightbox

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 11: Kontakt-Unterseite

**Files:**
- Modify: `assets/css/style.css` (Kontakt-Seiten-Style ergänzen)
- Modify: `tests/style.test.js` (neuen Selektor einfordern)
- Modify: `kontakt.html` (Kontakt-TODO-Kommentar ersetzen)

**Interfaces:**
- Consumes: `[data-contact-email]`, `[data-social-instagram]`, `[data-social-spotify]` Hooks, die
  bereits durch `hydrateContactLinks()` in `assets/js/site.js` (Task 5) befüllt werden — keine
  neue JS-Logik nötig.

- [ ] **Schritt 1: `tests/style.test.js` um Kontakt-Seiten-Selektor erweitern**

`requiredSelectors`-Array erweitern um `".contact-page__email"`:

```js
    ".lightbox",
    ".contact-page__email",
```

- [ ] **Schritt 2: Test ausführen, um das Fehlschlagen zu bestätigen**

Ausführen: `npm test`
Erwartet: FEHLSCHLAG bei `"style.css definiert die Kern-Layout-Klassen"`

- [ ] **Schritt 3: Kontakt-Seiten-Style an `assets/css/style.css` anhängen**

```css
/* Kontakt-Seite */
.contact-page__email {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 2rem;
  margin: var(--space-2) 0;
}
```

- [ ] **Schritt 4: Test ausführen, um Erfolg zu bestätigen**

Ausführen: `npm test`
Erwartet: PASS (alle Tests grün)

- [ ] **Schritt 5: `kontakt.html` — TODO-Kommentar ersetzen**

Ersetze `<!-- TODO: kontakt content --></main>` durch:

```html
<section class="section">
  <div class="container">
    <h1 class="section__heading">Kontakt</h1>
    <p>Für Booking-Anfragen und Presse:</p>
    <a class="contact-page__email" data-contact-email href="#"></a>
    <div class="site-footer__social">
      <a data-social-instagram href="#" target="_blank" rel="noopener">Instagram</a>
      <a data-social-spotify href="#" target="_blank" rel="noopener">Spotify</a>
    </div>
  </div>
</section>
```

- [ ] **Schritt 6: Manuell im Browser verifizieren**

Öffne `kontakt.html`: große E-Mail-Adresse (aus `content.js`) erscheint als `mailto:`-Link,
darunter Instagram- und Spotify-Links. Prüfe, dass sowohl der Footer- als auch der
Haupt-E-Mail-Link korrekt befüllt sind (beide nutzen denselben `[data-contact-email]`-Hook).

- [ ] **Schritt 7: Commit**

```bash
git add assets/css/style.css tests/style.test.js kontakt.html
git commit -m "feat: kontakt subpage

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 12: Favicon, finaler Test- & Verifikationsdurchlauf

**Files:**
- Create: `assets/img/favicon.svg`

**Interfaces:**
- Keine neuen Schnittstellen — Abschlusstask zur Qualitätssicherung.

- [ ] **Schritt 1: `assets/img/favicon.svg` anlegen (originales, einfaches Monogramm)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#0a0a0a" />
  <text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#f2f0eb">Æ</text>
</svg>
```

- [ ] **Schritt 2: Vollständige Test-Suite ausführen**

Ausführen: `npm test`
Erwartet: PASS — alle Tests in `tests/content.test.js`, `tests/nav.test.js`,
`tests/lightbox.test.js`, `tests/gallery-render.test.js`, `tests/escape-html.test.js`,
`tests/spotify-lazy.test.js`, `tests/style.test.js` grün.

- [ ] **Schritt 3: Responsive manuell verifizieren**

Öffne `index.html` im Browser und prüfe bei drei Viewport-Breiten (z. B. 375px, 768px, 1280px):
- Mobile (< 720px): Hamburger-Menü sichtbar und funktionsfähig, Sections stapeln sich
  einspaltig, Tile-Grids brechen auf 1–2 Spalten um
- Tablet/Desktop (≥ 720px): volle Navigation sichtbar, Tile-Grids zeigen mehrere Spalten, Hero
  füllt sinnvoll die Breite

- [ ] **Schritt 4: Barrierefreiheit manuell verifizieren**

- Tab-Taste durch die gesamte Main-Page: alle interaktiven Elemente (Nav-Links, Buttons, Kacheln,
  Footer-Links) sind fokussierbar und der Fokusring (Akzentfarbe) ist sichtbar
- Auf `galerie.html`: Lightbox öffnen, mit Tab/Escape/Pfeiltasten vollständig ohne Maus bedienbar
- Alle Platzhalter-Kacheln haben ein `aria-label` mit sinnvollem Text (per Screenreader-Vorschau
  im Accessibility-Tree prüfbar)
- Textkontrast (Off-White auf Fast-Schwarz) wirkt deutlich lesbar

- [ ] **Schritt 5: Alle vier Seiten durchklicken (End-to-End-Sichtprüfung)**

`index.html` → `galerie.html` → `biografie.html` → `kontakt.html` → zurück zu `index.html` über
die Navigation. Prüfe, dass die aktive Seite in der Navigation jeweils korrekt hervorgehoben ist
und keine toten Links/JS-Konsolenfehler auftreten.

- [ ] **Schritt 6: Commit**

```bash
git add assets/img/favicon.svg
git commit -m "chore: add favicon and complete verification pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Nach der Umsetzung

Deployment (z. B. GitHub Pages/Netlify/Vercel, eigene Domain) ist bewusst nicht Teil dieses
Plans — wird besprochen, sobald die Seite fertig steht. Ebenso das Ersetzen aller `TODO:`-
Platzhalter durch echte Inhalte (Bandtext, Mitgliederdaten, Bildbeschreibungen, echte
Booking-E-Mail-Adresse) sobald diese vorliegen.
