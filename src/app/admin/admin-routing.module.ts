import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard', component: DashBoardComponent, children: [
            { path: '', redirectTo: '/admin/dashboard/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'subAdmin', component: SubAdminManagementComponent },
            { path: 'users', component: UsersManagementComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }