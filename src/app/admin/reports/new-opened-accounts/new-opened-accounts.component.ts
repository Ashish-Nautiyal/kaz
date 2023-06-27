import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-opened-accounts',
  templateUrl: './new-opened-accounts.component.html',
  styleUrls: ['./new-opened-accounts.component.scss']
})
export class NewOpenedAccountsComponent implements  AfterViewInit {

  users: any;
  displayedColumns: string[] = ['id', 'first_name', 'email', 'phone_number', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
