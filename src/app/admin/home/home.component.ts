import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerCount: any;
  activeCount: any;
  inactiveCount: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.registerUserCount();
    this.activeUserCount();
    this.inactiveUserCount();
  }

  registerUserCount() {
    this.userService.registerUserCount().subscribe(
      res => {
        this.registerCount = res.data;
      }, error => console.log(error)
    );
  }

  activeUserCount() {
    this.userService.activeUserCount().subscribe(
      res => {
        this.activeCount = res.data;
      }, error => console.log(error)
    );
  }

  inactiveUserCount() {
    this.userService.inactiveUserCount().subscribe(
      res => {
        this.inactiveCount = res.data;
      }, error => console.log(error)
    );
  }
}
