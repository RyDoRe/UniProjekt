import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(module => module.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule),
  },
  {
    path: 'task-board',
    loadChildren: () => import('./task-board/task-board.module').then(module => module.TaskBoardModule),
  },
  {
    path: 'board-management',
    loadChildren: () => import('./board-management/board-management.module').then(module => module.BoardManagementModule),
  },
  {
    path: 'page-management',
    loadChildren: () => import('./page-management/page-management.module').then(module => module.PageManagementModule),
  },
  {
    path: 'user-managment',
    loadChildren: () => import('./user-management/user-management.module').then(module => module.UserManagementModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
