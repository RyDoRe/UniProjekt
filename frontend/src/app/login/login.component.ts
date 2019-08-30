import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ActionSheetOptions, OverlayEventDetail } from '@ionic/core';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { TaskItem } from '../task-board/task-board';
import { take } from 'rxjs/operators';
import { SystemMessageService } from '../services/system-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public logoPath = './assets/icon/24px.svg';
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loginGroup: FormGroup;


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public modalController: ModalController,
    private systemMessageService: SystemMessageService,
  ) {
    this.loginGroup = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginGroup.valid) {
      this.authService.signIn(this.loginGroup.value.username, this.loginGroup.value.password).pipe(take(1)).subscribe(data => {
      }, err => {
        console.error(err);
          if (err.status === 418 || err.status === 400) {
            this.systemMessageService.showSystemMessage(err.statusText);
          }
      });
    }
  }

  public async registerUser() {
    const registerModal: HTMLIonModalElement =
      await this.modalController.create({
        component: RegisterModalComponent,
        cssClass: 'register-user-modal',
      });

    registerModal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        this.authService.register(detail.data).pipe(take(1)).subscribe(data => {
          if (!data) {
            this.registerUser();
          }
        }, err => {
          console.error(err);
          if (err.status === 418 || err.status === 400) {
            this.systemMessageService.showSystemMessage(err.statusText);
            this.registerUser();
          }
        });
      }
    });
    await registerModal.present();
  }

}
