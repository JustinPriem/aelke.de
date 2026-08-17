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