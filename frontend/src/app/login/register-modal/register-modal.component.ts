import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

export interface IRegisterOutput {
  username: string;
  userPassword: string;
  userPasswordConfirmed: string;
}
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  passwordConfirmed = new FormControl('', []);
  registerUserGroup: FormGroup;

  constructor(
    private modalController: ModalController,
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerUserGroup = this.formbuilder.group({
      username: this.username,
      password: this.password,
      passwordConfirmed: this.passwordConfirmed,
    });
  }

  public getValidState() {
    return !(this.registerUserGroup.valid && this.registerUserGroup.value.password === this.registerUserGroup.value.passwordConfirmed);
  }


  dismiss(register: boolean) {
    if (!register) {
      this.modalController.dismiss(register);
    }
    if (this.getValidState()) {
      return;
    }
    this.modalController.dismiss(this.getOutput());
  }

  private getOutput(): IRegisterOutput {
    return {
      username: this.registerUserGroup.value.username,
      userPassword: this.registerUserGroup.value.password,
      userPasswordConfirmed: this.registerUserGroup.value.passwordConfirmed,
    };
  }


}
