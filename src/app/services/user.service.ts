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
    return this.http.post<any>(environment.baseUrl + 'addUser', body);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getUsers');
  }

  editUser(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'editUser/' + body);
  }

  deleteUser(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deleteUser/' + body);
  }

  searchUser(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'searchUser/' + body);
  }

  updateUser(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateUser', body);
  }

}