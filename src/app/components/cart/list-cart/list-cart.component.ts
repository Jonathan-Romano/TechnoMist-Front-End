import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";
import { cart } from '../../../interfaces/cart';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from '../../../services/sale.service';


@Component({
  selector: 'app-list-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProgressBarComponent
  ],
  templateUrl: './list-cart.component.html',
  styleUrl: './list-cart.component.css'
})
export class ListCartComponent {
  private _cartService = inject(CartService);
  private _productService = inject(ProductService);
  private _saleService = inject(SaleService);
  private router= inject(Router);
  private toastr=  inject(ToastrService);
  loading: boolean = false;
  cart!: cart.WithProduct;

  products:Product[] = [];
  priceTotal: number = 0;

  ngOnInit(): void {
    this.getProductCart();
  }

  saveCart(){
    this.loading = true;
    //console.log(this._cartService.cart)
    this._cartService.saveCart().subscribe(data => {

      const today = new Date().toISOString().split('T')[0];
      this._saleService.sale = {
        idCart: data,
        date: today
      };
      console.log(this._saleService.sale)
      this._saleService.saveSale().subscribe(data => {

      });
      this._cartService.cart.codProducts = [];
      this.toastr.success(`Venta realizada correctamente`, "Technomist");
      this.loading = false;
      this.router.navigate(['/']);
    });

  }

  getProductCart(){
    this._cartService.obtainSessions();
    for (const code of this._cartService.cart.codProducts) { 
      //console.log(code);
      this._productService.getProductByCode(code).subscribe(
        (response: Product) => {
          this.products.push(response);
          this.priceTotal = this.priceTotal + response.precio;
          console.log(this.products);
        }
      )
    }
  }

  removeProduct(code: string): void{
    const index =  this._cartService.cart.codProducts.findIndex( (productCode: string) => productCode === code);
    //console.log(index);
    this._cartService.removeItem(index);
    this._cartService.saveSession();
    //console.log(this._cartService.cart.codProducts);
    this.products= [];
    this.priceTotal = 0;
    this.getProductCart();
    }
}
