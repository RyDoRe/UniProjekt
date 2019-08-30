import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { TaskBoardTemplate, TaskBoardSliderPage } from 'src/app/task-board/task-board';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { PageService } from 'src/app/services/page.service';
import { SystemMessageService } from 'src/app/services/system-message.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.scss'],
})
export class EditBoardModalComponent implements OnInit {

  public boardTemplate: TaskBoardTemplate;
  public name = new FormControl(null, [Validators.required]);
  public boardNameGroup: FormGroup;
  public changeOrderOfPagesFlag = false;
  public customPages: TaskBoardSliderPage[] = [];

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private pageService: PageService,
    private systemMessageService: SystemMessageService,
  ) {
    this.boardNameGroup = this.formBuilder.group({
      name: this.name,
    });
  }

  ngOnInit() {
    this.boardTemplate = this.navParams.get('boardTemplate');
    this.name.setValue(this.boardTemplate.name);
    this.getCustomPages();
  }

  private getCustomPages() {
    this.pageService.getCustomPages(this.boardTemplate.id).pipe(take(1)).subscribe(customPages => {
      this.customPages = customPages;
    }, err => {
      console.error(err);
      if (err.status === 418 || err.status === 400) {
        this.systemMessageService.showSystemMessage(err.statusText);
      }
    });
  }


  changeOrderOfPages(event) {
    const currentPage = this.boardTemplate.pages.find(page => page.displayOrder === event.previousIndex);
    let toMovePages;
    let changeValue;
    if (event.previousIndex < event.currentIndex) {
      toMovePages = this.boardTemplate.pages.filter(page => page.displayOrder > event.previousIndex && page.displayOrder <= event.currentIndex);
      changeValue = -1;
    } else {
      toMovePages = this.boardTemplate.pages.filter(page => page.displayOrder < event.previousIndex && page.displayOrder >= event.currentIndex);
      changeValue = 1;
    }
    toMovePages.forEach(page => {
      page.displayOrder = page.displayOrder + changeValue;
    });
    currentPage.displayOrder = event.currentIndex;
    moveItemInArray(this.boardTemplate.pages, event.previousIndex, event.currentIndex);
    this.changeOrderOfPagesFlag = true;
  }

  dismiss(register: boolean) {
    if (!register) {
      this.modalController.dismiss(register);
    }
    if (!this.boardNameGroup.valid) {
      return;
    }

    this.boardTemplate.name = this.boardNameGroup.value.name;
    this.modalController.dismiss(this.boardTemplate);
  }

  getDisabledState() {
    if (this.boardTemplate.name !== this.boardNameGroup.value.name) {
      return !this.boardNameGroup.valid;
    }
    return !this.changeOrderOfPagesFlag;
  }

  public addPageToBoard(page: TaskBoardSliderPage) {
    page.displayOrder = this.boardTemplate.pages.length;
    this.customPages = this.customPages.filter(customPage => customPage.id != page.id);
    this.boardTemplate.pages.push(page);
    this.changeOrderOfPagesFlag = true;
  }

}
