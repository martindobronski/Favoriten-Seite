# Bedienungsanleitung – Favoriten-Manager

**Version 1.1 vom 10.05.2026**

---

## Einleitung

Der Favoriten-Manager ist eine reine lokale Web-App zur Verwaltung,
Organisation und Analyse Ihrer regelmäßig besuchten Internetseiten.
Alle Daten verbleiben ausschließlich in Ihrem Browser
(localStorage) – es gibt keinen Server, keine Cloud, keine
externen Abhängigkeiten.

---

## Vorteile auf einen Blick

- **Lokal & privat** – keine Anmeldung, kein Tracking, keine Cloud
- **Kein Account nötig** – sofort nutzbar
- **Auto-Backup** – bei jeder Änderung und beim Schließen
- **Sechs Farbschemata** – Blau, Grün, Rot, Purpur, Monochrom, Hell
- **Besuchszähler** – automatische Mitzählung pro Kachel
- **Statistik-Ansicht** – Balkendiagramm mit Rangliste
- **Drag-and-Drop** – Kacheln und Kategorien frei sortieren
- **Import / Export** – JSON-Download als Backup
- **Suchfunktion** – Echtzeit-Filter über Titel, URL und Kategorie
- **Tooltip-System** – Erklärungen bei Mauskontakt

---

## Das Panel (Eingabebereich)

Das Panel oben auf der Seite enthält alle Steuerelemente:

### Neue Kachel hinzufügen

1. **Name** – Titel der Seite eingeben (z. B. "Tagesschau")
2. **URL** – Adresse eingeben (z. B. `https://www.tagesschau.de`)
   - Das Protokoll `https://` wird automatisch ergänzt, wenn es fehlt
3. **Kategorie** – Kategoriename eingeben oder aus der Vorschlagsliste wählen
   - Bei einer neuen Kategorie wird diese automatisch angelegt
4. Auf **Hinzufügen** klicken

> Tipp: Sie können auch nur eine Kategorie anlegen, indem Sie
> Name und URL leer lassen und nur eine Kategorie eingeben.

### Panel-Buttons (von links nach rechts)

| Button               | Funktion                                                  |
| -------------------- | --------------------------------------------------------- |
| Kategorien sortieren | Reihenfolge der Kategorien festlegen                      |
| Export               | Alle Daten als JSON-Datei herunterladen                   |
| Import               | Daten aus einer JSON-Datei einspielen                     |
| Statistik            | Besuchsstatistik ein-/ausblenden                          |
| Zähler reset         | Alle Besuchszähler auf 0 zurücksetzen                     |
| Auto-Export          | Automatische Backups beim Schließen der Seite             |
| Häufigkeit           | Kacheln innerhalb einer Kategorie nach Aufrufen sortieren |
| Hilfe                | Diese Bedienungsanleitung als PDF                         |

---

## Kacheln (Tiles)

Jede Kachel stellt einen gespeicherten Link dar:

### Elemente einer Kachel

- **Favicon** – kleines Icon der Seite (von der Domain geladen)
- **Titel** – Angezeigter Name der Kachel
- **URL** – die vollständige Adresse
- **Besuchsanzahl** – runder Zähler (nur sichtbar, wenn größer 0)
- **Aktionssymbole** unten rechts

### Aktionen

| Symbol         | Funktion                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| Kreis mit Zahl | Anzahl der Aufrufe                                                       |
| 🔄             | Besuchszähler dieser Kachel zurücksetzen                                 |
| ↔️             | Kachel per Drag-and-Drop verschieben (nur benutzerdefinierte Kategorien) |
| 🏷️            | Kategorie der Kachel ändern                                              |
| ✏️             | Kachel bearbeiten (Titel, URL, Kategorie)                                |
| 🗑             | Kachel löschen                                                           |

### Kachel bearbeiten

Nach einem Klick auf ✏️ öffnet sich ein Dialog. Dort können Sie:

- Titel ändern
- URL ändern
- Kategorie ändern
- Mit "Speichern" bestätigen oder "Abbrechen"

### Kategorie wechseln

Nach einem Klick auf 🏷️ erscheint ein Kontextmenü mit allen anderen
Kategorien. Ein Klick auf eine Kategorie ordnet die Kachel sofort um.

