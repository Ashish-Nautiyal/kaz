import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { DashBoardComponent } from './admin/dash-board/dash-board.component';
import { HomeComponent } from './admin/home/home.component';
import { SubAdminManagementComponent } from './admin/sub-admin-management/sub-admin-management.component';
import { UsersManagementComponent } from './admin/users-management/users-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth', children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // {
  //   path: 'admin', children: [
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     {
  //       path: 'dashboard', component: DashBoardComponent, children: [
  //         { path: '', redirectTo: 'subAdmin', pathMatch: 'full' },
  //         { path: 'home', component: HomeComponent },
  //         { path: 'subAdmin', component: SubAdminManagementComponent },
  //         { path: 'users', component: UsersManagementComponent }
  //       ]
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }