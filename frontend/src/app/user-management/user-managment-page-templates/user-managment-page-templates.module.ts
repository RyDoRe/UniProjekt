import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOverviewPageComponent } from './user-overview-page/user-overview-page.component';
import { AdminOverviewPageComponent } from './admin-overview-page/admin-overview-page.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateUserRoleModalComponent } from './admin-overview-page/update-user-role-modal/update-user-role-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminOverviewPageComponent,
    UserOverviewPageComponent,
    UpdateUserRoleModalComponent,
  ],
  entryComponents: [
    UpdateUserRoleModalComponent,
  ],
  exports: [
    AdminOverviewPageComponent,
    UserOverviewPageComponent,
  ],
})
export class UserManagementPageTemplatesModule { }
