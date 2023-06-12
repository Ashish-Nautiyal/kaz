import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: any;
  constructor(private dialogRef: MatDialogRef<ProductAddComponent>, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductForm();
  }

  getProductForm() {

  }

  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }
}