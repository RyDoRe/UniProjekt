import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TaskItem } from '../task-board';
import { v4 as uuid } from 'uuid';

export interface INewTaskOutput {
  taskName: string;
  taskDescription: string;
  taskOperator: User;
  startDate: Date;
  endDate: Date;
}
@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {

  public users: User[] = [];
  public task: TaskItem;
  public taskName = new FormControl(null, [Validators.required]);
  public taskDescription = new FormControl('', []);
  public taskOperator = new FormControl(null, [Validators.required]);
  public startDate = new FormControl(new Date(), [Validators.required]);
  public endDate = new FormControl(new Date(), [Validators.required]);
  public nameGroup: FormGroup;
  public dateGroup: FormGroup;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formbuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.getInputParams();
    this.initFormGorups();
    this.fillForm();
  }

  private initFormGorups() {
    this.nameGroup = this.formbuilder.group({
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskOperator: this.taskOperator,
    });
    this.dateGroup = this.formbuilder.group({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  private fillForm() {
    if (this.task) {
      this.taskName.setValue(this.task.name);
      this.taskDescription.setValue(this.task.description);
      this.taskOperator.setValue(this.task.assignUser);
      this.startDate.setValue(new Date(this.task.startDate));
      this.endDate.setValue(new Date(this.task.endDate));
    }
  }

  private getInputParams() {
    this.users = this.navParams.get('users');
    this.task = this.navParams.get('task');
  }

  dismissOverCancel() {
    this.modalController.dismiss();
  }

  dismiss() {
    if (!this.nameGroup.valid || !this.dateGroup.valid) {
      return;
    }
    this.getTask();
    this.modalController.dismiss(this.task);
  }

  private getTask() {
    if (this.task) {
      this.task.name = this.nameGroup.value.taskName;
      this.task.description = this.nameGroup.value.taskDescription;
      this.task.assignUser = this.nameGroup.value.taskOperator;
      this.task.userId = this.nameGroup.value.taskOperator.id;
      this.task.startDate = this.dateGroup.value.startDate.getTime();
      this.task.endDate = this.dateGroup.value.endDate.getTime();
    } else {

      this.task = {
        id: uuid(),
        name: this.nameGroup.value.taskName,
        description: this.nameGroup.value.taskDescription,
        assignUser: this.nameGroup.value.taskOperator,
        userId: this.nameGroup.value.taskOperator.id,
        startDate: this.dateGroup.value.startDate.getTime(),
        endDate: this.dateGroup.value.endDate.getTime(),
      };

    }
  }

}
