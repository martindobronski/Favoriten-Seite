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

| Bereich         | Beschreibung                                                            |
| --------------- | ----------------------------------------------------------------------- |
| Kopfbereich     | Titel und Untertitel der App                                            |
| Eingabebereich  | Formular zum Hinzufügen neuer Favoriten sowie alle Aktionsschaltflächen |
| Suchleiste      | Echtzeit-Suche über alle Favoriten                                      |
| Statistik-Panel | Optionale Anzeige der Nutzungshäufigkeit (ein-/ausblendbar)             |
| Kachelbereich   | Darstellung aller Favoriten gegliedert nach Kategorien                  |
| Fußzeile        | Anzeige der App-Version und des Release-Datums                          |

---

## 3. Favoriten verwalten

### 3.1 Neuen Favoriten hinzufügen

Im oberen Eingabeformular stehen drei Felder zur Verfügung:

- **Name** – die Bezeichnung, die auf der Kachel angezeigt wird
- **URL** – die Webadresse (`https://` wird automatisch ergänzt, wenn kein Protokoll angegeben wird)
- **Kategorie** – Zuordnung zu einer Gruppe; vorhandene Kategorien werden alphabetisch als Vorschläge angezeigt

Anschließend die Schaltfläche **„Hinzufügen"** klicken oder **Enter** drücken.

> **Tipp:** Wird nur eine Kategorie eingetragen (Name und URL leer gelassen), wird eine leere Kategorie erstellt.

> **Tipp:** Neben `https://`-Adressen werden auch benutzerdefinierte Protokolle unterstützt, z. B. `obsidian://open?vault=MeinVault` zum Öffnen lokaler Anwendungen.

### 3.2 Favorit bearbeiten

Jede Kachel besitzt einen Bearbeiten-Button (**✏️**). Ein Klick öffnet einen Dialog mit den aktuellen Werten. Mit **„Speichern"** werden die Änderungen übernommen.

> **Hinweis:** Beim Öffnen des Bearbeiten-Dialogs wird ein laufender Auto-Export-Timer gestoppt und erst nach dem Speichern neu gestartet.

### 3.3 Favorit löschen

Der Löschen-Button (**🗑️**) auf jeder Kachel entfernt den Eintrag nach einer Sicherheitsabfrage dauerhaft.

### 3.4 Kategorie eines Favoriten ändern

Über den Kategorie-Button (**🏷️**) öffnet sich ein alphabetisch sortiertes Kontextmenü aller verfügbaren Kategorien. Ein Klick verschiebt den Favoriten sofort.

### 3.5 Reihenfolge ändern (Drag & Drop)

Über den Drag-Handle (**↔️**) kann die Reihenfolge der Kacheln innerhalb einer Kategorie per Maus verändert werden. Kacheln können auch auf den leeren Bereich einer anderen Kategorie gezogen werden, um sie dorthin zu verschieben.

---

## 4. Kategorien

### 4.1 Kategorien sortieren

Über **„↕️ Kategorien sortieren"** öffnet sich ein Dialog zur Anpassung der Anzeigereihenfolge:

- **Drag & Drop:** Kategorien per Maus verschieben
- **⇧ / ↑ / ↓ / ⇩:** Schrittweise oder ganz nach oben/unten verschieben

Mit **„Speichern"** übernehmen, **„Abbrechen"** verwirft die Änderungen.

> **Hinweis:** Die Kategoriesortierung betrifft nur die Anzeigereihenfolge. Die Vorschlagsliste beim Eintippen ist immer alphabetisch sortiert.

### 4.2 Kategorie löschen

Im Kategoriekopf kann eine Kategorie über **🗑️** gelöscht werden – aber nur wenn sie keine Kacheln mehr enthält.

### 4.3 Automatische Kategorie „Am häufigsten besucht"

Wird automatisch angezeigt, sobald mindestens ein Favorit besucht wurde. Zeigt bis zu 6 Links und kann nicht manuell bearbeitet werden.

---

## 5. Suche

Die Suchleiste filtert die Favoriten in Echtzeit nach Name, URL und Kategorie. Die Suchleiste wird beim Start automatisch fokussiert.

---

## 6. Nutzungsstatistik

### 6.1 Statistik anzeigen

**„📊 Statistik"** blendet ein Panel mit allen besuchten Favoriten sortiert nach Aufrufhäufigkeit ein. Die Top 3 werden mit 🥇 🥈 🥉 hervorgehoben. Der Button ist deaktiviert, solange kein Favorit besucht wurde.

### 6.2 Zähler zurücksetzen

