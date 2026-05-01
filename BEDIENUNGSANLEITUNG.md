# Meine Favoriten - Dokumentation und Bedienungsanleitung

Stand: 1. Mai 2026

## Überblick

Diese kleine Webanwendung verwaltet persönliche Favoriten-Links direkt im Browser. Die Links werden als Kacheln angezeigt, nach Kategorien gruppiert und lokal im Browser gespeichert. Es gibt keine Server-Komponente und keine Anmeldung.

Beim ersten Öffnen legt die Anwendung zwei Beispiel-Favoriten an:

- Tagesschau in der Kategorie `Nachrichten`
- Wikipedia in der Kategorie `Wissen`

Die Anwendung besteht aus drei Dateien:

- `index.html`: Grundstruktur der Seite, Formular, Import-/Export-Schaltflächen und Bearbeitungsdialog
- `styles.css`: Layout, Farben, responsive Darstellung, Dialoge, Tooltips und Drag-and-drop-Zustände
- `app.js`: komplette Anwendungslogik, lokale Speicherung, Validierung, Rendering, Import/Export und Bedienereignisse

## Starten der Anwendung

Die Anwendung kann direkt im Browser geöffnet werden:

1. Öffnen Sie den Projektordner `Favouriten-Seite`.
2. Öffnen Sie die Datei `index.html` in einem modernen Browser.

Ein lokaler Webserver ist nicht zwingend erforderlich, weil die Anwendung nur HTML, CSS, JavaScript und den Browser-Speicher verwendet.

## Oberfläche

Die Seite zeigt oben ein Eingabeformular und darunter die Favoriten-Kacheln.

Das Formular enthält:

- `Name`: Anzeigename des Favoriten
- `URL`: Zieladresse des Favoriten
- `Kategorie`: Kategorie, in der der Favorit erscheinen soll
- `Hinzufügen`: legt einen neuen Favoriten oder eine neue leere Kategorie an

Unter dem Formular befinden sich:

- `Kategorien sortieren`: öffnet einen Dialog, in dem die Kategorie-Reihenfolge geändert werden kann
- `Export Favoriten`: lädt die gespeicherten Favoriten als JSON-Datei herunter
- `Import Favoriten`: liest Favoriten aus einer JSON-Datei ein

Darunter erscheinen die Kategorien. Jede Kategorie hat eine Überschrift und eine Lösch-Schaltfläche. Die Lösch-Schaltfläche ist nur nutzbar, wenn die Kategorie leer ist.

## Favoriten hinzufügen

So legen Sie einen neuen Favoriten an:

1. Tragen Sie einen Namen ein.
2. Tragen Sie eine URL ein.
3. Tragen Sie eine Kategorie ein oder wählen Sie eine vorhandene Kategorie aus der Vorschlagsliste.
4. Klicken Sie auf `Hinzufügen`.

Die URL darf mit oder ohne Protokoll eingegeben werden. Wenn `http://` oder `https://` fehlt, ergänzt die Anwendung automatisch `https://`.

Beispiele:

- `https://example.com` bleibt `https://example.com`
- `example.com` wird zu `https://example.com`

Wenn Name oder URL fehlen, zeigt die Anwendung eine Meldung an. Eine Ausnahme gibt es für das Erstellen leerer Kategorien.

## Leere Kategorien erstellen

Eine leere Kategorie wird erstellt, indem nur das Feld `Kategorie` ausgefüllt wird. Die Felder `Name` und `URL` bleiben leer.

Nach dem Klick auf `Hinzufügen` erscheint die neue Kategorie als eigener Abschnitt mit dem Hinweis `Noch keine Kacheln in dieser Kategorie.`

Leere Kategorien sind nützlich, um die Struktur vorzubereiten, bevor Favoriten einsortiert werden.

## Favoriten öffnen

Ein Klick auf den Textbereich einer Kachel öffnet die gespeicherte URL in einem neuen Browser-Tab. Dabei wird `noopener noreferrer` verwendet, damit die geöffnete Seite keinen Zugriff auf das Ursprungsfenster erhält.

## Favoriten bearbeiten

Jede Kachel hat eine Bearbeiten-Schaltfläche mit Stift-Symbol.

So bearbeiten Sie eine Kachel:

1. Klicken Sie auf das Stift-Symbol der Kachel.
2. Ändern Sie Titel, URL oder Kategorie im Dialog.
3. Klicken Sie auf `Speichern`.

Mit `Abbrechen` wird der Dialog geschlossen, ohne Änderungen zu speichern.

Beim Speichern prüft die Anwendung:

- Der Titel darf nicht leer sein.
- Die URL muss gültig sein.
- Eine fehlende Kategorie wird als `Allgemein` gespeichert.

