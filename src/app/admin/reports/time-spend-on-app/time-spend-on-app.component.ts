import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-time-spend-on-app',
  templateUrl: './time-spend-on-app.component.html',
  styleUrls: ['./time-spend-on-app.component.scss']
})
export class TimeSpendOnAppComponent {

  users: any;
  displayedColumns: string[] = ['id', 'User', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dataSource!: MatTableDataSource<any>;
  years = Array.from(new Array(20), (val, index) => index + new Date().getFullYear());

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.data;
        this.dataSource = this.users;
      }, error => console.log(error)
    );
  }

  search(val: any) {
    console.log('value',val);
    
    if(val != ''){
      this.userService.searchUser(val).subscribe(
        res => {
          this.dataSource = res.data;
        },error => console.log(error)
      )
    }else{
      this.getUsers();
    }  
  }

  onYearSelect(event:any) {
    console.log(event.target.value);
  }
}
