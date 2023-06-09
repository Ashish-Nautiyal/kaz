//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


//Components
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { HomeComponent } from './home/home.component';
import { EditSubAdminComponent } from './edit-sub-admin/edit-sub-admin.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryFormDialogComponent } from './category-form-dialog/category-form-dialog.component';
import { CategoryFormEditDialogComponent } from './category-form-edit-dialog/category-form-edit-dialog.component';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { BlogEditDialogComponent } from './blog-edit-dialog/blog-edit-dialog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

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
