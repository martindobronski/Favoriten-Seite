# Meine Favoriten - Dokumentation und Bedienungsanleitung

**Stand: 4. Mai 2026**

## Überblick

Diese kleine Webanwendung verwaltet persönliche Favoriten-Links direkt im Browser. Die Links werden als Kacheln angezeigt, nach Kategorien gruppiert und lokal im Browser gespeichert. Es gibt keine Server-Komponente und keine Anmeldung.

Beim ersten Öffnen legt die Anwendung zwei Beispiel-Favoriten an:

*   Tagesschau in der Kategorie `Nachrichten`
*   Wikipedia in der Kategorie `Wissen`

Die Anwendung besteht aus drei Dateien:

*   `index.html`: Grundstruktur der Seite, Formular, Import-/Export-Schaltflächen und Bearbeitungsdialog
*   `styles.css`: Layout, Farben, responsive Darstellung, Dialoge, Tooltips und Drag-and-drop-Zustände
*   `app.js`: komplette Anwendungslogik, lokale Speicherung, Validierung, Rendering, Import/Export und Bedienereignisse

## Starten der Anwendung

Die Anwendung kann direkt im Browser geöffnet werden:

1.  Öffnen Sie den Projektordner `Favoriten-Seite`.
2.  Öffnen Sie die Datei `index.html` in einem modernen Browser.

Ein lokaler Webserver ist nicht zwingend erforderlich, weil die Anwendung nur HTML, CSS, JavaScript und den Browser-Speicher verwendet.

## Oberfläche

Die Seite zeigt oben ein Eingabeformular und darunter die Favoriten-Kacheln.

Das Formular enthält:

*   `Name`: Anzeigename des Favoriten
*   `URL`: Zieladresse des Favoriten
*   `Kategorie`: Kategorie, in der der Favorit erscheinen soll
*   `Hinzufügen`: legt einen neuen Favoriten oder eine neue leere Kategorie an

Unter dem Formular befinden sich:

*   `Kategorien sortieren`: öffnet einen Dialog, in dem die Kategorie-Reihenfolge geändert werden kann
*   `Export Favoriten`: lädt die gespeicherten Favoriten als JSON-Datei herunter
*   `Import Favoriten`: liest Favoriten aus einer JSON-Datei ein
*   `Hilfe`: öffnet die Bedienungsanleitung als PDF (`BEDIENUNGSANLEITUNG.pdf`) in einem neuen Browser-Tab

Darunter befindet sich ein Suchfeld, mit dem die angezeigten Kacheln nach Name, URL oder Kategorie gefiltert werden können.

Danach erscheinen die Kategorien. Wenn bereits Favoriten geöffnet wurden, erscheint ganz oben automatisch die Kategorie `Am häufigsten besucht` mit den bis zu fünf am häufigsten aufgerufenen Kacheln. Danach folgen die selbst angelegten Kategorien. Jede selbst angelegte Kategorie hat eine Überschrift und eine Lösch-Schaltfläche. Die Lösch-Schaltfläche ist nur nutzbar, wenn die Kategorie leer ist.

Am unteren Fensterrand wird eine feststehende Footer-Leiste mit Programmversion, Versionsdatum und Copyright-Vermerk angezeigt, zum Beispiel `Version 0.3 vom 04.05.2026 / © MD. 2026`.

## Favoriten hinzufügen

So legen Sie einen neuen Favoriten an:

1.  Tragen Sie einen Namen ein.
2.  Tragen Sie eine URL ein.
3.  Tragen Sie eine Kategorie ein oder wählen Sie eine vorhandene Kategorie aus der Vorschlagsliste.
4.  Klicken Sie auf `Hinzufügen`.

Die URL darf mit oder ohne Protokoll (`http://`, `https://`) eingegeben werden. Wenn es fehlt, ergänzt die Anwendung automatisch `https://`. Auch benutzerdefinierte Protokolle (z. B. `obsidian://`) werden unterstützt.

Beispiele:

*   `https://example.com` bleibt `https://example.com`
*   `example.com` wird zu `https://example.com`
*   `obsidian://open?vault=MeinVault` bleibt unverändert.

Wenn Name oder URL fehlen, zeigt die Anwendung eine Meldung an. Eine Ausnahme gibt es für das Erstellen leerer Kategorien.

