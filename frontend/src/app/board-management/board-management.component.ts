import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SystemMessageService } from '../services/system-message.service';
import { AddBoardModalComponent } from './add-board-modal/add-board-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { take } from 'rxjs/operators';
import { BoardService } from '../services/board.service';
import { TaskBoardTemplate } from '../task-board/task-board';
import { EditBoardModalComponent } from './edit-board-modal/edit-board-modal.component';

@Component({
  selector: 'app-board-management',
  templateUrl: './board-management.component.html',
  styleUrls: ['./board-management.component.scss'],
})
export class BoardManagementComponent implements OnInit {

  public boardTemplates: TaskBoardTemplate[] = [];
  constructor(
    public modalController: ModalController,
    private systemMessageService: SystemMessageService,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.getAllBaords();
  }

  private getAllBaords() {
    this.boardService.getAllBoards().pipe(take(1)).subscribe(boards => {
      this.boardTemplates = boards;
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

  public async addNewBoard() {
    const addBoardModal: HTMLIonModalElement =
      await this.modalController.create({
        component: AddBoardModalComponent,
        cssClass: 'add-board-modal',
      });

    addBoardModal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        this.boardService.createBoard(detail.data).pipe(take(1)).subscribe(board => {
          this.getAllBaords();
        }, err => {
          console.error(err);
          if (err.status === 418 || err.status === 400) {
            this.systemMessageService.showSystemMessage(err.statusText);
          }
        });
      }
    });
    await addBoardModal.present();
  }


  public async editBoard(boardTemplate: TaskBoardTemplate) {
    this.boardService.getFullBoard(boardTemplate).pipe(take(1)).subscribe(async fullboard => {
      const addBoardModal: HTMLIonModalElement =
        await this.modalController.create({
          component: EditBoardModalComponent,
          componentProps: {
            boardTemplate: boardTemplate,
          },
        });

      addBoardModal.onDidDismiss().then((detail: OverlayEventDetail) => {
        if (detail.data) {
          this.boardService.updateBoard(detail.data).pipe(take(1)).subscribe(board => {
            this.systemMessageService.showSystemMessage(`Änderungen für ${detail.data.name} wurden gespeichert!`);
          }, err => {
            console.error(err);
            if (err.status === 418 || err.status === 400) {
              this.systemMessageService.showSystemMessage(err.statusText);
            }
          });
        }
      });
      await addBoardModal.present();
    });

  }

  public removeBoard(boardTemplate: TaskBoardTemplate) {
    this.boardService.deleteBoard(boardTemplate).pipe(take(1)).subscribe(board => {
      this.systemMessageService.showSystemMessage(`Projekt ${boardTemplate.name} wurde gelöscht!`);
      this.getAllBaords();

    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }
}