**„🔄 Zähler reset"** setzt alle Besuchszähler nach einer Sicherheitsabfrage auf null.

> **Hinweis:** Vor dem Zurücksetzen empfiehlt sich ein Export – die Besuchszähler sind in der Backup-Datei enthalten und können per Import wiederhergestellt werden.

---

## 7. Export und Import

### 7.1 Manueller Export

**„⬇️ Export"** lädt eine JSON-Datei mit Favoriten, Kategorienreihenfolge und Besuchszählern herunter. Dateiname-Format:

```
favoriten-links-backup-20260506-143022.json
```

### 7.2 Auto-Export

Nach jeder Änderung startet ein 5-Sekunden-Timer. Läuft er ab, wird automatisch eine Sicherungsdatei heruntergeladen. Die Auto-Export-Checkbox schaltet diese Funktion dauerhaft ein oder aus – die Einstellung wird gespeichert.

### 7.3 Export beim Verlassen

Beim Schließen der App mit ungespeicherten Änderungen (und ohne vorangegangenen Auto-Export) wird automatisch ein Export ausgelöst.

### 7.4 Import

**„⬆️ Import"** liest eine exportierte JSON-Datei ein. Anschließend Auswahl:

- **Ersetzen:** Alle bestehenden Daten werden ersetzt.
- **Zusammenführen:** Daten werden zusammengeführt; bei Duplikaten gewinnt die importierte Version, bei Besuchszählern der höhere Wert.

---

## 8. Schaltflächen-Übersicht

| Schaltfläche            | Funktion                                   |
| ----------------------- | ------------------------------------------ |
| Hinzufügen              | Neuen Favoriten speichern                  |
| ↕️ Kategorien sortieren | Anzeigereihenfolge der Kategorien anpassen |
| ⬇️ Export               | Backup als JSON-Datei herunterladen        |
| ⬆️ Import               | JSON-Datei importieren                     |
| 📊 Statistik            | Nutzungsstatistik ein-/ausblenden          |
| 🔄 Zähler reset         | Alle Besuchszähler zurücksetzen            |
| Auto-Export ☑️          | Automatischen Export ein-/ausschalten      |
| ❓ Hilfe                 | Bedienungsanleitung öffnen (PDF)           |
| ✏️ (Kachel)             | Favorit bearbeiten                         |
| 🗑️ (Kachel)            | Favorit löschen                            |
| 🏷️ (Kachel)            | Kategorie ändern                           |
| ↔️ (Kachel)             | Reihenfolge per Drag & Drop ändern         |
| 🗑️ (Kategorie)         | Leere Kategorie löschen                    |

---

## 9. Datenspeicherung

Alle Daten werden ausschließlich im `localStorage` des Browsers gespeichert. Kein Server, keine Cloud.

Gespeicherte Daten:

- Favoritenliste (Name, URL, Kategorie)
- Kategorienreihenfolge
- Besuchszähler je Favorit
- Auto-Export-Einstellung (ein/aus)

> **Wichtig:** Beim Löschen des Browser-Caches gehen alle Daten verloren. Regelmäßiger Export wird dringend empfohlen.

Das Speicherlimit beträgt browserseitig typischerweise 5–10 MB. Bei Überschreitung versucht die App zunächst eine automatische Bereinigung verwaister Zähler; schlägt das fehl, erscheint eine Warnung.

---

## 10. Häufige Fragen & Fehlerbehebung

| Problem                                   | Lösung                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| App lädt nicht als PWA                    | Aufruf über `http://` oder `https://` nötig, nicht `file://`. Lokalen Webserver starten: `python3 -m http.server 8080` |
| Favicons fehlen                           | Einige Seiten bieten kein `favicon.ico` – Globus-Symbol als Platzhalter                                                |
| Keine Favicons bei 192.168.x.x            | HTTPS-Seiten dürfen keine HTTP-Ressourcen laden (Mixed Content) – normales Browserverhalten                            |
| Auto-Export funktioniert nicht            | Browser-Einstellungen für automatische Downloads prüfen; Auto-Export-Checkbox kontrollieren                            |
| Besuchszähler nach Reset wiederherstellen | Backup vor dem Reset exportieren, danach wieder importieren                                                            |
| Daten verschwunden                        | Browser-Cache wurde geleert – künftig regelmäßig exportieren                                                           |
| Import wird nicht erkannt                 | Nur JSON-Dateien dieser App werden akzeptiert                                                                          |
| `obsidian://`-Link öffnet nichts          | Obsidian muss installiert und einmal gestartet gewesen sein                                                            |
