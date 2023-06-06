import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

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

  constructor(private http: HttpClient) { }

  register(body: object): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'register', body);
  }

  login(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'login', body);
  }
}