## Leere Kategorien erstellen

Eine leere Kategorie wird erstellt, indem nur das Feld `Kategorie` ausgefüllt wird. Die Felder `Name` und `URL` bleiben leer.

Nach dem Klick auf `Hinzufügen` erscheint die neue Kategorie als eigener Abschnitt mit dem Hinweis `Noch keine Kacheln in dieser Kategorie.`

Leere Kategorien sind nützlich, um die Struktur vorzubereiten, bevor Favoriten einsortiert werden.

## Favoriten suchen

Das Suchfeld zwischen Formular und Kachelbereich filtert die angezeigten Kacheln in Echtzeit.

Gesucht wird in:

*   Name der Kachel
*   URL der Kachel
*   Kategorie der Kachel

Kategorien ohne Treffer werden ausgeblendet. Wenn keine Kachel zum Suchbegriff passt, erscheint eine entsprechende Meldung. Das Leeren des Suchfelds zeigt wieder alle Kacheln an. Die Suche verändert keine gespeicherten Daten.

## Favoriten öffnen

Ein Klick auf den Textbereich einer Kachel öffnet die gespeicherte URL. Web-Adressen (`http/https`) öffnen sich in einem neuen Browser-Tab, während benutzerdefinierte Protokolle im selben Tab aufgerufen werden.

Jeder Klick auf eine Kachel wird lokal gezählt. Aus diesen Zählern erstellt die Anwendung automatisch die Kategorie `Am häufigsten besucht`. Die Kacheln bleiben weiterhin in ihren eigentlichen Kategorien; der automatische Abschnitt ist nur eine zusätzliche Anzeige. Die Besuchsanzahl wird als kleine Zahl links in der Aktionsleiste jeder Kachel angezeigt.

## Favoriten bearbeiten

Jede Kachel hat eine Bearbeiten-Schaltfläche mit Stift-Symbol (`✏️`).

So bearbeiten Sie eine Kachel:

1.  Klicken Sie auf das Stift-Symbol der Kachel.
2.  Ändern Sie Titel, URL oder Kategorie im Dialog.
3.  Klicken Sie auf `Speichern`.

Mit `Abbrechen` oder durch Drücken der `Escape`-Taste wird der Dialog geschlossen, ohne Änderungen zu speichern.

Beim Speichern prüft die Anwendung:

*   Der Titel darf nicht leer sein.
*   Die URL muss gültig sein.
*   Eine leere Kategorie wird als `Allgemein` gespeichert.

Wenn beim Bearbeiten eine neue Kategorie eingetragen wird, legt die Anwendung diese Kategorie automatisch an.

## Favoriten löschen

Jede Kachel hat eine Lösch-Schaltfläche mit Papierkorb-Symbol (`🗑`).

Ein Klick darauf öffnet eine Bestätigungsabfrage. Nach Bestätigung wird der Favorit sofort aus der Liste entfernt und die Änderung im Browser gespeichert. Es gibt keine eingebaute Rückgängig-Funktion.

## Kategorie einer Kachel ändern

Jede Kachel hat eine Kategorie-Schaltfläche mit Etikett-Symbol (`🏷️`).

So verschieben Sie eine Kachel in eine andere Kategorie:

1.  Klicken Sie auf das Etikett-Symbol.
2.  Wählen Sie im Menü eine andere Kategorie aus.

Das Menü zeigt nur vorhandene Kategorien außer der aktuellen Kategorie und sortiert sie alphabetisch. Wenn es keine andere Kategorie gibt, erscheint eine Meldung.

## Kacheln sortieren

Kacheln können innerhalb ihrer Kategorie per Drag-and-drop sortiert werden.

So ändern Sie die Reihenfolge:

1.  Greifen Sie die Kachel am Verschiebe-Symbol (`↔️`).
2.  Ziehen Sie sie auf eine andere Kachel derselben Kategorie.
3.  Lassen Sie sie los.

Die neue Reihenfolge wird sofort im Browser gespeichert.

Wichtig: Eine Kachel kann per Drag-and-drop nicht in eine andere Kategorie gezogen werden. Kacheln im automatischen Abschnitt `Am häufigsten besucht` können nicht manuell sortiert werden.

## Kategorien sortieren

Kategorien können über den Button `Kategorien sortieren` neu angeordnet werden.

So ändern Sie die Reihenfolge im Sortierdialog:

1.  Klicken Sie auf `Kategorien sortieren`.
2.  Verschieben Sie Kategorien per Drag-and-drop innerhalb der Liste oder nutzen Sie die Pfeil-Schaltflächen.
3.  Verwenden Sie die Doppelpfeile (`⇧`/`⇩`), um eine Kategorie direkt ganz nach oben oder ganz nach unten zu verschieben.
4.  Klicken Sie auf `Speichern`.

Mit `Abbrechen` oder durch Drücken der `Escape`-Taste wird der Dialog geschlossen, ohne die geänderte Reihenfolge zu übernehmen.

## Kategorien löschen

Eine Kategorie kann nur gelöscht werden, wenn sie keine Kacheln enthält.

So löschen Sie eine leere Kategorie:

1.  Stellen Sie sicher, dass in der Kategorie keine Kacheln vorhanden sind.
2.  Klicken Sie auf das Papierkorb-Symbol (`🗑`) im Kategorie-Kopf.

Wenn eine Kategorie noch Kacheln enthält, ist die Lösch-Schaltfläche deaktiviert.

## Import und Export

### Export

Ein Klick auf `Export Favoriten` erstellt eine Datei mit dem Namen `favoriten-links.json`. Diese enthält alle Links und die Sortierreihenfolge der Kategorien.

### Automatischer Backup-Export

**Neu:** Wenn Sie die Seite mit ungespeicherten Änderungen verlassen, versucht die Anwendung automatisch, eine Backup-Datei herunterzuladen (z. B. `favoriten-backup-2026-05-04.json`). Überprüfen Sie Ihren Download-Ordner, um sicherzustellen, dass das Backup erfolgreich war.

### Import

Ein Klick auf `Import Favoriten` öffnet die Dateiauswahl für JSON-Dateien.

Unterstützt werden zwei Formate:

*   ein Objekt mit einem Feld `links` (und optionalem Feld `categoryOrder`)
*   direkt ein Array von Link-Objekten

Nach dem Einlesen fragt die Anwendung, ob die vorhandenen Links ersetzt oder ergänzt werden sollen.

## Datenspeicherung

Die Anwendung speichert alle Daten lokal im Browser über `localStorage`.

Verwendete Schlüssel:

*   `favorite-links-v1`: Favoriten-Liste
*   `favorite-category-order-v1`: Reihenfolge der Kategorien
*   `favorite-visit-counts-v1`: lokale Besuchszähler

Die Daten bleiben erhalten, solange der Browser-Speicher für diese Seite nicht gelöscht wird.

Wichtig: Die Daten sind an den Browser und die genaue Herkunft der geöffneten Seite gebunden. Für eine Übertragung zwischen Geräten oder Browsern sollte der JSON-Export verwendet werden.

## Einschränkungen

*   Keine automatische Synchronisation zwischen Geräten
*   Keine Benutzerkonten und keine serverseitige Sicherung
*   Keine Rückgängig-Funktion
*   Kein Drag-and-drop-Wechsel einer Kachel in eine andere Kategorie (bitte das Etikett-Symbol `🏷️` verwenden)

## Fehlerbehebung

### Meine Favoriten sind verschwunden

Prüfen Sie, ob Sie die Seite im selben Browser geöffnet haben. Wenn Browserdaten gelöscht wurden, kann der lokale Speicher entfernt worden sein. Verwenden Sie vorhandene JSON-Exporte (manuell oder automatisch), um die Favoriten wiederherzustellen.

### Der Speicher ist voll

Die Anwendung warnt Sie, wenn der lokale Speicher des Browsers voll ist. In diesem Fall:

1.  Exportieren Sie Ihre Daten **sofort** über den `Export Favoriten`-Button.
2.  Löschen Sie alte, nicht mehr benötigte Favoriten, um Platz zu schaffen.
3.  Importieren Sie ggf. die gesicherten Daten nach der Bereinigung.

### Ich kann eine Kategorie nicht löschen

Kategorien mit Kacheln können nicht gelöscht werden. Löschen oder verschieben Sie zuerst alle Kacheln aus der Kategorie.
