# TaskMan - 

Backend Taskman


Bis dato ist es uns leider nicht gelungen das Backend in eine funktionierende Jar zu packen.

Es läuft jedoch als importiertes Maven Projekt

Weitere vorraussetzung ist eine Mysql Datenbank die z.B. via Xampp und dem port 3306 gestartet wird. Unter phpmyadmin
kann dann die sql Datei importiert werden.

Die Main Klasse, die zum Start des Backends als Java Applikation gestartet werden muss ist die App, 
die sich im Ordner JettyServer befindet.

Die App startet einen eingebetteten JettyServer auf dem localhost mit dem Port 8080

Ist das Backend gestartet kann das Frontend mit ihm über die definierten Rest-Schnittstellen kommunizieren.


