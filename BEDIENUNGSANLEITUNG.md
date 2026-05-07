# Bedienungsanleitung – Favoriten-Verwaltung

**Version 1.0 – Stand 08.05.2026**

---

## 1. Einleitung

Die Favoriten-Verwaltung ist eine lokale Web-App zum Speichern, Organisieren und Durchsuchen
Ihrer regelmäßig besuchten Links. Alle Daten verbleiben in Ihrem Browser
(localStorage) – es wird kein externer Server benötigt.

---

## 2. Link hinzufügen

1. Geben Sie im Panel oben einen **Namen** ein (z. B. „Tagesschau").
2. Geben Sie die **URL** ein (z. B. `https://www.tagesschau.de`).  
   *Wird kein Protokoll angegeben (z. B. fehlendes `https://`), wird automatisch
   `https://` ergänzt.*
3. Wählen oder tippen Sie eine **Kategorie** (z. B. „Nachrichten").  
   *Wird keine Kategorie angegeben, wird automatisch „Allgemein" verwendet.*
4. Klicken Sie auf **„Hinzufügen"** oder drücken Sie die Eingabetaste.

**Nur eine Kategorie anlegen:**  
Lassen Sie Name und URL leer, geben Sie nur den Kategorie-Namen ein und klicken Sie
auf „Hinzufügen". Die leere Kategorie wird angelegt und kann später mit Links
befüllt werden.

---

## 3. Kacheln verwalten

Jeder gespeicherte Link wird als **Kachel** dargestellt. Beim Überfahren mit der Maus
werden Aktions-Buttons eingeblendet.

### 3.1 Link öffnen

Klicken Sie auf den Titel oder die URL einer Kachel:
- **HTTP/HTTPS-Links** werden in einem neuen Tab geöffnet.
- **Eigene Protokolle** (z. B. `steam:`, `ftp:`) werden im selben Tab geöffnet.

Der Besuchszähler wird automatisch erhöht.

### 3.2 Kachel bearbeiten

Klicken Sie auf das **Bearbeiten-Symbol (Stift)** in der Kachel.  
Es öffnet sich ein Dialog, in dem Sie Titel, URL und Kategorie ändern können.

### 3.3 Kachel löschen

Klicken Sie auf das **Löschen-Symbol (Mulleimer)** in der Kachel und bestätigen Sie
die Sicherheitsabfrage.

### 3.4 Kategorie einer Kachel ändern

Klicken Sie auf das **Kategorie-Symbol (Etikett)** in der Kachel.  
Es öffnet sich ein Kontextmenü mit allen verfügbaren Kategorien. Klicken Sie auf die
gewünschte Kategorie. Die Kachel wird sofort verschoben.

### 3.5 Kacheln innerhalb einer Kategorie verschieben

Ziehen Sie eine Kachel am **Greifer-Symbol** an die gewünschte Position innerhalb
derselben Kategorie. Lassen Sie die Kachel los, um sie dort abzulegen.  
*Ziehen auf einen leeren Bereich der Kategorie platziert die Kachel ans Ende.*

---

## 4. Kategorien verwalten

### 4.1 Kategorie umbenennen

Klicken Sie auf das **Bearbeiten-Symbol (Stift)** im Kategorie-Kopf.  
Geben Sie den neuen Namen ein und bestätigen Sie. Alle Links in dieser Kategorie
werden automatisch aktualisiert.

### 4.2 Kategorie löschen

Klicken Sie auf das **Löschen-Symbol (Mulleimer)** im Kategorie-Kopf.  
Dies ist nur möglich, wenn die Kategorie **keine Links** mehr enthält. Verschieben
Sie vor dem Löschen vorhandene Links in eine andere Kategorie.

### 4.3 Kategorien sortieren

Klicken Sie auf den Button **„Kategorien sortieren"** im Panel.  
Es öffnet sich ein Dialog mit allen Kategorien in der aktuellen Reihenfolge.

**Möglichkeiten zum Umsortieren:**
- **Ziehen** Sie eine Kategorie per Drag & Drop an die gewünschte Position.
- Nutzen Sie die **Pfeil-Buttons** (nach oben / unten) oder die **Springen-Buttons**
  (ganz nach oben / ganz nach unten).

Bestätigen Sie mit **„Speichern"** oder verwerfen Sie die Änderungen mit
**„Abbrechen"**.

---

## 5. Besuchszähler und Statistik

Jeder Link hat einen internen Besuchszähler, der bei jedem Klick auf den Link
erhöht wird.

### 5.1 Besuchszähler anzeigen

Wenn ein Link mindestens einmal besucht wurde, erscheint rechts oben in der Kachel
ein **Badge** mit der Anzahl der Besuche. Fahren Sie mit der Maus darüber, um den
genauen Zählerstand zu sehen.

### 5.2 Besuchszähler einer einzelnen Kachel zurücksetzen

Klicken Sie auf das **Zurücksetzen-Symbol** in der Kachel (sichtbar nur bei
Kacheln mit Besuchen) und bestätigen Sie den Dialog.

### 5.3 Alle Besuchszähler zurücksetzen

Klicken Sie im Panel auf **„Zähler reset"** und bestätigen Sie die Abfrage.
Alle Besuchszähler werden auf 0 gesetzt.

### 5.4 Statistik anzeigen

Klicken Sie auf **„Statistik"** im Panel. Es öffnet sich eine detaillierte
Besuchsstatistik:
- Alle besuchten Links, absteigend sortiert nach Anzahl der Aufrufe
- Balkendiagramm zur visuellen Darstellung der Besuchshäufigkeit
- Die Top 3 sind mit Medaillen-Symbolen gekennzeichnet

Ein erneuter Klick auf **„Statistik"** blendet die Ansicht wieder aus.

### 5.5 Meistbesuchte Links

Die Kategorie **„Am häufigsten besucht"** wird automatisch angezeigt und enthält
die sechs am häufigsten aufgerufenen Links. Diese Sektion wird dynamisch berechnet
und kann nicht manuell bearbeitet werden.

### 5.6 Sortierung nach Häufigkeit

Aktivieren Sie den Toggle **„Häufigkeit"** im Panel.  
Die Kacheln werden dann innerhalb jeder Kategorie absteigend nach Besuchszahlen
sortiert (die meistbesuchten zuerst). Die Einstellung wird gespeichert.

---

## 6. Farbschema umschalten

In der Kopfzeile rechts befinden sich zwei **farbige Kreise**:

| Kreis | Farbschema | Beschreibung |
|-------|-----------|-------------|
| Blau | Blau-Schema | Dunkelblauer Hintergrund, blaue Akzente (Standard) |
| Grün | Grün-Schema | Fast-schwarzer Hintergrund mit Grünstich, grüne Akzente |

Klicken Sie auf den gewünschten Kreis. Die Auswahl wird sofort übernommen und
beim nächsten Laden der Seite wiederhergestellt.

---

## 7. Suchen und Filtern

Die Suchleiste unter dem Panel filtert die angezeigten Kacheln in Echtzeit.
Es wird nach **Titel**, **URL** und **Kategorie** gesucht.  
Kategorien, die keine Treffer enthalten, werden ausgeblendet.  
*Die Suchleiste ist beim Laden der Seite automatisch fokussiert.*

---

## 8. Import und Export

### 8.1 Export (Backup)

Klicken Sie auf **„Export"** im Panel.  
Es wird eine JSON-Datei mit folgendem Namen heruntergeladen:
`favoriten-links-backup-YYYYMMDD-HHmmss.json`

Die Datei enthält:
- Alle Links mit Titel, URL, Kategorie und ID
- Die benutzerdefinierte Kategorien-Reihenfolge
- Alle Besuchszähler

### 8.2 Import

Klicken Sie auf **„Import"** und wählen Sie eine zuvor exportierte JSON-Datei aus.

**Es erscheint ein Dialog mit zwei Optionen:**

- **Ersetzen** – Alle aktuellen Daten werden verworfen und durch die importierten
  Daten ersetzt.
- **Zusammenführen** – Die importierten Daten werden mit den vorhandenen Daten
  zusammengeführt:
  - Bei gleicher ID gewinnt der importierte Datensatz
  - Neue Kategorien werden vorne eingefügt
  - Besuchszähler: der höhere Wert gewinnt

### 8.3 Auto-Export

Der **Auto-Export** ist standardmäßig aktiviert. Er erstellt 5 Sekunden nach der
letzten Änderung automatisch ein JSON-Backup und löst einen Download aus.

- **Deaktivieren**: Entfernen Sie den Haken bei **„Auto-Export"** im Panel.
- Die Einstellung wird gespeichert.

*Hinweis: Auch beim Schließen der Seite wird ein finaler Auto-Export durchgeführt,
falls seit dem letzten Export Änderungen vorliegen.*

---

## 9. Datenspeicherung

Alle Daten werden ausschließlich im **localStorage** Ihres Browsers gespeichert:

| Schlüssel | Inhalt |
|-----------|--------|
| `favorite-links-v1` | Alle Links (Titel, URL, Kategorie, ID) |
| `favorite-category-order-v1` | Reihenfolge der Kategorien |
| `favorite-visit-counts-v1` | Besuchszähler pro Link-ID |
| `favorite-sort-by-freq-v1` | Sortierung-nach-Häufigkeit Einstellung |
| `favorite-theme-v1` | Ausgewähltes Farbschema |
| `autoExportEnabled` | Auto-Export Ein/Aus |

**Hinweise:**
- Die Daten sind browser-spezifisch und werden nicht automatisch zwischen
  verschiedenen Geräten synchronisiert.
- Ein regelmäßiges Export-Backup wird empfohlen.
- Bei vollem localStorage werden automatisch verwaiste Besuchszähler-Einträge
  aufgeräumt.

---

## 10. Tipps und Hinweise

- **Favicons**: Zu jedem Link wird automatisch das Favicon der Webseite geladen.
  Bei HTTP-Links auf einer HTTPS-Seite wird das Favicon aus Sicherheitsgründen
  nicht geladen; stattdessen erscheint ein Platzhalter.
- **Tooltips**: Alle Bedienelemente haben kurze Erklärungen, die nach einer
  halben Sekunde Verzögerung eingeblendet werden.
- **Erste Schritte**: Direkt nach der ersten Installation sind zwei Beispiel-Links
  (Tagesschau, Wikipedia) vorinstalliert.
