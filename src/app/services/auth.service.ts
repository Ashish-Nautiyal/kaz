import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { Router } from '@angular/router';

export interface User {
  _id: string,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  password: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(body: object): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'register', body);
  }

  login(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'login', body);
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}