import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { UserDetailComponent } from '../../user_management/user-detail/user-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-attrition-rate',
  templateUrl: './customer-attrition-rate.component.html',
  styleUrls: ['./customer-attrition-rate.component.scss']
})
export class CustomerAttritionRateComponent {

  users: any;
  displayedColumns: string[] = ['id', 'first_name', 'email', 'phone_number', 'Action'];
  dataSource!: MatTableDataSource<any>;
  startDate: any = '';
  endDate: any = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentMonthUsers();
  }

  getCurrentMonthUsers() {
    this.userService.currentMonthDeactiveUsers().subscribe(
      res => {
        this.users = res.data;
        this.dataSource = this.users;
      }, error => console.log(error)
    );
  }

  search(event: any) {
    let searchstring = event.target.value;
    if (searchstring != '') {
      this.userService.searchUser(searchstring).subscribe(
        res => {
          this.dataSource = res.data;
        }, error => console.log(error)
      );
    } else {
      this.getCurrentMonthUsers();
    }
  }

  dateFilter(event: any) {
    console.log(event.target.value);

    this.userService.dateFilterDeactiveUsers({ startDate: this.startDate, endDate: this.endDate }).subscribe(
      res => {
        if (res.data) {
          this.dataSource = res.data;
        } else {
          this.getCurrentMonthUsers();
        }
      }, error => console.log(error)
    );
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
              this.getCurrentMonthUsers();
            }
          }
        );
      }, error => console.log(error)
    );
  }
}