import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  users: any;
  notificationForm: any;

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getNotificationForm();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.data;
      }, error => console.log(error)
    );
  }

  getNotificationForm() {
    this.notificationForm = new FormGroup({
      user_email: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.adminService.sendNotificationToUser(this.notificationForm.value).subscribe(
      res => {
        this.getNotificationForm();
        this.getUsers();
      }, error => console.log(error)
    );
  }
}