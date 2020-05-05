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
    1. "Fachbegriffe", schwer übersetzbar, Vereinsbezogen, lokal
    2. "Ungebgräuchliches Voc", meistens in Wörterbuch (z.B. Baum- und Artennamen)
    3. "Basis Voc", meistgebrauchte Wörter allgemein (vgl. AAC Boards)

2. Nutzen von Länderseiten / Verbandsseiten
3. Wie diskutieren wir schwer übersetzbare Wörter 

   ### Design
4. Einfache Handhabung möglich? 
5. Vergleiche Normale Version / AAC-Board (Schriftgrössen, Bildergrösse, Navigation, Farben)
6. Sind Bilder hilfreich? Oder lieber mehr Platz für Wörter?

   ### Technisches / Strukturelles
7. Wie tragen wir die völlig unterschiedlichen Strukturen, wie Gruppen, Stufen, etc. ab? (Eigene Begriffe, oder unterschiedliche "Pseudo-Sprachen")
8. Gross / Kleinschreibung so allgemein ok?

   ### Weiterentwicklung
9. Ideen zu Verlinkungen zu Themen / Wörterbücher?
10. Ideen für mehr Bilder, Begriffe, Strukturierung, etc.

## Mitarbeit

Wörterliste: https://docs.google.com/spreadsheets/d/16alnROkJ__37BM4sKzlyJ7LYCvwgjr0U1rA0T6OtybA/edit?usp=sharing
Github: https://github.com/hochreutenerl/camp-dictionary

(Aktuell sind einige "externe" Dateien, wie die Bilder nicht im Repository, melde dich bei mir, wenn du das Projekt selbst installieren möchtest) 

### Technischer Hintergrund
Vue-App, der Build benötigt lediglich einen HTTP-Server. Der Build (inkl. PWA) läuft komplett im Browser.
Damit die Übersetzungen vom Google Sheet in die App kommen, kann das loadTranslations Script ausgeführt werden.
Für die Anzeige muss der neue Begriff aber noch in der Datei index.js an ein Thema gekoppelt werden.


## Image sources
* Pictograms from Sergio Palao: http://www.arasaac.org/
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
* Papunet Kuvapankki: https://kuvapankki.papunet.net/
  * Päivi Honkonen
  * Elina Vanninen
  * Paxtoncrafts Charitable Trust
  
* CH: Cevi (Webpage / Haik / Wiki)
* FI: Partio (Webpage / partio-ohjelma)
