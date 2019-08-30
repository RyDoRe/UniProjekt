import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../core/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './user-management.component';
import { UserManagementPageTemplatesModule } from './user-managment-page-templates/user-managment-page-templates.module';


const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UserManagementPageTemplatesModule,
  ],
  declarations: [
    UserManagementComponent,
  ],
})
export class UserManagementModule { }
