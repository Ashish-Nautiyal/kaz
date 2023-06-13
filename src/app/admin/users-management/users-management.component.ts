import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  users: any;
  
  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.data;
      }, error => console.log(error)
    );
  }

  search(searchString: any) {
    if (searchString != '') {
      this.userService.searchUser(searchString).subscribe(
        res => {
          this.users = res.data;
        }, error => console.log(error)
      );
    } else {
      this.getUsers();
    }
  }

  userDetail(id: any) {
    this.userService.editUser(id).subscribe(
      res => {
        let data = res.data;
        const dialogRef = this.dialog.open(UserDetailComponent, {
          width: '800px',
          height: '700px',
          data: data
        });

        dialogRef.afterClosed().subscribe(
          res => {
            console.log(res);
            if (res) {
              this.getUsers();
            }
          }
        );
      }, error => console.log(error)
    );
  }
}