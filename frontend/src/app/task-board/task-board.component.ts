import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskBoardSliderPage, TaskItem, TaskBoardTemplate } from './task-board';
import { IonSlides, ActionSheetController, ModalController } from '@ionic/angular';
import { ActionSheetButton, OverlayEventDetail } from '@ionic/core';
import { v4 as uuid } from 'uuid';
import { BoardService } from '../services/board.service';
import { take } from 'rxjs/operators';
import { SystemMessageService } from '../services/system-message.service';
import { User } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {

  @ViewChild('taskPageSlider', { static: false }) taskPageSlider: IonSlides;
  public disablePrevBtn = true;
  public disableNextBtn = false;
  public boardTemplate: TaskBoardTemplate;
  public availableBoardTemplates: TaskBoardTemplate[] = [];
  public users: User[] = [];
  private currentPageIndex = 0;
  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private boardService: BoardService,
    private systemMessageService: SystemMessageService,
    private userService: UserService,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.userService.getUserList().pipe(take(1)).subscribe(users => {
      this.users = users;
      this.getTaskBoardTemplates();
    });
  }

  private getTaskBoardTemplates() {
    this.boardService.getAllBoards().pipe(take(1)).subscribe(boards => {
      this.availableBoardTemplates = boards;
      if (this.availableBoardTemplates.length > 0) {
        this.getFullBoard(this.availableBoardTemplates[0]);
      }
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

  public changeToBoard(board) {
    this.getFullBoard(board);
  }

  private getAllTask(changePage?: boolean) {
    this.taskService.getAllTasks(this.boardTemplate.id).pipe(take(1)).subscribe(tasks => {
      tasks.forEach(task => {
        task.assignUser = this.users.find(user => user.id === task.userId);
      });
      this.boardTemplate.taskItems = tasks;
      if (changePage) {
        this.jumpToPage(0);
      }
    });
  }

  private getFullBoard(board: TaskBoardTemplate) {
    this.boardService.getFullBoard(board).pipe(take(1)).subscribe(fullBoard => {
      this.boardTemplate = fullBoard;
      this.getAllTask(true);
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }



  public async hanldeTaskAction(addTask: boolean, task?: TaskItem) {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: TaskModalComponent,
        componentProps: {
          users: this.users,
          task,
        },
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        if (addTask) {
          this.createTask(detail.data);
        } else {
          this.editTask(detail.data);
        }
        // this.boardTemplate.pages[0].taskItems.push(task);
      }
    });
    await modal.present();
  }

  private createTask(task: TaskItem) {
    task.boardId = this.boardTemplate.id;
    task.pageId = this.boardTemplate.pages[0].id;
    this.taskService.createTask(task).pipe(take(1)).subscribe(task => {
      this.getAllTask();
    });
  }
  private editTask(task: TaskItem) {
    this.taskService.updateTask(task).pipe(take(1)).subscribe(task => {
      this.getAllTask();
    });
  }

  public removeTask(task: TaskItem) {
    this.taskService.deleteTask(task).pipe(take(1)).subscribe(task => {
      this.getAllTask();
    });
  }

  public handleSliderPageChange(event: CustomEvent) {
    this.taskPageSlider.getActiveIndex().then(index => {
      this.currentPageIndex = index;
      this.getDisbaleStateOfNavigationBtn();
    });

  }

  public switchToPage(next: boolean) {
    this.jumpToPage((next) ? this.currentPageIndex + 1 : this.currentPageIndex - 1);
  }

  private getDisbaleStateOfNavigationBtn() {
    this.disableNextBtn = this.currentPageIndex === this.boardTemplate.pages.length - 1;
    this.disablePrevBtn = this.currentPageIndex === 0;
  }

  private jumpToPage(index: number) {
    this.currentPageIndex = index;
    if (this.taskPageSlider) {
      this.taskPageSlider.slideTo(this.currentPageIndex);
      this.getDisbaleStateOfNavigationBtn();
    }


  }

  public async openActionSheet() {
    const buttons: ActionSheetButton[] = [];
    this.boardTemplate.pages.forEach((page, index) => {
      const button: ActionSheetButton = {
        text: page.name,
        handler: () => {
          this.jumpToPage(index);
        },
      };

      buttons.push(button);
    });
    const actionSheet = await this.actionSheetController.create({
      header: 'Pages',
      mode: 'md',
      buttons,
    });
    await actionSheet.present();
  }

  public changeState(task: TaskItem) {
    this.taskService.updateTask(task).pipe(take(1)).subscribe(task => {
      this.getAllTask();
    });
  }

  public getTasksOfPage(pageId: string) {
    if (this.boardTemplate.taskItems) {
      return this.boardTemplate.taskItems.filter(task => task.pageId === pageId);
    }
    return [];
  }

}
