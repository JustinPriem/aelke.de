# Galerie-Fotos

Hier landen die echten Fotos für die Galerie (Start-Teaser + `galerie.html`).

## So fügt ihr ein Foto hinzu

1. Datei in diesen Ordner ziehen, benannt nach der `id` des Eintrags in
   [`assets/js/content.js`](../../js/content.js) (Abschnitt `gallery`), z. B.:
   - `gallery-1.jpg`
   - `gallery-2.jpg`
   - `gallery-3.jpg`
   - `gallery-4.jpg`
   - `gallery-5.jpg`
   - `gallery-6.jpg`
2. Fertig – die Seite bindet die Datei automatisch ein, sobald sie unter diesem Namen hier liegt.
   Kein Code-Änderung nötig.
3. In `content.js` bei dem passenden Eintrag noch das `alt`-Feld mit einer kurzen
   Bildbeschreibung ausfüllen (aktuell `"TODO: Bildbeschreibung ergänzen"`).

Für einen neuen, siebten Eintrag zuerst einen weiteren Eintrag in `content.gallery[]` in
`content.js` anlegen (`id`, `alt`, `src`) und dann die passend benannte Datei hier ablegen.

## Format-Hinweise

- Format: **JPG**, Dateiendung genau `.jpg` (kleingeschrieben).
- Möglichst schon komprimiert/web-optimiert (z. B. < 500 KB pro Bild), damit die Seite schnell
  lädt – volle Kamera-/Handy-Originale vorher verkleinern.
- Format-Kachel ist quadratisch (1:1) und wird per CSS zugeschnitten (`object-fit: cover`) – am
  besten Motiv mittig platzieren.
- Fehlt eine Datei (noch) oder ist der Dateiname falsch, zeigt die Seite automatisch weiter den
  bisherigen Platzhalter ("Foto folgt") – nichts bricht.
