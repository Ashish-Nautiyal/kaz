import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AuthGuard } from '../authGuard/auth.guard';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { BlogManagementComponent } from './blog-management/blog-management.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'subAdmin', component: SubAdminManagementComponent },
            { path: 'users', component: UsersManagementComponent },
            { path: 'category', component: CategoryManagementComponent },
            { path: 'blog', component: BlogManagementComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }