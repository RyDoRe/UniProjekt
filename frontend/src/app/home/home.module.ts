import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { MaterialModule } from '../core/material/material.module';
import { TaskListModule } from '../task-board/task-list/task-list.module';

const routes: Routes = [{
  path: '',
  component: HomePage,
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    TaskListModule,
    RouterModule.forChild(routes),
    TaskListModule,
  ],
  declarations: [
    HomePage,
  ],
})
export class HomePageModule { }
