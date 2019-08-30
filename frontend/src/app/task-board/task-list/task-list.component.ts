import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskBoardSliderPage, TaskItem } from '../task-board';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  @Input() taskItems: TaskItem[] = [];
  @Input() pages: TaskBoardSliderPage[] = [];
  @Input() currentPage: TaskBoardSliderPage;
  @Input() enableActions: boolean = true;
  @Output() removeTask: EventEmitter<TaskItem> = new EventEmitter();
  @Output() editTask: EventEmitter<TaskItem> = new EventEmitter();
  @Output() changeTaskState: EventEmitter<TaskItem> = new EventEmitter();

  private toChangeTask: TaskItem;
  constructor() { }

  ngOnInit() {
  }

  public setToChangeTask(task: TaskItem) {
    this.toChangeTask = task;
    this.pages = this.pages.filter(page => page.id !== this.currentPage.id);
  }

  public changeState(page: TaskBoardSliderPage) {
    if (!this.toChangeTask) {
      return;
    }
    this.toChangeTask.pageId = page.id;
    this.changeTaskState.emit(this.toChangeTask);
  }

}
