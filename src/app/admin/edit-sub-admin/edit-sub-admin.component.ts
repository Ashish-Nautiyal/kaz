import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-sub-admin',
  templateUrl: './edit-sub-admin.component.html',
  styleUrls: ['./edit-sub-admin.component.scss']
})
export class EditSubAdminComponent implements OnInit {

  editForm: any;
  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private fb: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<EditSubAdminComponent>) { }

  ngOnInit(): void {
    this.getEditForm();
    this.setFormData();
  }

  getEditForm() {
    this.editForm = this.fb.group({
      _id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  setFormData() {
    this.editForm.controls['_id'].setValue(this.editData._id);
    this.editForm.controls['first_name'].setValue(this.editData.first_name);
    this.editForm.controls['last_name'].setValue(this.editData.last_name);
    this.editForm.controls['phone_number'].setValue(this.editData.phone_number);
  }

  onSubmit() {
    this.userService.updateSubAdmin(this.editForm.value).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }
}