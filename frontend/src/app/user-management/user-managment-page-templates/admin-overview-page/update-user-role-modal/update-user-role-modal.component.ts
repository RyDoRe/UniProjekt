import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-user-role-modal',
  templateUrl: './update-user-role-modal.component.html',
  styleUrls: ['./update-user-role-modal.component.scss'],
})
export class UpdateUserRoleModalComponent implements OnInit {

  public userRoles: string[] = [];
  public user: User;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.user = this.navParams.get('user');
    this.userRoles = this.navParams.get('userRoles');
  }

  dismiss(register: boolean) {
    if (!register) {
      this.modalController.dismiss(register);
    }
    this.modalController.dismiss(this.user);
  }

}
