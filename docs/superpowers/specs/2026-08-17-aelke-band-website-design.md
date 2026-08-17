# ÆLKE Band-Website – Design

**Datum:** 2026-08-17
**Status:** Genehmigt, bereit für Implementierungsplanung

## Kontext

ÆLKE ist eine kleine regionale Indie-Rock-Band. Sie tourt nicht, sondern spielt gelegentlich
regional auf Städtefesten oder privat. Aktueller Fokus ist die Debütsingle „Cold Smoke"
(2026, via DistroKid auf allen Streamingdiensten, auch auf Spotify).

Vorhandene Online-Präsenzen:
- Instagram: [@aelke.music](https://www.instagram.com/aelke.music/) – 188 Follower, Genre-Tag
  „ɪɴᴅɪᴇ-ʀᴏᴄᴋ", Bildsprache: Rauch/Zigaretten-Motive, Grunge-Plakate, S/W-Konzertfotos, raue/
  atmosphärische Stimmung. Story-Highlights: „worldwide", „2023", „2024", „cover", „Trip".
- Spotify: [ÆLKE](https://open.spotify.com/artist/3IlA8kzJF90Rms19G35Ycv) – 55 monatliche Hörer,
  22 Follower, ein Release „Cold Smoke".
- Logo (Spotify-Profilbild): Schwarzer Hintergrund, weiße Serifen-Display-Schrift „ÆLKE", darunter
  ein handgezeichnetes Linien-Maskottchen (Tier-/Totenkopf mit X-Augen, herausgestreckter Zunge) –
  reduziert, aber mit Witz/Ecken und Kanten.

Aktuell existiert noch keine eigene Website. Es gibt noch kein Repository/Projektgerüst
(leeres Verzeichnis).

## Zweck der Website

Eine Landingpage, die:
- Musik hörbar macht (Spotify-Player direkt eingebettet)
- die Instagram-Präsenz sichtbar macht (Foto-Grid statt reinem Link)
- als seriöse, kompakte Anlaufstelle für Booker funktioniert (Bio, Pressefotos, Kontakt)
- **kein** Fan-Funnel-Overkill ist: kein Newsletter, kein Release-Hype-Countdown, keine
  Tourdaten-Sektion (die Band tourt nicht)

Zielgruppe: regionales Publikum (Städtefeste), gelegentliche Booker/Veranstalter, bestehende
Instagram-Follower.

## Sprache

Ausschließlich Deutsch (kein Sprachumschalter).

## Informationsarchitektur

**Große Main-Page** (One-Pager mit den wichtigsten Inhalten) + **drei Unterseiten**, erreichbar
über ein schnelles Menü.

### Main-Page (Sections, in dieser Reihenfolge)

1. **Hero** – Bandname/Logo groß (angelehnt an das ÆLKE-Logo), Maskottchen-Grafik als
   wiederkehrendes Grafikelement, kurzer Claim/Genre-Tag, dezenter Scroll-Hinweis.
2. **Musik** – Offizielles Spotify-iframe-Embed für „Cold Smoke" (kein API-Key/Auth nötig), Link
   „Auf Spotify hören" plus ggf. weitere Streaming-Plattformen (DistroKid-Hyperfollow-Link als
   Fallback für „überall hören").
3. **Insta-Feed-Teaser** – Foto-Grid mit den neuesten Posts (siehe Technik-Entscheidung unten) +
   „Folgt uns auf Instagram"-Button, verlinkt auf @aelke.music.
4. **Bio-Teaser** – Kurzer Absatz + „Mehr erfahren"-Link zur Bio-Unterseite.
5. **Galerie-Teaser** – Ausgewählte Vorschaubilder + Link zur Galerie-Unterseite.
6. **Kontakt/Footer** – E-Mail-Adresse als mailto-Link, Social-Icons (Instagram, Spotify),
   Copyright.

Ein schnelles Navigationsmenü (Header, sticky oder Hamburger) verlinkt zu: Musik, Galerie,
Biografie, Kontakt.

### Unterseiten

- **Biografie** (`biografie.html`) – Ausführlicherer Bandtext, Bandmitglieder-Sektion
  (Platzhalter-Struktur bis echte Infos vorliegen: Name, Instrument, kurzer Text pro Mitglied).
- **Galerie** (`galerie.html`) – Größeres Foto-/Video-Grid mit Lightbox (Tastatur-bedienbar,
  Escape zum Schließen, Pfeiltasten zum Blättern).
- **Kontakt** (`kontakt.html`) – E-Mail-Adresse groß dargestellt, kurzer Hinweis „für
  Booking-Anfragen", Social-Links. Kein Formular, kein Server-Backend.

## Design-System

- **Farben:**
  - Hintergrund: Fast-Schwarz `#0a0a0a` (nicht reines Schwarz, für weichere Kontraste)
  - Text: Off-White `#f2f0eb`
  - Sekundär/Rahmen: gedämpftes Grau (z. B. `#6b6b66`)
  - Akzent: warmes Rost-/Amber-Rot, sparsam eingesetzt (Links, Hover-States, kleine Highlights) –
    passend zur Zigaretten-/Rauch-Bildsprache, nicht flächig verwendet
- **Typografie:**
  - Überschriften/Logo-Schriftzug: auffällige Serifen-Display-Schrift, angelehnt an das
    ÆLKE-Logo
  - Fließtext: schlichte, gut lesbare Grotesk
- **Bildsprache:** dezente Filmgrain-/Körnungs-Textur als Overlay, Fotos S/W oder entsättigt,
  Duotone-Look möglich. Das Maskottchen (Linien-Illustration) taucht wiederkehrend auf (Favicon,
  Scroll-Indikator, Sektionstrenner).
- **Bewegung:** dezente Scroll-Reveal-Animationen, optional leichter Grain-/Parallax-Effekt im
  Hero. Zurückhaltend – die Musik soll im Fokus bleiben, keine überladenen Effekte.

## Technische Entscheidungen

### Stack

Reine statische Website: HTML/CSS/JavaScript, kein Framework, kein Build-Prozess, keine
Datenbank, kein Server-Backend.

### Content-Verwaltung

Alle austauschbaren Inhalte (Bandtext, Bandmitglieder, Bildpfade, Insta-Grid-Einträge,
Kontakt-E-Mail, Social-Links) liegen zentral in einer gut lesbaren Konfig-Datei (z. B.
`content.js` als JS-Objekt oder `content.json`), getrennt vom Layout-/Render-Code. So können
Texte/Bilder später ausgetauscht werden, ohne den Seitencode anzufassen.

### Instagram-Bereich

Kein Live-Feed über die Meta Graph API (erfordert Business-Account + App-Freigabe – für eine so
kleine Band unverhältnismäßig hoher Aufwand und Ausfallrisiko). Stattdessen: manuell gepflegtes
Foto-Grid in der Konfig-Datei (Bildpfad + Link zum jeweiligen Insta-Post). Sieht wie ein
Feed-Ausschnitt aus, ohne API-Abhängigkeit.

### Spotify-Bereich

Offizielles Spotify-`iframe`-Embed (öffentlich, kein API-Key nötig) für den Track/Album „Cold
Smoke". Wird lazy-geladen (erst wenn die Section sichtbar wird), um die initiale Ladezeit nicht
zu belasten.

### Content-Platzhalter-Strategie

Da noch keine finalen Texte/Fotos vorhanden sind:
- Vorhandene Instagram-Fotos werden testweise als Platzhalterbilder verwendet
- Platzhaltertexte sind kurz, ehrlich und klar im Code als `TODO: ersetzen` markiert – keine
  erfundenen Fakten (z. B. keine erfundenen Mitgliedernamen oder Instrumente)
- Die Konfig-Datei-Struktur macht offensichtlich, welche Felder noch echten Content brauchen

### Responsive & Performance

- Mobile-first (Zielgruppe kommt vermutlich überwiegend über Instagram/Handy), Desktop wird
  vollwertig mitgedacht
- Bilder lazy-loaded und komprimiert/passend skaliert
- Spotify-Embed lazy-geladen

### Barrierefreiheit

- Ausreichender Kontrast trotz Dark-Theme (Off-White auf Fast-Schwarz erfüllt WCAG AA)
- Alt-Texte für alle Bilder
- Galerie-Lightbox vollständig tastaturbedienbar (Tab-Fokus, Escape, Pfeiltasten)

## Explizit nicht Teil dieser Version (YAGNI)

- Kein Newsletter/E-Mail-Signup
- Kein Kontaktformular (nur mailto-Link)
- Keine Tourdaten-/Kalender-Sektion
- Kein Sprachumschalter (nur Deutsch)
- Kein CMS/Backend, kein Login-Bereich
- Kein Merch-Shop (nur ggf. späterer Verweis, falls gewünscht)
- Kein Live-Instagram-API-Feed

## Deployment (grober Ausblick, nicht Teil des Implementierungsplans)

Statische Seite ist kostenlos hostbar (z. B. GitHub Pages, Netlify, Vercel). Eigene Domain kann
später verbunden werden. Wird zu gegebener Zeit besprochen, sobald die Seite steht.
