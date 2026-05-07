# Was ist neu in Version 1.0

**Veröffentlicht am 08.05.2026**

## Neue Funktionen

- **Besuchszähler zurücksetzen**: Jede Kachel mit Besuchen hat jetzt einen 🔄-Button, um den Zähler für diese einzelne Kachel zurückzusetzen. Der Vorgang wird mit einem Bestätigungsdialog gesichert.
- **Sortierung nach Häufigkeit**: Neuer Toggle „Häufigkeit" im Panel. Aktiviert sortiert die Kacheln innerhalb ihrer Kategorie absteigend nach Besuchszahlen. Die Einstellung wird im Browser gespeichert.

## Tooltips

- **Einheitliches Tooltip-System**: Alle nativen `title`-Tooltips wurden durch einheitliche CSS-`data-tooltip`-Tooltips ersetzt.
- **Kompaktes Design**: Kleinere Schrift, weniger Padding und einheitliche Abstände für alle Tooltips.
- **Konsistente Animation**: Reine Opacity-Animation mit 0,5s Verzögerung beim Einblenden, sofortiges Ausblenden.
- **Tooltips für alle Bedienelemente**:
  - Panel-Buttons: unterhalb der Schaltflächen
  - Kachel-Symbole: oberhalb der Symbole, zentriert, 4px Abstand
  - Besuchszähler: oberhalb, linksbündig (auch bei langem Text vollständig lesbar)
  - Dialog-Schaltflächen: alle mit Tooltips versehen

## Bugfixes

- Tooltips wurden durch `overflow: hidden` auf Kacheln abgeschnitten – behoben
- Doppelter Tooltip beim Statistik-Button entfernt
- Tooltips bei Kachel-Symbolen waren nicht zentriert und zu weit entfernt – korrigiert
- Besuchszähler-Tooltip wurde links abgeschnitten – jetzt linksbündig
