import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-npv',
  templateUrl: './npv.component.html',
  styleUrls: ['./npv.component.scss']
})
export class NPVComponent {

  users: any;
  products: any;
  displayedColumns: string[] = ['id', 'product_name', 'price', 'NPV'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.data;
      }, error => console.log(error)
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res.data;
        console.log(this.products);
        
        this.dataSource = this.products;
      }, error => console.log(error)
    );
  }

}
