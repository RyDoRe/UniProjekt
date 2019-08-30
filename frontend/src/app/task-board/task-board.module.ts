import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoardComponent } from './task-board.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../core/material/material.module';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskListModule } from './task-list/task-list.module';

const routes: Routes = [
  {
    path: '',
    component: TaskBoardComponent,
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
  entryComponents: [
    TaskModalComponent,
  ],
  declarations: [
    TaskModalComponent,
    TaskBoardComponent,
  ],
})
export class TaskBoardModule { }
