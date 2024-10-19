import { Routes } from '@angular/router';

export default[
    {
        path:'',
        loadComponent: () => 
            import('./list-products/list-products.component').then(
                (m) =>m.ListProductsComponent
            )
    },
    {
        path:'add',
        loadComponent: () => 
            import('./add-edit-product/add-edit-product.component').then(
                (m) =>m.AddEditProductComponent
            )
    },
    {
        path:'edit/:id',
        loadComponent: () => 
            import('./add-edit-product/add-edit-product.component').then(
                (m) =>m.AddEditProductComponent
            )
    }

] as Routes;