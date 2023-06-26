import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  addDocument(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/addDocument', body);
  }

  getDocuments(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/getDocuments');
  }

  deleteDocument(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'api/deleteDocument/' + body);
  }
}
