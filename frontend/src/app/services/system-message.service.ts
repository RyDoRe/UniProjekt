import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SystemMessageService {

  constructor(
    private toastController: ToastController,
  ) { }


  public showSystemMessage(message: string) {
    this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: message,
      showCloseButton: false,
    }).then(toast => {
      toast.present();
    });
  }
}
