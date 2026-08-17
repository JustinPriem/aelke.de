# aelke.de

Website für die Band **ÆLKE** (Indie-Rock).

## Entwicklung

Reine statische Website – kein Build-Prozess nötig. Lokal servieren, z. B. mit:

    npx serve .

Die Seiten verwenden `type="module"`-Scripts, die von den meisten Browsern per CORS-Regel
blockiert werden, wenn eine `.html`-Datei direkt über `file://` geöffnet wird. Deshalb muss die
Website über einen lokalen Server wie oben aufgerufen werden.

## Inhalte pflegen

Alle austauschbaren Inhalte (Bandtext, Bandmitglieder, Bildbeschreibungen, Kontakt-E-Mail,
Social-Links, Spotify-Embed-URL) liegen zentral in [`assets/js/content.js`](assets/js/content.js).
Mit `TODO:` markierte Werte sind Platzhalter und sollten vor dem Live-Gang durch echte Inhalte
ersetzt werden.

## Tests

Die testbare Logik (Content-Struktur, Navigation, Lightbox, Grid-Rendering, Spotify-Lazy-Load,
HTML-Escaping) ist mit Node.js' eingebautem Test-Runner abgedeckt:

    npm test

## Vor dem Live-Gang

Vor der öffentlichen Veröffentlichung müssen folgende Platzhalter in
[`assets/js/content.js`](assets/js/content.js) durch echte Inhalte ersetzt werden:

- `contact.email` (`booking@aelke.de`) – aktuell eine Platzhalter-Adresse
  (`contact.emailIsPlaceholder: true`), muss durch die echte Booking-Adresse der Band ersetzt
  werden.
- `band.claim` – kurzer Bandclaim.
- `bio.teaser` und `bio.full` – Bandtext.
- `bio.members` – echte Namen, Instrumente und Steckbriefe der Bandmitglieder.
- `gallery[].alt` – echte Bildbeschreibungen für die Galerie-Kacheln.