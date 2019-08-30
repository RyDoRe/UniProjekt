import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../core/material/material.module';
import { LoginComponent } from './login.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
  entryComponents:[
    RegisterModalComponent,
  ],
  declarations: [
    LoginComponent,
    RegisterModalComponent,
  ],
})
export class LoginModule { }



