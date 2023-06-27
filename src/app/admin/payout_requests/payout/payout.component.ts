import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { TransactionDataModalComponent } from '../transaction-data-modal/transaction-data-modal.component';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent implements OnInit {

  users: any;
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.data;
        console.log(this.users);

      }, error => console.log(error)
    );
  }

  openTransacationDataModal() {
    this.dialog.open(TransactionDataModalComponent, {
      width: '1000px',
      height: '600px'
    }).afterClosed().subscribe(
      res => {
        if (res) {
          this.getUsers();
        }
      }
    );
  }
}
