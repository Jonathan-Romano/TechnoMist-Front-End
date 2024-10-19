import { inject, Injectable } from '@angular/core';
import { cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private endPoint= environment.endpoint;
  private apiUrl ='/cart-service/cart'; // URL de tu APIhttp://localhost:443/cart-service/cart'
  public cart: cart.WithCode= { codProducts: [] };
  public contador: number = 0;
  constructor() {
   }

  saveCart():Observable<number>{
   // console.log(`${this.endPoint}${this.apiUrl}/create`);
    this.deleteSessions();
    return this.http.post<number>(`${this.endPoint}${this.apiUrl}/create`, this.cart);
  }

  getCart(cartId: number): Observable<cart.WithProduct> {
    console.log(this.http.get<cart.WithProduct>(`${this.endPoint}${this.apiUrl}/${cartId}`))
    return this.http.get<cart.WithProduct>(`${this.endPoint}${this.apiUrl}/${cartId}`);
  }


  cantidad(){
    return this.cart.codProducts.length;
  }


  removeItem(index: number) {
    this.cart.codProducts.splice(index,1);
  }
  
  saveSession(){
    localStorage.setItem("carrito",JSON.stringify(this.cart));
  }

  obtainSessions(){
    this.cart = { codProducts: [] };
    if(typeof window != undefined && window.localStorage){
      const carrito = localStorage.getItem('carrito') 
        if(carrito!=null){
          this.cart = JSON.parse(carrito);
        }
    }
  }
  
  deleteSessions(){
    localStorage.removeItem("carrito");
  }

  removeProduct(cartId: number, cod: string): Observable<cart.WithProduct>{
    console.log(`${this.endPoint}${this.apiUrl}/${cartId}/delete/product/${cod}`)
    return this.http.delete<cart.WithProduct>(`${this.endPoint}${this.apiUrl}/${cartId}/delete/product/${cod}`)
  }
}
