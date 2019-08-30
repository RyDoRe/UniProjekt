import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardManagementComponent } from './board-management.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskListModule } from '../task-board/task-list/task-list.module';
import { AddBoardModalComponent } from './add-board-modal/add-board-modal.component';
import { EditBoardModalComponent } from './edit-board-modal/edit-board-modal.component';

const routes: Routes = [
  {
    path: '',
    component: BoardManagementComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TaskListModule,
  ],
  declarations: [
    BoardManagementComponent,
    AddBoardModalComponent,
    EditBoardModalComponent,
  ],
  entryComponents: [
    AddBoardModalComponent,
    EditBoardModalComponent,
  ],
})
export class BoardManagementModule { }
