import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AuthGuard } from '../authGuard/auth.guard';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AccountComponent } from './account/account.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { ContentManagementComponent } from './content-management/content-management.component';

const appRoutes: Routes = [
    {
        path: '', component: DashBoardComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'subAdmin', component: SubAdminManagementComponent },
            { path: 'users', component: UsersManagementComponent },
            { path: 'category', component: CategoryManagementComponent },
            { path: 'blog', component: BlogManagementComponent },
            { path: 'blogDetail/:id', component: BlogDetailComponent },
            { path: 'product', component: ProductManagementComponent },
            { path: 'product', component: ProductManagementComponent },
            { path: 'content', component: ContentManagementComponent },
            { path: 'notification', component: SendNotificationComponent },
            { path: 'account', component: AccountComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }