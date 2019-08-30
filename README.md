# TaskMan
## Beschreibung
Diese Anwenung dient dem Projektmanagement innerhalb einer Firma, oder Gruppe. Nutzer können sich anmelden und bekommen eine Übersicht über Projekte und zugeteilten Aufgaben.
Aufgaben und Projekte können erstellt und bestimmten Nutzern zugeteilt werden. Für die Authentifizierung gibt es einen Login-Bereich mit Passwort und Nutzername.

## Technologien
- Java 8
- MySQL
- Maven
- Jetty-Server
- Frameworks (Frontend):
    - Angular
    - Ionic

## Funktionen
Nach Programmstart öffnet sich der Login-Screen. Hier kann sich der Nutzer einloggen, oder sich einen Zugang anlegen.
Nach dem Login öffnet sich die Aufgaben-Übersicht des eingeloggten Users. Sollten noch keine Aufgaben angelegt sein, ist der Inhalt des Screens leer.
Neue Aufgaben können über die Menü-Navigation oben links erstellt werden, indem man ein Projekt öffnet (oder als Admin erstellt) und eine zugeordnete Aufgabe wählt und einen Nutzer zuordnet.
<p><p>
Menü-Navigation normaler User: <p> 
- Home: öffnet Aufgabenübersicht <p>
- Projekte:  öffnet ein Projekt, im Menü oben kann dort zwischen mehreren Projekten gewechselt werden <p>
- Nutzerverwaltung : hier können Nutzerdaten geändert werden<p>
- Abmelden: loggt Nutzer aus <p><p>

Ist eine neue Aufgabe erstellt, wird diese auf der ersten Seite des Projektes angezeigt.
Das Projekt kann variabel viele Pages haben. Zwischen denen beliebig navigiert werden kann.
Aufgaben können nachträglich geändert werden, können gelöscht werden und anderen Pages zugewiesen werden.

Hat der Nutzer Admin-Rechte, kommen in der Menü-Navigation noch Projektverwaltung und Projekt-Seiten-Verwaltung und in der Nutzerverwaltung noch die Adminansicht hinzu.
In der Projektverwaltung werden alle Projekte aufgelistet, können neue Projekte angelegt werden und Projekte auf den Namen, Reihenfolge geändert und neue Projektseiten hinzugefügt werden.

In der Projekt-Seiten-Verwaltung werden alle Projekt-Seiten angezeigt und es können neue Projekt-Seiten angelegt werden.
Projekt-Seiten können bearbeitet werden, Projekt-Seiten, die als Default in der Datenbank gesetzt werden (in diesem Falle TODO, In Progress und Done) können nicht gelöscht werden.

Admin-Ansicht in der Nutzerverwaltung: Hier werden alle Nutzer (außer dem eigenen) aufgelistet. Hier können Nutzer gelöscht, oder deren Rollen angepasst werden.

## Programmablauf

Backend Taskman

Vorraussetzung ist eine Mysql Datenbank die z.B. via Xampp und dem port 3306 gestartet wird. Unter phpmyadmin
kann dann die sql Datei importiert werden.

Bis dato ist es uns leider nicht gelungen das Backend in eine funktionierende Jar zu packen.

Es läuft jedoch als importiertes Maven Projekt



Die Main Klasse, die zum Start des Backends als Java Applikation gestartet werden muss ist die App, 
die sich im Ordner JettyServer befindet.

Die App startet einen eingebetteten JettyServer auf dem localhost mit dem Port 8080

Ist das Backend gestartet kann das Frontend mit ihm über die definierten Rest-Schnittstellen kommunizieren.


Frontend TaskMan-

Um das Frontend zu starten müssen folgende Schritte beachtet werden:
Vorraussetzung ist, dass java jdk 8 vorhanden ist und die aktuelle version von gradle


1. node.js muss intstalliert sein.
	Unter https://nodejs.org/en/download/ ist node.js zu finden
	
2 Über die cmd "npm install -g ionic" eingeben/ausführen 

3 Über die cmd "npm install -g cordova" eingeben/ausführen 

4. mit cmd(admin ausführen) in den frontendordner des projekts wechseln und "npm install" eingeben/ausführen

5. "npm run run:serve" über die cmd aufführen für ein lokales dev build oder "npm run run:android:release" über die cmd ausführen um eine apk zu bauen 


Hierbei ist zu beachten, dass im frontendprojekt unter src/assets die "config.json" auf die ip-Adresse 
des backendservers angepasst werden muss.
Da der Backend Server in der momentanen Konstellation unter localhost:8080 startet muss die ip 
momentan in jedem lokalen netzwerk anders gesetzt sein.

Für den build des Frontends als apk ist darauf zu achten, dass unter frontend\platforms\android\app\src\main 
die android version so eingestellt ist, dass das gerät, auf dem man es installiert damit arbeiten kann


