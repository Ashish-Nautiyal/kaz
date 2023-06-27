import { Component, OnInit } from '@angular/core';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFormEditDialogComponent } from '../category-form-edit-dialog/category-form-edit-dialog.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {

  showForm: boolean = false;
  categoryForm: any;
  categoryList: any[] = [];

  constructor(private dialog: MatDialog, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(
      res => {
        this.categoryList = res.data;
      }, error => console.log(error)
    );
  }

  search(search: any) {
    if (search != '') {
      this.categoryService.searchCategory(search).subscribe(
        res => {
          this.categoryList = res.data;
        }, error => console.log(error)
      );
    } else {
      this.getCategories();
    }
  }

  openAddCategoryModal() {
    let dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.getCategories();
        }
      }
    );
  }

  editCategory(id: any) {
    this.categoryService.editCategory(id).subscribe(
      res => {
        let data = res.data;
        let dialogRef = this.dialog.open(CategoryFormEditDialogComponent, {
          width: '500px',
          height: '400px',
          data: data
        });

        dialogRef.afterClosed().subscribe(
          res => {
            if (res) {
              this.getCategories();
            }
          }
        );
      }, error => console.log(error)
    );

  }

  deleteCategory(id: any) {
    let del = confirm('Are you sure?');
    if (!del)
      return;
    this.categoryService.deleteCategory(id).subscribe(
      res => {
        this.getCategories();
      }, error => console.log(error)
    );
  }
}