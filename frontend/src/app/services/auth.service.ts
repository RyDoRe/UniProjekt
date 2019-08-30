import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { switchMap, map, take } from 'rxjs/operators';
import { IRegisterOutput } from '../login/register-modal/register-modal.component';
import { SystemMessageService } from './system-message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '';
  private state = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private systemMessageService: SystemMessageService,
  ) {

    this.configService.getKey('restApi').pipe(take(1)).subscribe(url => {
      this.baseUrl = url;
      if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).accessToken) {
        this.accesTokenValid().pipe(take(1)).subscribe(user => {
        }, err => {
          console.error(err);
          if (err.status === 418 || err.status === 400) {
            this.systemMessageService.showSystemMessage(err.statusText);
          }
        });
      }
    });


  }

  public signIn(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      userPassword: password,
    };

    return this.http.post(this.baseUrl + 'user/loginUser', body).pipe(map(user => {
      this.storeUser(this.mapUser(user));
      return user;
    }));
  }

  public register(registerUser: IRegisterOutput): Observable<any> {
    return this.http.post(this.baseUrl + 'user/registerUser', registerUser).pipe(map(data => {
      return data;
    }));
  }

  public mapUser(userData: any): User {
    const user = new User(userData.id, userData.username, userData.userRole, userData.accessToken);
    user.firstname = userData.firstname;
    user.lastname = userData.lastname;
    return user;
  }

  public async storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.setState(true);
  }

  public accesTokenValid(): Observable<any> {
    if (JSON.parse(localStorage.getItem('user'))) {
      const user = JSON.parse(localStorage.getItem('user'));
      return this.http.post(this.baseUrl + 'user/validateUser', user).pipe(map(userData => {
        if (userData) {
          this.storeUser(this.mapUser(userData));
        } else {
          this.signOut();
        }
      }));
    }
  }



  private setState(state: boolean): void {
    this.state.next(state);
  }

  public getLoginState(): Observable<boolean> {
    return this.state.asObservable();
  }

  public signOut() {
    this.removeUser();
    this.setState(false);
  }

  public removeUser() {
    localStorage.removeItem('user');

  }
}

export class User {
  public firstname: string = null;
  public lastname: string = null;
  public id: string;
  public username: string;
  public accessToken: string;
  public userRole: string;

  constructor(userId: string, username: string, userRole: string, accessToken?: string) {
    this.userRole = userRole;
    this.accessToken = accessToken;
    this.id = userId;
    this.username = username;
  }
}
