# Camp Dictionary

## Idee
Erstellung eines Online-Bilder-Wörterbuch mit den wichtigsten Ausdrücken, die man im Cevi so braucht, aber meistens in Fremdsprachen nicht direk im Kopf hat.

## Aktueller Stand des Projektes
Unter https://dict.programmplaner.ch/ kann ein Prototyp getestet werden, welcher eine Basis für die weitere Arbeit zeigen soll.
Das Ziel des Tests soll sein, den Umfang und die Funktionalität zu ermitteln. Dazu dienen die Stichworte unten.

Ebenfalls habe ich einen einen OBF (resp. unzipped OBZ) reader geschrieben. Dieser kann "Sprachbretter" anzeigen, wie sie zum Beispiel mit Leuten mit Sprachbehinderung eingesetzt werden.
Bei Interesse zu diesem Thema: https://www.openaac.org/


## Testing
### Inhalte
1. Welcher Wortschatz ist wichtig? Wie gross soll der Umfang sein an:
a. "Fachbegriffe", schwer übersetzbar, Vereinsbezogen, lokal
b. "Ungebgräuchliches Voc", meistens in Wörterbuch
c. "Basis Voc", meistgebrauchte Wörter allgemein 

2. Nutzen von Länderseiten / Verbandsseiten
3. Wie diskutieren wir schwer übersetzbare Wörter 

### Design
4. Einfache Handhabung möglich? 
5. Vergleiche Normale Version / AAC-Board
6. Sind Bilder hilfreich? Oder lieber mehr Platz für Wörter?

### Technisches / Strukturelles
7. Wie bilden wir die völlig unterschiedlichen Strukturen ab? (Gruppen, Stufen, etc.)
8. Gross / Kleinschreibung so ok, oder Änderungen an welchen Stellen?

### Weiterentwicklung
9. Ideen zu Verlinkungen zu Themen / Wörterbücher?
10. Quelle für weiter Bilder

## Weiterentwicklung

Wörterliste: https://docs.google.com/spreadsheets/d/16alnROkJ__37BM4sKzlyJ7LYCvwgjr0U1rA0T6OtybA/edit?usp=sharing
Github: https://github.com/hochreutenerl/camp-dictionary

(Aktuell sind einige "externe" Dateien ignored, melde dich bei mir, wenn du das Projekt selbst builden lassen möchtest) 

### Technischer Hintergrund
Vue-App, der Build benötigt lediglich einen HTTP-Server. Der Build (inkl. PWA) läuft komplett im Browser.
Damit die Übersetzungen vom Google Sheet in die App kommen, kann das loadTranslations Script ausgeführt werden.
Für die Anzeige muss der neue Begriff aber noch in der Datei index.js an ein Thema gekoppelt werden.


## Image sources
* Pictorgrams from Sergio Palao: http://www.arasaac.org/
* https://www.pngwing.com/
* The noun project:
  * https://thenounproject.com/darrin.higgins/collection/knots/
  * https://thenounproject.com/iconmu/collection/climbing-gear/
  * https://thenounproject.com/search/?q=coordinates&i=1271417
  * https://thenounproject.com/search/?q=antenna&i=2987572
  * https://thenounproject.com/search/?q=power%20line&i=2453814
  * https://thenounproject.com/search/?q=scale%20map&i=577605
* Wikipedia:
  * https://commons.wikimedia.org/wiki/File:Prusik.jpg
  * https://commons.wikimedia.org/wiki/File:Lashing_square.jpg
  * https://commons.wikimedia.org/wiki/File:Winter_activities_on_ice.jpg
  * https://de.wikipedia.org/wiki/Datei:Lashing_diagonal.jpg
* CH: Cevi (Webpage / Haik / Wiki)
* FI: Partio (Webpage / partio-ohjelma)
