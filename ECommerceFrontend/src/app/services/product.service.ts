import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public getProducts():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}products/Products`);
  }

  public addProduct(product:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}products/product`,product);
  }

  public getCategories():Observable<any>{
    return this.http.get(`${environment.baseUrl}products/Categories`);
  }
}
