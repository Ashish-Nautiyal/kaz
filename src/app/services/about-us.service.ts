import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private http: HttpClient) { }

  addAboutUs(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/addAboutUs', body);
  }

  getAboutUs(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/getAboutUs');
  }

  updateAboutUs(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/updateAboutUs', body);
  }
}