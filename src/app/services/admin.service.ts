import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

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
export class AdminService {

  constructor(private http: HttpClient) { }

  addSubAdmin(body: object): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'api/addSubAdmin', body);
  }

  getSubAdmins(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/getSubAdmins');
  }

  editSubAdmin(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/editSubAdmin/' + body);
  }

  deleteSubAdmin(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'api/deleteSubAdmin/' + body);
  }

  searchSubAdmin(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/searchSubAdmin/' + body);
  }

  updateSubAdmin(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/updateSubAdmin', body);
  }

  changePassword(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/changePassword', body);
  }

  sendNotificationToUser(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/sendNotificationToUser', body);
  }
}
