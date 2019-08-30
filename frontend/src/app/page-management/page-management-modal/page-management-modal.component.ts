import { Component, OnInit } from '@angular/core';
import { TaskBoardSliderPage } from 'src/app/task-board/task-board';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-page-management-modal',
  templateUrl: './page-management-modal.component.html',
  styleUrls: ['./page-management-modal.component.scss'],
})
export class PageManagementModalComponent implements OnInit {

  public page: TaskBoardSliderPage;
  public addPage: boolean = true;
  public name = new FormControl(null, [Validators.required]);
  public state = new FormControl(null, [Validators.required]);
  public pageNameGroup: FormGroup;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
  ) {
    this.pageNameGroup = this.formBuilder.group({
      name: this.name,
      state: this.state,
    });
  }

  ngOnInit() {
    this.page = this.navParams.get('page');
    this.addPage = this.navParams.get('addPage');
    if (this.page) {
      this.name.setValue(this.page.name);
      this.state.setValue(this.page.state);
    }
  }

  dismiss(register: boolean) {
    if (!register) {
      this.modalController.dismiss(register);
    }
    if (!this.pageNameGroup.valid) {
      return;
    }

    if (this.addPage) {
      this.page = {
        id: uuid(),
        name: this.pageNameGroup.value.name,
        state: this.pageNameGroup.value.state,
        isDefault: false,
      };
    } else {
      this.page.name = this.pageNameGroup.value.name;
      this.page.state = this.pageNameGroup.value.state;
    }
      this.modalController.dismiss(this.page);
    }

}

