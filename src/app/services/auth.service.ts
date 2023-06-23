import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/login', body);
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