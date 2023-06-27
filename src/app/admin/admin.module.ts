//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


//Components
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { UploadDocumentAddComponent } from './upload_document/upload-document-add/upload-document-add.component';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { TransactionDataModalComponent } from './payout_requests/transaction-data-modal/transaction-data-modal.component';
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
import { ProductAddComponent } from './product_management/product-add/product-add.component';
import { ProductEditComponent } from './product_management/product-edit/product-edit.component';
import { ProductDetailComponent } from './product_management/product-detail/product-detail.component';
import { CategoryManagementComponent } from './category_mangement/category-management/category-management.component';
import { CategoryFormDialogComponent } from './category_mangement/category-form-dialog/category-form-dialog.component';
import { CategoryFormEditDialogComponent } from './category_mangement/category-form-edit-dialog/category-form-edit-dialog.component';
import { BlogManagementComponent } from './blog_management/blog-management/blog-management.component';
import { BlogEditDialogComponent } from './blog_management/blog-edit-dialog/blog-edit-dialog.component';
import { BlogDetailComponent } from './blog_management/blog-detail/blog-detail.component';
import { UploadDocumentComponent } from './upload_document/upload-document/upload-document.component';
import { SubAdminManagementComponent } from './subAdmin_management/sub-admin-management/sub-admin-management.component';
import { EditSubAdminComponent } from './subAdmin_management/edit-sub-admin/edit-sub-admin.component';
import { PayoutComponent } from './payout_requests/payout/payout.component';
import { UsersManagementComponent } from './user_management/users-management/users-management.component';
import { UserDetailComponent } from './user_management/user-detail/user-detail.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    SubAdminManagementComponent,
    UsersManagementComponent,
    HomeComponent,
    EditSubAdminComponent,
    CategoryManagementComponent,
    CategoryFormDialogComponent,
    CategoryFormEditDialogComponent,
    BlogManagementComponent,
    BlogEditDialogComponent,
    BlogDetailComponent,
    UserDetailComponent,
    ProductManagementComponent,
    ProductAddComponent,
    ProductEditComponent,
    AccountComponent,
    SendNotificationComponent,
    ContentManagementComponent,
    ProductDetailComponent,
    UploadDocumentComponent,
    UploadDocumentAddComponent,
    PayoutComponent,
    PaymentLogComponent,
    TransactionDataModalComponent,
    NewOpenedAccountsComponent,
    NPVComponent,
    TimeSpendOnAppComponent,
    CustomerAttritionRateComponent,
    AverageAUMComponent,
    AccountSignUpMonthlyComponent,
    ConversionRatioComponent,
    MonthlyActiveUsersComponent,
    RetentionRateComponent,
    ReferralsComponent,
    RevenueComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    AngularEditorModule
  ]
})
export class AdminModule { }
