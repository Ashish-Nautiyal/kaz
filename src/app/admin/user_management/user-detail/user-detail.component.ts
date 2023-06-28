import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: any;

  constructor(@Inject(MAT_DIALOG_DATA) public userData: any, private dialogRef: MatDialogRef<UserDetailComponent>, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userData;
  }

  close() {
    this.dialogRef.close(false);
  }

  deleteUser() {
    let del = confirm('Are You sure?');
    if (!del)
      return;
    this.userService.deleteUser(this.user._id).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  deactivateUser() {
    this.userService.deactivateUser(this.user._id).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  activateUser() {
    this.userService.activateUser(this.user._id).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }
}