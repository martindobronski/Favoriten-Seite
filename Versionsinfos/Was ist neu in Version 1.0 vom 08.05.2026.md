# Was ist neu in Version 1.0

**Veröffentlicht am 08.05.2026**

## Neue Funktionen

- **Sortierung nach Häufigkeit**: Neuer Toggle „Häufigkeit" im Panel. Aktiviert sortiert die Kacheln innerhalb ihrer Kategorie absteigend nach Besuchszahlen. Die Einstellung wird im Browser gespeichert.

## Tooltips

- **Einheitliches Tooltip-System**: Alle nativen `title`-Tooltips wurden durch einheitliche CSS-`data-tooltip`-Tooltips ersetzt.
- **Kompaktes Design**: Kleinere Schrift, weniger Padding und einheitliche Abstände für alle Tooltips.
- **Konsistente Animation**: Reine Opacity-Animation mit 0,5s Verzögerung beim Einblenden, sofortiges Ausblenden.
- **Tooltips für alle Bedienelemente**:
  - Panel-Buttons: unterhalb der Schaltflächen
  - Kachel-Symbole (Stift, Etikett, Muelleimer, Verschieben): oberhalb der Symbole, zentriert, 4px Abstand
  - Besuchszähler: oberhalb, linksbündig (auch bei langem Text vollständig lesbar)
  - Sortier-Dialog: alle Schaltflächen

## Bugfixes

- `overflow: hidden` auf Kacheln entfernt – Tooltips werden nicht mehr abgeschnitten
- Doppelter Tooltip beim Statistik-Button entfernt
- Tooltips bei Kachel-Symbolen waren nicht zentriert und zu weit entfernt – korrigiert
- Besuchszähler-Tooltip wurde links abgeschnitten – jetzt linksbündig
