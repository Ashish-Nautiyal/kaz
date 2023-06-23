import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  addUser(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/addUser', body);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/getUsers');
  }

  editUser(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/editUser/' + body);
  }

  deleteUser(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'api/deleteUser/' + body);
  }

  searchUser(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/searchUser/' + body);
  }

  updateUser(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/updateUser', body);
  }

  registerUserCount(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/registerUserCount');
  }

  activeUserCount(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/activeUserCount');
  }

  inactiveUserCount(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/inactiveUserCount');
  }

  deactivateUser(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/deactivateUser/' + body);
  }

  activateUser(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/activateUser/' + body);
  }
}