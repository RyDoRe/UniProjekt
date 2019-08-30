import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { User } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ISaveUserOutput } from '../user-management/user-managment-page-templates/user-overview-page/user-overview-page.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;
  private baseUrl;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.getKey('restApi').pipe(take(1)).subscribe(url => {
      this.baseUrl = url;
    });
  }

  public setUser(user: User) {
    this.user = user;
  }
  public getUser(): User {
    return this.user;
  }

  public updateUser(newUserData: ISaveUserOutput): Observable<any> {
    return this.http.post(this.baseUrl + `user/updateUser`, newUserData).pipe(map(users => {
      return users;
    }));
  }

  public updateUsersRoles(users: User[]): Observable<any> {
    return this.http.post(this.baseUrl + `user/updateUserRole`, users).pipe(map(users => {
      return users;
    }));
  }

  public getUserList(userId?: string): Observable<User[]> {
    const restUrl = (userId) ? `user/getAllUsers/${userId}` : `user/getAllUsers`;
    return this.http.get(this.baseUrl + restUrl).pipe(map((usersData: any) => {
      const users: User[] = [];
      for (let userData of usersData) {
        users.push(new User(userData.id, userData.username, userData.userRole));
      }
      return users;
    }));
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(this.baseUrl + `user/deleteUser/${userId}`).pipe(map((data: any) => {
      return data;
    }));
  }

  public getUserRoles(): Observable<string[]> {
    return this.http.get(this.baseUrl + 'user/getRoles').pipe(map((roles: any[]) => {
      return roles;
    }));
  }

}