Wenn beim Bearbeiten eine neue Kategorie eingetragen wird, legt die Anwendung diese Kategorie automatisch an.

## Favoriten löschen

Jede Kachel hat eine Lösch-Schaltfläche mit Papierkorb-Symbol.

Ein Klick darauf entfernt den Favoriten sofort aus der Liste und speichert die Änderung im Browser. Es gibt keinen zusätzlichen Bestätigungsdialog und keine eingebaute Rückgängig-Funktion.

## Kategorie einer Kachel ändern

Jede Kachel hat eine Kategorie-Schaltfläche mit Etikett-Symbol.

So verschieben Sie eine Kachel in eine andere Kategorie:

1. Klicken Sie auf das Etikett-Symbol.
2. Wählen Sie im Menü eine andere Kategorie aus.

Das Menü zeigt nur vorhandene Kategorien außer der aktuellen Kategorie und sortiert sie alphabetisch. Wenn es keine andere Kategorie gibt, erscheint eine Meldung.

Hinweis: Drag-and-drop verschiebt Kacheln innerhalb derselben Kategorie. Für den Wechsel in eine andere Kategorie wird das Kategorie-Menü verwendet.

## Kacheln sortieren

Kacheln können innerhalb ihrer Kategorie per Drag-and-drop sortiert werden.

So ändern Sie die Reihenfolge:

1. Greifen Sie die Kachel am Verschiebe-Symbol.
2. Ziehen Sie sie auf eine andere Kachel derselben Kategorie.
3. Lassen Sie sie los.

Die neue Reihenfolge wird sofort im Browser gespeichert.

Wichtig: Eine Kachel kann per Drag-and-drop nicht in eine andere Kategorie gezogen werden. Wenn eine Kachel auf eine andere Kategorie gezogen wird, stellt die Anwendung die ursprüngliche Position wieder her.

## Kategorien sortieren

Kategorien können über den Button `Kategorien sortieren` neu angeordnet werden.

So ändern Sie die Reihenfolge im Sortierdialog:

1. Klicken Sie auf `Kategorien sortieren`.
2. Verschieben Sie Kategorien per Drag-and-drop innerhalb der Liste oder nutzen Sie die Pfeil-Schaltflächen.
3. Klicken Sie auf `Speichern`.

Mit `Abbrechen` wird der Dialog geschlossen, ohne die geänderte Reihenfolge zu übernehmen. Die im Dialog gespeicherte Reihenfolge wird unabhängig von den Favoriten im Browser gespeichert.

## Kategorien löschen

Eine Kategorie kann nur gelöscht werden, wenn sie keine Kacheln enthält.

So löschen Sie eine leere Kategorie:

1. Stellen Sie sicher, dass in der Kategorie keine Kacheln vorhanden sind.
2. Klicken Sie auf das Papierkorb-Symbol im Kategorie-Kopf.

Wenn eine Kategorie noch Kacheln enthält, ist die Lösch-Schaltfläche deaktiviert. Falls eine Kategorie trotzdem per Code oder geänderter Oberfläche gelöscht werden soll, verhindert die Logik das Löschen und zeigt eine Meldung an.

## Import und Export

### Export

Ein Klick auf `Export Favoriten` erstellt eine Datei mit dem Namen `favoriten-links.json`.

Die Datei enthält:

```json
{
  "exportedAt": "2026-05-01T08:00:00.000Z",
  "links": [
    {
      "id": "beispiel-id",
      "title": "Example",
      "url": "https://example.com",
      "category": "Allgemein"
    }
  ]
}
```

`exportedAt` ist der Exportzeitpunkt im ISO-Format. Die eigentlichen Favoriten stehen im Array `links`.

### Import

Ein Klick auf `Import Favoriten` öffnet die Dateiauswahl für JSON-Dateien.

Unterstützt werden zwei Formate:

- ein Objekt mit einem Feld `links`
- direkt ein Array von Link-Objekten

Beim Import werden nur gültige Einträge übernommen. Ein gültiger Eintrag braucht mindestens:

- `title` als Text
- `url` als Text und gültige URL nach Normalisierung

Falls eine importierte URL kein Protokoll enthält, ergänzt die Anwendung `https://`.

Nach dem Einlesen fragt die Anwendung, ob die vorhandenen Links ersetzt werden sollen:

- `OK`: bestehende Favoriten werden durch die importierten Favoriten ersetzt
- `Abbrechen`: importierte Favoriten werden vor die vorhandenen Favoriten gesetzt

Kategorien aus importierten Favoriten werden beim nächsten Rendern automatisch in die Kategorie-Reihenfolge aufgenommen.

## Datenspeicherung

Die Anwendung speichert alle Daten lokal im Browser über `localStorage`.

Verwendete Schlüssel:

- `favorite-links-v1`: Favoriten-Liste
- `favorite-category-order-v1`: Reihenfolge der Kategorien

