import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./components/products/product.route")
    },
    {
        path: 'cart',
        loadChildren: () => import("./components/cart/cart.route")
    },
    {
        path: 'sale',
        loadChildren: () => import("./components/sale/sale.route")
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
