import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addBlog(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addBlog', body);
  }

  getBlogs(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getBlog');
  }

  editBlog(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'editBlog/' + body);
  }

  deleteBlog(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deleteBlog/' + body);
  }

  searchBlog(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'searchBlog/' + body);
  }

  updateBlog(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateBlog', body);
  }

  getBlogDetail(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getBlogDetail/' + body);
  }
}