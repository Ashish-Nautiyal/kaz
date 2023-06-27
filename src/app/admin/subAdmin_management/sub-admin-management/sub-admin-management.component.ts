import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditSubAdminComponent } from '../edit-sub-admin/edit-sub-admin.component';
import { AdminService, User } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.scss']
})
export class SubAdminManagementComponent implements OnInit {

  showform: boolean = false;
  subAdminForm: any;
  hide: boolean = true;
  subAdmins: User[] = [];


  constructor(private fb: FormBuilder, private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSubAdminForm();
    this.getSubAdmins();
  }

  showSubAdminForm() {
    this.showform = true;
  }

  hideSubAdminForm() {
    this.showform = false;
  }

  getSubAdminForm() {
    this.subAdminForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkbox: [false]
    });
  }

  onSubmit() {
    this.adminService.addSubAdmin(this.subAdminForm.value).subscribe(
      res => {
        this.getSubAdminForm();
        this.getSubAdmins();
        this.hideSubAdminForm();
      }, error => console.log(error)
    );
  }

  showPassword() {
    this.hide = !this.hide;
  }

  getSubAdmins() {
    this.adminService.getSubAdmins().subscribe(
      res => {
        this.subAdmins = res.data;
      }, error => console.log(error)
    );
  }

  deleteSubAdmin(id: any) {
    let del = confirm('Are you sure?');
    if (!del)
      return;
    this.adminService.deleteSubAdmin(id).subscribe(
      res => {
        this.getSubAdmins();
      }, error => console.log(error)
    );
  }

  editSubAdmin(id: any) {
    this.adminService.editSubAdmin(id).subscribe(
      res => {
        let data = res.data;
        if (data) {
          let dialogRef = this.dialog.open(EditSubAdminComponent, {
            data: data,
            height: '600px',
            width: '600px'
          });

          dialogRef.afterClosed().subscribe(
            res => {
              if (res) {
                this.getSubAdmins();
              }
            }
          );
        }
      }, error => console.log(error)
    );
  }

  search(searchString: string) {
    if (searchString != '') {
      this.adminService.searchSubAdmin(searchString).subscribe(
        res => {
          this.subAdmins = res.data;
        }, error => console.log(error)
      );
    } else {
      this.getSubAdmins();
    }
  }
}