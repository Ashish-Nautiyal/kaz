//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    SubAdminManagementComponent,
    UsersManagementComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
