import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageManagementModalComponent } from './page-management-modal/page-management-modal.component';
import { PageManagementComponent } from './page-management.component';

const routes: Routes = [
  {
    path: '',
    component: PageManagementComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PageManagementComponent,
    PageManagementModalComponent,
  ],
  entryComponents: [
    PageManagementModalComponent,
  ],
})
export class PageManagementModule { }
