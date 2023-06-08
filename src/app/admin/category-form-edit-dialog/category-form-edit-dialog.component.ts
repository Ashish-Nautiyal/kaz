import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form-edit-dialog',
  templateUrl: './category-form-edit-dialog.component.html',
  styleUrls: ['./category-form-edit-dialog.component.scss']
})
export class CategoryFormEditDialogComponent implements OnInit {

  editCategoryFrom: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CategoryFormEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getEditForm();
    this.setFormValue();
  }

  getEditForm() {
    this.editCategoryFrom = this.fb.group({
      _id: [''],
      category_name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  setValue(val: any) {
    this.editCategoryFrom.controls['status'].setValue(val);
  }

  setFormValue() {
    this.editCategoryFrom.controls['_id'].setValue(this.editData._id);
    this.editCategoryFrom.controls['category_name'].setValue(this.editData.category_name);
    this.editCategoryFrom.controls['status'].setValue(this.editData.status);
  }

  onSubmit() {
    this.categoryService.updateCategory(this.editCategoryFrom.value).subscribe(
      res => {
        this.dialogRef.close(true)
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }
}