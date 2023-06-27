import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../authGuard/auth.guard';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AccountComponent } from './account/account.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { NewOpenedAccountsComponent } from './reports/new-opened-accounts/new-opened-accounts.component';
import { NPVComponent } from './reports/npv/npv.component';
import { TimeSpendOnAppComponent } from './reports/time-spend-on-app/time-spend-on-app.component';
import { CustomerAttritionRateComponent } from './reports/customer-attrition-rate/customer-attrition-rate.component';
import { AverageAUMComponent } from './reports/average-aum/average-aum.component';
import { AccountSignUpMonthlyComponent } from './reports/account-sign-up-monthly/account-sign-up-monthly.component';
import { ConversionRatioComponent } from './reports/conversion-ratio/conversion-ratio.component';
import { MonthlyActiveUsersComponent } from './reports/monthly-active-users/monthly-active-users.component';
import { RetentionRateComponent } from './reports/retention-rate/retention-rate.component';
import { ReferralsComponent } from './reports/referrals/referrals.component';
import { RevenueComponent } from './reports/revenue/revenue.component';
import { ProductManagementComponent } from './product_management/product-management/product-management.component';
import { CategoryManagementComponent } from './category_mangement/category-management/category-management.component';
import { BlogManagementComponent } from './blog_management/blog-management/blog-management.component';
import { BlogDetailComponent } from './blog_management/blog-detail/blog-detail.component';
import { UploadDocumentComponent } from './upload_document/upload-document/upload-document.component';
import { SubAdminManagementComponent } from './subAdmin_management/sub-admin-management/sub-admin-management.component';
import { PayoutComponent } from './payout_requests/payout/payout.component';
import { UsersManagementComponent } from './user_management/users-management/users-management.component';

const appRoutes: Routes = [
    {
        path: '', component: DashBoardComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'subAdmin', component: SubAdminManagementComponent },
            { path: 'users', component: UsersManagementComponent },
            { path: 'payout', component: PayoutComponent },
            { path: 'paymentLog', component: PaymentLogComponent },
            { path: 'category', component: CategoryManagementComponent },
            { path: 'blog', component: BlogManagementComponent },
            { path: 'blogDetail/:id', component: BlogDetailComponent },
            { path: 'product', component: ProductManagementComponent },
            { path: 'content', component: ContentManagementComponent },
            { path: 'uploadDocument', component: UploadDocumentComponent },
            { path: 'notification', component: SendNotificationComponent },
            { path: 'account', component: AccountComponent },

            // Report routes
            { path: 'newOpenAccount', component: NewOpenedAccountsComponent },
            { path: 'npv', component: NPVComponent },
            { path: 'timeSpend', component: TimeSpendOnAppComponent },
            { path: 'attritionRate', component: CustomerAttritionRateComponent },
            { path: 'averageAUM', component: AverageAUMComponent },
            { path: 'accountSignUp', component: AccountSignUpMonthlyComponent },
            { path: 'conversionRatio', component: ConversionRatioComponent },
            { path: 'activeUsers', component: MonthlyActiveUsersComponent },
            { path: 'retentionRate', component: RetentionRateComponent },
            { path: 'refferals', component: ReferralsComponent },
            { path: 'revenue', component: RevenueComponent },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }