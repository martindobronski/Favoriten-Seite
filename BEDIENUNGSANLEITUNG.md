# Meine Favoriten – Bedienungsanleitung

**Version 0.7 vom 06.05.2026 / © MD. 2026**

---

## 1. Einleitung

„Meine Favoriten" ist eine browserbasierte Web-App zur persönlichen Verwaltung von Links und Lesezeichen. Sie läuft vollständig im Browser, benötigt keine Installation und speichert alle Daten lokal auf dem eigenen Gerät – ohne Cloud, ohne Registrierung.

Die App eignet sich besonders für Personen, die eine feste Sammlung an regelmäßig besuchten Webseiten, internen Tools oder lokalen Diensten übersichtlich und schnell zugänglich haben möchten.

### 1.1 Systemvoraussetzungen

- Moderner Webbrowser (Chrome, Brave, Edge, Firefox oder Safari)
- Für volle PWA-Funktionalität: Aufruf über HTTP/HTTPS (nicht über `file://`)
- JavaScript muss aktiviert sein

### 1.2 Progressive Web App (PWA)

Die App kann als Progressive Web App installiert werden. Dadurch erscheint sie wie eine native Desktop- oder Mobilanwendung – mit eigenem Fenster, ohne Browser-Adressleiste und mit Offline-Unterstützung.

> **Tipp:** In Chrome oder Brave erscheint in der Adressleiste ein Install-Symbol (⊕). Ein Klick darauf installiert die App im Startmenü bzw. Launchpad.

---

## 2. Benutzeroberfläche

Die App ist in folgende Bereiche gegliedert:

| Bereich         | Beschreibung                                                            |
| --------------- | ----------------------------------------------------------------------- |
| Kopfbereich     | Titel und Untertitel der App                                            |
| Eingabebereich  | Formular zum Hinzufügen neuer Favoriten sowie alle Aktionsschaltflächen |
| Suchleiste      | Echtzeit-Suche über alle Favoriten                                      |
| Statistik-Panel | Optionale Anzeige der Nutzungshäufigkeit (ein-/ausblendbar)             |
| Kachelbereich   | Darstellung aller Favoriten gegliedert nach Kategorien                  |
| Fußzeile        | Anzeige der App-Version                                                 |

---

## 3. Favoriten verwalten

### 3.1 Neuen Favoriten hinzufügen

Im oberen Eingabeformular stehen drei Felder zur Verfügung:

- **Name** – die Bezeichnung, die auf der Kachel angezeigt wird
- **URL** – die Webadresse des Favoriten (`https://` wird automatisch ergänzt, wenn kein Protokoll angegeben wird)
- **Kategorie** – Zuordnung zu einer Gruppe; beim Eintippen werden vorhandene Kategorien als Vorschläge angezeigt

Anschließend die Schaltfläche **„Hinzufügen"** klicken oder **Enter** drücken.

> **Tipp:** Wird nur eine Kategorie eingetragen (Name und URL leer gelassen), wird eine leere Kategorie erstellt. Das ist nützlich, um Kategorien vorab anzulegen.

### 3.2 Favorit bearbeiten

Jede Kachel besitzt einen Bearbeiten-Button (**✏️**). Ein Klick darauf öffnet einen Dialog mit den aktuellen Werten. Dort können Name, URL und Kategorie geändert werden. Mit **„Speichern"** werden die Änderungen übernommen.

> **Hinweis:** Beim Öffnen des Bearbeiten-Dialogs wird ein laufender Auto-Export-Timer gestoppt. Der Timer startet erst nach dem Speichern erneut.

### 3.3 Favorit löschen

Der Löschen-Button (**🗑️**) auf jeder Kachel entfernt den Eintrag nach einer Sicherheitsabfrage dauerhaft aus der Liste.

### 3.4 Kategorie eines Favoriten ändern

Über den Kategorie-Button (**🏷️**) auf jeder Kachel öffnet sich ein Kontextmenü mit allen verfügbaren Kategorien. Ein Klick auf eine Kategorie verschiebt den Favoriten sofort dorthin.

### 3.5 Reihenfolge ändern (Drag & Drop)

Jede Kachel besitzt einen Drag-Handle (**↔️**). Durch Halten und Ziehen kann die Reihenfolge der Kacheln innerhalb einer Kategorie beliebig verändert werden.

> **Tipp:** Kacheln können auch an das Ende einer anderen Kategorie gezogen werden, indem sie auf den leeren Bereich unterhalb der Kacheln einer Kategorie abgelegt werden.

---

## 4. Kategorien

### 4.1 Kategorien sortieren

Über die Schaltfläche **„↕️ Kategorien sortieren"** öffnet sich ein Dialog, in dem die Reihenfolge der Kategorien angepasst werden kann:

- **Drag & Drop:** Kategorien per Maus in die gewünschte Reihenfolge ziehen
- **⇧** Ganz nach oben verschieben
- **↑** Eine Position nach oben
- **↓** Eine Position nach unten
- **⇩** Ganz nach unten verschieben

Mit **„Speichern"** wird die neue Reihenfolge übernommen, **„Abbrechen"** verwirft alle Änderungen.

### 4.2 Kategorie löschen

Im Kategoriekopf jeder Gruppe befindet sich ein Löschen-Button (**🗑️**). Eine Kategorie kann nur gelöscht werden, wenn sie keine Kacheln mehr enthält. Solange Einträge vorhanden sind, ist der Button deaktiviert.

### 4.3 Automatische Kategorie „Am häufigsten besucht"

Diese Kategorie wird automatisch angezeigt, sobald mindestens ein Favorit besucht wurde. Sie zeigt die bis zu 6 am häufigsten aufgerufenen Links und kann nicht manuell bearbeitet oder gelöscht werden.

---

## 5. Suche

Die Suchleiste filtert die angezeigten Favoriten in Echtzeit. Die Suche durchsucht gleichzeitig:

- Den Namen des Favoriten
- Die URL
- Die Kategorie

Leere Kategorien werden bei aktiver Suche ausgeblendet. Gibt es keine Treffer, wird eine entsprechende Meldung angezeigt.

> **Tipp:** Die Suchleiste wird beim Start der App automatisch fokussiert – direkt lostippen genügt.

---

## 6. Nutzungsstatistik

Über **„📊 Statistik anzeigen"** wird ein Panel eingeblendet, das alle besuchten Favoriten absteigend nach Aufrufhäufigkeit auflistet. Die ersten drei Plätze werden mit Medaillen-Icons (🥇 🥈 🥉) hervorgehoben.

Ein Klick auf **„📊 Statistik ausblenden"** schließt das Panel wieder. Der Button ist deaktiviert, solange noch kein Favorit besucht wurde.

> **Hinweis:** Die Besuchszähler werden lokal gespeichert und beim Bereinigen nicht gelöscht, solange der zugehörige Favorit noch existiert.

---

## 7. Export und Import

### 7.1 Manueller Export

Ein Klick auf **„⬇️ Export Favoriten"** lädt eine JSON-Datei mit dem Namen `favoriten-links.json` herunter. Diese enthält alle Favoriten sowie die gespeicherte Kategorienreihenfolge.

### 7.2 Auto-Export

Die App verfügt über einen automatischen Export-Mechanismus: Nach jeder Änderung (Hinzufügen, Bearbeiten, Löschen, Verschieben) startet ein 5-Sekunden-Timer. Läuft dieser ab, ohne dass weitere Änderungen vorgenommen wurden, wird automatisch eine Sicherungsdatei heruntergeladen.

Der Dateiname des Auto-Exports enthält Datum, Uhrzeit und die ersten drei Kategorienamen, zum Beispiel:

```
favoriten-links-backup-20260506-143022-Nachrichten_Wissen_Tools.json
```

> **Hinweis:** Der Auto-Export kann durch einen Toggle-Schalter dauerhaft deaktiviert werden. Die Einstellung wird beim nächsten Start der App beibehalten.

### 7.3 Export beim Verlassen

Wenn die App mit ungespeicherten Änderungen geschlossen wird und kein Auto-Export stattgefunden hat, wird beim Verlassen automatisch ein Export-Download ausgelöst. Der Browser zeigt dabei eine Bestätigungsmeldung an.

### 7.4 Import

Über **„⬆️ Import Favoriten"** kann eine zuvor exportierte JSON-Datei wieder eingelesen werden. Nach Auswahl der Datei erscheint eine Abfrage:

- **Ersetzen:** Alle bestehenden Favoriten werden durch die importierten ersetzt.
- **Zusammenführen:** Importierte Favoriten werden mit bestehenden zusammengeführt. Duplikate (gleiche ID) werden durch die importierte Version überschrieben.

> **Hinweis:** Beim Import werden ungültige Einträge (fehlende Pflichtfelder, ungültige URLs) automatisch herausgefiltert.

---

## 8. Schaltflächen-Übersicht

| Schaltfläche            | Funktion                                                     |
| ----------------------- | ------------------------------------------------------------ |
| Hinzufügen              | Neuen Favoriten mit den eingegebenen Daten speichern         |
| ↕️ Kategorien sortieren | Dialog zum Umsortieren der Kategorienreihenfolge öffnen      |
| ⬇️ Export Favoriten     | Alle Favoriten als JSON-Datei herunterladen                  |
| ⬆️ Import Favoriten     | JSON-Datei mit Favoriten importieren                         |
| 📊 Statistik anzeigen   | Nutzungsstatistik ein- oder ausblenden                       |
| ❓ Hilfe                 | Diese Bedienungsanleitung öffnen                             |
| ✏️ (Kachel)             | Bearbeiten-Dialog für diesen Favoriten öffnen                |
| 🗑️ (Kachel)            | Diesen Favoriten nach Bestätigung löschen                    |
| 🏷️ (Kachel)            | Kategorie dieses Favoriten ändern                            |
| ↔️ (Kachel)             | Kachel per Drag & Drop verschieben                           |
| 🗑️ (Kategorie)         | Leere Kategorie löschen (nur aktiv wenn keine Kacheln darin) |

---

## 9. Datenspeicherung

Alle Daten werden ausschließlich im lokalen Speicher des Browsers (`localStorage`) gespeichert. Es findet keine Übertragung an externe Server statt.

Folgende Daten werden gespeichert:

- Favoritenliste (Name, URL, Kategorie)
- Kategorienreihenfolge
- Besuchszähler je Favorit
- Einstellung des Auto-Exports (ein/aus)

> **Wichtig:** Beim Löschen des Browser-Caches oder der Website-Daten gehen alle gespeicherten Favoriten verloren. Regelmäßiger Export wird empfohlen.

### 9.1 Speicherlimit

Der `localStorage`-Speicher ist browserseitig begrenzt (typischerweise 5–10 MB). Wird das Limit erreicht, erscheint eine Warnung mit der Aufforderung, sofort einen Export durchzuführen und alte Einträge zu löschen.

---

## 10. Häufige Fragen & Fehlerbehebung

| Problem                                          | Lösung                                                                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| App lädt nicht als PWA                           | Die App muss über HTTP/HTTPS aufgerufen werden, nicht über `file://`. Lokalen Webserver starten, z. B. `python3 -m http.server 8080`.    |
| Favicons werden nicht angezeigt                  | Einige Seiten bieten kein `favicon.ico` an. Ein Globus-Symbol wird als Platzhalter angezeigt.                                            |
| Keine Favicons bei lokalen Geräten (192.168.x.x) | Wird die App über HTTPS aufgerufen, können HTTP-Adressen aus Sicherheitsgründen keine Favicons laden. Das ist normales Browserverhalten. |
| Auto-Export lädt keine Datei herunter            | Prüfen, ob der Browser automatische Downloads erlaubt. Ggf. in den Browser-Einstellungen freigeben.                                      |
| Daten nach Browser-Update weg                    | Daten im `localStorage` können beim Löschen von Browserdaten verloren gehen. Regelmäßig exportieren!                                     |
| Import-Datei wird nicht erkannt                  | Nur JSON-Dateien werden akzeptiert, die über den Export-Button dieser App erstellt wurden.                                               |
