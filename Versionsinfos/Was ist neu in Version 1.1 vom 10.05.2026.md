# Was ist neu in Version 1.1

**Veröffentlicht am 10.05.2026**

## Neue Farbschemata

- **Von 2 auf 6 Farbschemata erweitert**: Neben Blau und Grün gibt es jetzt Rot, Purpur, Monochrom (Schwarz/Weiß) und Hell (weißer Hintergrund).
- **Helles Schema** (`[data-theme="light"]`): Erster heller Modus mit weißem Hintergrund (`#f0f2f5`), dunkler Schrift (`#1f2933`) und eigener Schlagschatten-Ästhetik (`--tile-shadow` mit geringerem Kontrast).
- **Monochrom**: Dezentes Grau-Schema mit `#333333` als Primärfarbe – zurückhaltend und kontrastreich.

## themes.css ausgelagert

- **Farbdefinitionen getrennt**: Alle `[data-theme="..."]` Blöcke sowie Button-Overrides wurden aus `styles.css` in die neue Datei `themes.css` verschoben.
- **`:root` in `styles.css`** enthält jetzt nur noch Struktur-Variablen (`--danger`, `--tile-shadow`, `--radius`).
- Neues Theme hinzufügen = Block in `themes.css` kopieren + Swatch in `index.html` ergänzen – kein Eingriff in die Haupt-CSS mehr nötig.

## Rahmenfarben für helle Hintergründe

- **`--switcher-oval`** und **`--swatch-active`**: Zwei neue CSS-Variablen in `:root` (Standard `#ffffff` für dunkle Schemata).
- **Light-Override**: Das helle Schema setzt beide auf `#000000`, sodass der Ovale-Rahmen um die Swatches und der aktive Swatch-Kreis auf weißem Hintergrund schwarz erscheinen.
- Ermöglicht zukünftige helle Themes ohne Duplikate in `styles.css`.

## Bugfixes

- Swatch `--light` war hellblau statt weiß – auf `#ffffff` korrigiert.
- Aktiver Swatch-Rand war hartcodiert `#ffffff` (unsichtbar auf hellem Hintergrund) – jetzt über `var(--swatch-active)` steuerbar.
