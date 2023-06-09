import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/addProduct', body);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/getProducts');
  }

  editProduct(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/editProduct/' + body);
  }

  deleteProduct(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'api/deleteProduct/' + body);
  }

  searchProduct(body: any): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'api/searchProduct/' + body);
  }

  updateProduct(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'api/updateProduct', body);
  }
}
