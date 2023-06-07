import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getSubAdmins(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getSubAdmins');
  }

  editSubAdmin(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'editSubAdmin/' + body);
  }

  deleteSubAdmin(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deleteSubAdmin/' + body);
  }

  searchSubAdmin(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'searchSubAdmin/' + body);
  }

  updateSubAdmin(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateSubAdmin', body);
  }
}