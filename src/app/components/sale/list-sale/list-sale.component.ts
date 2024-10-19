import { Component, inject } from '@angular/core';
import { Sale } from '../../../interfaces/sale';
import { SaleService } from '../../../services/sale.service';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-sale',
  standalone: true,
  imports: [    
    CommonModule,
    RouterModule,
    ProgressBarComponent],
  templateUrl: './list-sale.component.html',
  styleUrl: './list-sale.component.css'
})
export class ListSaleComponent {
  loading: boolean = false;
  private _saleService = inject(SaleService);
  private toast = inject(ToastrService);
  sales: Sale.WithCart[] = [];

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.loading = true;
    this._saleService.getSales().subscribe(
      (response: Sale.WithCart[])=>{
        console.log(response);
        this.sales = response;
        console.log("sale" + this.sales);
        this.loading = false;
      })
  }

  
  sendSale(sale: Sale.WithCart){
    //console.log(sale);
    this._saleService.saleWithProduct = sale;
    //console.log(this._saleService.saleWithProduct);
  }

  deleteSale(saleId: number){
    this.loading = true;
    this._saleService.deleteSale(saleId).subscribe((response)=>{
      this.getSales();
      this.loading = false;
    })
  }

}
