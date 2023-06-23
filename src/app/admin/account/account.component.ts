import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  showSetting: boolean = false;
  changePwdForm: any;
  hide = {
    hide1: true,
    hide2: true,
    hide3: true
  };

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getForm();
  }

  getForm() {
    this.changePwdForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    });
    this.changePwdForm
      .get('confirm_password')
      .setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: any) {
    const password = control.parent?.get('new_password');
    const confirmPassword = control.parent?.get('confirm_password');
    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  changePassword() {
    this.showSetting = false;
  }

  setting() {
    this.showSetting = true;
  }

  onSubmit() {
    this.adminService.changePassword(this.changePwdForm.value).subscribe(
      res => {
        this.getForm();
      }, error => console.log(error)
    )
  }
}