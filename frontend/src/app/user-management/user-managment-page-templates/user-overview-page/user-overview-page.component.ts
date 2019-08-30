import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/services/auth.service';


export interface ISaveUserOutput {
  id: string;
  firstname: string;
  lastname: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmed: string;
}
@Component({
  selector: 'app-user-overview-page',
  templateUrl: './user-overview-page.component.html',
  styleUrls: ['./user-overview-page.component.css'],
})
export class UserOverviewPageComponent implements OnInit {

  @Input() user: User;
  @Output() saveChanges: EventEmitter<ISaveUserOutput> = new EventEmitter();
  public firstname = new FormControl(null, []);
  public lastname = new FormControl(null, []);
  public oldPassword = new FormControl(null, [Validators.required]);
  public newPassword = new FormControl(null, [Validators.required]);
  public newPasswordConfirmed = new FormControl(null, [Validators.required]);
  public nameGroup: FormGroup;
  public changePasswordGroup: FormGroup;

  private unSaveData = false;

  constructor(
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initFormGorups();
  }

  private initFormGorups() {
    this.firstname.setValue(this.user.firstname);
    this.lastname.setValue(this.user.lastname);
    this.nameGroup = this.formbuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
    });

    this.changePasswordGroup = this.formbuilder.group({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      newPasswordConfirmed: this.newPasswordConfirmed,
    });

  }

  public getDisabledState() {
    if (
      this.changePasswordGroup.value.oldPassword ||
      this.changePasswordGroup.value.newPassword ||
      this.changePasswordGroup.value.newPasswordConfirmed
    ) {
      return !(this.changePasswordGroup.valid && this.changePasswordGroup.value.newPassword === this.changePasswordGroup.value.newPasswordConfirmed);
    } else {
      return !this.unSaveData;

    }
  }

  public handleUnsavedata() {
    this.unSaveData = true;
  }

  public updateUser() {
    const output: ISaveUserOutput = {
      id: this.user.id,
      firstname: this.nameGroup.value.firstname,
      lastname: this.nameGroup.value.lastname,
      oldPassword: this.changePasswordGroup.value.oldPassword,
      newPassword: this.changePasswordGroup.value.newPassword,
      newPasswordConfirmed: this.changePasswordGroup.value.newPasswordConfirmed,
    };

    this.saveChanges.emit(output);
  }

}
