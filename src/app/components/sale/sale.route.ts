import { Routes } from '@angular/router';

export default[
    {
        path:'',
        loadComponent: () => 
            import('./list-sale/list-sale.component').then(
                (m) =>m.ListSaleComponent
            )
    },
    {
        path:':id',
        loadComponent: () => 
            import('./sale-products/sale-products.component').then(
                (m) =>m.SaleProductsComponent
            )
    },
    {
        path:'edit/:id',
        loadComponent: () => 
            import('./list-sale/list-sale.component').then(
                (m) =>m.ListSaleComponent
            )
    }
]as Routes;