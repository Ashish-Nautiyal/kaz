import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, User } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EditSubAdminComponent } from '../edit-sub-admin/edit-sub-admin.component';

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


  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private dialog: MatDialog) { }

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
      username: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.authService.register(this.subAdminForm.value).subscribe(
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
    this.userService.getSubAdmins().subscribe(
      res => {
        this.subAdmins = res.data;
      }, error => console.log(error)
    );
  }

  deleteSubAdmin(id: any) {
    let del = confirm('Are you sure?');
    if (!del)
      return;
    this.userService.deleteSubAdmin(id).subscribe(
      res => {
        this.getSubAdmins();
      }, error => console.log(error)
    )
  }

  editSubAdmin(id: any) {
    this.userService.editSubAdmin(id).subscribe(
      res => {
        let data = res.data;
        if (data) {
          let dialogRef = this.dialog.open(EditSubAdminComponent, {
            data: data,
            height: '500px',
            width: '400px'
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
    this.userService.searchSubAdmin(searchString).subscribe(
      res => {
        this.subAdmins = res.data;
      }, error => console.log(error)
    )
  }
}