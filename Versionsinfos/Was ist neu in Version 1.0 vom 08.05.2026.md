# Was ist neu in Version 1.0

**Veröffentlicht am 08.05.2026**

## Farbschema: Blau / Grün

- **Dark Mode entfernt**: Statt systemabhängigem Hell/Dunkel-Wechsel gibt es jetzt zwei wählbare Farbschemata: Blau (Standard) und Grün.
- **Theme-Auswahl als Swatches**: Zwei farbige Kreise (blau `#1a4a8a`, grün `#1a5c2a`) in der Kopfzeile rechts. Der aktive Kreis hat einen weißen Rand. Hover vergrößert den Kreis.
- **Persistenz**: Die gewählte Farbe wird im Browser gespeichert und beim nächsten Laden wiederhergestellt.
- **Farben pro Schema**:
  - Blau: dunkelblauer Hintergrund (`#0a1628`) mit leichtem Farbverlauf, Karten in `#0f1f3a`, Akzente in `#3b9eff`
  - Grün: fast-schwarzer Hintergrund mit Grünstich (`#0a1a0b`), Karten in `#1c1c1f`, Akzente in `#4caf50`
- **CSS Custom Properties**: Alle Farben werden über `--primary`, `--primary-rgb`, `--bg`, `--surface` gesteuert. `rgba(var(--primary-rgb), ...)` statt hartcodierter RGB-Werte ermöglicht einfaches Theming.

## Besuchszähler

- **Einzel-Zurücksetzen**: Jede Kachel mit Besuchen hat einen Zurücksetzen-Button. Vor dem Zurücksetzen erscheint ein Bestätigungsdialog.
- **Sortierung nach Häufigkeit**: Neuer Toggle "Häufigkeit" im Panel sortiert Kacheln innerhalb der Kategorie absteigend nach Besuchszahlen. Einstellung wird gespeichert.

## Tooltips

- **Einheitliches Tooltip-System**: Alle nativen `title`-Tooltips durch CSS-`data-tooltip` ersetzt.
- **Kompaktes Design**: Kleinere Schrift (`0.7rem`), Padding `2px 6px`, `border-radius: 4px`.
- **Animation**: Reine Opacity-Animation, `0.5s` Verzögerung beim Einblenden, sofortiges Ausblenden. Kein translateY.
- **Tooltips für alle Bedienelemente**:
  - Panel-Buttons: unterhalb der Schaltflächen
  - Kachel-Symbole: oberhalb zentriert, 4px Abstand
  - Besuchszähler: oberhalb, linksbündig (auch bei langem Text vollständig lesbar)
  - Swatch-Kreise: natives `title`-Attribut

## Verbesserungen am Blau-Schema

- Akzentfarbe auf `#3b9eff` angehoben (leuchtender)
- Kartenrand auf `#1e3a5f` geändert (mehr Tiefe)
- Seitenhintergrund mit subtilem Farbverlauf (oben etwas heller)

## Bugfixes

- Tooltips wurden durch `overflow: hidden` auf Kacheln abgeschnitten
- Doppelter Tooltip beim Statistik-Button entfernt
- Tooltips bei Kachel-Symbolen waren nicht zentriert
- Besuchszähler-Tooltip wurde links abgeschnitten (jetzt linksbündig)
- `button:hover` überschrieb die Swatch-Farben beim Hovern – behoben
- Beim ersten Laden hatten beide Swatch-Kreise einen weißen Rand (nur noch der aktive)
