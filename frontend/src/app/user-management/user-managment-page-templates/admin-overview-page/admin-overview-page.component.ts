import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';
import { UpdateUserRoleModalComponent } from './update-user-role-modal/update-user-role-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-overview-page',
  templateUrl: './admin-overview-page.component.html',
  styleUrls: ['./admin-overview-page.component.css'],
})
export class AdminOverviewPageComponent implements OnInit {

  @Input() users: User[];
  @Output() removeUser: EventEmitter<User> = new EventEmitter();
  @Output() resetUserPassword: EventEmitter<User> = new EventEmitter();
  @Output() saveUserChanges: EventEmitter<User[]> = new EventEmitter();

  public usersRoles: string[] = [];
  public unSaveData = false;
  constructor(
    private userService: UserService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.userService.getUserRoles().subscribe(userRoles => {
      this.usersRoles = userRoles;
    });
  }

  updateUsers() {
    this.saveUserChanges.emit(this.users);
  }

  changeUserRole() {
    this.unSaveData = true;
  }

  public async editUserRole(user: User) {
    const addBoardModal: HTMLIonModalElement =
      await this.modalController.create({
        component: UpdateUserRoleModalComponent,
        componentProps: {
          userRoles: this.usersRoles,
          user: user,
        },
        cssClass: 'edit-user-role-modal',
      });

    addBoardModal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        let editUser = this.users.find(searchuser => detail.data.id === searchuser.id);
        editUser.userRole = detail.data.userRole;
        // this.changeUserRole();
        this.saveUserChanges.emit([editUser]);

      }
    });
    await addBoardModal.present();
  }
}
