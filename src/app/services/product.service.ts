import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endPoint= environment.endpoint;
  private apiUrl ='/products-service/product/'; // URL de tu APIhttp://localhost:443/products-service/product/list
  private apiUrl2 ='/products-service/product';
  constructor(private http: HttpClient) { }
 
  // Método para obtener los productos
  getProducts(): Observable<Product[]> {
    console.log(this.endPoint + this.apiUrl)
    return this.http.get<Product[]>(`${this.endPoint}${this.apiUrl}list`);
  }

  deleteProduct(productId: number): Observable<string> {
    return this.http.delete<string>(`${this.endPoint}${this.apiUrl}delete/${productId}`, {
      responseType: 'text' as 'json'
    });
  }

  saveProduct(product: Product): Observable<string>{
   // console.log(`${this.endPoint}${this.apiUrl}create`)
    return this.http.post<string>(`${this.endPoint}${this.apiUrl}create`, product, {
      responseType: 'text' as 'json'
    });
  }

  getProductById(productId: number): Observable<Product>{
    return this.http.get<Product>(`${this.endPoint}${this.apiUrl}${productId}`)
  }
  
  getProductByCode(code: string): Observable<Product>{
    console.log(`${this.endPoint}${this.apiUrl}${code}`);
    return this.http.get<Product>(`${this.endPoint}${this.apiUrl2}?codigo=${code}`)
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.endPoint}${this.apiUrl}edit`, product)
  }
}
