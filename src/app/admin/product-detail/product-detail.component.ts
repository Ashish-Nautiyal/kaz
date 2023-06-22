import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public productData: any, private dialogRef: MatDialogRef<ProductDetailComponent>) { }

  ngOnInit(): void {
    this.data = this.productData;
  }

  close(){
    this.dialogRef.close(false);
  }
}