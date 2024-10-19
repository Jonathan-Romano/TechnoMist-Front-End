import { Component, inject } from '@angular/core';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sale } from '../../../interfaces/sale';
import { SaleService } from '../../../services/sale.service';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent],
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.css',
})
export class SaleProductsComponent {
  loading: boolean = false;
  private toastr = inject(ToastrService);
  private _saleService = inject(SaleService);
  private _cartService = inject(CartService);
  sale!: Sale.WithCart;

  ngOnInit(): void {
    this.getSale();
  }

  getSale() {
    this.sale = this._saleService.saleWithProduct;
  }

  removeProduct(id: number, cod: string) {
    this._saleService.getSale(id).subscribe((response: Sale.IdCart) => {
      this._cartService.removeProduct(response.idCart, cod).subscribe((cart) => {
       this._saleService.getSaleWithProduct(id).subscribe((sale) => {
        this.sale = sale;
       });
      });
      this.toastr.warning('Producto eliminado', 'Technomist');
    });

  }
}
