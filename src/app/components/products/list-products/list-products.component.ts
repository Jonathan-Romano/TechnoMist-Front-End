import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';
import { cart } from '../../../interfaces/cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProgressBarComponent
],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  products:Product[] = [];
  loading: boolean = false;
  //codProducts: string[] = [];

  constructor(private _productService: ProductService,private _cartService: CartService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts();
   }

  getListProducts(){
    this.loading = true;
    this._productService.getProducts().subscribe(
      (response: Product[]) => {
       // console.log("Datos recibidos de la API:", data); // Verifica los datos aquí
        this.products = response;  // Asigna los datos a la variable 'products'
        this.loading = false;
      },
      error => {
        console.error("Error al obtener los productos:", error); // Verifica si hay algún error
      }
    );
  }

  deleteProduct(productId: number){
    this.loading = true;
    this._productService.deleteProduct(productId).subscribe((response: string) => {
      console.log("Datos recibidos de la API:" + response)
      this.getListProducts();
      this.toastr.warning("Producto eliminado","Technomist");
    },
    (error) => {
      console.error("Error al eliminar el producto:", error);
    });
  }

  addProduct(cod: string): void {

    this._cartService.cart.codProducts.push(cod);
    this.toastr.info("Producto agregado al carrito", "Technomist");
    this._cartService.saveSession();
    //console.log(this._cartService.cart.codProducts)
  }
}
