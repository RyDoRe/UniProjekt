import { Component, OnInit } from '@angular/core';
import { TaskBoardSliderPage } from '../task-board/task-board';
import { PageService } from '../services/page.service';
import { SystemMessageService } from '../services/system-message.service';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { OverlayEventDetail } from '@ionic/core';
import { PageManagementModalComponent } from './page-management-modal/page-management-modal.component';

@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss'],
})
export class PageManagementComponent implements OnInit {

  public pages: TaskBoardSliderPage[] = [];
  constructor(
    private pageService: PageService,
    private systemMessageService: SystemMessageService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getAllPages();
  }

  private getAllPages() {
    this.pageService.getAllPages().pipe(take(1)).subscribe(pages => {
      this.pages = pages;
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

  public async handlePageAction(addPage: boolean, page?: TaskBoardSliderPage) {
    const addBoardModal: HTMLIonModalElement =
      await this.modalController.create({
        component: PageManagementModalComponent,
        cssClass: 'page-management-modal',
        componentProps: {
          page,
          addPage,
        },
      });

    addBoardModal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        if (addPage) {
          this.addPage(detail.data);
        } else {
          this.editPage(detail.data);
        }
      }
    });
    await addBoardModal.present();
  }

  private editPage(page: TaskBoardSliderPage) {
    this.pageService.updatePage(page).pipe(take(1)).subscribe(board => {
      this.getAllPages();
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

  private addPage(page: TaskBoardSliderPage) {
    this.pageService.createPage(page).pipe(take(1)).subscribe(board => {
      this.getAllPages();
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

  public removePage(page: TaskBoardSliderPage) {
    this.pageService.deletePage(page).pipe(take(1)).subscribe(board => {
      this.systemMessageService.showSystemMessage(`Projekt-Seite ${page.name} wurde gelöscht!`);
      this.getAllPages();
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }

}
