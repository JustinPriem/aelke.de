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

### Galerie-Fotos

Echte Fotos kommen nicht in `content.js`, sondern als Dateien nach
[`assets/img/gallery/`](assets/img/gallery/) – Namenskonvention und Details stehen in der
[README dort](assets/img/gallery/README.md). Kurzfassung: Datei nach `id` benennen (z. B.
`gallery-1.jpg` für den Eintrag mit `id: "gallery-1"`) reinziehen, fertig – kein Code-Änderung
nötig. Fehlt eine Datei, zeigt die Seite automatisch weiter den Platzhalter.

## Tests

Die testbare Logik (Content-Struktur, Navigation, Lightbox, Grid-Rendering, Spotify-Lazy-Load,
HTML-Escaping) ist mit Node.js' eingebautem Test-Runner abgedeckt:

    npm test

## Vor dem Live-Gang

Vor der öffentlichen Veröffentlichung müssen folgende Platzhalter in
[`assets/js/content.js`](assets/js/content.js) durch echte Inhalte ersetzt werden:

- `bio.teaser` und `bio.full` – Bandtext.
- `bio.members[].text` – kurze Steckbriefe der Bandmitglieder (Namen, Instrumente und Fotos sind
  bereits hinterlegt).
- `press[]` – die zwei Platzhalter-Einträge durch echte Presseberichte/News ersetzen (oder
  löschen, falls noch keine vorhanden sind).

Die Galerie (`gallery[]`) ist mit 17 echten Fotos und Bildbeschreibungen befüllt. Weitere Fotos
können jederzeit wie oben beschrieben ergänzt werden.

`contact.email` (`aelkeband@gmail.com`) sowie das Logo (`assets/img/logo/`, `assets/img/favicon.svg`)
sind bereits durch echte Inhalte ersetzt. `band.claim` wird aktuell nirgends angezeigt (Hero zeigt
nur noch das Logo) – kann bei Bedarf für einen späteren Einsatzzweck gepflegt werden, ist aber kein
Blocker fürs Live-Gehen.