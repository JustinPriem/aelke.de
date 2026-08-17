# aelke.de

Website für die Band **ÆLKE** (Indie-Rock).

## Entwicklung

Reine statische Website – kein Build-Prozess nötig. Lokal servieren, z. B. mit:

    npx serve .

Die Seiten verwenden `type="module"`-Scripts, die von den meisten Browsern per CORS-Regel
blockiert werden, wenn eine `.html`-Datei direkt über `file://` geöffnet wird. Deshalb muss die
Website über einen lokalen Server wie oben aufgerufen werden.

## Inhalte pflegen

Alle austauschbaren Inhalte (Bandtext, Bandmitglieder, Bildbeschreibungen, Presse-/News-Einträge,
Kontakt-E-Mail, Social-Links, Spotify-Embed-URL) liegen zentral in
[`assets/js/content.js`](assets/js/content.js). Presse-Einträge (`press[]`) können entweder einen
`externalUrl` (Link zu einem externen Artikel, plus `source` als Quellenangabe) haben oder mit
`externalUrl: null` als eigener kurzer News-Text ohne externen Link stehen. Neue Einträge kommen an
den Anfang des Arrays, damit die neuesten zuerst erscheinen.
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
- `press[]` – die zwei Platzhalter-Einträge durch echte Presseberichte/News ersetzen (oder
  löschen, falls noch keine vorhanden sind).