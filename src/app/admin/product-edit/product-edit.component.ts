import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  data: any;
  editForm: any;
  constructor(@Inject(MAT_DIALOG_DATA) public productData: any, private dialogRef: MatDialogRef<ProductEditComponent>, private productService: ProductService) { }

  ngOnInit(): void {
    this.data = this.productData;
    this.getEditForm();
  }

  getEditForm() {

  }

  onSubmit() {
    this.productService.updateProduct(this.editForm.value).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }
}