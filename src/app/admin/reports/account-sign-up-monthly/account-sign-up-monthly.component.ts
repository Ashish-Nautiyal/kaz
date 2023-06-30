import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { UserDetailComponent } from '../../user_management/user-detail/user-detail.component';

@Component({
  selector: 'app-account-sign-up-monthly',
  templateUrl: './account-sign-up-monthly.component.html',
  styleUrls: ['./account-sign-up-monthly.component.scss']
})
export class AccountSignUpMonthlyComponent {

  totalSignUp: any;
  selectedYear: any = '';
  selectedMonth: any = '';
  years = Array.from(new Array(20), (val, index) => index + new Date().getFullYear());
  months: any[] = [
    { name: 'January', value: 1 }, { name: 'February', value: 2 }, { name: 'March', value: 3 }, { name: 'April', value: 4 },
    { name: 'May', value: 5 }, { name: 'June', value: 6 }, { name: 'July', value: 7 }, { name: 'August', value: 8 },
    { name: 'September', value: 9 }, { name: 'October', value: 10 }, { name: 'November', value: 11 }, { name: 'December', value: 12 },
  ];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_name', 'email', 'phone_number', 'action'];

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSignUps();
  }

  getSignUps() {
    this.userService.getSignUpsByMonthYear({ year: this.selectedYear, month: this.selectedMonth }).subscribe(
      res => {
        if (res.data) {
          this.totalSignUp = res.data.length;
          this.dataSource = res.data;
        }
      }
    );
  }

  search(event: any) {
    let search = event.target.value;
    if (search != '') {
      this.userService.searchUser(search).subscribe(
        res => {
          if (res.data) {
            console.log('searchData', res.data);

            this.dataSource = res.data;
          }
        }, error => console.log(error)
      );
    } else {
      this.getSignUps();
    }
  }

  onYearSelect(val: any) {
    this.selectedYear = val;
    this.getSignUps();
  }

  onMonthSelect(val: any) {
    this.selectedMonth = val;
    this.getSignUps();
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
            if (res) {
              this.getSignUps();
            }
          }
        );
      }, error => console.log(error)
    );
  }
}