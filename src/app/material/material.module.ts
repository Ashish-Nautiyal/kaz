//Modules
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    MatSidenavModule
  ],
  exports: [
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})

export class MaterialModule { }