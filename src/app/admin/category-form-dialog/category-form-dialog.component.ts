import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss']
})
export class CategoryFormDialogComponent implements OnInit {

  categoryForm: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CategoryFormDialogComponent>, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategoryForm();
  }

  getCategoryForm() {
    this.categoryForm = this.fb.group({
      category_name: ['', Validators.required],
      status: [false, Validators.required]
    });
  }

  onSubmit() {
    console.log('form', this.categoryForm.value);
    this.categoryService.addCategory(this.categoryForm.value).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }

  setValue(val: any) {
    this.categoryForm.controls['status'].setValue(val);
  }
}