Die Daten bleiben erhalten, solange der Browser-Speicher für diese Seite nicht gelöscht wird. Sie werden nicht an einen Server übertragen.

Wichtig: Die Daten sind an den Browser und die genaue Herkunft der geöffneten Seite gebunden. Wenn die Seite in einem anderen Browser, unter einer anderen URL oder auf einem anderen Gerät geöffnet wird, sind die Daten dort nicht automatisch vorhanden. Für eine Übertragung sollte der JSON-Export verwendet werden.

## Validierung und Normalisierung

Die Anwendung bereinigt Eingaben vor dem Speichern:

- Leerzeichen am Anfang und Ende werden entfernt.
- URLs ohne `http://` oder `https://` bekommen automatisch `https://`.
- Eine leere Kategorie wird zu `Allgemein`.
- Beim Laden aus dem Speicher werden ungültige Einträge ignoriert.
- Wenn gespeicherte Daten beschädigt sind, fällt die Anwendung auf die Standard-Favoriten zurück.

## Darstellung und Bedienkomfort

Das Layout ist responsiv:

- Auf breiteren Bildschirmen stehen die Formularfelder nebeneinander.
- Auf kleinen Bildschirmen werden die Formularfelder untereinander angezeigt.
- Die Favoriten-Kacheln passen sich über ein flexibles Raster an die verfügbare Breite an.

Die Anwendung unterstützt helle und dunkle Darstellung über die Systemeinstellung `prefers-color-scheme`.

Viele Symbol-Schaltflächen zeigen beim Überfahren mit der Maus einen Tooltip, zum Beispiel:

- `Reihenfolge ändern`
- `Kategorie ändern`
- `Kachel bearbeiten`
- `Kachel löschen`
- `Kategorie löschen`

## Einschränkungen

Die Anwendung ist bewusst lokal und einfach gehalten. Daraus ergeben sich diese Einschränkungen:

- Keine Synchronisation zwischen Geräten
- Keine Benutzerkonten
- Keine serverseitige Sicherung
- Keine Suchfunktion
- Keine Bestätigung vor dem Löschen einzelner Kacheln
- Keine Rückgängig-Funktion
- Kein Drag-and-drop-Wechsel einer Kachel in eine andere Kategorie

## Fehlerbehebung

### Meine Favoriten sind verschwunden

Prüfen Sie, ob Sie die Seite im selben Browser und unter derselben Herkunft geöffnet haben. Wenn Browserdaten gelöscht wurden, kann der lokale Speicher entfernt worden sein. Verwenden Sie vorhandene JSON-Exporte, um die Favoriten wiederherzustellen.

### Eine URL wird nicht akzeptiert

Geben Sie eine vollständige und gültige Adresse ein. Die Anwendung ergänzt zwar `https://`, die resultierende URL muss aber vom Browser als gültige URL erkannt werden.

### Ich kann eine Kategorie nicht löschen

Kategorien mit Kacheln können nicht gelöscht werden. Löschen Sie zuerst die Kacheln oder verschieben Sie sie über das Etikett-Symbol in andere Kategorien.

### Der Import funktioniert nicht

Prüfen Sie, ob die Datei gültiges JSON enthält und ob die Einträge `title` und `url` besitzen. Unterstützt wird entweder `{ "links": [...] }` oder direkt `[...]`.

## Technische Zusammenfassung

Beim Laden der Seite liest `app.js` die Favoriten und die Kategorie-Reihenfolge aus `localStorage`. Anschließend wird die Oberfläche vollständig aus JavaScript erzeugt. Änderungen an Favoriten oder Kategorien werden sofort gespeichert und danach neu gerendert.

Die wichtigsten Funktionen sind:

- `normalizeUrl`: ergänzt fehlendes URL-Protokoll
- `normalizeCategory`: trimmt Kategorien und setzt bei leerem Wert `Allgemein`
- `loadLinks` und `saveLinks`: laden und speichern Favoriten
- `loadCategoryOrder` und `saveCategoryOrder`: laden und speichern die Kategorie-Reihenfolge
- `sanitizeImportedLinks`: prüft und bereinigt importierte JSON-Daten
- `render`: baut Kategorien, Kacheln und Vorschlagsliste neu auf
- `renderSortCategoriesList`: baut die Sortierliste im Kategorie-Dialog auf
- `openSortCategoriesDialog`: öffnet den Dialog zum Sortieren der Kategorien
- `createTile`: erzeugt eine einzelne Favoriten-Kachel mit Aktionen
- `openEditDialog`: öffnet den Bearbeitungsdialog
- `reassignLinkCategory`: weist eine Kachel einer anderen Kategorie zu
- `moveLink`: ändert die Reihenfolge von Kacheln per Drag-and-drop
