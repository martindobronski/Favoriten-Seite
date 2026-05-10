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

## Theme-Auswahl als Popup

- **Trigger statt Swatch-Reihe**: Die 6 permanent sichtbaren Farbkreise wurden durch einen einzelnen Trigger-Knopf ersetzt. Der Kreis zeigt die aktuell aktive Farbe und ist kompakt in der Kopfzeile platziert.
- **Popup bei Hover/Klick**: Beim Darüberfahren (Desktop) oder Klicken (Touch + Desktop) klappt ein Popup mit allen 6 Swatches auf.
- **Click-Toggle für alle Geräte**, Hover als Bonus auf Desktop. Klick außerhalb schließt das Popup.
- **Hover-Brücke**: Ein unsichtbares `::after`-Element überbrückt die 8px Lücke zwischen Trigger und Popup, sodass der Hover beim Öffnen nicht abbricht.
- **Trigger-Farbe** wird per `getComputedStyle` aus dem aktiven Swatch ausgelesen und auf den Trigger-Knopf übertragen.

## Gemeinsamer Hint links neben dem Popup

- Alle Swatches teilen sich einen einzelnen Hint-Text (`.scheme-hint`), der links neben dem Popup erscheint.
- Der Hint ist rechtsbündig (`text-align: right`) und wird per `mouseenter`/`mouseleave` für den jeweils hoverten Swatch aktualisiert.
- Einblendung sofort (ohne 0,5s Verzögerung).

## Tooltips

- **Trigger-Tooltip** erscheint links neben dem Trigger-Knopf, vertikal zentriert.
- **Sofortige Einblendung**: Die 0,5s Verzögerung (`transition-delay`) wurde für Theme-Trigger und Swatch-Hints entfernt.

## Rahmenfarben für helle Hintergründe

- **`--switcher-oval`** und **`--swatch-active`**: Zwei neue CSS-Variablen in `:root` (Standard `#ffffff` für dunkle Schemata).
- **Light-Override**: Das helle Schema setzt beide auf `#000000`, sodass der Ovale-Rahmen um die Swatches und der aktive Swatch-Kreis auf weißem Hintergrund schwarz erscheinen.
- Ermöglicht zukünftige helle Themes ohne Duplikate in `styles.css`.

## Bugfixes

- Swatch `--light` war hellblau statt weiß – auf `#ffffff` korrigiert.
- Aktiver Swatch-Rand war hartcodiert `#ffffff` (unsichtbar auf hellem Hintergrund) – jetzt über `var(--swatch-active)` steuerbar.
