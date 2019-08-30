import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService, User } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public user: User;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Projekte',
      url: '/task-board',
      icon: 'view_carousel',
    },
    {
      title: 'Projektverwaltung',
      url: '/board-management',
      icon: 'library_books',
      adminNeeded: true,
    },
    {
      title: 'Projekt-Seiten-Verwaltung',
      url: '/page-management',
      icon: 'layers',
      adminNeeded: true,
    },
    {
      title: 'Nutzerverwaltung',
      url: '/user-managment',
      icon: 'supervised_user_circle',
    },
    {
      title: 'Abmelden',
      icon: 'power_settings_new',
      logout: true,
    },
  ];

  constructor(
    private platform: Platform,
    private authServie: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.authServie.getLoginState().subscribe(loginState => {
      this.handleLoginState(loginState);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

    });
  }

  private handleLoginState(loginState) {
    if (!loginState) {
      this.router.navigate(['./login'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      // TODO hack
      this.userService.setUser(this.authServie.mapUser(JSON.parse(localStorage.getItem('user'))));
      this.user = this.userService.getUser();
      this.router.navigate(['./home'], { relativeTo: this.activatedRoute, skipLocationChange: true });


    }
  }
  public logout(logout: boolean) {
    if (!logout) {
      return;
    }
    this.authServie.signOut();
  }
}
