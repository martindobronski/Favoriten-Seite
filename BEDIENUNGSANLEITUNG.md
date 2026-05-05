# Meine Favoriten – Dokumentation und Bedienungsanleitung

**Stand:** 5. Mai 2026
**Version:** 0.6

## 1. Überblick

Diese Webanwendung verwaltet Ihre persönlichen Favoriten-Links sicher und datenschutzkonform direkt in Ihrem Browser. Es gibt keine Server-Komponente, keine Anmeldung und keine Datenweitergabe an Dritte.

**Besonderheiten dieser Version:**

* **Datenschutz:** Seiten-Icons (Favicons) werden direkt von den Ziel-Websites geladen oder lokal generiert. Es werden keine externen Dienste (wie Google) zur Icon-Anzeige genutzt.
* **Automatische Sicherung:** Bei Änderungen wird beim Schließen des Tabs automatisch ein Backup erstellt.
* **Lokale Speicherung:** Alle Daten verbleiben in Ihrem Browser (`localStorage`).

Beim ersten Start werden zwei Beispiel-Links angelegt: *Tagesschau* und *Wikipedia*.

## 2. Starten der Anwendung

1. Öffnen Sie den Projektordner.
2. Starten Sie die Datei `index.html` in einem modernen Browser (Chrome, Firefox, Edge, Safari).
3. Ein lokaler Webserver ist nicht erforderlich.

## 3. Oberfläche

Die Anwendung ist in drei Hauptbereiche gegliedert:

1. **Kopfbereich:** Titel, Eingabeformular für neue Links und Aktionsbuttons (Export, Import, Sortieren, Hilfe).
2. **Suchleiste:** Ein Echtzeit-Suchfeld zum Filtern der Kacheln.
3. **Kachel-Bereich:** Hier werden Ihre Favoriten, gruppiert nach Kategorien, angezeigt.
4. **Fußzeile:** Zeigt die Versionsnummer und das Copyright.

## 4. Favoriten verwalten

### Hinzufügen

Geben Sie im oberen Formular **Name**, **URL** und **Kategorie** ein.

* **URL:** Das Protokoll (`https://`) wird automatisch ergänzt, falls es fehlt. Auch spezielle Protokolle (z. B. `obsidian://`) werden unterstützt.
* **Kategorie:** Geben Sie einen neuen Namen ein oder wählen Sie einen Vorschlag aus der Liste.
* Klicken Sie auf **Hinzufügen**.

> **Tipp:** Wenn Sie nur eine Kategorie eingeben und Name/URL leer lassen, wird eine leere Kategorie zur Strukturierung erstellt.

### Bearbeiten & Löschen

Jede Kachel verfügt über eine Aktionsleiste am unteren Rand:

* **✏️ (Bearbeiten):** Öffnet einen Dialog, um Titel, URL oder Kategorie zu ändern.
* **🏷️ (Kategorie ändern):** Öffnet ein Menü, um den Link schnell in eine andere Kategorie zu verschieben.
* **🗑 (Löschen):** Entfernt den Link nach einer Sicherheitsabfrage.
* **↔️ (Verschieben):** Ziehen Sie dieses Symbol per Drag & Drop, um die Reihenfolge der Kacheln *innerhalb* einer Kategorie zu ändern.

### Suchen

Nutzen Sie das Suchfeld, um nach Titel, URL oder Kategorie zu filtern. Die Anzeige aktualisiert sich sofort während der Eingabe. Leere Kategorien werden während der Suche ausgeblendet.

## 5. Kategorien

* **Am häufigsten besucht:** Diese Kategorie wird automatisch generiert und zeigt die bis zu 5 Links mit den meisten Klicks an. Sie kann nicht manuell bearbeitet oder gelöscht werden.
* **Manuelle Kategorien:** Sie können Kategorien beliebig benennen.
* **Kategorien sortieren:** Klicken Sie auf den Button **Kategorien sortieren**, um die Reihenfolge der Kategorien per Drag & Drop oder Pfeiltasten anzupassen.
* **Löschen:** Eine leere Kategorie kann über das Mülleimer-Symbol (🗑) im Kategorie-Kopf gelöscht werden. Solange Links enthalten sind, ist dieser Button deaktiviert.

