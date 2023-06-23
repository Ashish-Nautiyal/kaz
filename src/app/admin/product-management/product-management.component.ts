import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  products: any;

  constructor(private dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addNewProduct() {
    let dialogRef = this.dialog.open(ProductAddComponent, {
      width: '800px',
      height: '900px'
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.getProducts();
        }
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res.data;
      }, error => console.log(error)
    );
  }

  editProduct(id: any) {
    this.productService.editProduct(id).subscribe(
      res => {
        let data = res.data;
        this.dialog.open(ProductEditComponent, {
          width: '800px',
          height: '900px',
          data: data
        }).afterClosed().subscribe(
          res => {
            if (res) {
              this.getProducts();
            }
          }
        );
      }, error => console.log(error)
    );
  }

  viewProduct(id: any) {
    this.productService.editProduct(id).subscribe(
      res => {
        let data = res.data;
        this.dialog.open(ProductDetailComponent, {
          width: '900px',
          height: '900px',
          data: data
        }).afterClosed().subscribe(
          res => {
            if (res) {
              this.getProducts();
            }
          }
        );
      }, error => console.log(error)
    );
  }

  deleteProduct(id: any) {
    let del = confirm('Are you sure?');
    if (!del)
      return;
    this.productService.deleteProduct(id).subscribe(
      res => {
        this.getProducts();
      }, error => console.log(error)
    );
  }

  search(searchString: any) {
    if (searchString != '') {
      this.productService.searchProduct(searchString).subscribe(
        res => {
          this.products = res.data;
        }, error => console.log(error)
      );
    } else {
      this.getProducts();
    }
  }
}