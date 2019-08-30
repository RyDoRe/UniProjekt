import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    TaskListComponent,
  ],
  exports: [
    TaskListComponent,
  ],
})
export class TaskListModule { }
