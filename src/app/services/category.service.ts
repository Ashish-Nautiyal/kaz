import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addCategory', body);
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getCategory');
  }

  editCategory(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'editCategory/' + body);
  }

  deleteCategory(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deleteCategory/' + body);
  }

  searchCategory(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'searchCategory/' + body);
  }

  updateCategory(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateCategory', body);
  }
}