### Kachel verschieben

Ziehen Sie die Kachel am ↔️-Symbol an eine andere Position
innerhalb derselben Kategorie. Am unteren Rand einer Kategorie
können Sie die Kachel auch in eine andere Reihe ablegen.

---

## Kategorien

Kategorien gruppieren Ihre Favoriten thematisch.

### Kategorie umbenennen

Klicken Sie auf ✏️ neben dem Kategorienamen und geben Sie
einen neuen Namen ein. Alle Kacheln dieser Kategorie werden automatisch
übernommen.

### Kategorie löschen

Klicken Sie auf 🗑 neben dem Kategorienamen.
Eine Kategorie kann nur gelöscht werden, wenn sie leer ist.

### Kategorien sortieren

Klicken Sie auf "Kategorien sortieren" im Panel. Im Dialog können Sie:

- Kategorien per Drag-and-Drop an die gewünschte Position ziehen
- Mit den Pfeil-Buttons (⇧ ↑ ↓ ⇩) verschieben
- Mit "Speichern" bestätigen

Die Kategorie "Am häufigsten besucht" ist automatisch und erscheint immer
ganz oben.

---

## Besuchszähler

Jeder Klick auf eine Kachel erhöht den internen Besuchszähler.

- Der Zähler wird als runder Badge rechts unten in der Kachel angezeigt
- Der Badge erscheint erst ab dem ersten Besuch
- Bei mehr als 999 Besuchen wird "999+" angezeigt

### Einzel-Zurücksetzen

Klicken Sie auf 🔄 unterhalb der Kachel. Ein Bestätigungsdialog
verhindert versehentliches Zurücksetzen.

### Globales Zurücksetzen

Klicken Sie auf "Zähler reset" im Panel. Es erscheint ein
Bestätigungsdialog für alle Zähler.

---

## Häufigkeitssortierung

Mit dem Toggle "Häufigkeit" im Panel wird die Sortierung aktiviert:

- **Aus (Standard)**: Kacheln erscheinen in der manuell festgelegten Reihenfolge
- **Ein**: Kacheln werden absteigend nach Besuchszahl sortiert (meistbesuchte zuerst)
- Die Einstellung wird gespeichert und bleibt nach Neuladen erhalten

---

## Kategorie "Am häufigsten besucht"

Die App erstellt automatisch eine Kategorie mit den 6 am häufigsten
besuchten Seiten. Diese Kategorie:

- Wird automatisch befüllt und aktualisiert
- Enthält nur Kacheln mit mindestens einem Besuch
- Ist immer die erste Kategorie auf der Seite
- Zeigt ein "Auto"-Badge mit Refresh-Symbol
- Kann nicht bearbeitet oder gelöscht werden
- Kacheln in dieser Kategorie können nicht verschoben werden

---

## Statistik-Ansicht

Klicken Sie auf "Statistik" im Panel. Es erscheint eine detaillierte
Übersicht oberhalb der Kacheln:

- **Vollständige Liste** aller besuchten Seiten mit Aufrufzahl
- **Balkendiagramm** – die Breite des Balkens zeigt die relative Häufigkeit
- **Medaillen** 🥇 🥈 🥉 für die Top 3
- **Gesamtzahl** der besuchten Seiten wird angezeigt
- Erneuter Klick auf "Statistik ausblenden" schließt die Ansicht

---

## Farbschemata (Themes)

Sechs wählbare Farbschemata stehen in der Kopfzeile als farbige Kreise
zur Verfügung:

| Kreis | Schema | Beschreibung                        |
| ----- | ------ | ----------------------------------- |
| Blau  | Blue   | Dunkelblau, leuchtend blaue Akzente |
| Grün  | Green  | Dunkelgrün, natürliche Optik        |
| Rot   | Red    | Dunkelrot, warme Farbgebung         |
| Lila  | Purple | Amethyst-Farbton                    |
| Grau  | Mono   | Monochrom, reduziert                |
| Weiß  | Light  | Heller Modus (weißer Hintergrund)   |

- Der aktive Kreis hat einen hervorgehobenen Rand
- Bei Mauskontakt vergrößert sich der Kreis
- Die Auswahl wird gespeichert und beim nächsten Laden wiederhergestellt

---

## Auto-Export