## 6. Datensicherheit & Privatsphäre

### Lokale Favicons

Im Gegensatz zu vielen anderen Tools werden die kleinen Icons der Websites nicht über externe Dienste (wie Google) bezogen.

* Die Anwendung versucht, das Icon direkt von der Zielwebsite (`domain.de/favicon.ico`) zu laden.
* Falls dies nicht möglich ist, wird ein neutrales, lokal im Code enthaltenes Platzhalter-Symbol verwendet.
* **Vorteil:** Es werden keine Daten über Ihr Surfverhalten an Drittanbieter übermittelt.

### Speicherung

Alle Daten werden im `localStorage` Ihres Browsers gespeichert.

* **Speicherlimit:** Wenn der Speicher voll läuft, werden automatisch alte Besucherzähler bereinigt. Sollte dies nicht reichen, erhalten Sie eine Warnung und sollten einen Export durchführen.
* **Datenverlust vermeiden:** Die Daten sind an den aktuellen Browser gebunden. Löschen Sie den Browser-Cache, sind die Daten weg, sofern kein Export vorliegt.

### Export & Import

* **Manueller Export:** Klicken Sie auf **Export Favoriten**, um eine JSON-Sicherungsdatei herunterzuladen.
* **Automatischer Backup-Export (Neu in v0.3):** Wenn Sie die Seite schließen, während Sie Änderungen vorgenommen haben (neue Links, gelöschte Kategorien etc.), versucht der Browser automatisch, eine Backup-Datei (`favoriten-backup-YYYY-MM-DD.json`) herunterzuladen.
  * *Hinweis:* Je nach Browser-Einstellung wird diese Datei eventuell blockiert oder im Download-Ordner gespeichert, ohne dass eine Rückfrage erscheint. Prüfen Sie bei wichtigen Änderungen stets Ihren Download-Ordner.
* **Import:** Klicken Sie auf **Import Favoriten**, um eine zuvor exportierte JSON-Datei wiederherzustellen. Sie können wählen, ob die vorhandenen Daten ersetzt oder ergänzt werden sollen.

## 7. Fehlerbehebung

| Problem                            | Lösung                                                                                                                                                       |
|:---------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Icons werden nicht angezeigt**   | Die Zielwebsite bietet kein Standard-Favicon an. Es wird automatisch ein graues Platzhalter-Symbol angezeigt.                                                |
| **"Speicher ist voll" Meldung**    | Exportieren Sie sofort Ihre Daten. Löschen Sie alte, nicht mehr benötigte Links. Leeren Sie ggf. den Browser-Cache für andere Seiten.                        |
| **Links nach Browser-Update weg**  | Wurde der Browser-Cache gelöscht? Importieren Sie die letzte Backup-Datei aus Ihrem Download-Ordner.                                                         |
| **Drag & Drop funktioniert nicht** | Auf mobilen Geräten (Touchscreen) wird das native Drag & Drop oft nicht unterstützt. Nutzen Sie hier die Buttons zum Verschieben oder einen Desktop-Browser. |

## 8. Technische Hinweise

* **Kein Server:** Die Anwendung läuft vollständig clientseitig.
* **Kompatibilität:** Erfordert einen modernen Browser mit Unterstützung für ES6 JavaScript, LocalStorage und HTML5 Dialogs.
* **Sicherheit:** Beim Import werden URLs validiert. Gefährliche Protokolle (wie `javascript:`) werden blockiert.

---

*Entwickelt mit Fokus auf Datenschutz, Unabhängigkeit und lokale Datensouveränität.*
