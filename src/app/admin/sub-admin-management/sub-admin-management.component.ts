import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.scss']
})
export class SubAdminManagementComponent implements OnInit {

  showform: boolean = false;
  subAdminForm: any;
  hide : boolean = true;


  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.getSubAdminForm();
  }

  showSubAdminForm() {
    this.showform = true;
  }

  hideSubAdminForm() {
    this.showform = false;
  }

  getSubAdminForm() {
    this.subAdminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.authService.register(this.subAdminForm.value).subscribe(
      res => {
        this.getSubAdminForm();
        this.hideSubAdminForm();
      }, error => console.log(error)
    )
  }

  showPassword() {
    this.hide = !this.hide;
  }
}