Der Auto-Export erstellt bei jeder Änderung (nach 5 Sekunden Pause) und
beim Schließen der Seite automatisch eine JSON-Sicherung:

- **Dateiname**: `favoriten-links-backup-JJJJMMTT-hhmmss.json`
- Enthält alle Links, Kategorien und Besuchszähler
- Kann über den Toggle "Auto-Export" deaktiviert werden
- Beim manuellen Export wird der Auto-Timer zurückgesetzt

---

## Export und Import

### Manueller Export

Klicken Sie auf "Export". Es wird eine JSON-Datei mit allen Daten
heruntergeladen.

### Import

1. Klicken Sie auf "Import"
2. Wählen Sie eine JSON-Datei aus
3. Sie werden gefragt, ob Sie bestehende Daten **ersetzen** oder
   **zusammenführen** wollen:
   - **Ersetzen**: Alle aktuellen Links werden durch die importierten ersetzt
   - **Zusammenführen**: Importierte Links werden hinzugefügt,
     doppelte IDs überschreiben existierende; Besuchszähler: der höhere
     Wert gewinnt

---

## Suche

Das Suchfeld filtert die Kacheln in Echtzeit:

- Durchsucht Titel, URL und Kategorienamen
- Groß-/Kleinschreibung wird ignoriert
- Auch die "Am häufigsten besucht"-Kategorie wird gefiltert
- Bei leerer Suche erscheint "Keine Favoriten gefunden"

---

## Tooltip-System

Alle Steuerelemente haben selbsterklärende Tooltips:

- **Panel-Buttons**: Tooltips erscheinen unterhalb der Schaltfläche
- **Kachel-Aktionen**: Tooltips erscheinen oberhalb zentriert
- **Besuchszähler**: Tooltip linksbündig oberhalb (bei langem Text vollständig lesbar)
- **Farbschema-Kreise**: selbsterklärende Titel beim Darüberfahren
- Tooltips erscheinen nach 0,5 Sekunden und blenden sanft ein

---

## Video-Präsentation

Ein Klick auf den Titel "Favoriten" in der Kopfzeile öffnet ein
Erklärungsvideo (`Favoriten-Manager.mp4`) in einem neuen Tab.

---

## Bedienungshinweise

### Datenverlust vermeiden

- Der Auto-Export ist standardmäßig aktiviert
- Machen Sie regelmäßig manuelle Exports
- Importieren Sie regelmäßig Ihre letzte Sicherung zur Kontrolle

### Lokaler Speicher

- Der browserinterne Speicher ist begrenzt (ca. 5-10 MB)
- Bei Speicherüberlauf erscheint eine Warnung mit Handlungsanweisungen
- Die App bereinigt automatisch verwaiste Besuchszähler

### Tastaturbedienung

- `Tab` / `Shift+Tab` – durch alle Elemente navigieren
- `Enter` – Button aktivieren / Dialog bestätigen
- `Escape` – Dialog schließen
- Bei Seitenstart wird die Suchleiste automatisch fokussiert

---

## Dateistruktur (für Entwickler)

| Datei                     | Zweck                                         |
| ------------------------- | --------------------------------------------- |
| `index.html`              | Einstiegsseite, HTML-Struktur                 |
| `styles.css`              | Layout, Swatches, Panel, Tooltips, Responsive |
| `themes.css`              | Farbdefinitionen aller 6 Farbschemata         |
| `app.js`                  | Vollständige Applikationslogik                |
| `favicon.svg`             | Browser-Icon                                  |
| `BEDIENUNGSANLEITUNG.md`  | Diese Anleitung (Markdown)                    |
| `BEDIENUNGSANLEITUNG.pdf` | Diese Anleitung (PDF)                         |
| `Favoriten-Manager.mp4`   | Erklärungsvideo                               |

Alle Daten werden im Browser-localStorage unter folgenden Schlüsseln
gespeichert:

- `favorite-links-v1` – die gespeicherten Links
- `favorite-category-order-v1` – Kategorien-Reihenfolge
- `favorite-visit-counts-v1` – Besuchszähler
- `favorite-sort-by-freq-v1` – Sortierung nach Häufigkeit (Ein/Aus)
- `favorite-theme-v1` – gewähltes Farbschema















































q
