import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-board-modal',
  templateUrl: './add-board-modal.component.html',
  styleUrls: ['./add-board-modal.component.scss'],
})
export class AddBoardModalComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  boardNameGroup: FormGroup;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.boardNameGroup = formBuilder.group({
      name: this.name,
    });
  }

  ngOnInit() {
  }

  dismiss(register: boolean) {
    if (!register) {
      this.modalController.dismiss(register);
    }
    if (!this.boardNameGroup.valid) {
      return;
    }
    this.modalController.dismiss(this.boardNameGroup.value.name);
  }

}
