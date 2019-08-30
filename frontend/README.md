# TaskMan-

Frontend TaskMan-

Um das Frontend zu starten müssen folgende Schritte beachtet werden:
Vorraussetzung ist, dass java jdk 8 vorhanden ist und die aktuelle version von gradle


1. node.js muss intstalliert sein.
	Unter https://nodejs.org/en/download/ ist node.js zu finden
	
2 Über die cmd "npm install -g ionic" eingeben/ausführen 

3 Über die cmd "npm install -g cordova" eingeben/ausführen 

4. mit cmd(admin ausführen) in den frontendordner des projekts wechseln und "npm install" eingeben/ausführen

5. "npm run run:serve" über die cmd aufführen für ein lokales dev build oder "npm run run:android:release" über die cmd ausführen um eine apk zu bauen 


Hierbei ist zu beachten, dass im frontendprojekt unter src/assets die "config.json" auf die ip-Adresse des backendservers angepasst werden muss.
Da der Backend Server in der momentanen Konstellation unter localhost:8080 startet muss die ip momentan in jedem loKalen netzwerk anders gesetzt sein.

Für den build des Frontends als apk ist darauf zu achten, dass unter frontend\platforms\android\app\src\main die android version so eingestellt ist, dass das gerät, auf dem man es installiert damit arbeiten kann

