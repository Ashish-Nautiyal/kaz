import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getLoginForm();
    this.isLoggedIn();
  }

  getLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        if (res.success) {
          localStorage.clear();
          localStorage.setItem('token', res.data);
          this.router.navigate(['/admin']);
        } else {
          console.log(res.message);
        }
      }, error => console.log(error)
    );
  }

  showPassword() {
    this.hide = !this.hide;
  }

  isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }
}