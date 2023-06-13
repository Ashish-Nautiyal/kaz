import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  showSetting: boolean = false;

  changPassword() {
    this.showSetting = false;
  }

  setting() {
    this.showSetting = true;
  }
}
