import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Sale } from '../interfaces/sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private http = inject(HttpClient);
  private endPoint = environment.endpoint;
  private apiUrl = '/sale-service/sale'; // URL de tu APIhttp://localhost:443/cart-service/cart'
  public saleWithProduct!: Sale.WithCart;
  public sale: Sale.IdCart = {
    date: '',
    idCart: 0,
  };

  constructor() {}
  getSales(): Observable<Sale.WithCart[]> {
    console.log(`${this.endPoint}${this.apiUrl}/list/cart`);
    return this.http.get<Sale.WithCart[]>(
      `${this.endPoint}${this.apiUrl}/list/cart`
    );
  }

  getSale(id: number): Observable<Sale.IdCart> {
    return this.http.get<Sale.IdCart>(`${this.endPoint}${this.apiUrl}/${id}`);
  }
  getSaleWithProduct(id: number): Observable<Sale.WithCart> {
    return this.http.get<Sale.WithCart>(`${this.endPoint}${this.apiUrl}/${id}/cart`);
  }

  saveSale(): Observable<string> {
    console.log(`${this.endPoint}${this.apiUrl}/create`);
    return this.http.post<string>(
      `${this.endPoint}${this.apiUrl}/create`,
      this.sale,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  deleteSale(id: number): Observable<string> {
    return this.http.delete<string>(`${this.endPoint}${this.apiUrl}/delete/${id}`,{
      responseType: 'text' as 'json' //interprete la respuesta como texto
  })
  }
}
