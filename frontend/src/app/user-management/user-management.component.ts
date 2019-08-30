import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, AuthService } from '../services/auth.service';
import { UserManagementPage, EUserManagementPageTypes } from './user-management';
import { IonSlides } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ISaveUserOutput } from './user-managment-page-templates/user-overview-page/user-overview-page.component';
import { SystemMessageService } from '../services/system-message.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild("userManagementPageSlider", { static: false }) userManagementPageSlider: IonSlides;
  public currentPage: UserManagementPage;
  public userManagementPages: UserManagementPage[] = [];
  public user: User;
  public userList: User[] = [];
  public userRolesList: string[] = [];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private systemMessageService: SystemMessageService,
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userService.getUserRoles().pipe(take(1)).subscribe(userRoles => {
      this.userRolesList = userRoles;
    });
    this.getPages();
  }

  private getUsersList() {
    this.userService.getUserList(this.user.id).pipe(take(1)).subscribe(users => {
      this.userList = users.slice();
    });
  }

  private getPages() {
    const userPage: UserManagementPage = {
      id: 'user-page',
      index: 0,
      type: EUserManagementPageTypes.USER,
    };
    const adminPage: UserManagementPage = {
      id: 'admin-page',
      index: 1,
      type: EUserManagementPageTypes.ADMIN,
    };

    this.userManagementPages.push(userPage);
    if (this.user.userRole === 'ADMIN') {
      this.userManagementPages.push(adminPage);
    }
    this.currentPage = this.userManagementPages[0];
  }

  public handleSliderPageChange(event: CustomEvent) {

    this.userManagementPageSlider.getActiveIndex().then(index => {
      if (this.userManagementPages[index] != this.currentPage) {
        this.currentPage = this.userManagementPages[index];
        this.jumpToCurrentPage();
      }
    });
  }

  public changePage(pageId: string) {

    this.currentPage = this.userManagementPages.find(page => page.id === pageId);
    this.jumpToCurrentPage();
  }

  public updateUser(newUserData: ISaveUserOutput) {
    this.userService.updateUser(newUserData).pipe(take(1)).subscribe(userData => {
      const updateUser = this.authService.mapUser(userData);
      this.userService.setUser(updateUser);
      localStorage.setItem('user', JSON.stringify(updateUser));
    });
  }

  private jumpToCurrentPage() {
    this.userManagementPageSlider.slideTo(this.currentPage.index);
    if (this.currentPage.id === 'admin-page') {
      this.userService.getUserList(this.user.id).pipe(take(1)).subscribe(users => {
        this.getUsersList();
      }, err => {
        console.error(err);
        if (err.status === 418 || err.status === 400) {
          this.systemMessageService.showSystemMessage(err.statusText);
        }
      });
    }
  }

  public handleRemoveUser(user: User) {
    this.userService.deleteUser(user.id).pipe(take(1)).subscribe(data => {
      this.systemMessageService.showSystemMessage(`${user.username} würde gelöscht`);
      this.getUsersList();
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

  public handleResetUserPassword(user: User) {
    // console.log(user);
  }
  public handleSaveUserChanges(users: User[]) {
    this.userService.updateUsersRoles(users).pipe(take(1)).subscribe(users => {
      this.getUsersList();
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }


}
